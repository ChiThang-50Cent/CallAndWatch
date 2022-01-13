import React from "react";
import "./asset/css/Call.css";

export default function CallElement(props) {
  return (
    <>
      <div className="d-flex w-100 flex-column justify-content-center align-items-center">
        <div className="w-100 bg-dark d-flex justify-content-center">
          <div className="position-relative cal-fit-cont">
            <p className="position-absolute call-p">{props.name}</p>
            <video
              className="cal-video-center"
              id={props.videoId}
              style={{
                width : `calc((100vw + 2px)*${props.size.width})`,
                height : `calc((100vh + 2px)*${props.size.height})`,
              }}
              muted="muted"
            ></video>
          </div>
        </div>
      </div>
    </>
  );
}
