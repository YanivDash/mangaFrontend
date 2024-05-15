import React from "react";
import { useState } from "react";
import MangaCard from "../mangaCard/MangaCard";
import "../home/home.css";
const LoadManga = (params) => {
  const [currentLoadManga, setcurrentLoadManga] = useState(20);

  let loadManga = [];
  if (params.data.length > 0) {
    loadManga = params.data.slice(0, currentLoadManga);
  }
  return (
    <div>
      <div className="home_manga_container">
        {loadManga.length > 0 ? (
          loadManga.map((item, index) => {
            return <MangaCard key={index} data={item} />;
          })
        ) : (
          <p>nothing to show here</p>
        )}
      </div>

      <div
        onClick={() =>
          currentLoadManga <= params.data.length
            ? setcurrentLoadManga(currentLoadManga + 15)
            : setcurrentLoadManga(20)
        }
        className="bgcolorTwo pointer loadColapse"
      >
        {currentLoadManga <= params.data.length ? (
          <h2>Load More</h2>
        ) : params.data.length > 20 && (
          <h2>Collapse Loaded</h2>
        )}
      </div>
    </div>
  );
};

export default LoadManga;
