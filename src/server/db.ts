import { PrismaClient } from "@prisma/client";

const NODE_ENV = process.env.NODE_ENV || "development";

const createPrismaClient = () => 
  new PrismaClient({
    log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
  };

  export const db = globalForPrisma.prisma ?? createPrismaClient();

  if (NODE_ENV !== "production") globalForPrisma.prisma = db;