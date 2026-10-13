import { ChevronIcon } from "../../lib/icons";
import { fieldChrome, fieldHeight, type FieldSize, type FieldState } from "../../lib/field-input";

export const DATE_PICKER_STATES = ["Default", "Hover", "Focus", "Selected", "Error", "Disabled", "Open"] as const;

export function DatePicker({
  state = "Default",
  size = "MD",
  label = "Start date",
  showLabel = true,
  value = "29 Sep 2026",
  helperText = "Format: DD MMM YYYY",
  showHelper = true,
}: {
  state?: (typeof DATE_PICKER_STATES)[number];
  size?: FieldSize;
  label?: string;
  showLabel?: boolean;
  value?: string;
  helperText?: string;
  showHelper?: boolean;
}) {
  const chrome = fieldChrome(state as FieldState);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)", width: "100%" }}>
      {showLabel ? (
        <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
      ) : null}
      <span
        role="combobox"
        aria-controls="evolve-calendar"
        aria-haspopup="dialog"
        aria-expanded={state === "Open"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-inline-sm)",
          height: fieldHeight(size),
          paddingInline: "var(--space-inset-md)",
          borderRadius: "var(--radius-control)",
          borderStyle: "solid",
          borderWidth: chrome.borderWidth,
          borderColor: chrome.borderColor,
          background: chrome.background,
          color: chrome.color,
          boxShadow: chrome.boxShadow,
        }}
      >
        <span style={{ flex: 1, fontSize: "var(--font-size-body-sm)" }}>{value}</span>
        <ChevronIcon />
      </span>
      {showHelper ? (
        <span style={{ fontSize: "var(--font-size-body-xs)", color: state === "Error" ? "var(--color-status-error-text)" : "var(--color-text-secondary)" }}>
          {helperText}
        </span>
      ) : null}
    </label>
  );
}
