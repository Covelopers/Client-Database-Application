// // import { PrismaClient } from "@prisma/client";

// // import { env } from "~/env";

// // const createPrismaClient = () =>
// //   new PrismaClient({
// //     log:
// //       env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
// //   });

// // const globalForPrisma = globalThis as unknown as {
// //   prisma: ReturnType<typeof createPrismaClient> | undefined;
// // };

// // export const db = globalForPrisma.prisma ?? createPrismaClient();

// // if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;


// // import { PrismaClient } from "@prisma/client";
// // import { env } from "~/env";

// // const createPrismaClient = () => {
// //   // In Electron production, use the runtime DATABASE_URL
// //   // In development, use the schema default
// //   const databaseUrl = process.env.DATABASE_URL;

// //   return new PrismaClient({
// //     log:
// //       env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
// //     ...(databaseUrl && {
// //       datasources: {
// //         db: {
// //           url: databaseUrl
// //         }
// //       }
// //     })
// //   });
// // };

// // const globalForPrisma = globalThis as unknown as {
// //   prisma: ReturnType<typeof createPrismaClient> | undefined;
// // };

// // export const db = globalForPrisma.prisma ?? createPrismaClient();

// // if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;


// // import { PrismaClient } from "@prisma/client";

// // const createPrismaClient = () => {
// //   const databaseUrl = process.env.DATABASE_URL;
// //   const nodeEnv = process.env.NODE_ENV;

// //   console.log('[DB] Creating Prisma Client');
// //   console.log('[DB] DATABASE_URL:', databaseUrl);
// //   console.log('[DB] NODE_ENV:', nodeEnv);

// //   return new PrismaClient({
// //     log: nodeEnv === "development" ? ["query", "error", "warn"] : ["error"],
// //     ...(databaseUrl && {
// //       datasources: {
// //         db: {
// //           url: databaseUrl
// //         }
// //       }
// //     })
// //   });
// // };

// // const globalForPrisma = globalThis as unknown as {
// //   prisma: ReturnType<typeof createPrismaClient> | undefined;
// // };

// // export const db = globalForPrisma.prisma ?? createPrismaClient();

// // if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;


// // import { PrismaClient } from "@prisma/client";

// // const createPrismaClient = () => {
// //   const databaseUrl = process.env.DATABASE_URL;
// //   const nodeEnv = process.env.NODE_ENV;

// //   console.log('[DB] ========== PRISMA CLIENT INIT ==========');
// //   console.log('[DB] DATABASE_URL:', databaseUrl);
// //   console.log('[DB] NODE_ENV:', nodeEnv);
// //   console.log('[DB] All env vars:', Object.keys(process.env));

// //   return new PrismaClient({
// //     log: ["query", "error", "warn"],
// //     ...(databaseUrl && {
// //       datasources: {
// //         db: {
// //           url: databaseUrl
// //         }
// //       }
// //     })
// //   });
// // };

// // const globalForPrisma = globalThis as unknown as {
// //   prisma: ReturnType<typeof createPrismaClient> | undefined;
// // };

// // export const db = globalForPrisma.prisma ?? createPrismaClient();

// // if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;


// import { PrismaClient } from "@prisma/client";

// let prismaInstance: PrismaClient | undefined;

// const createPrismaClient = () => {
//   // Force reading DATABASE_URL at runtime, not build time
//   const databaseUrl = process.env.DATABASE_URL || "file:./prisma/app.db";

//   console.log('[DB] ========== PRISMA CLIENT INIT (RUNTIME) ==========');
//   console.log('[DB] DATABASE_URL from process.env:', process.env.DATABASE_URL);
//   console.log('[DB] Using URL:', databaseUrl);

//   return new PrismaClient({
//     log: ["query", "error", "warn"],
//     datasources: {
//       db: {
//         url: databaseUrl
//       }
//     }
//   });
// };

// // Don't cache globally - recreate on each import to pick up env changes
// export const db = createPrismaClient();


// import { PrismaClient } from "@prisma/client";

// let prismaInstance: PrismaClient | undefined;

// export const db = prismaInstance ?? new PrismaClient({
//   log: ["error"], // or ["query", 
// "error", "warn"] in dev
//   datasources: {
//     db: {
//       url: "file:./app.db"
//     }
//   }
// });

// // Ensure singleton
// if (!prismaInstance) {
//   prismaInstance = db;
//   console.log('[DB] ========== PRISMA CLIENT CREATED ==========');
//   console.log('[DB] DATABASE_URL: file:./app.db');
// }


import { PrismaClient, Prisma } from "@prisma/client";

// CRITICAL: Prioritize the absolute path set by Electron in production.
// If not set (like during npm run dev), fallback to the relative path required for local dev/build.
const databaseUrl = process.env.DATABASE_URL || "file:./app.db";

const logLevels = ["error"] as const;
const logOptions: (Prisma.LogLevel | Prisma.LogDefinition)[] = logLevels as unknown as (Prisma.LogLevel | Prisma.LogDefinition)[];

const prismaOptions = {
  log: logOptions,
  datasources: {
    db: {
      url: databaseUrl
    }
  }
};

let prismaInstance: PrismaClient | undefined;

// Use the explicit options which will correctly resolve 'file:./app.db' in dev 
// and the absolute path in production.
export const db = prismaInstance ?? new PrismaClient(prismaOptions);

if (!prismaInstance) {
  prismaInstance = db;
  console.log(`[DB] Using DATABASE_URL: ${databaseUrl}`);
}