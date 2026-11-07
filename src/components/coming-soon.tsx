import Link from "next/link";
import { Crown } from "@/components/crown";
import { buttonStyles } from "@/components/button";
export function ComingSoon({
  title,
  description,
  label,
}: {
  title: string;
  description: string;
  label: string;
}) {
  return (
    <section>
      <p className="text-accent mb-3 text-xs font-semibold tracking-widest uppercase">{label}</p>
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-muted mt-4 max-w-xl leading-relaxed">{description}</p>
      <div className="border-line bg-surface mt-10 rounded-2xl border px-6 py-14 text-center">
        <span
          aria-hidden="true"
          className="bg-accent/10 text-accent mb-5 inline-flex size-14 items-center justify-center rounded-full text-2xl"
        >
          <Crown className="h-8 w-10" />
        </span>
        <h2 className="text-lg font-medium">O próximo capítulo está em preparação</h2>
        <p className="text-muted mx-auto mt-3 max-w-md text-sm leading-relaxed">
          Esta área estará disponível em uma próxima etapa. Por enquanto, você pode conhecer as
          telas de acesso.
        </p>
        <Link href="/cadastro" className={`${buttonStyles} mt-6`}>
          Conhecer o cadastro
        </Link>
      </div>
    </section>
  );
}
