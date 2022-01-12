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
    if (name) {
      localStorage.setItem("user", name);
      socket.emit("CREATE_NEW_ROOM", {
        username: name,
        id: roomId,
      });
      navigate(roomId);
    }
  };

  const handleJoin = () => {
    const roomId = document.getElementById("inputRoomCode").value;
    const name = document.getElementById("inputUsername").value;
    if (name && roomId) {
      socket.emit("NEW_USER_REQUEST", {
        username: name,
        id: socket.id,
        requestRoom: roomId,
      });
    }
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
    <div className="h-100">
      <div className="wel-container">
        <div className="w-60">
          <img className="h-100 w-100" src="imgMAC.jpg" alt="imgMAC-present" />
        </div>
        <div className="wel-content">
          <input
            placeholder="Enter name"
            id="inputUsername"
            className="wel-input"
          />
          <button
            className="wel-button"
            onClick={handleCreate}
          >
            Create
          </button>
          <input
            className=" wel-input"
            placeholder="Enter room code"
            id="inputRoomCode"
          />
          <button className="wel-button" onClick={handleJoin}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
