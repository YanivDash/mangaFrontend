/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import mangaChapter from "../../../apiCall/mangaChapter";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addChapterImg } from "../../reducers/chapterImgReducer";
import "../../styles/chapterCss/chapter.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { allChapLinksAdd } from "../../reducers/allChapLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ImageHolder = (props) => {
  const [imgError, setImgError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      <div
        className={
          imageLoaded
            ? "loaderNoDisplay"
            : imgError
            ? "loaderNoDisplay"
            : "LoaderIs"
        }
      >
        <Loader />
      </div>

      <LazyLoadImage
        effect="blur"
        src={props.source}
        alt="chapter image"
        className={` lazyChapterImg ${
          props.indexNum === 0 && imgError ? "zero" : ""
        } ${imageLoaded ? "noneed" : "imgStillLOading"}`}
        onError={() => setImgError(true)}
        onLoad={() => setImageLoaded(true)}
        threshold={300}
      />
    </div>
  );
};

const MangaChapter = () => {
  const location = useLocation();
  let chapterLink = location.state?.data;
  let chapIndex = location.state?.chapIndex;

  let urlParams = useParams();
  let { id, chapter } = urlParams;

  const [loading, setLoading] = useState(false);
  // const [imgError, setImgError] = useState(false);
  // const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector((state) => state.allManga);
  const chapLinks = useSelector((state) => state.allChapLinks.allChapLinks);

  let data = mangas.allMangas;
  const chapData = useSelector((state) => state.chapterImg);

  let totalChapter;
  let mangaName;
  let webLink;

  const mangaDetails = data.find((item) => {
    if (item.id == id) {
      totalChapter = item.totalChapter;
      mangaName = item.mangaName;
      if (!chapterLink || chapLinks.length <= 0) {
        webLink = item.websiteName;
        chapIndex = item.totalChapter - chapter;
        chapterLink = chapLinks[item.totalChapter - chapter];
      }
      return item;
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if ((mangaDetails && chapLinks.length <= 0) || !chapterLink) {
      if (webLink) {
        try {
          axios
            .post(`${import.meta.env.VITE_BASE_URL}/allChapters`, {
              link: mangaDetails.websiteName,
            })
            .then((result) => {
              dispatch(allChapLinksAdd(result.data.result));
            });
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      }
    }
    const fetchData = async (values) => {
      try {
        const manga = await mangaChapter(values);
        dispatch(addChapterImg(manga));
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
      setLoading(true);
      window.scroll(0, 0);
    };

    if (mangaDetails && chapterLink) {
      const { mangaClass } = mangaDetails;

      let values = { url: chapterLink, chapClass: mangaClass };
      fetchData(values);
    }

    if (mangaDetails && !chapterLink && chapLinks.length > 0) {
      const { mangaClass } = mangaDetails;
      let values = {
        url: chapLinks[chapIndex],
        chapClass: mangaClass,
      };

      fetchData(values);
    }
  }, [dispatch, mangaDetails, chapterLink, chapLinks, chapIndex, webLink]);

  const imgElement = document.getElementsByClassName("lazyChapterImg");

  imgElement.onerror = function () {
    imgElement.className = "displayNoneClass";
  };

  return (
    <div className="bgcolorOne chapter_container">
      <div className="bgcolorThree allChapters">
        <div
          className="mangaBackgroundBanner"
          style={
            // mangaDetails?.mangaCover && {
            //   backgroundImage: `url(${mangaDetails.mangaCover})`,
            // }
            chapData?.chapterImg && {
              backgroundImage: `url(${chapData.chapterImg[0]})`,
            }
          }
        ></div>
        <Link to={`/manga/${id}`}>
          <h2>{mangaName}</h2>
          <h3>
            Chapter <span> {chapter}</span>
          </h3>
        </Link>
      </div>
      <div className="bgcolorTwo nextPrevBtn">
        {chapter > 1 && (
          <button
            type="button"
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) - 1}`, {
                state: {
                  data: chapLinks[chapIndex + 1],
                  chapIndex: chapIndex + 1,
                },
              });
              setLoading(false);
            }}
          >
            previous
          </button>
        )}
        {chapter >= totalChapter ? (
          ""
        ) : (
          <button
            type="button"
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) + 1}`, {
                state: {
                  data: chapLinks[chapIndex - 1],
                  chapIndex: chapIndex - 1,
                },
              });
              setLoading(false);
            }}
          >
            next
          </button>
        )}
      </div>
      {loading ? (
        <div className="chapterImg_cotainer">
          {chapData.chapterImg ? (
            chapData.chapterImg.map((el, index) => {
              return (
                <div key={index} className="imgHolder">
                  {/* <LazyLoadImage
                    effect='blur'
                    src={el}
                    alt='chapter image'
                    className={`lazyChapterImg ${
                      index === 0 && imgError ? "zero" : ""
                    } ${imageLoaded ? "lazyChapterImg" : "imgStillLOading"}`}
                    onError={() => setImgError("zero")}
                    onLoad={() => setImageLoaded(true)}
                  /> */}
                  <ImageHolder source={el} indexNum={index} />
                </div>
              );
            })
          ) : (
            <h1>ntg here</h1>
          )}
        </div>
      ) : (
        <div className="whenLoad"></div>
      )}
      <div className="bgcolorTwo nextPrevBtn">
        {chapter > 1 && (
          <button
            type="button"
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) - 1}`, {
                state: {
                  data: chapLinks[chapIndex + 1],
                  chapIndex: chapIndex + 1,
                },
              });
              setLoading(false);
            }}
          >
            previous
          </button>
        )}
        {chapter >= totalChapter ? (
          ""
        ) : (
          <button
            type="button"
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) + 1}`, {
                state: {
                  data: chapLinks[chapIndex - 1],
                  chapIndex: chapIndex - 1,
                },
              });
              setLoading(false);
            }}
          >
            next
          </button>
        )}
      </div>
      <BsFillArrowUpCircleFill
        className={`${"toTopIcon"}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
};

export default MangaChapter;
