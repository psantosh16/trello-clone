import { PrismaClient } from "../../prisma/generated/client";

/*
Extend the NodeJS global object to include a new property
*/

declare global {
  var prisma: PrismaClient | undefined;
}

/*
[globalThis] is excluded from NextJs hot-reloading, so we can use it to store the PrismaClient instance.
This way, the PrismaClient instance is preserved between hot-reloads, which can help improve performance during Development phase
*/
export const db = globalThis.prisma || new PrismaClient();

if (process.env.APP_ENV !== "production") globalThis.prisma = db;
