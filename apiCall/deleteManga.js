import axios from "axios";

const deleteData = async (value) => {
  console.log(value);
  return axios
    .delete(`${import.meta.env.VITE_BASE_URL}/deleteManga/${value}`)

    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export default deleteData;
