import React from "react";
import "./asset/css/Call.css";

export default function CallElement(props) {

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
        <div className="h-100 w-100 bg-light d-flex justify-content-center align-items-center position-relative">
          <video className="video_center" id={props.videoId}>
          </video>
        </div>
      </div>
    </>
  );
}
