import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const protectedRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authorization = req.headers.authorization;

      const token = authorization?.split(" ")[1];
      console.log(token);
      if (!token) {
        res.status(401).json({ ok: false, message: "Unauthorize!" });
        return;
      }

      const v = verify(token, process.env.ACCESS_TOKEN_SECRET ?? "");

      if (!v) {
        res.status(401).json({ ok: false, message: "Unauthorize!" });
        return;
      }

      return handler(req, res);
    } catch (e: any) {
      res.status(401).send({ ok: false, message: e.message });
    }
  };
};

export default protectedRoute;
