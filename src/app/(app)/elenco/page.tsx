import type { Metadata } from "next";
import { PreviewHeading, RosterPreview } from "@/components/league-preview";
export const metadata: Metadata = { title: "Seu elenco | DORMINHOCO" };
export default function Page() {
  return (
    <>
      <PreviewHeading title="Seu elenco" subtitle="Os jogadores que representam o PH FC." />
      <RosterPreview />
    </>
  );
}
