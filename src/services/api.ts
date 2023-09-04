import axios from "axios";

const api = axios.create({
  baseURL: "https://motorshopdb.onrender.com",
  timeout: 6000,
});

export default api;
