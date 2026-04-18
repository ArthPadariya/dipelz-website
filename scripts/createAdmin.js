import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@dipelz.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@dipelz.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin created:", admin);
}

main()
  .catch(console.error)
  .finally(() => process.exit());