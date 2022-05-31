import axios from "axios";

const axiosInsance = axios.create({
  baseURL: "http://localhost:3000/", // TODO: replace it with docker-compose internal url
});

export default axiosInsance;
