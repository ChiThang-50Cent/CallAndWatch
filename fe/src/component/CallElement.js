import React from "react";
import "./asset/css/Call.css";

export default function CallElement(props) {

  return (
    <>
      <div className="d-flex h-50 w-100 flex-column justify-content-center align-items-center ">
        <div className="h-100 w-100 bg-light d-flex justify-content-center align-items-center">
          <div className="position-relative">
            <p className="position-absolute call-p">{props.name}</p>
            <video className="video_center" id={props.videoId}></video>
          </div>
        </div>
      </div>
    </>
  );
}
