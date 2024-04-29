import { PrismaClient } from "@prisma/client";

// we do this process because of Next.js Hot reload

declare global {
    var prisma: PrismaClient | undefined;
}

// Every time we save the file Next.js will hot reload and rerun the file
// which will reinitialize the PrismaClient if we do this

// export const db = new PrismaClient();

// This will cause issues and giv warning like Too many clients are running
// so we store the PrismaClient in the globalThis because globalThis is affected by the Next.js hot reload
// so if their is already a PrismaClient running in the globalThis, we can use that
export const db = globalThis.prisma || new PrismaClient();

// and if we are in Development mode or another mode other than Production, we can assign the running PrismaClient to the globalThis.prisma so we can check for it later in hot reload
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// in production mode the only that will run, looks like this
// 👇👇👇
// export const db = new PrismaClient()
