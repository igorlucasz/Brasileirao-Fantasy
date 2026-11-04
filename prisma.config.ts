// Configuração do Prisma CLI (Prisma ORM 7).
// Docs: https://www.prisma.io/docs/orm/v7
//
// O Next.js lê .env.local sozinho, mas o Prisma CLI não. Por isso carregamos
// .env.local (e .env, se existir) manualmente aqui.
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: [".env.local", ".env"], quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // process.env (e não env()) para que `prisma generate` funcione sem
    // DATABASE_URL definida (ex.: no CI e no `npm install`).
    url: process.env.DATABASE_URL,
  },
});
