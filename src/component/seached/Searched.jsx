import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MangaCard from "../mangaCard/MangaCard";
import { NotFound } from "../../assets";
import "./search.css";

const Searched = () => {
  const location = useLocation();
  const mangas = useSelector((state) => state.allManga);
  const receivedData = location.state?.data;
  let data = mangas.allMangas;
  let searchedData = [];
  let searchString = "";
  data.forEach((element) => {
    if (receivedData) {
      searchString = receivedData.toLowerCase();
    }

    let dataString = element.mangaName.toLowerCase();
    if (dataString.includes(searchString)) {
      searchedData.push(element);
    }
  });

  return (
    <div className='home_container'>
      <div className='searchHeading'>
        {searchedData.length > 0 && (
          <h3>
            showing result for <span>{receivedData}</span>
          </h3>
        )}
      </div>
      <div className='home_manga_container'>
        {searchedData.length > 0 ? (
          searchedData.map((item, index) => {
            return <MangaCard key={index} data={item} />;
          })
        ) : (
          <div className='serachNotFound' style={{ display: "flex" }}>
            <h2>
              Search result for: <i>{receivedData}</i>{" "}
            </h2>
            <img src={NotFound} alt='search' className='searchNotFoundImg' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Searched;
