import { CloseIcon } from "../../lib/icons";

export const CHIP_STATES = ["Default", "Hover", "Focus", "Disabled"] as const;
export type ChipState = (typeof CHIP_STATES)[number];

export function Chip({
  selected = "False",
  state = "Default",
  label = "Filter",
  showLeadingIcon = false,
  showRemove = false,
}: {
  selected?: "False" | "True";
  state?: ChipState;
  label?: string;
  showLeadingIcon?: boolean;
  showRemove?: boolean;
}) {
  const on = selected === "True";
  const disabled = state === "Disabled";
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        height: "var(--size-control-sm)",
        paddingInline: "var(--space-inset-sm)",
        borderRadius: "var(--radius-pill)",
        border: `var(--border-hairline) solid ${on ? "var(--color-border-brand)" : "var(--color-border-default)"}`,
        background:
          disabled
            ? "var(--color-background-subtle)"
            : on || state === "Hover"
              ? "var(--color-background-brand-subtle)"
              : "var(--color-background-surface)",
        color: disabled ? "var(--color-text-disabled)" : on ? "var(--color-text-brand)" : "var(--color-text-primary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        fontSize: "var(--font-size-body-sm)",
        fontWeight: "var(--font-weight-semibold)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {showLeadingIcon ? <span style={{ width: "var(--size-dot-sm)", height: "var(--size-dot-sm)", borderRadius: "var(--radius-pill)", background: "currentColor" }} /> : null}
      {label}
      {showRemove ? <CloseIcon /> : null}
    </button>
  );
}
