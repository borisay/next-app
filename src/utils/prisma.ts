import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";

// The database URL is now typically read from the environment variables by the adapter
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({ connectionString });

// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// Define a global variable to persist the client across hot reloads in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  // globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());
  new PrismaClient({
    adapter,
    // Optional: add logging in development
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const prismaClientSingleton = () => {
//   // 1. Set up the native pg driver pool
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//   // 2. Create the Prisma adapter
//   const adapter = new PrismaPg(pool);

//   // 3. Instantiate and extend the client
//   // Note: Prisma 7 requires either 'adapter' OR 'accelerateUrl' in the constructor
//   return new PrismaClient({ adapter }).$extends(withAccelerate());
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
