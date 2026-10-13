import React, { useState } from "react";

export type AvatarState = "Default" | "Hover" | "Pressed" | "Disabled";

export interface KariAvatarProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state?: AvatarState;
  disabled?: boolean;
  className?: string;
  size?: number;
}

/**
 * C17 - Avatar Component
 * Strictly synchronized with Figma Page 90:47 (C17 – Avatar)
 *
 * Characteristics:
 * - Dimensions: 50px × 50px, cornerRadius 9999px (pill circle)
 * - Fills: rgba(255, 255, 255, 0.5) in light mode, surface-subtle in dark mode
 * - Backdrop blur: 50px (25px-50px)
 * - Border stroke: 1px var(--color-border-subtle)
 * - Centered Kari mascot graphic (27px × 24px)
 * - State layers:
 *   * Default: No overlay
 *   * Hover: 10% opacity var(--color-text-primary)
 *   * Pressed: 20% opacity var(--color-text-primary)
 *   * Disabled: 40% component opacity
 */
export function KariAvatar({
  state,
  disabled = false,
  className,
  size,
  style,
  onClick,
  ...props
}: KariAvatarProps) {
  const [internalHover, setInternalHover] = useState(false);
  const [internalPressed, setInternalPressed] = useState(false);

  const avatarSize = size ?? 50;
  const scale = avatarSize / 50;
  const svgWidth = Math.round(27 * scale);
  const svgHeight = Math.round(24 * scale);

  const isDisabled = disabled || state === "Disabled";
  const isHovered = !isDisabled && (state === "Hover" || internalHover);
  const isPressed = !isDisabled && (state === "Pressed" || internalPressed);

  const stateLayerOpacity = isPressed ? 0.2 : isHovered ? 0.1 : 0;

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={className}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => {
        setInternalHover(false);
        setInternalPressed(false);
      }}
      onMouseDown={() => setInternalPressed(true)}
      onMouseUp={() => setInternalPressed(false)}
      onClick={isDisabled ? undefined : onClick}
      style={{
        position: "relative",
        width: avatarSize,
        height: avatarSize,
        minWidth: avatarSize,
        minHeight: avatarSize,
        borderRadius: "9999px",
        padding: 0,
        border: "1px solid var(--color-border-subtle, #e6e7ed)",
        background: "color-mix(in srgb, var(--color-background-surface, #ffffff) 50%, transparent)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.4 : 1,
        transition: "opacity 0.15s ease, transform 0.1s ease",
        outline: "none",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      {/* Interactive State Layer */}
      {stateLayerOpacity > 0 && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            backgroundColor: "var(--color-text-primary, #303036)",
            opacity: stateLayerOpacity,
            pointerEvents: "none",
            transition: "opacity 0.15s ease",
          }}
        />
      )}

      {/* Kari Mascot Graphic (Vector scaled) */}
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 27 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: "none", zIndex: 1 }}
        aria-hidden="true"
      >
        <path
          d="M7.08934 3.97156C10.5416 -1.26432 16.3852 -1.41733 19.6568 4.07358C21.0738 3.81854 22.3738 3.84914 23.7018 4.49437C25.0502 5.14981 26.0754 6.32043 26.5511 7.74607C27.4288 10.3168 26.5308 13.186 24.1928 14.6167C23.4398 15.0783 22.7605 15.2722 21.9261 15.5451C21.9159 17.7256 21.8727 19.9036 21.7989 22.0816C21.6692 22.1862 21.5343 22.2856 21.3995 22.38C18.8427 24.1219 12.5844 24.2698 9.61301 23.7062C9.95391 22.5764 10.1269 22.0663 10.6179 20.985C17.3367 23.0303 18.5858 16.8151 18.0108 11.6838C13.8641 11.0182 7.21909 13.4793 9.01263 18.8682C9.14746 19.2737 9.30264 19.4292 9.66897 19.6001L10.0455 19.4012L10.6357 19.8373C9.52907 21.1252 9.1271 21.9209 8.54707 23.4869C7.1504 23.1145 6.11753 22.9436 5.06939 21.9056C5.01596 19.7735 4.98797 17.6389 4.98288 15.5017C3.61929 15.086 2.49483 14.683 1.48485 13.5813C0.464693 12.4693 -0.0670078 10.9927 0.00676891 9.48286C0.0907218 7.84044 0.846301 6.30513 2.09287 5.23654C3.66254 3.9129 5.17878 3.79558 7.08934 3.97156Z"
          fill="var(--color-action-primary, #df483c)"
        />
        <path
          d="M10.05 19.3981C10.6707 18.86 14.0212 15.6848 14.4435 15.6975L14.3367 15.6312L14.4944 15.5853L14.4791 15.57L14.2654 15.6771L14.3087 15.8684C13.2605 17.0263 11.5357 18.7274 10.6402 19.8342L10.05 19.3981Z"
          fill="#953a25"
        />
      </svg>
    </button>
  );
}
