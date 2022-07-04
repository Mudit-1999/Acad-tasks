import React from "react";
import YouTube from "react-youtube";

const Video = ({ videoId }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div>
      <YouTube videoId={videoId} />
    </div>
  );
};

export default Video;
