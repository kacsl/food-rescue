import { fieldChrome, type FieldState } from "../../lib/field-input";

export const OTP_DIGIT_STATES = ["Default", "Filled", "Focus", "Error", "Disabled"] as const;

export function OtpDigit({
  state = "Default",
  value = "",
}: {
  state?: (typeof OTP_DIGIT_STATES)[number];
  value?: string;
}) {
  const chrome = fieldChrome(state as FieldState);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--size-otp-w)",
        height: "var(--size-otp-h)",
        borderRadius: "var(--radius-control)",
        borderStyle: "solid",
        borderWidth: chrome.borderWidth,
        borderColor: chrome.borderColor,
        background: state === "Error" ? "var(--color-status-error-bg)" : chrome.background,
        color: chrome.color,
        boxShadow: chrome.boxShadow,
        fontSize: "var(--font-size-heading-sm)",
        fontWeight: "var(--font-weight-semibold)",
      }}
    >
      {value}
    </span>
  );
}

export function InputOtp({
  value = "482",
  state = "Default",
  showSeparator = true,
  length = 6,
}: {
  value?: string;
  state?: (typeof OTP_DIGIT_STATES)[number];
  showSeparator?: boolean;
  length?: 4 | 6;
}) {
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
      <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>Verification code</span>
      <div role="group" aria-label="Verification code" style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
        {digits.map((digit, index) => (
          <span key={index} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
            {showSeparator && length === 6 && index === 3 ? (
              <span aria-hidden="true" style={{ width: "var(--spacing-8)", height: "var(--border-emphasis)", background: "var(--color-border-default)" }} />
            ) : null}
            <OtpDigit
              value={digit}
              state={state === "Error" || state === "Disabled" ? state : digit ? "Filled" : index === value.length ? "Focus" : "Default"}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
