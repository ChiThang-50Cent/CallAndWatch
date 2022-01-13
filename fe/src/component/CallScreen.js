import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { validate as uuidValidate } from "uuid";
import Peer from "peerjs";
import CallElement from "./CallElement";
import callFunc from "./call/webRTC";
import socket from "./socketio";

export default function CallScreen(props) {
  const navigate = useNavigate();
  const peer = new Peer();
  const { room } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [requestor, setRequestor] = useState("");
  const [thisPeerId, setThisPeerId] = useState("");
  const [participant, setParticipant] = useState([]);
  const [size, setSize] = useState({
    height: 0.85,
    width: 0.75,
  });

  const streamRef = useRef(null);
  const peerRef = useRef(null)

  useEffect(() => {
    if (!uuidValidate(room)) {
      navigate("/");
    }
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else {
      (async () => {
        if (thisPeerId === "") {
          peer.on("open", async () => {
            console.log("peerid:", peer.id);
            setThisPeerId(peer.id);

            peerRef.current = peer

            streamRef.current = await callFunc.openStream();
            callFunc.playedStream(
              "localVideoPlayer",
              streamRef.current
            );

            //Listen to a  call and answer, sending stream
            peer.on("call", (call) => {
              call.answer(streamRef.current);
              callFunc.playedStream(
                "localVideoPlayer",

                streamRef.current
              );
              // call.on("stream", (remoteStream) => {
              //   callFunc.playedStream("remotePlayer", remoteStream);
              // });
            });

            socket.emit("JOIN_ROOM", {
              roomId: room,
              peerId: peer.id,
              socketId: socket.id,
              name: localStorage.getItem("user"),
            });

            socket.emit("FETCH_ROOM_DATA", {});
            socket.on("RESPONE_ROOM_DATA", (room) => {
              localStorage.setItem("host", room);
            });
          });

          socket.on("FETCH_ROOM_MEMBERS", (members) => {
            setParticipant([...members]);
            members.forEach((mem) => {
              if (mem.peerId !== peer.id) {
                console.log("joiner", mem.peerId);
                let call = peer.call(mem.peerId, streamRef.current);
                call.on("stream", (remoteStream) => {
                  callFunc.playedStream(
                    `remoteVideoPlayer-${mem.peerId}`,
                    remoteStream
                  );
                });
              }
            });
          });

          //New user request
          socket.on("ALERT_NEW_USER_RESQUEST", (user) => {
            setShowModal(true);
            setRequestor(user);
          });
          
        }
      })();
      if (props.endCall) {
        socket.emit("LEAVING_ROOM", socket.id);
      }
      //console.log(props.dNone, participant.length);
      if (!props.dNone && participant.length > 1) {
        setSize({
          height: 0.8,
          width: 0.45,
        });
      } else if (props.dNone) {
        setSize({
          height: 0.2,
          width: 0.14,
        });
      } else {
        setSize({
          height: 0.85,
          width: 0.75,
        });
      }
    }
  }, [props, participant.length]);

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
    if (parti.peerId !== thisPeerId && parti.peerId !== null) {
      callEles.push(
        <CallElement
          videoId={`remoteVideoPlayer-${parti.peerId}`}
          name={parti.name}
          key={parti.peerId}
          size={size}
        />
      );
    }
  });

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
      <div
        id="cal-video-cont"
        className={`d-flex h-100 ${props.dNone ? `flex-column` : `flex-row`}`}
      >
        <CallElement videoId={"localVideoPlayer"} name={"You"} size={size} />
        {callEles}
      </div>
    </>
  );
}
