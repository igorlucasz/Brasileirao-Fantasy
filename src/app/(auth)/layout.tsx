import type { ReactNode } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand";
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="platform-shell">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-7 md:px-8">
        <Brand />
        <Link href="/partida" className="text-muted hover:text-accent text-sm font-semibold">
          Explorar prévia
        </Link>
      </header>
      <main id="conteudo" className="flex flex-1 items-center justify-center px-6 py-8 sm:py-12">
        <section className="border-line bg-surface w-full max-w-lg rounded-3xl border p-6 sm:p-10">
          {children}
        </section>
      </main>
      <div className="h-8" aria-hidden="true" />
    </div>
  );
}
