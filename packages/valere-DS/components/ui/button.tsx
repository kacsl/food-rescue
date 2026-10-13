import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  buttonPaintVars,
  buttonSizeVars,
  type ButtonSize,
  type ButtonState,
  type ButtonVariant,
} from "../../lib/button-tone";
import "./button.css";

export type { ButtonSize, ButtonState, ButtonVariant };

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  label?: string;
  showLabel?: boolean;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
  leadingIconSwap?: ReactNode;
  trailingIconSwap?: ReactNode;
};

function PlusGlyph({ size }: { size: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  variant = "Primary",
  size = "MD",
  state = "Default",
  label = "Button",
  showLabel = true,
  leadingIcon = false,
  trailingIcon = false,
  leadingIconSwap,
  trailingIconSwap,
  disabled,
  className,
  type = "button",
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || state === "Disabled";
  const sizeVars = buttonSizeVars[size];

  return (
    <button
      type={type}
      disabled={isDisabled}
      data-variant={variant}
      data-size={size}
      data-state={state}
      className={cn("evolve-button", className)}
      style={{
        height: sizeVars.height,
        minWidth: sizeVars.height,
        paddingInline: showLabel ? sizeVars.paddingInline : sizeVars.height,
        gap: sizeVars.gap,
        borderRadius: "var(--radius-control)",
        ...buttonPaintVars(variant, isDisabled ? "Disabled" : state),
        fontFamily: "var(--font-family-brand)",
        fontSize: sizeVars.fontSize,
        fontWeight: "var(--font-weight-semibold)",
        lineHeight: "1",
        whiteSpace: "nowrap",
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...props}
    >
      {leadingIcon ? leadingIconSwap ?? <PlusGlyph size={sizeVars.icon} /> : null}
      {showLabel ? <span>{label}</span> : null}
      {trailingIcon ? trailingIconSwap ?? <PlusGlyph size={sizeVars.icon} /> : null}
    </button>
  );
}
