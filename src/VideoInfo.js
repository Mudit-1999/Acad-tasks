import React from "react";
import "./style/VideoInfo.css";
import { Avatar, Button } from "@material-ui/core";

const VideoInfo = ({
  title,
  description,
  publishedDate,
  channelTitle,
  channelImage,
  viewCount,
  likeCount,
  dislikeCount,
  subs,
}) => {
  return (
    <div className="videoInfo">
      <div className="videoInfoHeadline">
        <h1>{title}</h1>
      </div>
      <div className="videoInfoStats">
        <p>
          {viewCount} views • {publishedDate}
        </p>
      </div>
      <hr />
      <div className="videoInfoChannel">
        <div>
          <Avatar
            className="videoInfoAvatar"
            alt={channelTitle}
            src={channelImage}
          />
          <div className="videoInfoChannelInfo">
            <h3 className="videoInfoChannelTitle">{channelTitle}</h3>
            <p className="videoInfoChannelSubs">{subs} subscribers</p>
          </div>
        </div>
        <div className="videoInfoSubscribe">
          <Button color="secondary">SUBSCRIBE</Button>
        </div>
      </div>
      <div className="videoInfoChannelDesc">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VideoInfo;
