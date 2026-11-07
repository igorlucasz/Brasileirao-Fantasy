import type { ButtonHTMLAttributes } from "react";

export const buttonStyles =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-bold text-ink transition hover:bg-[#ffda33] disabled:cursor-not-allowed disabled:opacity-50";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`${buttonStyles} ${className}`} {...props} />;
}
