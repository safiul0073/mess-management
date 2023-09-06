import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function getOne(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id } = req.body;

        if (!id) {
            res.status(422).json({
                ok: false,
                message: "Please provide user Id.",
            });
            return;
        }

        try {
            const cost = await prisma.cost.findUnique({
                where: {
                    id,
                },
            });

            if (!cost) {
                res.status(500).json({ ok: true, message: "Cost not found!" });
            }

            res.status(200).json({ ok: true, data: cost });
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
