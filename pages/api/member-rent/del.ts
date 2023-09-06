import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function del(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id } = req.body;

        if (!id) {
            res.status(422).json({
                ok: false,
                message: "Please provide meal Id.",
            });
            return;
        }

        try {
            const homeRent = await prisma.homeRent.delete({
                where: {
                    id,
                },
            });

            if (!homeRent) {
                res.status(500).json({
                    ok: true,
                    message: "Home Rent not deleted",
                });
            }

            res.status(200).json({ ok: true, message: "Home Rent deleted." });
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

export default protectedRoute(del);
