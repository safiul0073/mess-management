import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function store(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { amount, date, memberId } = req.body;

    if (!amount || !date || !memberId) {
      res.status(422).json({
        ok: false,
        message: "Please provide all the required fields",
      });
      return;
    }

    try {
      // creating meal
      const cost = await prisma.cost.create({
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

export default protectedRoute(store);
