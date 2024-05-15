import LoadManga from "../LoadManga/LoadManga"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GiSnailEyes, GiEyestalk } from "react-icons/gi";
import SkeletonComp from "../skeleton/SkeletonComp";
const MostViewed = () => {
  const [loading, setLoading] = useState(true);
  const mangas = useSelector((state) => state.allManga);
  let data = mangas.allMangas;

  useEffect(() => {
    if (data.length >= 1) setLoading(false);
  }, [data]);

  const sortedData = [...data];
  sortedData.sort((a, b) => b.totalViews - a.totalViews);

  if (!sortedData) setLoading(true);

  return (
    <div className="home_container">
      <h2>
        {" "}
        <GiSnailEyes style={{ color: "greenyellow" }} /> Most Viewed{" "}
        <GiEyestalk />
      </h2>
        {loading ? (
          <div>
            <SkeletonComp
              parent_class={"homeSkeletonContainer"}
              class_name={"homeSkeleton"}
              num={20}
            />
          </div>
        ) :  <LoadManga data={sortedData}/>}
    </div>
  );
};

export default MostViewed;
