import "../../styles/subheaderCss/subHeader.css";
import { BiGlassesAlt } from "react-icons/bi";
import { SiBuymeacoffee } from "react-icons/si";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiDiscord } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { TbBulbFilled } from "react-icons/tb";
import { RiUserFollowFill } from "react-icons/ri";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lightAdd } from "../../reducers/lightMode";
import { Link } from "react-router-dom";

const SubHeader = () => {
  const [light, setLight] = useState(false);
  const [randomCheck, setRandomCheck] = useState(0);
  const dispatch = useDispatch();
  const mangas = useSelector((state) => state.allManga);
  let data = mangas.allMangas;

  const lightMode = useSelector((state) => state.light.light);
  if (lightMode != light) setLight(lightMode);

  if (light) {
    if (document.body.className == "darkMode") {
      document.body.className = "lightMode";
    }
  }
  if (!light) {
    if (document.body.className == "lightMode") {
      document.body.className = "darkMode";
    }
  }
  let readRandom;
  if (data) readRandom = data[Math.floor(Math.random() * data.length)];
  return (
    <div className="subHeader_container">
      <div className="subHeader_left_links">
        <Link to={`/manga/${readRandom?.id}`}>
          <p
            onClick={() => {
              {
                readRandom = data[Math.floor(Math.random() * data.length)];
                setRandomCheck(randomCheck + 1);
              }
            }}
          >
            <span className="subHeader_icons">
              <BiGlassesAlt />{" "}
            </span>
            Read Random
          </p>
        </Link>
        <a href="">
          <p>
            <span className="subHeader_icons">
              <SiBuymeacoffee />{" "}
            </span>
            Donate us
          </p>
        </a>
      </div>
      <div className="subHeader_right_links">
        <p>
          <span className="subHeader_icons">
            <RiUserFollowFill />{" "}
          </span>
          <strong>Follow us :</strong>
        </p>
        <a href="https://twitter.com/_yanivsingh">
          <p>
            {" "}
            <span className="subHeader_icons">
              <AiFillTwitterCircle />{" "}
            </span>
            Twiter
          </p>
        </a>
        <a href="">
          <p>
            {" "}
            <span className="subHeader_icons">
              <SiDiscord />{" "}
            </span>
            Discord{" "}
          </p>
        </a>
        <a href="">
          <p>
            <span className="subHeader_icons">
              <AiFillInstagram />{" "}
            </span>
            Instagram{" "}
          </p>
        </a>
      </div>
      <div className="subHeader_Light_control">
        <p onClick={() => dispatch(lightAdd(!light))}>
          {" "}
          <span className="subHeader_icons">
            <TbBulbFilled />{" "}
          </span>
          {light ? "Dark" : "Light"} mode
        </p>
      </div>
    </div>
  );
};

export default SubHeader;
