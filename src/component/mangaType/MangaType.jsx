import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MangaCard from "../mangaCard/MangaCard";
import Skeleton from "react-loading-skeleton";

const MangaType = () => {
  const [loading, setLoading] = useState(true);
  const mangas = useSelector((state) => state.allManga);
  let urlParams = useParams();
  let type = urlParams.type;

  let data = mangas.allMangas;

  useEffect(() => {
    if (data.length >= 1) setLoading(false);
  }, [data]);

  const sortedData = [];

  data.forEach((element) => {
    let dataString = element.mangaType.toLowerCase();
    if (dataString.includes(type)) {
      sortedData.push(element);
    }
  });

  return (
    <div className='home_container'>
      <h2>Type: {type.toUpperCase()}</h2>
      <div style={{ overflow: "hidden" }} className='home_manga_container'>
        {loading ? (
          <Skeleton width={"100vw"} height={500} />
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
