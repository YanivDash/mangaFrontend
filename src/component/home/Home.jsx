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
        ) : <LoadManga data={data}/> }
    </div>
  );
};

export default Home;
