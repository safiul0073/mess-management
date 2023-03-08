import { verify } from "jsonwebtoken";
import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from "../../../functions/auth";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

interface ResponseData {
  ok: boolean;
  accessToken?: string;
  user?: userType | null;
  message?: unknown | string;
}

interface userType {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default async function refreshToken(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<any> {
  if (req.method === "POST") {
    // checking cookie has or not
    if (req.headers.cookie == null || req.headers.cookie === undefined) {
      res.send({ ok: false, accessToken: "" });
      return;
    }
    // getting token
    const getToken = cookie.parse(req.headers.cookie);
    const token = getToken.refreshToken;

    if (token == null || token === undefined) {
      res.send({ ok: false, accessToken: "" });
      return;
    }

    let payload: any = null;

    try {
      // verify the token valid or not return userId
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET ?? "");

      // getting user by payload userId
      const user: any = await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
      });

      if (user == null) {
        res.send({ ok: false, accessToken: "" });
        return;
      }

      // again creating refresh token and sending it on cookie domain
      sendRefreshToken(res, createRefreshToken(user));

      // again creating new access token
      const accessToken = createAccessToken(user);

      res.send({ ok: true, accessToken, user });
      return;
    } catch (e) {
      console.log(e);
      res.send({ ok: false, message: e });
    }
  } else {
    res.status(500).send({ ok: false, message: "Method not allowed!" });
  }
}
