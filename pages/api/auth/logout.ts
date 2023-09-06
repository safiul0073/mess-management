import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import protectedRoute from "../../../middleware/protectedRoute";

function logout(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // deletes refresh token
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("refreshToken", "", {
                httpOnly: true,
                maxAge: 0,
                path: "/",
            })
        );
        res.status(200).json({
            message: "Logged out",
        });
    }
}

export default protectedRoute(logout);
