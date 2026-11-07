import type { Metadata } from "next";
import { PreviewHeading, MatchPreview } from "@/components/league-preview";
export const metadata: Metadata = { title: "Sua partida | DORMINHOCO" };
export default function Page() {
  return (
    <>
      <PreviewHeading
        title="Sua partida"
        subtitle="Seu elenco lado a lado com o adversário da rodada."
      />
      <MatchPreview />
    </>
  );
}
