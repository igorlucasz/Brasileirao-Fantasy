import { NextResponse } from "next/server";

import { SessaoSchema } from "@/contracts/sessao";
import { obterUsuarioSessao } from "@/server/auth/sessao";

export async function GET() {
  const usuario = await obterUsuarioSessao();
  return NextResponse.json(SessaoSchema.parse({ usuario }));
}
