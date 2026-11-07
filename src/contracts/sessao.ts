// Cadastro, login e sessão.
//
// O cadastro e o login usam o authClient (src/lib/auth-client.ts), que chama as rotas
// /api/auth/* do Better Auth. Estes schemas validam os formulários antes do envio.
//
// GET /api/sessao -> Sessao
import { z } from "zod";

const SenhaSchema = z.string().min(8).max(128);

export const CadastroInputSchema = z
  .object({
    nome: z.string().trim().min(1),
    email: z.email(),
    senha: SenhaSchema,
    confirmacaoSenha: z.string(),
  })
  .refine(({ senha, confirmacaoSenha }) => senha === confirmacaoSenha, {
    error: "As senhas não conferem.",
    path: ["confirmacaoSenha"],
  });
export type CadastroInput = z.infer<typeof CadastroInputSchema>;

export const LoginInputSchema = z.object({
  email: z.email(),
  senha: z.string().min(1),
});
export type LoginInput = z.infer<typeof LoginInputSchema>;

export const UsuarioSessaoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.email(),
});
export type UsuarioSessao = z.infer<typeof UsuarioSessaoSchema>;

// usuario é null quando não há sessão.
export const SessaoSchema = z.object({
  usuario: UsuarioSessaoSchema.nullable(),
});
export type Sessao = z.infer<typeof SessaoSchema>;
