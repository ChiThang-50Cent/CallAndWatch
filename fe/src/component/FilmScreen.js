import React, { useState, useEffect, useRef } from "react";
import FilmElement from "./FilmElement";
import { Offcanvas, Button } from "react-bootstrap";
import "./asset/css/Film.css";
import socket from "./socketio";

export default function FilmScreen() {
  const [listVideo, setListVideo] = useState([]);
  const [show, setShow] = useState(false);

  let func = useRef({});
  let results;
  let isHost = localStorage.getItem("host") === socket.id;
  
  useEffect(() => {
    if (!window.YT) {
      var tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const loadVideo = (videoId) => {
    const videoPlayer = document.getElementById("videoPlayer").nodeName;
    if (videoPlayer !== "IFRAME") {
      let player = new window.YT.Player("videoPlayer", {
        videoId: videoId,
        playerVars: {
          playsinline: 1,
          autoplay: 1,
          controls: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    } else {
      func.current.loadVideoById(videoId, 0);
    }
  };

  const onPlayerReady = (event) => {
    let player = event.target;
    player.playVideo();
    if (isHost) {
      console.log("Host here");
    }
    // setInterval(() => {
    // //   console.log(event.target.getCurrentTime());
    // //   console.log(event.target)

    // }, 2000);
    function loadVideoById(videoId, startTime) {
      player.loadVideoById({
        videoId: videoId,
        startSeconds: startTime,
      });
    }
    func.current.loadVideoById = loadVideoById;
  };

  const handleSearch = () => {
    const q = document.getElementById("videoSearch").value;
    fetch(`http://localhost:5000/search?q=${q}`)
      .then((data) => {
        return data.json();
      })
      .then((videos) => {
        setListVideo(videos);
      });
  };

  const handleChooseVideo = (videoId) => {
    loadVideo(videoId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  results = listVideo.map((vid) => {
    return (
      <FilmElement
        data={vid.snippet}
        key={vid.id.videoId}
        videoId={vid.id.videoId}
        handleChoose={handleChooseVideo}
      />
    );
  });

  return (
    <div className="h-100 w-100 position-relative">
      <Button
        variant="info"
        onClick={handleShow}
        className="position-absolute top-0 end-0"
      >
        <i className="bi bi-three-dots-vertical"></i>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <div>
            <input placeholder="search" id="videoSearch" />
            <button onClick={handleSearch}>Search</button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="overflow-auto h-100" id="searchResults">
            {results}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="h-100 w-100 d-flex flex-column">
        <div className="d-flex justify-content-center h-100">
          <div id="videoPlayer"></div>
        </div>
      </div>
    </div>
  );
}
