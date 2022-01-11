import React from "react";
import {Link} from 'react-router-dom'

export default function FilmElement(props) {
  const handleClick = (e) => {
    e.preventDefault()
    props.handleChoose(props.videoId)
  }
  return (
    <div className="card flex-row">
      <img src={props.data.thumbnails.medium?.url} className="card-img-start w-50" alt="thumbnail" />
      <div className="card-body">
        <Link to="#" onClick={handleClick}><h6 className="card-title">{props.data.title}</h6></Link>
      </div>
    </div>
  );
}
