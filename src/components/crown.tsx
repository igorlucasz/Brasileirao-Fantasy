export function Crown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 125" fill="none" aria-hidden="true">
      <path
        d="M24 90 12 28 56 55 90 9 124 55 168 28 156 90Z"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <path d="M28 111H152" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}
