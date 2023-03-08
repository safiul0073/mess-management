import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { name, email, phone, password, role } = req.body;

  if (
    name == null ||
    email == null ||
    phone == null ||
    password == null ||
    role == null
  ) {
    res
      .status(400)
      .send({ ok: true, message: "Please provide all the required fields" });
    return;
  }

  try {
    // checking email has in old user
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists != null) {
      res.status(400).send({ ok: false, message: "User already exists" });
      return;
    }

    // password hashing by bcryptjs length 10
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
      },
    });

    if (user == null) {
      res.status(400).json({ ok: false, message: "User not created" });
      return;
    }

    res.status(201).json({ ok: true, message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Something want wrong!" });
  }
}
