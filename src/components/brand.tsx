import Link from "next/link";
import { Crown } from "@/components/crown";
export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 text-white"
      aria-label="DORMINHOCO — início"
    >
      <Crown className="text-accent h-9 w-12 shrink-0" />
      <span className="text-lg font-extrabold tracking-tight sm:text-xl">DORMINHOCO</span>
    </Link>
  );
}
