import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import socket from "./socketio";
import "./asset/css/Welcome.css";
export default function Welcome() {
  const navigate = useNavigate();

  const handleCreate = () => {
    const roomId = nanoid(9);
    const name = document.getElementById("inputUsername").value;
    localStorage.setItem("user", name);
    socket.emit("CREATE_NEW_ROOM", {
      username: name,
      id: roomId,
    });
    navigate(roomId);
  };

  const handleJoin = () => {
    const roomId = document.getElementById("inputRoomCode").value;
    const name = document.getElementById("inputUsername").value;
    socket.emit("NEW_USER_REQUEST", {
      username: name,
      id: socket.id,
      requestRoom: roomId,
    });
  };

  useEffect(() => {
    socket.on("RESPONE_NEW_USER_REQUEST", (res) => {
      if (res.isAllow) {
        localStorage.setItem("user", res.name);
        navigate(res.roomId);
      }
    });
  }, [navigate]);

  return (
    <div className="container">
      <div className="imgMAc">
        <img className="img" src="mac.jpg" />
      </div>
      <div className="conten">
        <input placeholder="Enter name" id="inputUsername" />
        <button className="top left" onClick={handleCreate}>Create</button>
        <br />
        <input className="top" placeholder="Enter room code" id="inputRoomCode" />
        <button className="top left" onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
}
