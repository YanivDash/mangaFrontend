import axios from "axios";

const mangaChapter = (values) => {
  return axios
    .post(`${import.meta.env.VITE_BASE_URL}/chapter`, values)

    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default mangaChapter;
