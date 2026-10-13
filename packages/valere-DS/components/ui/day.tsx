export const DAY_STATES = ["Default", "Hover", "Focus", "Selected", "Today", "Outside", "Disabled"] as const;

export function Day({
  state = "Default",
  label = "12",
}: {
  state?: (typeof DAY_STATES)[number];
  label?: string;
}) {
  const selected = state === "Selected";
  const today = state === "Today";
  const disabled = state === "Disabled" || state === "Outside";
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--size-control-md)",
        height: "var(--size-control-md)",
        borderRadius: "var(--radius-control)",
        border: today && !selected ? "var(--border-hairline) solid var(--color-border-brand)" : "none",
        background: selected ? "var(--color-action-primary)" : state === "Hover" ? "var(--color-background-brand-subtle)" : "transparent",
        color: disabled
          ? "var(--color-text-disabled)"
          : selected
            ? "var(--color-action-on-action)"
            : today
              ? "var(--color-text-brand)"
              : "var(--color-text-primary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        fontSize: "var(--font-size-body-sm)",
        fontWeight: selected || today ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}
