import { useEffect, useState } from "react";
import MangaCard from "../mangaCard/MangaCard";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import "./home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentLoadManga, setcurrentLoadManga] = useState(20);
  const mangas = useSelector((state) => state.allManga);
  let loadManga = [];
  let data = mangas.allMangas;

  if (data.length > 0) {
    loadManga = data.slice(0, currentLoadManga);
  }

  useEffect(() => {
    if (data.length >= 1) setLoading(false);
  }, [data]);

  return (
    <div>
      <Banner />
      <div className='home_manga_container'>
        {loading ? (
          <div className='homeSkeletonContainer'>
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
            <Skeleton className='homeSkeleton' />
          </div>
        ) : loadManga.length > 0 ? (
          loadManga.map((item, index) => {
            return <MangaCard key={index} data={item} />;
          })
        ) : (
          <h3>nothing to show here</h3>
        )}
      </div>
      <div
        onClick={() =>
          currentLoadManga <= data.length
            ? setcurrentLoadManga(currentLoadManga + 15)
            : setcurrentLoadManga(20)
        }
        className='bgcolorTwo pointer loadColapse'
      >
        {currentLoadManga <= data.length ? (
          <h2>Load More</h2>
        ) : (
          <h2>Collapse Loaded</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
