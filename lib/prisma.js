import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query", "error", "warn"],
  })
}

export const prisma =
  globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}