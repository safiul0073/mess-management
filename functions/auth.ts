import cookie from "cookie";
import { sign } from "jsonwebtoken";
import type { NextApiResponse } from "next";

interface userType {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

type TokenTypeGuard<T> = (user: userType) => T;
type CookieTypeGuard<T> = (res: NextApiResponse, toke: string) => T;

export const refreshToken = (): any => {
  return fetch("/api/auth/refreshToken", {
    method: "POST",
    credentials: "include",
  })
    .then((res: any) => res.json())
    .then((data) => {
      return data;
    });
};

export const createAccessToken: TokenTypeGuard<string> = (user: userType) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET ?? "", {
    expiresIn: "15m",
  });
};

export const createRefreshToken: TokenTypeGuard<string> = (user: userType) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET ?? "", {
    expiresIn: "7d",
  });
};

export const sendRefreshToken: CookieTypeGuard<any> = (
  res: NextApiResponse,
  token: string
) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
  );
};
