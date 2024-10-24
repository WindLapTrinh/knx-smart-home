import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://nhathongminhknx.com/",
});

export default axiosClient;
