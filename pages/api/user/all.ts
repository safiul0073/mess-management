import type { NextApiRequest, NextApiResponse } from "next";
import { paginate } from "../../../functions/pagination";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function getAll(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const limit: number = req.query.pageSize
            ? parseInt(req.query.pageSize as string)
            : 10;
        const page: number = req.query.page
            ? parseInt(req.query.page as string)
            : 1;

        try {
            const users = await prisma.user.findMany({
                take: limit,
                skip: limit * (page - 1),
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    role: true,
                },
            });

            const count = await prisma.user.count({});

            if (!users) {
                res.status(500).json({ ok: true, message: "User not found1" });
            }

            res.status(200).json({
                ok: true,
                data: paginate(users, count, page, limit),
            });
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

export default protectedRoute(getAll);
