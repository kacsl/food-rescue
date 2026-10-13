export const PAGE_NUMBER_STATES = ["Default", "Hover", "Focus", "Disabled"] as const;

export function PageNumber({
  selected = "False",
  state = "Default",
  label = "1",
}: {
  selected?: "False" | "True";
  state?: (typeof PAGE_NUMBER_STATES)[number];
  label?: string;
}) {
  const on = selected === "True";
  const disabled = state === "Disabled";
  return (
    <button
      type="button"
      disabled={disabled}
      aria-current={on ? "page" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--size-control-sm)",
        height: "var(--size-control-sm)",
        borderRadius: "var(--radius-control)",
        border: "none",
        background: on ? "var(--color-action-primary)" : state === "Hover" ? "var(--color-background-brand-subtle)" : "transparent",
        color: disabled ? "var(--color-text-disabled)" : on ? "var(--color-action-on-action)" : "var(--color-text-primary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        fontSize: "var(--font-size-body-sm)",
        fontWeight: "var(--font-weight-semibold)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}
