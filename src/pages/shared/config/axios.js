import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://nhathongminh.webmau.pro/",
});

export default axiosClient;
