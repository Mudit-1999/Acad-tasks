import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./style/videoCards.css";

const VideoCards = ({
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
}) => {
  return (
    <div className="videoCard">
      <img className="videoCardImage" src={image} alt={title} />
      <div className="videoCardInfo">
        <Avatar className="videoCardAvtar" alt={channel} src={channelImage} />
        <div className="videoCardText">
          <h4>{title}</h4>
          <p>{channel}</p>
          <p>
            {views} views &#8226; {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCards;
