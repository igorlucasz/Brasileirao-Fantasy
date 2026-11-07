import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
export const metadata: Metadata = { title: "Login | DORMINHOCO" };
export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight">Bom ter você de volta.</h1>
      <p className="text-muted mt-3 mb-8 text-sm leading-relaxed">
        Entre para acompanhar seu time e sua liga.
      </p>
      <AuthForm mode="login" />
    </>
  );
}
