import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { IconButton, type IconButtonVariant } from "valere-DS";

export { IconButton, type IconButtonVariant };

export const BUTTON_VARIANTS = [
  "Primary",
  "Secondary",
  "Outline",
  "Ghost",
  "Link",
  "Link secondary",
  "Error",
] as const;

export const ICON_BUTTON_VARIANTS = [
  "Primary",
  "Secondary",
  "Outline",
  "Ghost",
  "Error",
] as const;

export const BUTTON_SIZES = ["XS", "SM", "MD", "LG", "XL"] as const;
export const BUTTON_STATES = [
  "Default",
  "Hover",
  "Focus",
  "Active",
  "Disabled",
  "Invalid",
] as const;

export type ButtonVariant =
  | (typeof BUTTON_VARIANTS)[number]
  | "Link Secondary"
  | "LinkSecondary";
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type ButtonState = (typeof BUTTON_STATES)[number];

export type ButtonTone = {
  background: string;
  color: string;
  borderWidth: string;
  borderColor: string;
  boxShadow: string;
};

const none = "0px";
const transparent = "transparent";
const ring = "0 0 0 var(--border-focus-ring) var(--color-border-focus)";

function tone(
  background: string,
  color: string,
  borderWidth = none,
  borderColor = transparent,
  boxShadow = "none",
): ButtonTone {
  return { background, color, borderWidth, borderColor, boxShadow };
}

const solid = {
  Primary: {
    Default: tone("var(--color-action-primary)", "var(--color-action-on-action)"),
    Hover: tone("var(--color-action-primary-hover)", "var(--color-action-on-action)"),
    Focus: tone("var(--color-action-primary)", "var(--color-action-on-action)", none, transparent, ring),
    Active: tone("var(--color-action-primary-pressed)", "var(--color-action-on-action)"),
    Disabled: tone("var(--color-background-subtle)", "var(--color-text-disabled)"),
    Invalid: tone(
      "var(--color-action-primary)",
      "var(--color-action-on-action)",
      "var(--border-emphasis)",
      "var(--color-status-error-border)",
    ),
  },
  Secondary: {
    Default: tone("var(--color-action-secondary)", "var(--color-action-on-action)"),
    Hover: tone("var(--color-action-secondary-hover)", "var(--color-action-on-action)"),
    Focus: tone("var(--color-action-secondary)", "var(--color-action-on-action)", none, transparent, ring),
    Active: tone("var(--color-action-secondary-pressed)", "var(--color-action-on-action)"),
    Disabled: tone("var(--color-background-subtle)", "var(--color-text-disabled)"),
    Invalid: tone(
      "var(--color-action-secondary)",
      "var(--color-action-on-action)",
      "var(--border-emphasis)",
      "var(--color-status-error-border)",
    ),
  },
  Error: {
    Default: tone("var(--color-action-danger)", "var(--color-status-on-solid)"),
    Hover: tone("var(--color-action-danger-hover)", "var(--color-status-on-solid)"),
    Focus: tone("var(--color-action-danger)", "var(--color-status-on-solid)", none, transparent, ring),
    Active: tone("var(--color-action-danger-pressed)", "var(--color-status-on-solid)"),
    Disabled: tone("var(--color-background-subtle)", "var(--color-text-disabled)"),
    Invalid: tone(
      "var(--color-action-danger)",
      "var(--color-status-on-solid)",
      "var(--border-emphasis)",
      "var(--color-status-error-border)",
    ),
  },
} as const;

const outline: Record<ButtonState, ButtonTone> = {
  Default: tone(
    "var(--color-background-surface)",
    "var(--color-text-brand)",
    "var(--border-hairline)",
    "var(--color-border-subtle)",
  ),
  Hover: tone(
    "var(--color-background-brand-subtle)",
    "var(--color-text-brand)",
    "var(--border-hairline)",
    "var(--color-border-subtle)",
  ),
  Focus: tone(
    "var(--color-background-surface)",
    "var(--color-text-brand)",
    "var(--border-hairline)",
    "var(--color-border-brand)",
    ring,
  ),
  Active: tone(
    "var(--color-background-brand-subtle)",
    "var(--color-text-brand)",
    "var(--border-emphasis)",
    "var(--color-border-focus)",
  ),
  Disabled: tone(
    "var(--color-background-surface)",
    "var(--color-text-disabled)",
    "var(--border-hairline)",
    "var(--color-border-subtle)",
  ),
  Invalid: tone(
    "var(--color-background-surface)",
    "var(--color-status-error-text)",
    "var(--border-emphasis)",
    "var(--color-status-error-border)",
  ),
};

const ghost: Record<ButtonState, ButtonTone> = {
  Default: tone(transparent, "var(--color-text-brand)"),
  Hover: tone("var(--color-background-brand-subtle)", "var(--color-text-brand)"),
  Focus: tone(transparent, "var(--color-text-brand)", none, transparent, ring),
  Active: tone(
    "var(--color-background-brand-subtle)",
    "var(--color-text-brand)",
    "var(--border-hairline)",
    "var(--color-border-brand)",
  ),
  Disabled: tone(transparent, "var(--color-text-disabled)"),
  Invalid: tone(
    transparent,
    "var(--color-status-error-text)",
    "var(--border-emphasis)",
    "var(--color-status-error-border)",
  ),
};

const link: Record<ButtonState, ButtonTone> = {
  Default: tone(transparent, "var(--color-text-brand)"),
  Hover: tone(transparent, "var(--color-action-primary-hover)"),
  Focus: tone(transparent, "var(--color-text-brand)", none, transparent, ring),
  Active: tone(transparent, "var(--color-action-primary-pressed)"),
  Disabled: tone(transparent, "var(--color-text-disabled)"),
  Invalid: tone(
    transparent,
    "var(--color-status-error-text)",
    "var(--border-emphasis)",
    "var(--color-status-error-border)",
  ),
};

const linkSecondary: Record<ButtonState, ButtonTone> = {
  Default: tone(transparent, "var(--color-text-secondary)"),
  Hover: tone(transparent, "var(--color-text-primary)"),
  Focus: tone(transparent, "var(--color-text-secondary)", none, transparent, ring),
  Active: tone(transparent, "var(--color-text-primary)"),
  Disabled: tone(transparent, "var(--color-text-disabled)"),
  Invalid: tone(
    transparent,
    "var(--color-status-error-text)",
    "var(--border-emphasis)",
    "var(--color-status-error-border)",
  ),
};

export function getButtonTone(variant: ButtonVariant, state: ButtonState): ButtonTone {
  if (variant === "Outline") {
    return outline[state];
  }
  if (variant === "Ghost") {
    return ghost[state];
  }
  if (variant === "Link") {
    return link[state];
  }
  if (
    variant === "Link secondary" ||
    variant === "Link Secondary" ||
    variant === "LinkSecondary"
  ) {
    return linkSecondary[state];
  }
  const group = (solid as Record<string, Record<ButtonState, ButtonTone>>)[variant] ?? solid.Primary;
  return group[state] ?? group.Default;
}

function paintVars(prefix: string, paint: ButtonTone): CSSProperties {
  return {
    [`${prefix}background`]: paint.background,
    [`${prefix}color`]: paint.color,
    [`${prefix}border-width`]: paint.borderWidth,
    [`${prefix}border-color`]: paint.borderColor,
    [`${prefix}box-shadow`]: paint.boxShadow,
  };
}

export function buttonPaintVars(variant: ButtonVariant, state: ButtonState): CSSProperties {
  return {
    ...paintVars("--button-", getButtonTone(variant, state)),
    ...paintVars("--button-hover-", getButtonTone(variant, "Hover")),
    ...paintVars("--button-active-", getButtonTone(variant, "Active")),
  };
}

export const buttonSizeVars: Record<
  ButtonSize,
  { height: string; paddingInline: string; gap: string; fontSize: string; icon: string }
> = {
  XS: {
    height: "var(--size-control-xs)",
    paddingInline: "var(--space-inset-sm)",
    gap: "var(--space-inline-sm)",
    fontSize: "var(--font-size-body-xs)",
    icon: "var(--size-icon-xs)",
  },
  SM: {
    height: "var(--size-control-sm)",
    paddingInline: "var(--space-inset-sm)",
    gap: "var(--space-inline-sm)",
    fontSize: "var(--font-size-body-sm)",
    icon: "var(--size-icon-sm)",
  },
  MD: {
    height: "var(--size-control-md)",
    paddingInline: "var(--space-inset-md)",
    gap: "var(--space-inline-sm)",
    fontSize: "var(--font-size-body-sm)",
    icon: "var(--size-icon-md)",
  },
  LG: {
    height: "var(--size-control-lg)",
    paddingInline: "var(--space-inset-lg)",
    gap: "var(--space-inline-md)",
    fontSize: "var(--font-size-body-base)",
    icon: "var(--size-icon-lg)",
  },
  XL: {
    height: "var(--size-control-xl)",
    paddingInline: "var(--space-inset-lg)",
    gap: "var(--space-inline-md)",
    fontSize: "var(--font-size-body-base)",
    icon: "var(--size-icon-xl)",
  },
};

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
      className={["evolve-button", className].filter(Boolean).join(" ")}
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
