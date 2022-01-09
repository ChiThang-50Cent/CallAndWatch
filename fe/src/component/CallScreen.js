import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Peer from "peerjs";
import CallElement from "./CallElement";
import callFunc from "./call/webRTC";
import socket from "./socketio";

export default function CallScreen() {
  const navigate = useNavigate();
  const peer = new Peer();
  const { room } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [requestor, setRequestor] = useState("");
  const [thisPeerId, setThisPeerId] = useState("")
  const [participant, setParticipant] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else {
      peer.on("open", () => {
        console.log(peer.id);
        setThisPeerId(peer.id)  
        socket.emit("JOIN_ROOM", {
          roomId: room,
          peerId: peer.id,
        });
      });

      callFunc.openStream().then((stream) => {
        callFunc.playedStream("userPlayer", stream);
        socket.on("FETCH_ROOM_MEMBERS", (members) => {
          setParticipant([...members]);
          members.forEach((peerId) => {
            if (peerId !== peer.id) {
              console.log("joiner", peerId);
              let call = peer.call(peerId, stream);
              call.on("stream", (remoteStream) => {
                callFunc.playedStream(`remotePlayer-${peerId}`, remoteStream);
              });
            }
          });
        });
      });
      peer.on("call", (call) => {
        callFunc.openStream().then((stream) => {
          call.answer(stream);
          callFunc.playedStream("userPlayer", stream);
          call.on("stream", (remoteStream) => {
            callFunc.playedStream("remotePlayer", remoteStream);
          });
        });
      });
      console.log("UseEffect run without cam")
      socket.on("ALERT_NEW_USER_RESQUEST", (user) => {
        setShowModal(true);
        setRequestor(user);
      });
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleAccept = () => {
    socket.emit("ACCEPT_NEW_USER", requestor);
    setShowModal(false);
  };
  const handleDecline = () => {
    socket.emit("DECLINE_NEW_USER", requestor);
    setShowModal(false);
  };

  let callEles = [];
  participant.forEach((parti) => {
    if (parti !== thisPeerId) {
      callEles.push(<CallElement videoId={`remotePlayer-${parti}`} key={parti} />);
    }
  });

  let col = 0; //Có 2  người tham gia
  if(participant.length >= 3){
    col = 1;
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Woohoo, {requestor.username} wanna join!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="danger" onClick={handleDecline}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <div className = {`d-flex justify-content-center align-item-center ${col === 0 ? "flex-row" : "flex-col"}`}>
        <CallElement videoId={"userPlayer"} />
        {callEles}
      </div>
    </>
  );
}
