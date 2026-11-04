// Cliente Prisma único da aplicação (singleton).
// Território: Igor. Use apenas em código de servidor (route handlers, services).
//
// Em desenvolvimento o Next.js recarrega módulos a cada mudança (HMR); sem o
// cache em globalThis cada recarga criaria um novo PrismaClient e um novo pool
// de conexões até esgotar o limite do banco.
import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "@/generated/prisma/client";

function createPrismaClient() {
  // O adapter só abre conexão na primeira query, então o build não precisa
  // de DATABASE_URL real.
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
