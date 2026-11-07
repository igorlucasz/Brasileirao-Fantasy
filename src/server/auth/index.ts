// Configuração do Better Auth. Território: Igor.
// BETTER_AUTH_SECRET e BETTER_AUTH_URL são lidas do ambiente pelo próprio Better Auth.
import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "@/server/db";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
});
