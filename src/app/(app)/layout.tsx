import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="platform-shell">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:p-4">
        Pular para o conteúdo
      </a>
      <AppHeader />
      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8 md:py-14">
        <p className="border-line text-muted mb-8 inline-block rounded-full border px-3 py-1 text-xs">
          Prévia visual · Conta, liga e dados de demonstração
        </p>
        <div className="border-line mb-8 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
          <div>
            <p className="text-muted mb-1 text-xs">Sua liga</p>
            <p className="text-lg font-extrabold">Liga dos Amigos</p>
          </div>
          <span className="text-muted rounded-full border border-white/20 px-3 py-1.5 text-xs">
            4 times · Exemplo visual
          </span>
        </div>
        {children}
      </main>
    </div>
  );
}
