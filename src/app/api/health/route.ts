import { connection, NextResponse } from "next/server";

import { SaudeSchema } from "@/contracts/saude";
import { db } from "@/server/db";

export async function GET() {
  await connection(); // Garante que a checagem rode a cada requisição, nunca no build.

  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json(SaudeSchema.parse({ status: "ok", banco: "ok" }));
  } catch {
    return NextResponse.json(SaudeSchema.parse({ status: "erro", banco: "indisponivel" }), {
      status: 503,
    });
  }
}
