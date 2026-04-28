import { PrismaClient } from "@prisma/client";

/** @type {typeof globalThis & { prisma?: PrismaClient }} */
const globalForPrisma = globalThis;

/** @type {PrismaClient} */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}