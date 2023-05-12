/* eslint-disable @typescript-eslint/ban-types */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryApi } from "@reduxjs/toolkit/query/react";
import SliceName from "../../types/SliceName";
import { logout, setAuthData } from "../auth/authSlice";
import type { LoginResponseType } from "../../types/AuthTypes";

const bsQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL ?? "http://localhost:3000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }: any) => {
    const token: string = getState()[SliceName.USER_AUTH].token ?? "";
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: any = async (
  args: string,
  api: BaseQueryApi,
  options: object
) => {
  let result = await bsQuery(args, api, options);

  if (result?.error?.status === 401) {
    console.log("sending req for refresh token");
    const refreshResult: any = await bsQuery(
      "/auth/refreshToken",
      api,
      options
    );

    if (refreshResult?.data?.ok) {
      const res: LoginResponseType = refreshResult?.data;
      const { accessToken, user } = res;
      api.dispatch(
        setAuthData({
          user,
          token: accessToken,
        })
      );

      result = await bsQuery(args, api, options);
    } else {
      api.dispatch(logout);
      return result;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (builders) => ({}),
});
