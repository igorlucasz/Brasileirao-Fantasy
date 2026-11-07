// Sessão do usuário atual, para uso nos route handlers. Território: Igor.
import "server-only";

import { headers } from "next/headers";

import type { UsuarioSessao } from "@/contracts/sessao";

import { auth } from ".";

export async function obterUsuarioSessao(): Promise<UsuarioSessao | null> {
  const sessao = await auth.api.getSession({ headers: await headers() });
  if (!sessao) return null;

  const { id, name, email } = sessao.user;
  return { id, nome: name, email };
}
