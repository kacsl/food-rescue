import React from "react";

export type LogoVariant = "icon" | "landscape" | "portrait";
export type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  withContainer?: boolean;
  width?: number;
  height?: number;
}

/** Figma C48 — Logo / landscape (3034:7183) */
const LANDSCAPE_FRAME = { width: 1140, height: 330 };
/** Figma C48 — Logo / portrait (3087:7383) */
const PORTRAIT_FRAME = { width: 709, height: 478 };

const SIZE_MAP: Record<Exclude<LogoVariant, "icon">, Record<LogoSize, { width: number; height: number }>> = {
  landscape: {
    sm: { width: 140, height: Math.round(140 * (LANDSCAPE_FRAME.height / LANDSCAPE_FRAME.width)) },
    md: { width: 200, height: Math.round(200 * (LANDSCAPE_FRAME.height / LANDSCAPE_FRAME.width)) },
    lg: { width: 280, height: Math.round(280 * (LANDSCAPE_FRAME.height / LANDSCAPE_FRAME.width)) },
    xl: { width: 380, height: Math.round(380 * (LANDSCAPE_FRAME.height / LANDSCAPE_FRAME.width)) },
  },
  portrait: {
    sm: { width: 180, height: Math.round(180 * (PORTRAIT_FRAME.height / PORTRAIT_FRAME.width)) },
    md: { width: 260, height: Math.round(260 * (PORTRAIT_FRAME.height / PORTRAIT_FRAME.width)) },
    lg: { width: 309, height: Math.round(309 * (PORTRAIT_FRAME.height / PORTRAIT_FRAME.width)) },
    xl: { width: 400, height: Math.round(400 * (PORTRAIT_FRAME.height / PORTRAIT_FRAME.width)) },
  },
};

const ICON_SIZE_MAP: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 36, height: 33 },
  md: { width: 48, height: 44 },
  lg: { width: 64, height: 58 },
  xl: { width: 96, height: 88 },
};

function frameDimensions(
  variant: Exclude<LogoVariant, "icon">,
  size: LogoSize,
  width?: number,
  height?: number,
) {
  if (width != null && height != null) return { width, height };
  if (width != null) {
    const frame = variant === "landscape" ? LANDSCAPE_FRAME : PORTRAIT_FRAME;
    return { width, height: Math.round(width * (frame.height / frame.width)) };
  }
  if (height != null) {
    const frame = variant === "landscape" ? LANDSCAPE_FRAME : PORTRAIT_FRAME;
    return { width: Math.round(height * (frame.width / frame.height)), height };
  }
  return SIZE_MAP[variant][size];
}

/**
 * C48 - Logo Component (Figma 3034:7178)
 *
 * - variant="icon": Kari mascot icon mark (with optional rounded container)
 * - variant="landscape": mascot + wordmark horizontal
 * - variant="portrait": mascot + wordmark stacked
 */
export function Logo({
  variant = "landscape",
  size = "md",
  withContainer = false,
  className,
  style,
  width,
  height,
  ...props
}: LogoProps) {
  if (variant === "landscape" || variant === "portrait") {
    const dimensions = frameDimensions(variant, size, width, height);
    const src = variant === "landscape" ? "/brand/logo-landscape.svg" : "/brand/logo-portrait.svg";

    return (
      <img
        src={src}
        alt={typeof props["aria-label"] === "string" ? props["aria-label"] : "Food Rescue"}
        width={dimensions.width}
        height={dimensions.height}
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle", ...style }}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  const dimensions = ICON_SIZE_MAP[size];

  if (withContainer) {
    return (
      <svg
        viewBox="0 0 467 426"
        width={dimensions.width}
        height={dimensions.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle", ...style }}
        {...(props as React.SVGProps<SVGSVGElement>)}
      >
        <rect
          width="466.062"
          height="425.571"
          rx="80"
          fill="var(--color-background-surface, #ffffff)"
          stroke="var(--color-border-subtle, #e6e7ed)"
          strokeWidth="2"
        />
        <path
          d="M145.594 102.538C193.119 30.6382 273.563 28.537 318.602 103.939C338.109 100.437 356.005 100.857 374.286 109.717C392.848 118.718 406.962 134.793 413.511 154.37C425.593 189.672 413.23 229.072 381.045 248.719C370.679 255.058 361.328 257.72 349.841 261.467C349.701 291.41 349.106 321.319 348.09 351.228C346.304 352.664 344.448 354.029 342.592 355.325C307.395 379.245 221.241 381.276 180.336 373.537C185.028 358.022 187.41 351.018 194.169 336.168C286.662 364.256 303.857 278.908 295.942 208.444C238.857 199.303 147.38 233.099 172.07 307.1C173.927 312.669 176.063 314.805 181.106 317.152L186.289 314.42L194.414 320.409C179.18 338.095 173.646 349.021 165.661 370.525C146.434 365.412 132.216 363.065 117.787 348.811C117.051 319.533 116.666 290.22 116.596 260.872C97.8241 255.163 82.3445 249.629 68.4408 234.5C54.3971 219.231 47.0776 198.953 48.0932 178.22C49.2489 155.666 59.6504 134.583 76.8111 119.909C98.4195 101.733 119.293 100.121 145.594 102.538Z"
          fill="var(--color-action-primary, #dc2b10)"
        />
        <path
          d="M186.289 314.42C194.835 307.03 240.958 263.428 246.772 263.603L245.301 262.692L247.472 262.062L247.262 261.852L244.32 263.323L244.916 265.95C230.487 281.849 206.742 305.209 194.414 320.408L186.289 314.42Z"
          fill="#953a25"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 368 329"
      width={dimensions.width}
      height={dimensions.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...(props as React.SVGProps<SVGSVGElement>)}
    >
      <path
        d="M97.594 54.538C145.119 -17.3618 225.563 -19.463 270.602 55.9389C290.109 52.4367 308.005 52.8569 326.286 61.7174C344.848 70.718 358.962 86.793 365.511 106.37C377.593 141.672 365.23 181.072 333.045 200.719C322.679 207.058 313.328 209.72 301.841 213.467C301.701 243.411 301.106 273.319 300.09 303.228C298.304 304.664 296.448 306.029 294.592 307.325C259.395 331.245 173.241 333.276 132.336 325.537C137.028 310.022 139.41 303.018 146.169 288.168C238.662 316.256 255.857 230.908 247.942 160.444C190.857 151.303 99.3801 185.099 124.07 259.1C125.927 264.669 128.063 266.805 133.106 269.152L138.289 266.42L146.414 272.409C131.18 290.095 125.646 301.021 117.661 322.525C98.4344 317.412 84.2156 315.065 69.7866 300.811C69.0512 271.533 68.6659 242.22 68.5958 212.872C49.8241 207.163 34.3445 201.629 20.4408 186.5C6.3971 171.231 -0.922449 150.953 0.0931828 130.22C1.2489 107.666 11.6504 86.583 28.8111 71.9088C50.4195 53.7325 71.2926 52.1215 97.594 54.538Z"
        fill="var(--color-action-primary, #dc2b10)"
      />
      <path
        d="M138.289 266.42C146.835 259.03 192.958 215.428 198.772 215.603L197.301 214.692L199.472 214.062L199.262 213.852L196.32 215.323L196.916 217.95C182.487 233.849 158.742 257.209 146.414 272.408L138.289 266.42Z"
        fill="#953a25"
      />
    </svg>
  );
}
