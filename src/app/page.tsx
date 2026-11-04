// Página inicial provisória (esqueleto do projeto).
// Território: PH — pode substituir livremente quando começar as telas.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Brasileirão Fantasy</h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        Monte seu time com jogadores reais do Brasileirão e enfrente seus amigos rodada a rodada.
      </p>
      <p className="text-sm text-zinc-500">Em construção.</p>
    </main>
  );
}
