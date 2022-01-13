import React, { useState, useEffect, useRef } from "react";
import FilmElement from "./FilmElement";
import { Offcanvas, Button } from "react-bootstrap";
import "./asset/css/Film.css";
import socket from "./socketio";

export default function FilmScreen(props) {
  const [listVideo, setListVideo] = useState([]);
  const [show, setShow] = useState(false);
  const [isStartVideo, setIsStartVideo] = useState(false)

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
    setShow(props.dNone);
    if (props.dNone && !isHost) {
      socket.once("SYNC_VIDEO", (video) => {
        loadVideo(video.videoId, video.currentTime);
      });
    }
    if (isStartVideo) {
      if (!isHost) {
        func.current.onSyncTime();
      } else {
        func.current.emitSyncTime();
      }
    }
  }, [props, isStartVideo]);

  const loadVideo = (videoId, startTime = 0) => {
    const videoPlayer = document.getElementById("videoPlayer").nodeName;
    if (videoPlayer !== "IFRAME") {
      let player = new window.YT.Player("videoPlayer", {
        videoId: videoId,
        playerVars: {
          playsinline: 1,
          autoplay: 1,
          controls: 1,
          start: Math.ceil(startTime),
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    } else {
      func.current.loadVideoById(videoId);
    }
  };

  const onPlayerReady = (event) => {
    let player = event.target;
    player.playVideo();
    setIsStartVideo(true)

    function emitSyncTime() {
      console.log("Host emit");
      setInterval(() => {
        socket.emit("SYNC_VIDEO", {
          videoId: player.playerInfo.videoData.video_id,
          currentTime: player.getCurrentTime(),
          videoState: player.getPlayerState(),
        });
      }, 1000);
    }
    function onSyncTime() {
      console.log("joiner recived");

      socket.on("SYNC_VIDEO", (video) => {
        const localVideoId = player.playerInfo.videoData.video_id;
        const localCurrentTime = player.getCurrentTime();

        if (video.videoId !== localVideoId) {
          player.loadVideoById({
            videoId: video.videoId,
            startSeconds: Math.ceil(video.currentTime),
          });
        } else if (video.videoState === 0) {
          player.stopVideo();
        }
        // else if (video.videoState === 1) {
        //   player.playVideo();
        // }
        else if (video.videoState === 2) {
          player.pauseVideo();
        } else if (
          Math.abs(video.currentTime - localCurrentTime) >= 0.5 &&
          video.videoState === 1
        ) {
          player.seekTo(Math.ceil(video.currentTime));
          player.playVideo();
        }
      });
    }
    function loadVideoById(videoId, startTime = 0) {
      player.loadVideoById({
        videoId: videoId,
        startSeconds: startTime,
      });
    }

    func.current.emitSyncTime = emitSyncTime;
    func.current.onSyncTime = onSyncTime;
    func.current.loadVideoById = loadVideoById;
  };

  const handleSearch = () => {
    const q = document.getElementById("videoSearch").value;
    //const baseUrl = "https://mac-hill.herokuapp.com/"
    const baseUrl = "http://localhost:5000/";
    fetch(`${baseUrl}search?q=${q}`)
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
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="film-offcanvas"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <div className="d-flex justify-content-center align-items-center w-100">
            <div className="input-group w-80">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                id="videoSearch"
              />
              <button
                className="btn btn-outline-light"
                type="button"
                id="searchBtn"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
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
