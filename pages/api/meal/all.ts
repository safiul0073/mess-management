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
      const meals = await prisma.meal.findMany({
        take: limit,
        skip: limit * (page - 1),
        select: {
          id: true,
        },
      });

      const count = await prisma.meal.count({});

      if (!meals) {
        res.status(500).json({ ok: true, message: "Meal not found1" });
      }

      res
        .status(200)
        .json({ ok: true, data: paginate(meals, count, page, limit) });
      return;
    } catch (error) {
      res.status(500).json({ ok: false, message: "Something want wrong." });
    }
  }

  res.status(404).json({ ok: false, message: "Method not match." });
}

export default protectedRoute(getAll);
