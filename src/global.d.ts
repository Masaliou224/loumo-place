import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface global {
      prisma: PrismaClient;
    }
  }
}

export {};