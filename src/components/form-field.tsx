import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  id: string;
};
export function FormField({ label, error, hint, id, ...props }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        {...props}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error || hint ? `${id}-help` : undefined}
        className="border-line bg-background placeholder:text-muted/80 min-h-12 w-full rounded-xl border px-4 text-base aria-invalid:border-red-200"
      />
      {(error || hint) && (
        <p id={`${id}-help`} className={`text-sm ${error ? "text-red-100" : "text-muted"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
