import { Crown } from "@/components/crown";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DORMINHOCO",
  description: "DORMINHOCO — fantasy football do Brasileirão.",
};

export default function Home() {
  return (
    <main className="welcome">
      <div className="welcome-arc welcome-arc-yellow" aria-hidden="true" />
      <div className="welcome-arc welcome-arc-blue" aria-hidden="true" />
      <div className="welcome-content">
        <div className="welcome-logo">
          <Crown className="welcome-crown" />
          <h1>DORMINHOCO</h1>
        </div>
        <div className="welcome-actions">
          <Link href="/cadastro" className="welcome-button welcome-button-primary">
            Criar conta
          </Link>
          <Link href="/login" className="welcome-button welcome-button-secondary">
            Entrar
          </Link>
        </div>
      </div>
    </main>
  );
}
