"use client";
import { useState } from "react";
import {
  previewPlayers,
  previewReserves,
  previewOpponents,
  previewOpponentReserves,
  previewAvailablePlayers,
  points,
} from "@/components/league-preview";
const players = [
  ...[...previewPlayers, ...previewReserves].map((p) => ({ ...p, disponibilidade: "Seu elenco" })),
  ...[...previewOpponents, ...previewOpponentReserves].map((p) => ({
    ...p,
    disponibilidade: "Igor FC",
  })),
  ...previewAvailablePlayers.map((p) => ({ ...p, disponibilidade: "Waiver" })),
];
export function PlayerBrowser() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<string | null>(null);
  const visible = players.filter(
    (p) =>
      `${p.nome} ${p.clube}`
        .toLocaleLowerCase("pt-BR")
        .includes(search.toLocaleLowerCase("pt-BR")) &&
      (filter === "Todos" || p.posicao === filter),
  );
  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_180px]">
        <div>
          <label htmlFor="player-search" className="mb-2 block text-sm font-bold">
            Buscar jogador
          </label>
          <input
            id="player-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nome ou clube"
            className="border-line bg-surface placeholder:text-muted min-h-12 w-full rounded-xl border px-4"
          />
        </div>
        <div>
          <label htmlFor="position" className="mb-2 block text-sm font-bold">
            Posição
          </label>
          <select
            id="position"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-line bg-surface min-h-12 w-full rounded-xl border px-4"
          >
            {["Todos", "GOL", "DEF", "MEI", "ATA"].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <p role="status" className="text-muted mb-4 text-xs">
        {visible.length} jogadores de exemplo
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((p) => (
          <article key={p.nome} className="border-line bg-surface rounded-2xl border p-5">
            <div className="mb-4 flex items-center justify-between">
              <span
                data-position={p.posicao}
                className="position-badge rounded-lg px-3 py-2 text-xs font-bold text-white"
              >
                {p.posicao}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs ${p.disponibilidade === "Waiver" ? "bg-brand-blue text-white" : "text-muted bg-white/10"}`}
              >
                {p.disponibilidade}
              </span>
            </div>
            <h2 className="font-extrabold">{p.nome}</h2>
            <p className="text-muted mt-1 text-sm">{p.clube}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-muted text-xs">Pontos ilustrativos</span>
              <strong className="font-mono text-xl">{points(p.pontos)}</strong>
            </div>
            <button
              type="button"
              aria-expanded={selected === p.nome}
              onClick={() => setSelected(selected === p.nome ? null : p.nome)}
              className="text-accent mt-4 text-sm font-bold hover:underline"
            >
              {selected === p.nome ? "Fechar informações" : "Ver informações"}
            </button>
            {selected === p.nome && (
              <div className="mt-4 space-y-3 border-t border-white/10 pt-4 text-sm">
                <p className="text-muted">
                  Jogador e clube fictícios para demonstrar o perfil. Dados de desempenho serão
                  integrados posteriormente.
                </p>
                {p.disponibilidade === "Waiver" && (
                  <>
                    <button
                      type="button"
                      disabled
                      className="bg-accent text-ink min-h-11 w-full cursor-not-allowed rounded-xl px-4 py-3 font-bold opacity-60"
                    >
                      Solicitar no waiver
                    </button>
                    <p className="text-muted text-xs">Aquisições indisponíveis nesta prévia.</p>
                  </>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
      {!visible.length && (
        <p className="text-muted border-line rounded-2xl border p-8 text-center">
          Nenhum jogador encontrado. Tente outro nome ou posição.
        </p>
      )}
    </>
  );
}
