import MangaCard from "../mangaCard/MangaCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const LatestManga = () => {
  const [loading, setLoading] = useState(true);
  const [currentLoadManga, setcurrentLoadManga] = useState(20);
  const mangas = useSelector((state) => state.allManga);
  let data = mangas.allMangas;

  useEffect(() => {
    if (data.length >= 1) setLoading(false);
  }, [data]);

  const sortedData = [...data];
  let loadManga = [];
  // Sort the new array based on the "id" property
  sortedData.sort((a, b) => {
    const timestampA = new Date(a.dateUpdate);
    const timestampB = new Date(b.dateUpdate);

    return timestampB - timestampA;
  });

  if (!sortedData) setLoading(true);
  if (sortedData.length > 0) {
    loadManga = sortedData.slice(0, currentLoadManga);
  }

  return (
    <div className='home_container'>
      <h2>Latest</h2>
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

export default LatestManga;
