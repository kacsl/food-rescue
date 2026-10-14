"use client";

import { useRef, useState } from "react";
import { OTP_DIGIT_STATES, OtpDigit } from "valere-DS";

export { OTP_DIGIT_STATES, OtpDigit };
export type OtpDigitState = (typeof OTP_DIGIT_STATES)[number];

/**
 * C46 – Input OTP component (from valere-DS) with interactive keyboard input.
 */
export function InputOtp({
  value = "",
  onChange,
  state = "Default",
  showSeparator = true,
  length = 6,
  label = "Verification code",
  autoFocus = false,
}: {
  value?: string;
  onChange?: (value: string) => void;
  state?: OtpDigitState;
  showSeparator?: boolean;
  length?: 4 | 6;
  label?: string;
  autoFocus?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(autoFocus);
  const disabled = state === "Disabled";
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <label
      onClick={() => {
        if (!disabled) inputRef.current?.focus();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-sm)",
        cursor: disabled ? "not-allowed" : "text",
        position: "relative",
      }}
    >
      <span
        style={{
          fontSize: "var(--font-size-body-sm)",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-text-primary)",
        }}
      >
        {label}
      </span>

      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        autoFocus={autoFocus}
        disabled={disabled}
        maxLength={length}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => {
          const sanitized = event.target.value.replace(/\D/g, "").slice(0, length);
          onChange?.(sanitized);
        }}
        aria-label={label}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 1,
          height: 1,
        }}
      />

      <div
        role="group"
        aria-label={label}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-inline-sm)",
          width: "100%",
        }}
      >
        {digits.map((digit, index) => {
          let digitState: OtpDigitState = "Default";
          if (state === "Error" || state === "Disabled") {
            digitState = state;
          } else if (focused && index === activeIndex && value.length < length) {
            digitState = "Focus";
          } else if (digit) {
            digitState = "Filled";
          } else if (state === "Focus" && index === value.length) {
            digitState = "Focus";
          }

          return (
            <span
              key={index}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-inline-sm)",
              }}
            >
              {showSeparator && length === 6 && index === 3 ? (
                <span
                  aria-hidden="true"
                  style={{
                    width: "var(--spacing-8)",
                    height: "var(--border-emphasis)",
                    background: "var(--color-border-default)",
                  }}
                />
              ) : null}
              <OtpDigit value={digit} state={digitState} />
            </span>
          );
        })}
      </div>
    </label>
  );
}
