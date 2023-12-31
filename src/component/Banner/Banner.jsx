import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import incrementView from "../../../apiCall/incrementView";
import "../../styles/bannerCss/banner.css";
import { useSwipeable } from "react-swipeable";

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const mangas = useSelector((state) => state.allManga);

  let data = mangas.allMangas;

  const sortedData = [...data];

  sortedData.sort((a, b) => b.totalViews - a.totalViews);
  const bannerItems = sortedData.slice(0, 7);

  if (bannerItems.length > 0) {
    var {
      id,
      totalViews,
      mangaCover,
      mangaName,
      totalChapter,
      firstChapter,
      lastChapter,
    } = bannerItems[currentBanner];
    mangaName = mangaName.toLowerCase();
  }

  useEffect(() => {
    if (data.length >= 1) setLoading(false);

    const autoSlide = () => {
      setCurrentBanner((prevBanner) => {
        if (prevBanner >= 6) {
          return 0;
        } else {
          return prevBanner + 1;
        }
      });
    };
    let intervalId = setInterval(autoSlide, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentBanner, data]);
  const handlers = useSwipeable({
    onSwiped: () => {
      if (currentBanner >= 6) {
        setCurrentBanner(0);
      } else {
        setCurrentBanner(currentBanner + 1);
      }
    },
    onSwipedRight: () => {
      if (currentBanner <= 0) {
        setCurrentBanner(6);
      } else {
        setCurrentBanner(currentBanner - 1);
      }
    },
    delta: { left: 20, right: 20 },
  });

  return (
    <div>
      {loading ? (
        <Skeleton className='banner_container' />
      ) : (
        <div {...handlers} key={currentBanner} className='banner_container'>
          <div className='banner_blur_img'>
            <img
              className='banner_blur_img_cover'
              src={mangaCover}
              alt={`${mangaCover}`}
            />
            <div className='banner_header'>
              <Link
                to={`/manga/${id}`}
                onClick={() => {
                  incrementView({ id: id, totalViews: totalViews });
                }}
              >
                <h1>{mangaName}</h1>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere laborum optio voluptatibus distinctio nisi ipsum
                  adipisci non quidem quas quam perspiciatis...
                </p>
              </Link>
              <div className='banner_button'>
                <div
                  onClick={() => {
                    incrementView({ id: id, totalViews: totalViews });
                  }}
                  className='banner_read_button '
                >
                  <button
                    onClick={() => {
                      navigate(`/manga/${id}/${1}`, {
                        state: {
                          data: firstChapter,
                          chapIndex: totalChapter,
                        },
                      });
                    }}
                    className='banner_read_button_read'
                  >
                    Read Now!
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/manga/${id}/${totalChapter}`, {
                        state: { data: lastChapter, chapIndex: 0 },
                      });
                    }}
                    className='banner_read_button_chapter'
                  >
                    Chapter {totalChapter}
                  </button>
                </div>
              </div>
              <div className='banner_navigate'>
                <IoIosArrowDropleftCircle
                  className='banner_navigate_icons'
                  onClick={() => {
                    currentBanner <= 0
                      ? setCurrentBanner(6)
                      : setCurrentBanner(currentBanner - 1);
                  }}
                />
                <IoIosArrowDroprightCircle
                  className='banner_navigate_icons'
                  onClick={() => {
                    currentBanner >= 6
                      ? setCurrentBanner(0)
                      : setCurrentBanner(currentBanner + 1);
                  }}
                />
              </div>
            </div>
            <div className='banner_manga_img'>
              <img
                className='banner_manga_img_cover'
                src={mangaCover}
                alt={`${mangaCover}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
