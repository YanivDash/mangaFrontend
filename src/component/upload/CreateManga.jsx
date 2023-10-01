import { uploadManga } from "../../../apiCall";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/createMangaCss/createManga.css";
import { useLocation } from "react-router-dom";

const CreateManga = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = useState({
    websiteName: "",
    mangaName: "",
    mangaCover: "",
    mangaClass: "",
    mangaType: "manga",
  });
  const [response, setResponse] = useState(false);
  const [scrapeTest, setScrapeTest] = useState("");

  const location = useLocation();
  const receivedData = location.state?.cookie;
  if (receivedData) {
    document.cookie = `token=${receivedData}`;
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
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/logout`)

      .then(() => {
        location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(true);
    const result = await uploadManga(values);
    setResponse(false);

    alert(result.message);
  };

  return (
    <div>
      {auth ? (
        <div className='yesAuth_container'>
          <form className='upload_form_container' onSubmit={handleSubmit}>
            <div className='upload_form_item'>
              <label htmlFor='websiteName'>
                {" "}
                <strong>websiteName</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter websiteName'
                name='websiteName'
                onChange={(e) =>
                  setValues({ ...values, websiteName: e.target.value })
                }
              />
            </div>

            <div className='upload_form_item'>
              <label htmlFor='mangaName'>
                {" "}
                <strong>mangaName</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter mangaName'
                name='mangaName'
                onChange={(e) =>
                  setValues({ ...values, mangaName: e.target.value })
                }
              />
            </div>

            <div className='upload_form_item'>
              <label htmlFor='mangaCover'>
                {" "}
                <strong>mangaCover</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter mangaCover'
                name='mangaCover'
                onChange={(e) =>
                  setValues({ ...values, mangaCover: e.target.value })
                }
              />
            </div>
            <div className='upload_form_item'>
              <label htmlFor='mangaClass'>
                {" "}
                <strong>mangaClass</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter mangaClass'
                name='mangaClass'
                onChange={(e) =>
                  setValues({ ...values, mangaClass: e.target.value })
                }
              />
            </div>
            <div className='upload_form_item'>
              <label htmlFor='mangaType'>
                {" "}
                <strong>mangaCover</strong>
              </label>
              <select
                value={values.mangaType}
                name='mangaType'
                onChange={(e) =>
                  setValues({ ...values, mangaType: e.target.value })
                }
              >
                <option value='manga'>Manga</option>
                <option value='manhwa'>Manhwa</option>
                <option value='manhua'>Manhua</option>
              </select>
            </div>
            <button type='submit'>
              {response ? "Submiting..." : "Submit Manga"}
            </button>
          </form>
          <div className='authAdmin_container'>
            <h3>
              Admin Name : <span>{name}</span>{" "}
            </h3>
            <button onClick={handleDelete}>Logout</button>
          </div>
          <div className='create_scapeTest'>
            <h2>scapre test </h2>
            <input
              type='text'
              onChange={(e) => setScrapeTest(e.target.value)}
            />
            <img src={scrapeTest} alt='input src for scrape test' />
          </div>
        </div>
      ) : (
        <div className='notAuth_container'>
          <h1>{message}</h1>
          <h2>Login now</h2>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateManga;
