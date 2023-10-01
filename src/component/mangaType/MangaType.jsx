import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MangaCard from "../mangaCard/MangaCard";

const MangaType = () => {
  const [loading, setLoading] = useState(false);
  const mangas = useSelector((state) => state.allManga);
  let urlParams = useParams();
  let type = urlParams.type;

  let data = mangas.allMangas;

  if (!data) setLoading(true);
  const sortedData = [];

  data.forEach((element) => {
    let dataString = element.mangaType.toLowerCase();
    if (dataString.includes(type)) {
      sortedData.push(element);
    }
  });

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

export default MangaType;
