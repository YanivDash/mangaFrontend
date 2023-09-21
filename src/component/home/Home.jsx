import { useState } from "react";
import MangaCard from "../mangaCard/MangaCard";
import { useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [currentLoadManga, setcurrentLoadManga] = useState(20);
  const mangas = useSelector((state) => state.allManga);
  let loadManga = [];
  let data = mangas.allMangas;
  if (!data) setLoading(true);
  if (data.length > 0) {
    loadManga = data.slice(0, currentLoadManga);
  }

  return (
    <div className='home_container'>
      <Banner />
      <div className='home_manga_container'>
        {loading ? (
          <h3>Loading...</h3>
        ) : loadManga.length > 0 ? (
          loadManga.map((item, index) => {
            return <MangaCard key={index} data={item} />;
          })
        ) : (
          <h3>nothing to show here</h3>
        )}
      </div>
      <div className='bgcolorTwo loadColapse'>
        {currentLoadManga <= data.length ? (
          <h2
            onClick={() => {
              setcurrentLoadManga(currentLoadManga + 15);
            }}
          >
            Load More
          </h2>
        ) : (
          <h2
            onClick={() => {
              setcurrentLoadManga(20);
            }}
          >
            Collapse Loaded
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
