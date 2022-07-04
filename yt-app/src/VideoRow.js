import React from "react";
import "./style/VideoRow.css";

const VideoRow = ({ views, description, timestamp, channel, title, image }) => {
  return (
    <div className="videoRow" >
      <img src={image} alt="" />
      <div className="videoRowText">
        <h3>{title}</h3>
        <p className="videoRowHeadline">
          {channel} • {views} views • {timestamp}
        </p>
        <p className="videoRowDescription">{description}</p>
      </div>
    </div>
  );
};

export default VideoRow;
