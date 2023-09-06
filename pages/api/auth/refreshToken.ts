import { verify } from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import cookie from "cookie";
import { type NextApiRequest, type NextApiResponse } from "next";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from "../../../functions/auth";

export default async function refreshToken(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        if (!req.headers.cookie) {
            res.send({ ok: false, accessToken: "" });
            return;
        }
        const getToken = cookie.parse(req.headers.cookie);
        const token = getToken.refreshToken;

        if (!token) {
            res.send({ ok: false, accessToken: "" });
            return;
        }
        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET ?? "");

            const user: any = await prisma.user.findUnique({
                where: {
                    id: payload.userId,
                },
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    email: true,
                    role: true,
                },
            });

            if (!user) {
                res.send({ ok: false, accessToken: "" });
                return;
            }

            sendRefreshToken(res, createRefreshToken(user));
            const accessToken = createAccessToken(user);

            res.send({ ok: true, accessToken, user });
            return;
        } catch (e) {
            console.log(e);
            res.send({ ok: false, accessToken: "" });
        }
    } else {
        res.status(500).send({ ok: false, message: "Method not match!" });
    }
}
