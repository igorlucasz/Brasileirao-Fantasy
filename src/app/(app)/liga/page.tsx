import type { Metadata } from "next";
import { PreviewHeading, LeaguePreview } from "@/components/league-preview";
export const metadata: Metadata = { title: "Sua liga | DORMINHOCO" };
export default function Page() {
  return (
    <>
      <PreviewHeading
        title="Sua liga"
        subtitle="Todos os confrontos e a disputa por cada posição."
      />
      <LeaguePreview />
    </>
  );
}
