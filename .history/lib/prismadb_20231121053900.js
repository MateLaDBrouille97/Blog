// import { PrismaClient } from "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined
// }

// const prismadb = globalThis.prisma || new PrismaClient({
//   datasources: {
//     db: {
//       // hardcoded connection string for simplicity
//       url: process.env.DATABASE_URL,
//     },
//   },
// })
// if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

// export default prismadb;



import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

if (!global.prisma) {
  const prismadb = new PrismaClient({
    datasources: {
      db: {
        // hardcoded connection string for simplicity
        url: process.env.DATABASE_URL,
      },
    },
  });

  if (process.env.NODE_ENV !== "production") {
    global.prisma = prismadb;
  }
}


module.exports = global.prisma;
