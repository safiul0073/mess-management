import cookie from "cookie";
import { sign, verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

interface userType {
    id: string;
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

// getting authenticate user
export const authUser = (req: NextApiRequest): any => {
    if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie);
        const refreshToken = cookies.refreshToken;

        if (!refreshToken) return null;

        let payload: any = null;

        payload = verify(
            refreshToken,
            process.env.NODE_ENV !== "development"
                ? process.env.REFRESH_TOKEN_SECRET ?? ""
                : process.env.REFRESH_TOKEN_SECRET_PROD ?? ""
        );

        return payload;
    }
};

export const createAccessToken: TokenTypeGuard<string> = (user: userType) => {
    return sign(
        { userId: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET ?? "",
        {
            expiresIn: "15m",
        }
    );
};

export const createRefreshToken: TokenTypeGuard<string> = (user: userType) => {
    return sign(
        { userId: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET ?? "",
        {
            expiresIn: "7d",
        }
    );
};

export const sendRefreshToken: CookieTypeGuard<any> = (
    res: NextApiResponse,
    token: string
) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken", token, {
            domain: process.env.APP_DOMAIN,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        })
    );
};
