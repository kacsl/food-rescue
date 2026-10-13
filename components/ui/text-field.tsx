import { fieldChrome, fieldHeight, type FieldSize, type FieldState } from "../../lib/field-input";

export const TEXT_FIELD_STATES = ["Default", "Hover", "Filled", "Error", "Disabled", "Focus", "Typing"] as const;
export type TextFieldState = (typeof TEXT_FIELD_STATES)[number];

export function TextField({
  state = "Default",
  size = "MD",
  label = "Email address",
  showLabel = true,
  required = false,
  value = "you@example.com",
  helperText = "We'll only use this to send receipts.",
  showHelper = true,
  leadingIcon = false,
  trailingIcon = false,
}: {
  state?: TextFieldState;
  size?: FieldSize;
  label?: string;
  showLabel?: boolean;
  required?: boolean;
  value?: string;
  helperText?: string;
  showHelper?: boolean;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
}) {
  const chrome = fieldChrome(state as FieldState);
  const empty = state === "Default" || state === "Hover" || state === "Focus";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)", width: "100%" }}>
      {showLabel ? (
        <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>
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
        {leadingIcon ? <span style={{ width: "var(--size-icon-md)", height: "var(--size-icon-md)", background: "currentColor", opacity: "var(--opacity-40)", borderRadius: "var(--radius-pill)" }} /> : null}
        <span style={{ flex: 1, fontSize: "var(--font-size-body-sm)", color: empty ? "var(--color-text-tertiary)" : chrome.color }}>{value}</span>
        {trailingIcon ? <span style={{ width: "var(--size-icon-md)", height: "var(--size-icon-md)" }} /> : null}
      </span>
      {showHelper ? (
        <span style={{ fontSize: "var(--font-size-body-xs)", color: state === "Error" ? "var(--color-status-error-text)" : "var(--color-text-secondary)" }}>
          {helperText}
        </span>
      ) : null}
    </label>
  );
}
