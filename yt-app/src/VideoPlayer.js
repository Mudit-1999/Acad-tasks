import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecommendedVideos from "./RecommendedVideos";
import "./style/VideoPlayer.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Video from "./Video";
import VideoInfo from "./VideoInfo";

const KEY = "AIzaSyDjRye0LG-KWE8_VvLVRyPgtuJWSmwmKqI";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [videoInfo, setVideoInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setVideoInfo([]);
    setIsLoading(true);

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${KEY}`
      )
      .then((response) => {
        createVideoInfo(response.data["items"][0]);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, [videoId]);

  async function createVideoInfo(video) {
    const snippet = video.snippet;
    const stats = video.statistics;
    const channelId = snippet.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${KEY}`
    );
    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
    const subs = response.data.items[0].statistics.subscriberCount;
    const publishedDate = new Date(snippet.publishedAt).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
    const title = snippet.title;
    const description = snippet.description;
    const channelTitle = snippet.channelTitle;
    const viewCount = stats.viewCount;
    const likeCount = stats.likeCount;
    const dislikeCount = stats.dislikeCount;
    setVideoInfo({
      title,
      description,
      publishedDate,
      channelTitle,
      channelImage,
      viewCount,
      likeCount,
      dislikeCount,
      subs,
    });
    setIsLoading(false);
  }
  if (isError) {
    console.log("error in rendering video");
  }
  return (
    <div className="videoPlayer">
      <div className="videoDetails">
        <div className="videoPlayerVideo">
          {isLoading ? (
            <CircularProgress className="loading" color="secondary" />
          ) : (
            <Video videoId={videoId} />
          )}
        </div>
        <div className="videoplayerInfo">
          {!isLoading ? (
            <VideoInfo
              title={videoInfo.snippet}
              description={videoInfo.description}
              publishedDate={videoInfo.publishedDate}
              channelTitle={videoInfo.channelTitle}
              channelImage={videoInfo.channelImage}
              viewCount={videoInfo.viewCount}
              likeCount={videoInfo.likeCount}
              dislikeCount={videoInfo.dislikeCount}
              subs={videoInfo.subs}
            />
          ) : null}
        </div>
      </div>
      <div className="videoPlayerSuggested">
        <RecommendedVideos />
      </div>
    </div>
  );
};

export default VideoPlayer;
