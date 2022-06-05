import axios from "axios";

const axiosInsance = axios.create({
  baseURL: "/api",
});

export default axiosInsance;
