import React from "react";
import {
  Vinay,
  EasyUpload,
  Login2,
  Login1,
  RepostDelete,
  Responsive,
  HardScrape,
  Design,
  LightMode,
} from "../../assets";
import "../../styles/AboutCss/about.css";
import { Link } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";

const About = () => {
  return (
    <div className="about">
      <img src={Vinay} alt="vinay" />

      <h1>
        About
        <Link to="/">
          <span> MangaNexus-library </span>
        </Link>
      </h1>
      <p>
        <FaQuoteLeft />
        MangaNexus is a comic book platform hosting thousands of manga titles,
        providing rapid and free access. Constructed with React, Node.js, MySQL,
        and various other tools and libraries, it offers an efficient and
        comprehensive manga reading experience.
        <FaQuoteRight />
      </p>
      <ul>
        <h2>key features of website :</h2>
        <li>
          <p>
            <span>Auto-Update: </span>Each comic book on the platform updates
            itself automatically whenever a new chapter becomes available on the
            internet.
          </p>
        </li>
        <li>
          <p>
            <span>Effortless Upload: </span>Through the website's functionality,
            Admin can swiftly upload any comic book from the internet within
            seconds, requiring only a few essential parameters.
          </p>
          <img src={EasyUpload} alt="easyUpload" />
        </li>
        <li>
          <p>
            <span>Robust Website Scraping: </span>
            Another feature enables users to upload all comic books from any
            specified website through advanced scraping functionality.
          </p>
          <img src={HardScrape} alt="hardScrape" />
        </li>
        <li>
          {" "}
          <p>
            <span>Auhorization: </span>Stringent user authentication is
            enforced, utilizing hashed data and encryption techniques. Only
            administrators have the privileges to upload, update, repost,
            perform hard scraping, or delete content.
          </p>{" "}
          <img src={Login2} alt="auth" />
        </li>
        <li>
          {" "}
          <p>
            <span>Manual Database Management: </span>Admins can efficiently
            update or delete comic books within seconds through website.
          </p>{" "}
          <img src={RepostDelete} alt="RepostDelete" />
        </li>
        <li>
          <p>
            <span>Design: </span> The website is crafted using pure CSS, HTML,
            and JavaScript for an elegant custom user interface.
          </p>
          <img src={Design} alt="Design" />
        </li>
        <li>
          <p>
            <span>Responsiveness: </span>MangaNexus boasts a user-friendly
            interface that adapts seamlessly to all screen sizes and devices,
            ensuring an optimal experience across platforms.
          </p>{" "}
          <img src={Responsive} alt="Responsive" />
        </li>
        <li>
          <p>
            <span>Light-Dark Theme:</span> A reading wesbite without light and
            dark mode?
          </p>{" "}
          <img src={LightMode} alt="LightMode" />
        </li>
        <li>
          <h4>
            These features are among the primary aspects of the website that
            contribute to its efficiency, speed, ease of use, and even aid in my
            preference for laziness.
            <Link to="/">
              {" "}
              <span>Click here to surf MangaNexus-library</span>
            </Link>
          </h4>
        </li>
      </ul>
    </div>
  );
};

export default About;
