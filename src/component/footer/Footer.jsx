import { SiBuymeacoffee } from "react-icons/si";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiDiscord } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { Logo, LogoWhiteMode } from "../../assets";
import { useSelector } from "react-redux";
import { useState } from "react";

import "../../styles/footerCss/footer.css";
const Footer = () => {
  const [light, setLight] = useState(false);
  const lightMode = useSelector((state) => state.light.light);
  if (lightMode != light) setLight(lightMode);

  return (
    <div className="bgcolorFour footer">
      <div className="footerLogo">
        <img
          style={{ width: "200px" }}
          src={`${light ? LogoWhiteMode : Logo}`}
          alt="Logo"
        />
      </div>
      <div className="footer_icons">
        <AiFillInstagram className="footer_icons_item" />
        <RiUserFollowFill className="footer_icons_item" />
        <SiBuymeacoffee className="footer_icons_item" />
        <SiDiscord className="footer_icons_item" />
        <AiFillTwitterCircle className="footer_icons_item" />
      </div>
      <p>&copy; 2023 Manga Nexus Library. All rights reserved.</p>
    </div>
  );
};

export default Footer;
