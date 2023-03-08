import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from "../../../functions/auth";
import bcrypt from "bcrypt";
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

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<any> {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (username == null || username === undefined) {
      res.send({ ok: false, message: "Please enter username!" });
    }

    if (password == null || password === undefined) {
      res.send({ ok: false, message: "Please enter password!" });
    }

    try {
      let user: any = null;

      // getting user by username where phone or email
      user = await prisma.user.findFirst({
        where: {
          email: username,
        },
      });

      if (user == null) {
        user = await prisma.user.findFirst({
          where: {
            phone: username,
          },
        });
      }

      if (user == null) {
        res.status(401).json({ ok: false, message: "User not found" });
        return;
      }

      const userForTheClient = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };

      // checking password validation
      const valid = bcrypt.compareSync(password, user.password);

      if (valid == null) {
        res.status(401).json({ ok: false, message: "Invalid password" });
        return;
      }

      // creating access toke for only valid 15 min
      const accessToken = createAccessToken(userForTheClient);
      // creating refresh token valid for 7 days
      const refreshToken = createRefreshToken(userForTheClient);
      // sending refresh token to domain cookie
      sendRefreshToken(res, refreshToken);

      res.status(200).json({
        ok: true,
        accessToken,
        user: userForTheClient,
      });
      return;
    } catch (e) {
      console.log(e);
      res.send({ ok: false, message: e });
    }
  } else {
    res.status(500).send({ ok: false, message: "something want wrong!" });
  }
}
