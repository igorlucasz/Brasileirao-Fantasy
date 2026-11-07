"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";

export function AuthForm({ mode }: { mode: "login" | "cadastro" }) {
  const signup = mode === "cadastro";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (signup && !String(data.get("name") || "").trim()) next.name = "Informe seu nome.";
    const email = form.elements.namedItem("email") as HTMLInputElement;
    if (!email.value.trim() || !email.validity.valid) next.email = "Informe um e-mail válido.";
    const password = String(data.get("password") || "");
    if (!password) next.password = "Informe sua senha.";
    else if (signup && password.length < 8) next.password = "Use pelo menos 8 caracteres.";
    if (signup && data.get("confirm") !== password) next.confirm = "As senhas precisam ser iguais.";
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
    if (Object.keys(next).length)
      (form.elements.namedItem(Object.keys(next)[0]) as HTMLInputElement)?.focus();
  }
  return (
    <form noValidate onSubmit={submit} onChange={() => setSubmitted(false)} className="space-y-5">
      {signup && (
        <FormField
          id="name"
          name="name"
          label="Nome"
          autoComplete="name"
          placeholder="Como você quer ser chamado?"
          required
          error={errors.name}
        />
      )}
      <FormField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="voce@exemplo.com"
        required
        error={errors.email}
      />
      <FormField
        id="password"
        name="password"
        label="Senha"
        type="password"
        autoComplete={signup ? "new-password" : "current-password"}
        required
        hint={signup ? "Use pelo menos 8 caracteres." : undefined}
        error={errors.password}
      />
      {signup && (
        <FormField
          id="confirm"
          name="confirm"
          label="Confirme sua senha"
          type="password"
          autoComplete="new-password"
          required
          error={errors.confirm}
        />
      )}
      <Button type="submit" className="w-full">
        {signup ? "Criar conta" : "Entrar"}
      </Button>
      <p role="status" className="text-muted text-sm leading-relaxed">
        {submitted
          ? "Campos validados! Esta é uma prévia visual: nenhum dado foi enviado e nenhuma sessão ou conta foi criada."
          : "Prévia visual. Login e cadastro ainda não estão disponíveis."}
      </p>
      <p className="border-line text-muted border-t pt-5 text-center text-sm">
        {signup ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
        <Link
          className="text-accent font-medium hover:underline"
          href={signup ? "/login" : "/cadastro"}
        >
          {signup ? "Entrar" : "Cadastre-se"}
        </Link>
      </p>
    </form>
  );
}
