import "./style/App.css";
import SearchBar from "./SearchBar";
import RecommendedVideos from "./RecommendedVideos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SearchVideo from "./SearchVideo";
import VideoPlayer from "./VideoPlayer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <SearchBar />
        </header>
        <Routes>
          <Route path="/video/:videoId" element={<VideoPlayer />} />
          <Route path="/search/:queryId" element={<SearchVideo />} />
          <Route path="/" element={<RecommendedVideos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
