import { CheckIcon, MinusIcon } from "@heroicons/react/24/outline";
import {
  CHECKBOX_SELECTIONS,
  CHECKBOX_STATES,
  type CheckboxSelection,
  type CheckboxSize,
  type CheckboxState,
} from "valere-DS";

export {
  CHECKBOX_SELECTIONS,
  CHECKBOX_STATES,
  type CheckboxSelection,
  type CheckboxSize,
  type CheckboxState,
};

function boxPaint(selection: CheckboxSelection, state: CheckboxState) {
  if (state === "Disabled") {
    return {
      bg: "var(--color-background-subtle)",
      border: "var(--color-border-subtle)",
      color: "var(--color-text-disabled)",
    };
  }
  if (state === "Error") {
    return {
      bg: selection === "Unchecked" ? "var(--color-background-surface)" : "var(--color-action-danger)",
      border: "var(--color-status-error-border)",
      color: "var(--color-status-on-solid)",
    };
  }
  if (selection !== "Unchecked") {
    return {
      bg: "var(--color-action-primary)",
      border: "var(--color-action-primary)",
      color: "var(--color-action-on-action)",
    };
  }
  return {
    bg: "var(--color-background-surface)",
    border: "var(--color-border-default)",
    color: "transparent",
  };
}

/**
 * C06 – Checkbox component (from valere-DS) with interactive onClick support.
 */
export function Checkbox({
  selection = "Unchecked",
  state = "Default",
  size = "MD",
  label = "Email me about product updates",
  description = "No more than one email a month. Unsubscribe any time.",
  showDescription = false,
  showLabel = true,
  onClick,
}: {
  selection?: CheckboxSelection;
  state?: CheckboxState;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  showDescription?: boolean;
  showLabel?: boolean;
  onClick?: () => void;
}) {
  const paint = boxPaint(selection, state);
  const box = size === "LG" ? "var(--size-check-lg)" : "var(--size-check-md)";
  const disabled = state === "Disabled";
  return (
    <label
      role="checkbox"
      aria-checked={selection === "Indeterminate" ? "mixed" : selection === "Checked"}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-inline-md)",
        minHeight: size === "LG" ? "var(--size-control-lg)" : "var(--size-control-md)",
        paddingBlock: "var(--space-inset-sm)",
        color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: box,
          height: box,
          flex: "0 0 auto",
          borderRadius: "var(--radius-control-sm)",
          border: `var(--border-hairline) solid ${paint.border}`,
          background: paint.bg,
          color: paint.color,
          boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
          transition: "background-color 0.15s ease, border-color 0.15s ease",
        }}
      >
        {selection === "Checked" ? <CheckIcon width={14} height={14} strokeWidth={2.5} aria-hidden="true" /> : null}
        {selection === "Indeterminate" ? <MinusIcon width={14} height={14} strokeWidth={2.5} aria-hidden="true" /> : null}
      </span>
      {showLabel ? (
        <span style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
          <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
          {showDescription ? (
            <span
              style={{
                fontSize: "var(--font-size-body-xs)",
                color: disabled ? "var(--color-text-disabled)" : "var(--color-text-secondary)",
              }}
            >
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
