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

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const mangas = useSelector((state) => state.allManga);

  let data = mangas.allMangas;

  const sortedData = [...data];

  sortedData.sort((a, b) => b.totalViews - a.totalViews);
  const bannerItems = sortedData.slice(0, 7);

  let discription = [
    `Rachel, a girl with dreams beyond the tower's reach, sparks Bam's journey in "Tower of God." As he ascends, facing trials and forging alliances, he seeks Rachel, navigating a labyrinth of mysteries and adversaries within the towering structure.`,
    `
  In a world where magic is everything, Asta, a boy born without any magical abilities, dreams of becoming the Wizard King. With his determination and anti-magic sword, he embarks on a journey to defy fate and prove his worth in the Clover Kingdom's magical society.`,
    `Vinland Saga follows Thorfinn, a young Viking warrior seeking revenge against the man who killed his father. Amidst battles and politics, Thorfinn's journey explores themes of honor, violence, and the pursuit of a peaceful land.`,
    `Vagabond chronicles the odyssey of Miyamoto Musashi, a legendary swordsman in feudal Japan, as he embarks on a relentless quest for enlightenment through the crucible of combat, confronting his inner demons while seeking to master the art of the sword.`,
    `In the dark medieval world of Berserk, Guts, a lone mercenary with a tragic past, seeks vengeance against his former friend Griffith, while battling against demonic forces and struggling to retain his humanity in a brutal and unforgiving reality.`,
    `A timid boy's life transforms when he's drawn into a dangerous martial arts clan, navigating a treacherous world of combat and intrigue, forging his path amidst formidable adversaries and unforeseen challenges.`,
    `Arthur, a weak noble reborn with past-life memories, seeks revenge. Wielding a hidden magic core, he trains in a chaotic world filled with monsters and betrayal. Can he enact vengeance and stop a looming disaster, or will he fall to the darkness? `  ];

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
        <Skeleton className="banner_container" />
      ) : (
        <div {...handlers} key={currentBanner} className="banner_container">
          <div className="banner_blur_img">
            <img
              className="banner_blur_img_cover"
              src={mangaCover}
              alt={`${mangaCover}`}
            />
            <div className="banner_header">
              <Link
                to={`/manga/${id}`}
                onClick={() => {
                  incrementView({ id: id, totalViews: totalViews });
                }}
              >
                <h1>{mangaName}</h1>

                <p>
                  <FaQuoteLeft /> {discription[currentBanner]} <FaQuoteRight />
                </p>
              </Link>
              <div className="banner_button">
                <div
                  onClick={() => {
                    incrementView({ id: id, totalViews: totalViews });
                  }}
                  className="banner_read_button "
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
                    className="banner_read_button_read"
                  >
                    Read Now!
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/manga/${id}/${totalChapter}`, {
                        state: { data: lastChapter, chapIndex: 0 },
                      });
                    }}
                    className="banner_read_button_chapter"
                  >
                    Chapter {totalChapter}
                  </button>
                </div>
              </div>
              <div className="banner_navigate">
                <IoIosArrowDropleftCircle
                  className="banner_navigate_icons"
                  onClick={() => {
                    currentBanner <= 0
                      ? setCurrentBanner(6)
                      : setCurrentBanner(currentBanner - 1);
                  }}
                />
                <IoIosArrowDroprightCircle
                  className="banner_navigate_icons"
                  onClick={() => {
                    currentBanner >= 6
                      ? setCurrentBanner(0)
                      : setCurrentBanner(currentBanner + 1);
                  }}
                />
              </div>
            </div>
            <div className="banner_manga_img">
              <img
                className="banner_manga_img_cover"
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
