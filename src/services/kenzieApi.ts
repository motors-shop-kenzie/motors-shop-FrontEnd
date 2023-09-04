import axios from "axios";

const kenzieApi = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/",
  timeout: 6000,
});

export default kenzieApi;
