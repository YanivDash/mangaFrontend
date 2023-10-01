import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { lightAdd } from "../../reducers/lightMode";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbarCss/navbar.css";
import { RiLightbulbFlashLine, RiLightbulbFlashFill } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Logo, LogoWhiteMode } from "../../assets";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [light, setLight] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
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
  const navigate = useNavigate();

  const handleInput = () => {
    navigate("/searched", { state: { data: input } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/searched", { state: { data: input } });
  };

  return (
    <div className='navbar_container navbar_icons'>
      {" "}
      <div className='navbar_links_container'>
        <div className='navbar_manga'>
          <IoIosArrowDroprightCircle
            onClick={() => setMobileMenu(!mobileMenu)}
            className={
              mobileMenu
                ? "navbar_icon_inverted  navbar_menu_slide navbar_icons"
                : "navbar_icon_simple  navbar_menu_slide navbar_icons"
            }
          />
          <ul className='navbar_manga_lists'>
            <Link to='/'>
              <img
                className='navbarLogo'
                src={`${light ? LogoWhiteMode : Logo}`}
                alt='Logo'
              />
            </Link>
            <Link to='/mostViewed'>
              <li className='iconColor navbar_manga_item'>Most-Viewed</li>
            </Link>
            <Link to='/latest'>
              <li className='iconColor navbar_manga_item'>Latest</li>
            </Link>
          </ul>
        </div>
        <div className='navbar_right'>
          <div>
            <div className='navbar_search'>
              <form onSubmit={handleSubmit}>
                <input
                  required
                  type='text'
                  placeholder='Enter manga name'
                  name='searchInput'
                  onChange={(e) => setInput(e.target.value)}
                />
              </form>
              <p>
                <IoSearchSharp
                  onClick={() => {
                    if (input) {
                      handleInput();
                    }

                    setSearch(!search);
                  }}
                  className='iconColor navbar_icons'
                />
              </p>
            </div>
          </div>
          <p
            className={light ? "navbar_light" : undefined}
            onClick={() => setLight(!light)}
          >
            {" "}
            {light ? (
              <RiLightbulbFlashFill
                onClick={() => dispatch(lightAdd(!light))}
                className='navbar_none navbar_icons  navbar_glowing'
              />
            ) : (
              <RiLightbulbFlashLine
                onClick={() => dispatch(lightAdd(!light))}
                className='navbar_none navbar_icons'
              />
            )}
          </p>
        </div>
      </div>
      {search ? (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            required
            id='small_screen_input'
            className='navbar_search_input'
            type='text'
            placeholder='enter manga...'
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      ) : undefined}
      <div
        className={
          mobileMenu
            ? "navbar_mobile_show divVarientTwo navbar_mobile"
            : "navbar_mobile_hide divVarientTwo navbar_mobile"
        }
      >
        <div className='divVarientOne navbar_mobile_manga'>
          <div className='navbar_mobile_left_inks'>
            <ul className='navbar_mobile_manga_lists'>
              <br />
              <Link to='/'>
                <img
                  onClick={() => setMobileMenu(false)}
                  className='navbarLogo'
                  src={`${light ? LogoWhiteMode : Logo}`}
                  alt='Logo'
                />
              </Link>
              <hr />
              <Link to='/mostViewed'>
                <li
                  onClick={() => setMobileMenu(false)}
                  className='navbar_mobile_manga_item'
                >
                  Most-Viewed
                </li>
              </Link>
              <Link onClick={() => setMobileMenu(false)} to='/latest'>
                <li className='navbar_mobile_manga_item'>Latest</li>
              </Link>
            </ul>
          </div>
          <div className='iconColor nvabar_mobile_manga_type'>
            <h3>Type :</h3>
            <br />
            <hr />
            <ul className='  navbar_mobile_manga_type'>
              <Link to='/mangaType/manga'>
                <li
                  onClick={() => setMobileMenu(false)}
                  className=' navbar_mobile_manga_item'
                >
                  Manga
                </li>
              </Link>
              <Link to='/mangaType/manhwa'>
                <li
                  onClick={() => setMobileMenu(false)}
                  className=' navbar_mobile_manga_item'
                >
                  Manwha
                </li>
              </Link>
              <Link to='/mangaType/manhua'>
                <li
                  onClick={() => setMobileMenu(false)}
                  className=' navbar_mobile_manga_item'
                >
                  Manhua
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
