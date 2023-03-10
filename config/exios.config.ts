/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";
import { API_URL } from "../constant";
// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const publicAxios = axios.create({
  baseURL: API_URL,
});

const userAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json, text/plain, */*",
  },
});

// interceptor to check auth
userAxios.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  (error: any) => {
    if (error.response.ok === false) {
      // window.location.href = `/auth/login`;
    }
    return Promise.reject(error);
  }
);

const updateAxiosToken = (token: string) => {
  if (token) {
    userAxios.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

export { publicAxios, userAxios, updateAxiosToken };
