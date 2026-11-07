import type { Metadata } from "next";
import { PreviewHeading } from "@/components/league-preview";
import { PlayerBrowser } from "@/components/player-browser";
export const metadata: Metadata = { title: "Jogadores | DORMINHOCO" };
export default function Page() {
  return (
    <>
      <PreviewHeading
        title="Jogadores"
        subtitle="Explore os perfis e encontre opções para o seu time."
      />
      <PlayerBrowser />
    </>
  );
}
