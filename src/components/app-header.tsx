"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand";
const links = [
  ["/partida", "PARTIDA"],
  ["/elenco", "ELENCO"],
  ["/jogadores", "JOGADORES"],
  ["/liga", "LIGA"],
];
export function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="border-line bg-surface border-b">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 pt-5 md:px-8">
        <Brand />
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="bg-accent text-ink flex size-10 items-center justify-center rounded-full text-xs font-extrabold"
          >
            PH
          </span>
          <div>
            <p className="text-sm font-bold">PH</p>
            <p className="text-muted text-xs">PH FC · Demonstração</p>
          </div>
          <Link href="/" className="text-muted hover:text-accent ml-3 text-xs">
            Voltar ao início
          </Link>
        </div>
        <nav aria-label="Navegação principal" className="grid w-full grid-cols-2 gap-1 sm:flex">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`shrink-0 border-b-2 px-3 py-4 text-sm font-bold transition ${pathname === href ? "border-accent text-accent" : "text-muted hover:text-foreground border-transparent"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
