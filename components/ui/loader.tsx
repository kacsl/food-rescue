import { SpinnerIcon } from "../../lib/icons";

export const LOADER_SCOPES = ["Inline", "Block", "Overlay"] as const;
export type LoaderScope = (typeof LOADER_SCOPES)[number];

export function Loader({
  scope = "Inline",
  label = "Loading",
  showLabel = true,
}: {
  scope?: LoaderScope;
  label?: string;
  showLabel?: boolean;
}) {
  const size = scope === "Inline" ? "var(--size-spinner-sm)" : "var(--size-spinner-xl)";
  const content = (
    <span
      role="status"
      aria-live="polite"
      style={{
        display: "inline-flex",
        flexDirection: scope === "Inline" ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-inline-sm)",
        color: "var(--color-text-secondary)",
        fontSize: "var(--font-size-body-sm)",
      }}
    >
      <SpinnerIcon size={size} />
      {showLabel ? <span>{label}</span> : null}
    </span>
  );

  if (scope === "Overlay") {
    return (
      <div
        aria-busy="true"
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "var(--size-multiline-md)",
          background: "color-mix(in srgb, var(--color-background-surface) calc(var(--opacity-loading) * 100%), transparent)",
        }}
      >
        {content}
      </div>
    );
  }

  if (scope === "Block") {
    return (
      <div aria-busy="true" style={{ display: "grid", placeItems: "center", minHeight: "var(--size-multiline-md)" }}>
        {content}
      </div>
    );
  }

  return content;
}
