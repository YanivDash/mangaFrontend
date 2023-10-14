import axios from "axios";
import "../../styles/createMangaCss/createManga.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddCreateManga = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = useState({
    url: "",
    blockClass: "",
    nextSelecter: "",
    mangaType: "",
    mangaClass: "",
  });
  const [response, setResponse] = useState(false);
  const [replicate, setReplicate] = useState(false);
  const [scrapeTest, setScrapeTest] = useState("");

  const location = useLocation();
  const receivedData = location.state?.cookie;
  if (receivedData) {
    document.cookie = `token=${receivedData}`;
  }

  useEffect(() => {
    console.log(decodeURIComponent(document.cookie));
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
          console.log(res);
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
    const result = await axios.post(
      `${import.meta.env.VITE_ADV_BASE_URL}/advCreateManga`,
      values
    );
    console.log(result);
    setResponse(false);
    alert(result.message);
  };

  const handleReplicate = async () => {
    setReplicate(true);
    const result = await axios.put(
      `${import.meta.env.VITE_ADV_BASE_URL}/replicateAll`,
      values
    );
    setReplicate(false);
    alert(result.message);
  };

  const handleDeleteDuplicate = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_ADV_BASE_URL}/deleteDuplicate`
      );
      console.log("deleted dupli");
    } catch (error) {
      alert("could not");
    }
  };

  return (
    <div>
      {auth ? (
        <div className='yesAuth_container'>
          <div className='chapterClasses'>
            <h2>chapterNumberHere</h2>
            <p>.reading-content img</p>
          </div>

          <form className='upload_form_container' onSubmit={handleSubmit}>
            <div className='upload_form_item'>
              <label htmlFor='url'>
                {" "}
                <strong>url</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter url'
                name='url'
                onChange={(e) => setValues({ ...values, url: e.target.value })}
              />
            </div>

            <div className='upload_form_item'>
              <label htmlFor='blockClass'>
                {" "}
                <strong>blockClass</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter blockClass'
                name='blockClass'
                onChange={(e) =>
                  setValues({ ...values, blockClass: e.target.value })
                }
              />
            </div>

            <div className='upload_form_item'>
              <label htmlFor='nextSelecter'>
                {" "}
                <strong>nextSelecter</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter nextSelecter'
                name='nextSelecter'
                onChange={(e) =>
                  setValues({ ...values, nextSelecter: e.target.value })
                }
              />
            </div>
            <div className='upload_form_item'>
              <label htmlFor='mangaType'>
                {" "}
                <strong>mangaType</strong>
              </label>
              <input
                required
                type='text'
                placeholder='Enter mangaType'
                name='mangaType'
                onChange={(e) =>
                  setValues({ ...values, mangaType: e.target.value })
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
            <button type='submit'>
              {response ? "Submiting..." : "Submit Manga"}
            </button>
            <button onClick={handleReplicate}>
              {replicate ? "Replicating..." : "Replicate"}
            </button>
            <button onClick={handleDeleteDuplicate}>Delete Duplicate</button>
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

export default AddCreateManga;
