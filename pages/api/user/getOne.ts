import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function getOne(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const id: string = req.query.id as string;

        if (!id) {
            res.status(422).json({
                ok: false,
                message: "Please provide user Id.",
            });
            return;
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    role: true,
                },
            });

            if (!user) {
                res.status(500).json({ ok: true, message: "User not found!" });
            }

            res.status(200).json({ ok: true, data: user });
            return;
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: "Something want wrong.",
            });
        }
    }

    res.status(404).json({ ok: false, message: "Method not match." });
}

export default protectedRoute(getOne);
