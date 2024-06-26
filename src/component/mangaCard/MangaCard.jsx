// import React from "react";
import { Link } from "react-router-dom";
import "../../styles/mangaCardCss/mangaCard.css";
import incrementView from "../../../apiCall/incrementView";
import deleteManga from "../../../apiCall/deleteManga";
import { useDispatch } from "react-redux";
import { allChapLinksAdd } from "../../reducers/allChapLinks";
import { addChapterImg } from "../../reducers/chapterImgReducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
const ExMangaCard = (manga) => {
  const [loaded, setLoaded] = useState("");
  const [onDidLoad, setOnDidLoad] = useState(false);

  const {
    id,
    mangaName,
    mangaCover,
    firstChapter,
    lastChapter,
    totalChapter,
    totalViews,
  } = manga.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(allChapLinksAdd([]));
  dispatch(addChapterImg([]));

  return (
    <div id={id} className={`bgcolorOne manga_card_container ${loaded}`}>
      <Link
        to={`/manga/${id}`}
        onClick={() => {
          incrementView({ id: id, totalViews: totalViews });
        }}
      >
        <div className=" cover_name_conatiner">
          <div className="mangaCardImageContainer">
            <LazyLoadImage
              effect="blur"
              src={mangaCover}
              alt="chapter image"
              className={`manga_cover ${onDidLoad ? "" : "noCardDispalay"}`}
              onError={() => {
                deleteManga(id);
                setLoaded("card_noDispaly");
              }}
              onLoad={() => setOnDidLoad(true)}
              threshold={300}
            />
            <Skeleton
              className={`manga_cover_skeleton ${
                onDidLoad ? "noCardDispalay" : ""
              }`}
            />

            {/* <img
              src={mangaCover}
              alt={mangaName}
              className='manga_cover'
              onError={() => setLoaded("card_noDispaly")}
            /> */}
          </div>
          <div className="manga_name">
            {mangaName.length > 44 ? `${mangaName.slice(0, 44)}...` : mangaName}
          </div>
        </div>
      </Link>

      <button
        onClick={() => {
          navigate(`/manga/${id}/${totalChapter}`, {
            state: { data: lastChapter, chapIndex: 0 },
          });
        }}
        className="bgcolorThree btnChapter"
      >
        chapter {totalChapter}
      </button>

      <button
        onClick={() => {
          navigate(`/manga/${id}/${1}`, {
            state: { data: firstChapter, chapIndex: totalChapter - 1 },
          });
        }}
        className="bgcolorThree btnChapter"
      >
        Read First
      </button>
    </div>
  );
};

export default ExMangaCard;
