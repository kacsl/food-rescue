type IconProps = { size?: string };

export function CheckIcon({ size = "var(--size-icon-xs)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M5 12.5 10 17.5 19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MinusIcon({ size = "var(--size-icon-xs)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ size = "var(--size-icon-md)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <circle cx="11" cy="11" r="6" strokeWidth="2" />
      <path d="m16 16 5 5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon({ size = "var(--size-icon-md)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="m6 9 6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = "var(--size-icon-sm)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M6 6l12 12M18 6 6 18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ size = "var(--size-icon-sm)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function InfoIcon({ size = "var(--size-icon-md)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <circle cx="12" cy="12" r="8" strokeWidth="2" />
      <path d="M12 11v5M12 8h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = "var(--size-icon-md)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="m15 6-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ size = "var(--size-icon-md)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="m9 6 6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ size = "var(--size-icon-md)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M8 6.5v11l10-5.5-10-5.5Z" />
    </svg>
  );
}

export function PauseIcon({ size = "var(--size-icon-md)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M7 6h3v12H7V6Zm7 0h3v12h-3V6Z" />
    </svg>
  );
}

export function TrendUpIcon({ size = "var(--size-icon-xs)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M5 16 11 10l4 4 5-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrendDownIcon({ size = "var(--size-icon-xs)" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M5 8 11 14l4-4 5 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SpinnerIcon({ size = "var(--size-spinner-sm)" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      style={{ width: size, height: size, animation: "evolve-spin 0.8s linear infinite" }}
    >
      <circle cx="12" cy="12" r="8" strokeWidth="2" opacity="var(--opacity-20)" />
      <path d="M20 12a8 8 0 0 0-8-8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
