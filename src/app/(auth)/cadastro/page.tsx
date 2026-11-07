import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
export const metadata: Metadata = { title: "Cadastro | DORMINHOCO" };
export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Sua próxima rivalidade começa aqui.
      </h1>
      <p className="text-muted mt-3 mb-8 text-sm leading-relaxed">
        Crie seu perfil para entrar no jogo.
      </p>
      <AuthForm mode="cadastro" />
    </>
  );
}
