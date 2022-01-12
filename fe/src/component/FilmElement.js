import React from "react";

export default function FilmElement(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.handleChoose(props.videoId);
  };
  return (
    <div className="card flex-row m-2 film-card" onClick={handleClick}>
        <img
          src={props.data.thumbnails.medium?.url}
          className="card-img-start w-50"
          alt="thumbnail"
        />
      <div className="card-body">
        <h6 className="card-title">{`${props.data.title.slice(0, 35)}${props.data.title.length <= 35 ? "" : "..." }`}</h6>
      </div>
    </div>
  );
}
