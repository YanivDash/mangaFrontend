import axios from "axios";

const uploadManga = async (values) => {
  return axios
    .post(`${import.meta.env.VITE_BASE_URL}/createManga`, values)

    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default uploadManga;
