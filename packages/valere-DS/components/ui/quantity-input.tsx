import { MinusIcon, PlusIcon } from "../../lib/icons";
import { IconButton } from "./icon-button";

export const QUANTITY_STATES = ["Default", "Hover", "Focus", "Error", "Disabled"] as const;
export type QuantityState = (typeof QUANTITY_STATES)[number];

export function QuantityInput({
  state = "Default",
  value = "2",
}: {
  state?: QuantityState;
  value?: string;
}) {
  const disabled = state === "Disabled";
  const border =
    state === "Error"
      ? "var(--border-emphasis) solid var(--color-status-error-border)"
      : state === "Disabled"
        ? "var(--border-hairline) solid var(--color-border-subtle)"
        : "var(--border-width-0) solid transparent";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        height: "var(--size-control-md)",
        paddingInline: "var(--space-inset-xs)",
        borderRadius: "var(--radius-control)",
        background: "var(--color-background-surface)",
        boxShadow: state === "Hover" ? "var(--elevation-2)" : state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "var(--elevation-1)",
        border,
        opacity: disabled ? "var(--opacity-disabled)" : 1,
      }}
    >
      <IconButton variant="Ghost" size="XS" state={disabled ? "Disabled" : "Default"} icon={<MinusIcon />} aria-label="Decrease" />
      <span style={{ minWidth: "var(--size-control-xs)", textAlign: "center", fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>
        {value}
      </span>
      <IconButton variant="Ghost" size="XS" state={disabled ? "Disabled" : "Default"} icon={<PlusIcon />} aria-label="Increase" />
    </div>
  );
}
