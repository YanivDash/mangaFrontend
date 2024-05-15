import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadManga from "../LoadManga/LoadManga";
import SkeletonComp from "../skeleton/SkeletonComp";
import { GiErlenmeyer } from "react-icons/gi";

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
    <div className="home_container">
      <h2>
        {type.toUpperCase()} <GiErlenmeyer style={{ color: "gold" }} />
      </h2>
      <div style={{ overflow: "hidden" }} className="home_manga_container">
      {loading ? (
          <div>
            <SkeletonComp
              parent_class={"homeSkeletonContainer"}
              class_name={"homeSkeleton"}
              num={20}
            />
          </div>
        ) : <LoadManga data={sortedData}/> }
      </div>
    </div>
  );
};

export default MangaType;
