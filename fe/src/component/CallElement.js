import React, { useEffect, useState } from "react";
import callFunc from "./call/webRTC";
import Peer from "peerjs";
import socket from "./socketio";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function CallElement() {
  const [showModal, setShowModal] = useState(false);
  const [guess, setGuess] = useState("");
  const navigate = useNavigate();
  const peer = new Peer()
  const { room } = useParams()

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else {

      peer.on('open', ()=>{
        console.log(peer.id)
        socket.emit("JOIN_ROOM", {
          roomId : room,
          peerId : peer.id
        })
      })

      callFunc.openStream().then((stream) => {
        callFunc.playedStream("userPlayer", stream);
        socket.on("FETCH_ROOM_MEMBERS", (members)=>{
          console.log(members)
        })
        // let call = peer.call(peer.id, stream);
        // call.on("stream", (remoteStream) => {
        //   callFunc.playedStream("guessPlayer", remoteStream);
        // });
      });
      peer.on("call", (call) => {
        callFunc.openStream().then((stream) => {
          call.answer(stream);
          callFunc.playedStream("userPlayer", stream);
          call.on("stream", (remoteStream) => {
            callFunc.playedStream("guessPlayer", remoteStream);
          });
        });
      });
      socket.on("ALERT_NEW_USER_RESQUEST", (user) => {
        setShowModal(true);
        setGuess(user);
      });
    }   
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleAccept = () => {
    socket.emit("ACCEPT_NEW_USER", (guess));
    setShowModal(false);
  };
  const handleDecline = () => {
    socket.emit("DECLINE_NEW_USER", (guess));
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, {guess.username} reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="danger" onClick={handleDecline}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
        <div className="h-100 w-100 bg-light d-flex justify-content-center align-items-center position-relative">
          <video id="guessPlayer" className="h-100 rounded"></video>
          <video
            id="userPlayer"
            className="h-25 bg-light position-absolute bottom-0 end-0 rounded m-2"
          ></video>
        </div>
      </div>
    </>
  );
}
