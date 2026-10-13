import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  buttonSizeVars,
  getButtonTone,
  type ButtonSize,
  type ButtonState,
  type IconButtonVariant,
} from "../../lib/button-tone";
import "./button.css";

export type { IconButtonVariant };

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: IconButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  icon?: ReactNode;
  "aria-label": string;
};

function PlusGlyph({ size }: { size: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: size, height: size }}>
      <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconButton({
  variant = "Primary",
  size = "MD",
  state = "Default",
  icon,
  disabled,
  className,
  type = "button",
  style,
  ...props
}: IconButtonProps) {
  const isDisabled = disabled || state === "Disabled";
  const tone = getButtonTone(variant, isDisabled ? "Disabled" : state);
  const sizeVars = buttonSizeVars[size];

  return (
    <button
      type={type}
      disabled={isDisabled}
      data-variant={variant}
      data-size={size}
      data-state={state}
      className={cn("evolve-icon-button", className)}
      style={{
        width: sizeVars.height,
        height: sizeVars.height,
        minWidth: sizeVars.height,
        padding: "var(--spacing-0)",
        borderRadius: "var(--radius-control)",
        borderStyle: "solid",
        borderWidth: tone.borderWidth,
        borderColor: tone.borderColor,
        background: tone.background,
        color: tone.color,
        boxShadow: tone.boxShadow,
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...props}
    >
      {icon ?? <PlusGlyph size={sizeVars.icon} />}
    </button>
  );
}
