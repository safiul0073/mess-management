/* eslint-disable prefer-const */
/* eslint-disable no-unneeded-ternary */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import protectedRoute from "../../../middleware/protectedRoute";

async function update(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id, name, email, phone, password, role } = req.body;
        if (!id) {
            res.status(422).json({
                ok: false,
                message: "Please provide all the required fields",
            });
            return;
        }

        try {
            let hashedPassword: string = "";
            if (password) {
                // password converting normal to hash
                const salt = bcrypt.genSaltSync(10);
                hashedPassword = await bcrypt.hash(password, salt);
            }
            // creating user
            const user = await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    name: name ? name : undefined,
                    email: email ? email : undefined,
                    phone: phone ? phone : undefined,
                    password: hashedPassword ? hashedPassword : undefined,
                    role: role ? role : undefined,
                },
            });

            if (!user) {
                res.status(422).json({
                    ok: false,
                    message: "User not updated",
                });
                return;
            }

            res.status(201).json({ ok: true, message: "User updated." });
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
