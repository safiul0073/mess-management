import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function store(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { breakFast, lunch, dinar, date, memberId } = req.body;

        if (!breakFast || !date || !memberId) {
            res.status(422).json({
                ok: false,
                message: "Please provide all the required fields",
            });
            return;
        }

        try {
            // creating meal
            const meal = await prisma.meal.create({
                data: {
                    breakFast,
                    lunch,
                    dinar,
                    date,
                    memberId,
                },
            });

            if (!meal) {
                res.status(422).json({
                    ok: false,
                    message: "Meal not created",
                });
                return;
            }

            res.status(201).json({ ok: true, message: "Meal created." });
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

export default protectedRoute(store);
