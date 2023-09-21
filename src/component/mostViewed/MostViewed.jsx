import MangaCard from "../mangaCard/MangaCard";
import { useSelector } from "react-redux";
import { useState } from "react";

const MostViewed = () => {
  const [loading, setLoading] = useState(false);
  const mangas = useSelector((state) => state.allManga);

  let data = mangas.allMangas;
  if (!data) setLoading(true);
  const sortedData = [...data];

  // Sort the new array based on the "id" property
  sortedData.sort((a, b) => b.totalViews - a.totalViews);

  return (
    <div className='home_container'>
      <div className='home_manga_container'>
        {loading ? (
          <h3>Loading...</h3>
        ) : sortedData.length > 0 ? (
          sortedData.map((item, index) => {
            return <MangaCard key={index} data={item} />;
          })
        ) : (
          <h3>nothing to show here</h3>
        )}
      </div>
    </div>
  );
};

export default MostViewed;
