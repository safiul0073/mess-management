/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { type InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../constant";
import { refreshToken } from "../functions/auth";
import { useStore } from "../store";

const useAxios = () => {
  const { accessToken, setAccessToken } = useStore();

  const userAxios = axios.create({
    baseURL: API_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  userAxios.interceptors.request.use(
    async (req: InternalAxiosRequestConfig<any>) => {
      if (!accessToken) {
        const res = await refreshToken();
        req.headers.Authorization = `Bearer ${res.accessToken}`;
        setAccessToken(res.accessToken);
      }
      return req;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return userAxios;
};

export default useAxios;
