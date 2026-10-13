import { ChevronIcon } from "../../lib/icons";
import { fieldChrome, fieldHeight, type FieldSize, type FieldState } from "../../lib/field-input";

export const SELECT_STATES = ["Default", "Hover", "Focus", "Selected", "Error", "Disabled", "Open"] as const;
export const SELECT_OPTION_STATES = ["Default", "Hover", "Selected", "Disabled"] as const;

export function Select({
  state = "Default",
  size = "MD",
  label = "Country",
  showLabel = true,
  required = false,
  value = "Select a country",
  helperText = "Used to set your currency and tax rate.",
  showHelper = true,
  leadingIcon = false,
}: {
  state?: (typeof SELECT_STATES)[number];
  size?: FieldSize;
  label?: string;
  showLabel?: boolean;
  required?: boolean;
  value?: string;
  helperText?: string;
  showHelper?: boolean;
  leadingIcon?: boolean;
}) {
  const chrome = fieldChrome(state as FieldState);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)", width: "100%" }}>
      {showLabel ? (
        <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>
          {label}
          {required ? <span style={{ color: "var(--color-status-error-text)" }}> *</span> : null}
        </span>
      ) : null}
      <span
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
        {leadingIcon ? <span style={{ width: "var(--size-icon-md)", height: "var(--size-icon-md)" }} /> : null}
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

export function SelectOption({
  state = "Default",
  size = "MD",
  label = "Portugal",
  leadingIcon = false,
}: {
  state?: (typeof SELECT_OPTION_STATES)[number];
  size?: FieldSize;
  label?: string;
  leadingIcon?: boolean;
}) {
  const selected = state === "Selected";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        height: fieldHeight(size),
        paddingInline: "var(--space-inset-md)",
        borderRadius: "var(--radius-control-sm)",
        background: selected || state === "Hover" ? "var(--color-background-brand-subtle)" : "transparent",
        color: state === "Disabled" ? "var(--color-text-disabled)" : selected ? "var(--color-text-brand)" : "var(--color-text-primary)",
        fontSize: "var(--font-size-body-sm)",
      }}
    >
      {leadingIcon ? <span style={{ width: "var(--size-icon-md)", height: "var(--size-icon-md)" }} /> : null}
      {label}
    </div>
  );
}
