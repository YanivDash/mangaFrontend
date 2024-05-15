import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SkeletonComp from "../skeleton/SkeletonComp";
import "../home/home.css";
import { GiSnailEyes, GiEyestalk } from "react-icons/gi";
import LoadManga from "../LoadManga/LoadManga";

const LatestManga = () => {
  const [loading, setLoading] = useState(true);
  const mangas = useSelector((state) => state.allManga);
  let data = mangas.allMangas;

  useEffect(() => {
    if (data.length >= 1) setLoading(false);
  }, [data]);

  const sortedData = [...data];
  // Sort the new array based on the "id" property
  sortedData.sort((a, b) => {
    const timestampA = new Date(a.dateUpdate);
    const timestampB = new Date(b.dateUpdate);

    return timestampB - timestampA;
  });

  if (!sortedData) setLoading(true);
  
  return (
    <div className="home_container">
      <h2>
        {" "}
        <GiSnailEyes /> Latest <GiEyestalk style={{ color: "greenyellow" }} />
      </h2>

      {loading ? (
        <div>
          <SkeletonComp
            parent_class={"homeSkeletonContainer"}
            class_name={"homeSkeleton"}
            num={20}
          />
        </div>
      ) : (
        <LoadManga data={sortedData} />
      )}
    </div>
  );
};

export default LatestManga;
