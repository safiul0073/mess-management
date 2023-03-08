import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const checkAuth = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authorization = req.headers.authorization;
      if (authorization == null) throw new Error("not authenticated");
      const token = authorization.split(" ")[1];
      verify(token, process.env.ACCESS_TOKEN_SECRET ?? "");
      return handler(req, res);
    } catch (e) {
      console.log(e);
      res.status(401).send({});
    }
  };
};

export default checkAuth;
