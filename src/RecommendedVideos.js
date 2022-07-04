import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./style/RecommendedVideos.css";
import VideoCards from "./VideoCards";
import { Link } from "react-router-dom";

const KEY = "AIzaSyDjRye0LG-KWE8_VvLVRyPgtuJWSmwmKqI";

const maxResults = 15;

const RecommendedVideos = () => {
  const [videoCards, setVideoCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=US&key=${KEY}`
      )
      .then((response) => {
        createVideoCards(response.data.items);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, []);

  async function createVideoCards(videoItems) {
    let newVideoCards = [];
    for (const video of videoItems) {
      const videoId = video.id;
      const snippet = video.snippet;
      const channelId = snippet.channelId;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`
      );
      const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
      const title = snippet.title;
      const image = snippet.thumbnails.medium.url;
      const views = video.statistics.viewCount;
      const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;

      newVideoCards.push({
        videoId,
        image,
        title,
        channel,
        views,
        timestamp,
        channelImage,
      });
    }
    setVideoCards(newVideoCards);
    setIsLoading(false);
  }
  if (isError) {
    console.log("Error in fetching data");
  }
  return (
    <div className="recommendedVideos">
      {isLoading ? (
        <CircularProgress className="loading" color="secondary" />
      ) : null}
      <div className="recommendedVideos-videos">
        {videoCards.map((video) => {
          return (
            <Link key={video.videoId} to={`/video/${video.videoId}`}>
              <VideoCards
                key={video.videoId}
                title={video.title}
                image={video.image}
                views={video.views}
                timestamp={video.timestamp}
                channel={video.channel}
                channelImage={video.channelImage}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedVideos;
