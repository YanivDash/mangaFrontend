import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/mangaDetailsCss/mangaDetails.css";
import { allChapLinksAdd } from "../../reducers/allChapLinks";
import axios from "axios";
import { useEffect } from "react";

const MangaDetail = () => {
  const navigate = useNavigate();
  let urlParams = useParams();
  let urlId = urlParams.id;

  const dispatch = useDispatch();
  window.scroll(0, 0);
  const mangas = useSelector((state) => state.allManga);
  const chapLinks = useSelector((state) => state.allChapLinks.allChapLinks);

  let data = mangas.allMangas;

  const mangaDetails = data.find((item) => {
    if (item.id == urlId) return item;
  });

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [mangaDetails, dispatch]);

  if (mangaDetails) {
    const { mangaCover, mangaName, totalChapter, firstChapter, lastChapter } =
      mangaDetails;
    const chapters = [];

    let allChapters = totalChapter;
    while (allChapters >= 1) {
      chapters.push(allChapters);
      allChapters = allChapters - 1;
    }
    console.log(chapLinks);

    return (
      <div className='mangaDetails_container'>
        <div className='mangaDetails_header'>
          <img src={mangaCover} alt='mangaCover' />
          <div className='detailHeading'>
            <h1>{mangaName}</h1>
            <div className='detailChapterBtn'>
              <p
                onClick={() => {
                  navigate(`/manga/${urlId}/${1}`, {
                    state: { data: firstChapter },
                  });
                }}
              >
                Read Now
              </p>

              <p
                onClick={() => {
                  navigate(`/manga/${urlId}/${totalChapter}`, {
                    state: { data: lastChapter },
                  });
                }}
              >
                Read Latest
              </p>
            </div>
          </div>
        </div>
        <div className='detailChapters'>
          <h1>Chapter List</h1>
          <div className='chapterList_cotainer'>
            {chapters.map((item, index) => {
              return (
                <h2
                  key={index}
                  onClick={() => {
                    navigate(`/manga/${urlId}/${item}`, {
                      state: { data: chapLinks[index] },
                    });
                  }}
                >
                  chapter {item}
                </h2>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <h1>hello</h1>;
};

export default MangaDetail;
