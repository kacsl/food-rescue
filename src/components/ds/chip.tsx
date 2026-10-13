import type { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CHIP_STATES, type ChipState } from "valere-DS";

export { CHIP_STATES, type ChipState };

/**
 * C16 – Chip component (from valere-DS) with interactive onClick & custom leadingIcon support.
 */
export function Chip({
  selected = "False",
  state = "Default",
  label = "Filter",
  showLeadingIcon = false,
  leadingIcon,
  showRemove = false,
  onClick,
}: {
  selected?: "False" | "True";
  state?: ChipState;
  label?: string;
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  showRemove?: boolean;
  onClick?: () => void;
}) {
  const on = selected === "True";
  const disabled = state === "Disabled";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
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
        color: disabled
          ? "var(--color-text-disabled)"
          : on
            ? "var(--color-text-brand)"
            : "var(--color-text-primary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        fontSize: "var(--font-size-body-sm)",
        fontWeight: "var(--font-weight-semibold)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease",
      }}
    >
      {showLeadingIcon
        ? leadingIcon ?? (
            <span
              style={{
                width: "var(--size-dot-sm)",
                height: "var(--size-dot-sm)",
                borderRadius: "var(--radius-pill)",
                background: "currentColor",
              }}
            />
          )
        : null}
      {label}
      {showRemove ? <XMarkIcon width={14} height={14} strokeWidth={2} aria-hidden="true" /> : null}
    </button>
  );
}
