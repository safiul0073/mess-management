import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function update(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id, additionalCost } = req.body;

        if (!id || !additionalCost) {
            res.status(422).json({
                ok: false,
                message: "Please provide all the required fields",
            });
            return;
        }

        try {
            // creating meal
            const homeRent = await prisma.memberRent.update({
                where: {
                    id,
                },
                data: {
                    additionalCost,
                },
            });

            if (!homeRent) {
                res.status(422).json({
                    ok: false,
                    message: "Member Rent not updated",
                });
                return;
            }

            res.status(201).json({
                ok: true,
                message: "Member Rent amount saved.",
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

export default protectedRoute(update);
