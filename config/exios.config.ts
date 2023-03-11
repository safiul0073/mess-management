/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";
import { API_URL } from "../constant";
// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const publicAxios = axios.create({
  baseURL: API_URL,
});

export { publicAxios };
