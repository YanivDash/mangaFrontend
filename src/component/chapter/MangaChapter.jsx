// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import mangaChapter from "../../../apiCall/mangaChapter";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addChapterImg } from "../../reducers/chapterImgReducer";
import "../../styles/chapterCss/chapter.css";
import { useLocation } from "react-router-dom";

const MangaChapter = () => {
  const location = useLocation();
  const chapterLink = location.state?.data;

  let urlParams = useParams();
  let { id, chapter } = urlParams;

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector((state) => state.allManga);
  const chapLinks = useSelector((state) => state.allChapLinks);

  let data = mangas.allMangas;
  const chapData = useSelector((state) => state.chapterImg);

  let totalChapter;
  let mangaName;

  const mangaDetails = data.find((item) => {
    if (item.id == id) {
      totalChapter = item.totalChapter;
      mangaName = item.mangaName;
      return item;
    }
  });

  useEffect(() => {
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

    if (mangaDetails) {
      const { mangaClass } = mangaDetails;

      let values = { url: chapterLink, chapClass: mangaClass };

      fetchData(values);
    }
  }, [dispatch, mangaDetails, id, chapterLink]);

  return (
    <div className='chapter_container'>
      <div className='allChapters'>
        <Link to={`/manga/${id}`}>
          <h1>{mangaName}</h1>
        </Link>
      </div>
      <div className='nextPrevBtn'>
        {chapter > 1 && (
          <button
            type='button'
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) - 1}`, {
                state: { data: chapLinks[parseInt(chapter) - 1] },
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
            type='button'
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) + 1}`, {
                state: { data: chapLinks[parseInt(chapter) + 1] },
              });
              setLoading(false);
            }}
          >
            next
          </button>
        )}
      </div>

      {loading ? (
        <div className='chapterImg_cotainer'>
          {chapData.chapterImg ? (
            chapData.chapterImg.map((el, index) => {
              return (
                <div key={index}>
                  <img src={el} alt='chapter image' />
                </div>
              );
            })
          ) : (
            <h1>ntg here</h1>
          )}
        </div>
      ) : (
        <div className='whenLoad'></div>
      )}
      <div className='nextPrevBtn'>
        {chapter > 1 && (
          <button
            type='button'
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) - 1}`, {
                state: { data: chapLinks[parseInt(chapter) - 1] },
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
            type='button'
            onClick={() => {
              navigate(`/manga/${id}/${parseInt(chapter) + 1}`, {
                state: { data: chapLinks[parseInt(chapter) + 1] },
              });
              setLoading(false);
            }}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default MangaChapter;
