import { useEffect, useState } from "react";
import LoadManga from "../LoadManga/LoadManga";
import SkeletonComp from "../skeleton/SkeletonComp";
import { useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import "./home.css";

const Home = () => {
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
    <div>
      <Banner />
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
  );
};

export default Home;
