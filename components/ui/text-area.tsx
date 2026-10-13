import { fieldChrome, type FieldState } from "../../lib/field-input";

export const TEXT_AREA_STATES = ["Default", "Hover", "Filled", "Error", "Disabled", "Pressed", "Writting"] as const;

export function TextArea({
  state = "Default",
  size = "MD",
  label = "Description",
  showLabel = true,
  required = false,
  value = "Tell us what happened…",
  helperText = "Markdown is supported.",
  showHelper = true,
  counter = "0 / 280",
  showCounter = true,
}: {
  state?: (typeof TEXT_AREA_STATES)[number];
  size?: "MD" | "LG";
  label?: string;
  showLabel?: boolean;
  required?: boolean;
  value?: string;
  helperText?: string;
  showHelper?: boolean;
  counter?: string;
  showCounter?: boolean;
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
          minHeight: size === "LG" ? "var(--size-multiline-lg)" : "var(--size-multiline-md)",
          padding: "var(--space-inset-md)",
          borderRadius: "var(--radius-control)",
          borderStyle: "solid",
          borderWidth: chrome.borderWidth,
          borderColor: chrome.borderColor,
          background: chrome.background,
          color: chrome.color,
          boxShadow: chrome.boxShadow,
          fontSize: "var(--font-size-body-sm)",
        }}
      >
        {value}
      </span>
      {showHelper || showCounter ? (
        <span style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>
          {showHelper ? <span>{helperText}</span> : <span />}
          {showCounter ? <span>{counter}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
