/* eslint-disable prefer-const */
/* eslint-disable no-unneeded-ternary */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function update(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, amount, date, memberId } = req.body;

    if (!id || !amount || !date || !memberId) {
      res.status(422).json({
        ok: false,
        message: "Please provide all the required fields",
      });
      return;
    }

    try {
      // updating cost
      const cost = await prisma.cost.update({
        where: {
          id,
        },
        data: {
          amount,
          date,
          memberId,
        },
      });

      if (!cost) {
        res.status(422).json({ ok: false, message: "Cost not created" });
        return;
      }

      res.status(201).json({ ok: true, message: "Cost created." });
      return;
    } catch (error) {
      res.status(500).json({ ok: false, message: "Something want wrong." });
    }
  }

  res.status(404).json({ ok: false, message: "Method not match." });
}

export default protectedRoute(update);
