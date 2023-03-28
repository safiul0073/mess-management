import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import protectedRoute from "../../../middleware/protectedRoute";

async function store(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { unitAmount, additionalAmount, month, year } = req.body;

    if (!unitAmount || !month || !year || !additionalAmount) {
      res.status(422).json({
        ok: false,
        message: "Please provide all the required fields",
      });
      return;
    }

    try {
      // creating
      const homeRent = await prisma.homeRent.create({
        data: {
          unitAmount,
          month,
          year,
          additionalAmount,
        },
      });

      const totalAmount = parseFloat(unitAmount) + parseFloat(additionalAmount);

      const userCount = await prisma.user.count({
        where: {
          status: "active",
        },
      });

      const memberAmount = totalAmount / userCount;

      const users = await prisma.user.findMany({
        where: {
          status: "active",
        },
        select: {
          id: true,
        },
      });

      const memberRents = users.map((user: any) => {
        return {
          homeRentId: homeRent.id,
          userId: String(user.id),
          primaryAmount: memberAmount,
          month,
          year,
        };
      });

      const memberRent = await prisma.memberRent.createMany({
        data: memberRents,
      });

      if (!memberRent) {
        res.status(422).json({ ok: false, message: "Member Rent not created" });
        return;
      }

      res.status(201).json({ ok: true, message: "Member Rent amount saved." });
      return;
    } catch (error) {
      res.status(500).json({ ok: false, message: "Something want wrong." });
    }
  }

  res.status(404).json({ ok: false, message: "Method not match." });
}

export default protectedRoute(store);
