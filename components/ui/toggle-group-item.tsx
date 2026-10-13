export const TOGGLE_POSITIONS = ["Start", "Middle", "End"] as const;
export const TOGGLE_STATES = ["Default", "Hover", "Focus", "Disabled"] as const;

export function ToggleGroupItem({
  selected = "False",
  position = "Middle",
  state = "Default",
  label = "Week",
  showIcon = false,
}: {
  selected?: "False" | "True";
  position?: (typeof TOGGLE_POSITIONS)[number];
  state?: (typeof TOGGLE_STATES)[number];
  label?: string;
  showIcon?: boolean;
}) {
  const on = selected === "True";
  const disabled = state === "Disabled";
  const radius =
    position === "Start"
      ? "var(--radius-control) 0 0 var(--radius-control)"
      : position === "End"
        ? "0 var(--radius-control) var(--radius-control) 0"
        : "0";
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-inline-sm)",
        height: "var(--size-control-md)",
        paddingInline: "var(--space-inset-md)",
        borderRadius: radius,
        border: "var(--border-hairline) solid var(--color-border-default)",
        marginInlineStart: position === "Start" ? 0 : "calc(var(--border-hairline) * -1)",
        background: disabled ? "var(--color-background-subtle)" : on || state === "Hover" ? "var(--color-background-brand-subtle)" : "var(--color-background-surface)",
        color: disabled ? "var(--color-text-disabled)" : on ? "var(--color-text-brand)" : "var(--color-text-primary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        fontSize: "var(--font-size-body-sm)",
        fontWeight: "var(--font-weight-semibold)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {showIcon ? <span style={{ width: "var(--size-dot-sm)", height: "var(--size-dot-sm)", borderRadius: "var(--radius-pill)", background: "currentColor" }} /> : null}
      {label}
    </button>
  );
}
