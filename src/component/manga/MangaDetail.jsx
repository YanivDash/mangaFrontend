import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "../../styles/mangaDetailsCss/mangaDetails.css";
import { allChapLinksAdd } from "../../reducers/allChapLinks";
import axios from "axios";
import { useEffect } from "react";

const MangaDetail = () => {
  const navigate = useNavigate();
  let urlParams = useParams();
  let urlId = urlParams.id;

  const dispatch = useDispatch();

  const mangas = useSelector((state) => state.allManga);
  const chapLinks = useSelector((state) => state.allChapLinks.allChapLinks);

  let data = mangas.allMangas;

  const mangaDetails = data.find((item) => {
    if (item.id == urlId) return item;
  });

  const updateTotalChapter = async (totNumOFChapter, latestChapter) => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/updateManga`, {
      id: urlId,
      updateNum: totNumOFChapter,
      updateChap: latestChapter,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (chapLinks.length <= 1) {
        window.scroll(0, 0);
        if (mangaDetails) {
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
    };

    fetchData();
  }, [mangaDetails, chapLinks, dispatch]);

  if (mangaDetails) {
    const { mangaCover, mangaName, totalChapter, firstChapter, lastChapter } =
      mangaDetails;
    const chapters = [];

    if (totalChapter && chapLinks.length > 1) {
      if (chapLinks.length > totalChapter) {
        if (chapLinks[chapLinks.length - 1] == firstChapter) {
          updateTotalChapter(chapLinks.length, chapLinks[0]);
        }
      }
    }

    let allChapters = chapLinks.length;
    while (allChapters >= 1) {
      chapters.push(allChapters);
      allChapters = allChapters - 1;
    }

    return (
      <div className="bgcolorOne mangaDetails_container">
        <div className=" mangaDetails_header">
          <div
            className="mangaBackgroundBanner"
            style={
              mangaDetails?.mangaCover && {
                backgroundImage: `url(${mangaDetails.mangaCover})`,
              }
            }
          ></div>
          <img src={mangaCover} alt="mangaCover" />
          <div className=" detailHeading">
            <h1>{mangaName}</h1>
            <div className=" detailChapterBtn">
              <p
                className="pointer"
                onClick={() => {
                  navigate(`/manga/${urlId}/${1}`, {
                    state: { data: firstChapter, chapIndex: totalChapter - 1 },
                  });
                }}
              >
                Read Now
              </p>

              <p
                className="pointer"
                onClick={() => {
                  navigate(`/manga/${urlId}/${totalChapter}`, {
                    state: { data: lastChapter, chapIndex: 0 },
                  });
                }}
              >
                Read Latest
              </p>
            </div>
          </div>
        </div>
        <div className=" bgcolorThree detailChapters">
          <h1 className="bgcolorFour">Chapter List</h1>
          <div className="bgcolorTwo chapterList_cotainer">
            {chapLinks.length >= 1 ? (
              chapters.map((item, index) => {
                return (
                  <h2
                    className="bgcolorFour pointer"
                    key={index}
                    onClick={() => {
                      navigate(`/manga/${urlId}/${item}`, {
                        state: { data: chapLinks[index], chapIndex: index },
                      });
                    }}
                  >
                    chapter {item}
                  </h2>
                );
              })
            ) : (
              <div className=" skeleton_chapterList_cotainer">
                <Skeleton width={1400} height={400} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="skull_manga_details">
        <Skeleton height={250} width={200} />
        <div>
          <h1>{<Skeleton width={"70%"} height={45} />}</h1>
          <div>
            <p>{<Skeleton width={"40%"} height={35} />}</p>
            <p>{<Skeleton width={"40%"} height={35} />}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>{<Skeleton width={"100%"} height={120} />}</h1>
        <div className=" skeleton_chapterList_cotainer">
          <Skeleton width={"100%"} height={400} />
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;
