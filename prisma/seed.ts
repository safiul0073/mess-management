import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
const load = async () => {
  try {
    // password converting normal to hash
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash("12345678", salt);

    // creating user
    await prisma.user.create({
      data: {
        name: "Manager",
        email: "manager@mail.com",
        phone: "01676413972",
        password: hashedPassword,
        role: "manager",
      },
    });

    console.log("Added default user data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
load();
