import "./style/SearchVideo.css";
import React, { useState, useEffect } from "react";
import VideoRow from "./VideoRow";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const SearchVideo = () => {
  const { queryId } = useParams();
  const KEY = "AIzaSyDjRye0LG-KWE8_VvLVRyPgtuJWSmwmKqI";
  const maxResults = 8;
  // const query = "badminton";
  console.log("search", queryId);
  const [videoRows, setVideoRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setVideoRows([]);
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&type=video&q=${queryId}&safeSearch=none&key=${KEY}`
      )
      .then((response) => {
        createVideoRows(response.data["items"]);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [queryId]);

  async function createVideoRows(videos) {
    let newVideoRows = [];
    for (const video of videos) {
      const videoId = video.id.videoId;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${KEY}`
      );
      const views = response.data.items[0].statistics.viewCount;
      const snippet = video.snippet;
      const title = snippet.title;
      const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;
      const description = snippet.description;
      const image = snippet.thumbnails.medium.url;

      newVideoRows.push({
        videoId,
        title,
        image,
        views,
        timestamp,
        channel,
        description,
      });
    }
    setVideoRows(newVideoRows);
    setIsLoading(false);
  }
  if (isError) {
    console.log("Error in fetching data");
  }
  return (
    <div className="searchVideo">
      {isLoading ? (
        <CircularProgress className="loading" color="secondary" />
      ) : null}
      {videoRows.map((video) => {
        return (
          <Link key={video.videoId} to={`/video/${video.videoId}`}>
            <VideoRow
              key={video.videoId}
              title={video.title}
              image={video.image}
              views={video.views}
              timestamp={video.timestamp}
              channel={video.channel}
              description={video.description}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SearchVideo;
