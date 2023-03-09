import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../../../functions/auth";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      let user: any = null;

      user = await prisma.user.findUnique({
        where: {
          email: username,
        },
      });

      if (!user) {
        user = await prisma.user.findUnique({
          where: {
            phone: username,
          },
        });
      }

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      const userForTheClient = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };

      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }

      const accessToken = createAccessToken(userForTheClient);

      sendRefreshToken(res, createRefreshToken(userForTheClient));

      res.status(200).json({
        ok: true,
        accessToken,
        user: userForTheClient,
      });

      return;
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error,
      });
      return;
    }
  }
  res.status(404).json({
    ok: false,
    message: "Method not match.",
  });
}
