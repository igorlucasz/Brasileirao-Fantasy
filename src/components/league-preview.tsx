import Link from "next/link";
import type { ReactNode } from "react";
import { Crown } from "@/components/crown";

// Dados fictícios de apresentação; a formação foi definida pelo PH.
export const previewPlayers = [
  { nome: "Lucas Almeida", clube: "Clube Verde", posicao: "GOL", pontos: 7.5 },
  { nome: "Rafael Santos", clube: "Clube Azul", posicao: "DEF", pontos: 8.2 },
  { nome: "Gustavo Nunes", clube: "Clube Branco", posicao: "DEF", pontos: 5.0 },
  { nome: "Thiago Reis", clube: "Clube Amarelo", posicao: "DEF", pontos: 6.3 },
  { nome: "Bruno Costa", clube: "Clube Branco", posicao: "MEI", pontos: 10.4 },
  { nome: "Henrique Alves", clube: "Clube Azul", posicao: "MEI", pontos: 7.2 },
  { nome: "Vinícius Dias", clube: "Clube Verde", posicao: "MEI", pontos: 8.1 },
  { nome: "Pedro Lima", clube: "Clube Amarelo", posicao: "ATA", pontos: 12.0 },
  { nome: "Gabriel Torres", clube: "Clube Branco", posicao: "ATA", pontos: 9.3 },
];
export const previewReserves = [
  { nome: "Daniel Freitas", clube: "Clube Azul", posicao: "GOL", pontos: 4.0 },
  { nome: "Leonardo Ramos", clube: "Clube Verde", posicao: "ATA", pontos: 3.5 },
  { nome: "Matheus Barros", clube: "Clube Branco", posicao: "ATA", pontos: 5.2 },
  { nome: "Eduardo Castro", clube: "Clube Amarelo", posicao: "ATA", pontos: 6.1 },
  { nome: "Samuel Ribeiro", clube: "Clube Azul", posicao: "ATA", pontos: 4.8 },
];
export const previewOpponents = [
  { nome: "Diego Rocha", clube: "Clube Amarelo", posicao: "GOL", pontos: 6.0 },
  { nome: "Caio Martins", clube: "Clube Branco", posicao: "DEF", pontos: 7.1 },
  { nome: "Renan Vieira", clube: "Clube Verde", posicao: "DEF", pontos: 4.7 },
  { nome: "Vitor Teixeira", clube: "Clube Azul", posicao: "DEF", pontos: 5.8 },
  { nome: "Felipe Souza", clube: "Clube Verde", posicao: "MEI", pontos: 9.5 },
  { nome: "Arthur Mendes", clube: "Clube Amarelo", posicao: "MEI", pontos: 6.2 },
  { nome: "Davi Moreira", clube: "Clube Branco", posicao: "MEI", pontos: 7.4 },
  { nome: "André Melo", clube: "Clube Azul", posicao: "ATA", pontos: 11.0 },
  { nome: "João Azevedo", clube: "Clube Verde", posicao: "ATA", pontos: 8.0 },
];
export const previewOpponentReserves = [
  { nome: "Alex Pinto", clube: "Clube Branco", posicao: "GOL", pontos: 3.1 },
  { nome: "Luiz Farias", clube: "Clube Azul", posicao: "DEF", pontos: 4.3 },
  { nome: "Igor Duarte", clube: "Clube Verde", posicao: "DEF", pontos: 5.6 },
  { nome: "Enzo Campos", clube: "Clube Amarelo", posicao: "MEI", pontos: 6.0 },
  { nome: "Murilo Lopes", clube: "Clube Branco", posicao: "ATA", pontos: 4.2 },
];
// As cinco vagas de reserva aceitam qualquer combinação de posições.
export const previewAvailablePlayers = [
  { nome: "Otávio Brito", clube: "Clube Verde", posicao: "GOL", pontos: 4.6 },
  { nome: "César Pires", clube: "Clube Azul", posicao: "DEF", pontos: 5.3 },
  { nome: "Wesley Moura", clube: "Clube Branco", posicao: "MEI", pontos: 7.0 },
  { nome: "Alan Fernandes", clube: "Clube Amarelo", posicao: "ATA", pontos: 8.4 },
];
export const previewTotal = previewPlayers.reduce((sum, p) => sum + p.pontos, 0);
export const previewOpponentTotal = previewOpponents.reduce((sum, p) => sum + p.pontos, 0);
export const points = (value: number) => value.toFixed(1).replace(".", ",");
export function PreviewHeading({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="text-accent mb-2 text-xs font-bold tracking-widest uppercase">
          Liga dos Amigos · Rodada de exemplo
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
export function TeamBadge({ initials, blue = false }: { initials: string; blue?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border text-sm font-extrabold ${blue ? "bg-brand-blue border-white/20 text-white" : "bg-accent text-ink border-accent"}`}
    >
      {initials}
    </span>
  );
}
export function PlayerLine({ player }: { player: (typeof previewPlayers)[number] }) {
  return (
    <div className="flex min-w-0 items-center gap-3 py-4">
      <span
        data-position={player.posicao}
        className="position-badge flex size-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold text-white"
      >
        {player.posicao}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{player.nome}</p>
        <p className="text-muted mt-1 text-xs">{player.clube}</p>
      </div>
      <span className="font-mono text-lg font-bold">{points(player.pontos)}</span>
    </div>
  );
}
function ComparedPlayers({
  players,
  opponents,
}: {
  players: typeof previewPlayers;
  opponents: typeof previewPlayers;
}) {
  return (
    <div>
      {players.map((p, i) => (
        <div
          key={p.nome}
          className="grid grid-cols-1 gap-x-8 border-b border-white/10 last:border-0 sm:grid-cols-2"
        >
          <div>
            <span className="text-muted text-[10px] sm:hidden">PH FC</span>
            <PlayerLine player={p} />
          </div>
          <div className="border-t border-white/5 sm:border-0">
            <span className="text-muted text-[10px] sm:hidden">Igor FC</span>
            <PlayerLine player={opponents[i]} />
          </div>
        </div>
      ))}
    </div>
  );
}
export function MatchPreview() {
  const total = previewTotal;
  const opposingTotal = previewOpponentTotal;
  return (
    <>
      <section
        className="border-line bg-surface overflow-hidden rounded-3xl border"
        aria-label="Comparação dos elencos"
      >
        <div className="border-line border-b bg-white/5 px-5 py-8 sm:px-8">
          <p className="text-muted mb-6 text-center text-xs font-semibold uppercase">
            Confronto demonstrativo
          </p>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <TeamBadge initials="PH" />
              <h2 className="font-extrabold sm:text-xl">
                PH FC <span className="text-accent block text-xs font-semibold">Seu time</span>
              </h2>
              <p className="text-accent font-mono text-3xl font-bold sm:text-5xl">
                {points(total)}
              </p>
            </div>
            <span className="text-muted text-xs font-bold">VS</span>
            <div className="flex flex-col items-center gap-3 text-center">
              <TeamBadge initials="IF" blue />
              <h2 className="font-extrabold sm:text-xl">
                Igor FC <span className="text-muted block text-xs font-semibold">Igor</span>
              </h2>
              <p className="font-mono text-3xl font-bold sm:text-5xl">{points(opposingTotal)}</p>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-8">
          <div className="text-muted mb-2 flex justify-between text-xs font-bold uppercase">
            <span>Seu elenco</span>
            <span>Adversário</span>
          </div>
          <p className="text-accent mt-5 mb-2 text-sm font-bold">Titulares · 9 por time</p>
          <p className="text-muted mb-4 text-xs">1 GOL · 3 DEF · 3 MEI · 2 ATA</p>
          <ComparedPlayers players={previewPlayers} opponents={previewOpponents} />
          <h2 className="text-accent mt-8 mb-2 border-t border-white/15 pt-6 text-sm font-bold">
            Reservas · 5 por time
          </h2>
          <p className="text-muted mb-4 text-xs">Vagas livres: qualquer combinação de posições.</p>
          <ComparedPlayers players={previewReserves} opponents={previewOpponentReserves} />
        </div>
      </section>
      <p className="text-muted mt-4 text-xs leading-relaxed">
        14 jogadores por time: 9 titulares e 5 reservas. Nomes, clubes e pontos fictícios. O placar
        ilustrativo soma os titulares; regras de pontuação e uso dos reservas ainda serão definidas.
      </p>
      <Link
        href="/elenco"
        className="text-accent mt-6 inline-block text-sm font-bold hover:underline"
      >
        Ver meu elenco →
      </Link>
    </>
  );
}
export function RosterPreview() {
  return (
    <>
      <div className="border-line bg-surface mb-6 flex items-center gap-4 rounded-2xl border p-5">
        <TeamBadge initials="PH" />
        <div>
          <h2 className="text-lg font-extrabold">PH FC</h2>
          <p className="text-muted mt-1 text-sm">PH · Liga dos Amigos</p>
        </div>
        <Crown className="text-accent ml-auto h-9 w-12" />
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="border-line bg-surface rounded-2xl border p-5 sm:p-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-bold">Titulares</h2>
            <span className="text-accent text-xs font-bold">9 jogadores</span>
          </div>
          <p className="text-muted mb-4 text-xs">1 GOL · 3 DEF · 3 MEI · 2 ATA</p>
          <div className="divide-y divide-white/10">
            {previewPlayers.map((p) => (
              <PlayerLine key={p.nome} player={p} />
            ))}
          </div>
        </section>
        <section className="border-line bg-surface rounded-2xl border p-5 sm:p-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-bold">Reservas</h2>
            <span className="text-accent text-xs font-bold">5 jogadores</span>
          </div>
          <p className="text-muted mb-4 text-xs">5 vagas livres · Qualquer posição</p>
          <div className="divide-y divide-white/10">
            {previewReserves.map((p) => (
              <PlayerLine key={p.nome} player={p} />
            ))}
          </div>
        </section>
      </div>
      <p className="text-muted mt-4 text-xs">
        14 jogadores no elenco. As 5 vagas de reserva aceitam qualquer posição, sem cotas por
        posição. Nomes, clubes e pontuações ilustrativos.
      </p>
      <Link
        href="/jogadores"
        className="text-accent mt-6 inline-block text-sm font-bold hover:underline"
      >
        Explorar jogadores →
      </Link>
    </>
  );
}
export function LeaguePreview() {
  const teams = [
    { nome: "Bola na Rede", dono: "Marina", v: 4, d: 1 },
    { nome: "PH FC", dono: "PH · Você", v: 3, d: 2 },
    { nome: "Igor FC", dono: "Igor", v: 2, d: 3 },
    { nome: "Resenha FC", dono: "João", v: 1, d: 4 },
  ];
  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <section className="border-line bg-surface rounded-2xl border p-5 sm:p-7">
        <h2 className="mb-6 text-lg font-bold">Confrontos da rodada</h2>
        {[
          ["PH FC", "Igor FC", points(previewTotal), points(previewOpponentTotal)],
          ["Bola na Rede", "Resenha FC", "41,0", "29,2"],
        ].map(([a, b, pa, pb], i) => (
          <div
            key={a}
            className={`mb-4 rounded-xl border p-4 last:mb-0 ${i === 0 ? "border-accent/60 bg-accent/5" : "border-white/15"}`}
          >
            <p className="text-muted mb-4 text-xs">
              {i === 0 ? "Seu confronto" : "Confronto da liga"}
            </p>
            <div className="flex items-center justify-between gap-3 text-sm font-bold">
              <span>{a}</span>
              <span className="text-accent font-mono">{pa}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm font-bold">
              <span>{b}</span>
              <span className="font-mono">{pb}</span>
            </div>
            {i === 0 && (
              <Link
                href="/partida"
                className="text-accent mt-4 inline-block text-xs font-bold hover:underline"
              >
                Comparar elencos →
              </Link>
            )}
          </div>
        ))}
      </section>
      <section className="border-line bg-surface overflow-hidden rounded-2xl border">
        <h2 className="p-5 text-lg font-bold sm:p-7">Classificação</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Classificação ilustrativa da Liga dos Amigos</caption>
            <thead className="text-muted border-y border-white/10 bg-white/5 text-xs">
              <tr>
                <th scope="col" className="px-4 py-3">
                  #
                </th>
                <th scope="col" className="py-3">
                  Time
                </th>
                <th scope="col" className="px-3 py-3">
                  <abbr title="Vitórias">V</abbr>
                </th>
                <th scope="col" className="px-4 py-3">
                  <abbr title="Derrotas">D</abbr>
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, i) => (
                <tr
                  key={team.nome}
                  className={i === 1 ? "bg-accent/10" : "border-b border-white/5"}
                >
                  <td className="text-accent px-4 py-5 font-mono">{i + 1}</td>
                  <th scope="row" className="py-5 font-bold">
                    {team.nome}
                    <span className="text-muted mt-1 block text-xs font-normal">{team.dono}</span>
                  </th>
                  <td className="px-3 font-mono">{team.v}</td>
                  <td className="px-4 font-mono">{team.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted px-5 py-5 text-xs leading-relaxed">
          Resultados e ordem fictícios para demonstrar o visual. Critérios de classificação ainda
          serão definidos.
        </p>
      </section>
    </div>
  );
}
