import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
//****************** */
// import { PrismaClient } from "../generated/prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     accelerateUrl:process.env.DATABASE_URL,
//   }).$extends(withAccelerate());
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ********************

// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// // import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../generated/prisma/client";
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
