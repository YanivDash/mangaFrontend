import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../../styles/rudoppCss/rudopp.css";

const RUDoppCard = (manga) => {
  const [update, setUpdate] = useState(false);
  const [response, setResponse] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState(false);
  // const [repostResponse, setRepostResponse] = useState(false);
  const {
    id,
    websiteName,
    mangaName,
    mangaCover,
    mangaClass,
    mangaType,
    firstChapter,
    lastChapter,
  } = manga.data;

  const [values, setValues] = useState({
    firstChapter: firstChapter,
    lastChapter: lastChapter,
  });
  const handleDelete = async () => {
    setDeleteResponse(true);

    try {
      axios
        .delete(`${import.meta.env.VITE_BASE_URL}/deleteManga/${id}`)
        .then((response) => {
          console.log("Resource deleted successfully:", response.data);
          setDeleteResponse(false);
          alert("deleted manga successfully");
        })
        .catch((error) => {
          console.error("Error deleting resource:", error);
          setDeleteResponse(false);
          alert("error while deleting");
        });
    } catch (error) {
      console.log(error);
      setDeleteResponse(false);
      return;
    }
  };

  // const handleRepost = () => {
  //   setRepostResponse(true);
  //   try {
  //     axios
  //       .post(`${import.meta.env.VITE_BASE_URL}/repost`, {
  //         websiteName: websiteName,
  //         mangaName: mangaName,
  //         mangaCover: mangaCover,
  //         mangaClass: mangaClass,
  //         mangaType: mangaType,
  //       })
  //       .then((response) => {
  //         console.log("reposted succesfully:", response.data);
  //         setRepostResponse(false);
  //         alert("reposted manga successfully");
  //       })
  //       .catch((error) => {
  //         console.error("Error reposting resource:", error);
  //         setRepostResponse(false);
  //         alert("error while reposting");
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     setRepostResponse(false);
  //     return;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(true);
    try {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/updateMangaChapter`, values)
        .then((response) => {
          console.log("updated succesfully:", response.data);
          setResponse(false);
          alert("update first and latest successfully");
        })
        .catch((error) => {
          console.error("Error updating resource:", error);
          setResponse(false);
          alert("error while updating");
        });
    } catch (error) {
      console.log(error);
      setResponse(false);
      return;
    }
  };

  return (
    <div className=" bgcolorThree RUDoppCard_conatiner">
      <div className="RUDoppCard_image">
        <img src={mangaCover} alt="cover" />
      </div>
      <div className="RUDoppCard_header">
        <div className="RUDoppCard_website">
          <a href={websiteName} target="_blank" rel="noreferrer">
            {websiteName}
          </a>
        </div>
        <div className="RUDoppCard_heading">
          <strong>{mangaName}</strong>
        </div>
      </div>

      <div className="RUDoppCard_buttons">
        <div className="RUDoppCard_delete">
          <button onClick={handleDelete}>
            {deleteResponse ? "Deleting..." : "DELETE"}
          </button>
        </div>

        <div className="RUDoppCard_update">
          <button onClick={() => setUpdate(!update)}>
            {update ? "CLOSE" : "UPDATE"}
          </button>
        </div>
      </div>
      {update ? (
        <div className="bgcolorFour RUDoppCard_update_container">
          <form className="RUDoppCard_form" onSubmit={handleSubmit}>
            <div className="RUDoppCard_form_item">
              <label htmlFor="firstChapter">
                {" "}
                <strong>First chapter: </strong>{" "}
                <a
                  href={firstChapter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {firstChapter}
                </a>
              </label>
              <input
                required
                type="text"
                placeholder="Enter firstChapter"
                name="firstChapter"
                onChange={(e) =>
                  setValues({ ...values, firstChapter: e.target.value })
                }
              />
            </div>
            <div className="RUDoppCard_form_item">
              <label htmlFor="lastChapter">
                {" "}
                <strong>Last chapter: </strong>
                <a href={lastChapter} target="_blank" rel="noopener noreferrer">
                  {lastChapter}
                </a>
              </label>
              <input
                required
                type="text"
                placeholder="Enter lastChapter"
                name="lastChapter"
                onChange={(e) =>
                  setValues({ ...values, lastChapter: e.target.value })
                }
              />
            </div>
            <button type="submit">
              {response ? "Submiting..." : "Submit Manga"}
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const RUDOpp = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentLoadManga, setcurrentLoadManga] = useState(20);
  const [search, setSearch] = useState("");
  const [auth, setAuth] = useState(false);
  const mangas = useSelector((state) => state.allManga);
  let loadManga = [];
  let data = mangas.allMangas;
  if (!data) setLoading(true);
  if (data.length > 0) {
    let reversedData = [...data].reverse();
    loadManga = reversedData.slice(0, currentLoadManga);
  }
  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/uploadManga`,
        decodeURIComponent(document.cookie),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.Status === "success") {
          setAuth(true);
        } else {
          console.log(res);
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // sort
  data.forEach((element) => {
    let dataString = element.mangaName.toLowerCase();
    if (dataString.includes(search)) {
      loadManga.unshift(element);
    }
  });

  return (
    <div>
      {auth ? (
        <div>
          <input
            type="text"
            name="searchRepDel"
            id="searchRepDel"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Manga Name"
            style={{ padding: "10px", margin: "10px", width: "90%" }}
          />
          <div className="bgcolorOne RUDOpp_container">
            {loading ? (
              <h3>Loading...</h3>
            ) : loadManga.length > 0 ? (
              loadManga.map((item, index) => {
                return <RUDoppCard key={index} data={item} />;
              })
            ) : (
              <h3>nothing to show here</h3>
            )}
          </div>
          <div
            onClick={() =>
              currentLoadManga <= data.length
                ? setcurrentLoadManga(currentLoadManga + 15)
                : setcurrentLoadManga(20)
            }
            className="bgcolorTwo pointer loadColapse"
          >
            {currentLoadManga <= data.length ? (
              <h2>Load More</h2>
            ) : (
              <h2>Collapse Loaded</h2>
            )}
          </div>
        </div>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
};

export default RUDOpp;
