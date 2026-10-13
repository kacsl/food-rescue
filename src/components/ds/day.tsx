"use client";

import React, { useState } from "react";

export type DayState =
  | "Default"
  | "Hover"
  | "Focus"
  | "Selected"
  | "Today"
  | "Range start"
  | "Range middle"
  | "Range end"
  | "Disabled"
  | "Outside";

export interface DayProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  state?: DayState;
  day?: number | string;
  fullDateLabel?: string;
}

function getDayRadius(state: DayState): React.CSSProperties {
  if (state === "Range start") {
    return {
      borderTopLeftRadius: "var(--radius-control, 12px)",
      borderBottomLeftRadius: "var(--radius-control, 12px)",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  }
  if (state === "Range end") {
    return {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: "var(--radius-control, 12px)",
      borderBottomRightRadius: "var(--radius-control, 12px)",
    };
  }
  if (state === "Range middle") {
    return { borderRadius: 0 };
  }
  return { borderRadius: "var(--radius-control, 12px)" };
}

function getDayVisuals(state: DayState, hovered: boolean) {
  const isFilled = state === "Selected" || state === "Range start" || state === "Range end";
  const isRangeMid = state === "Range middle";
  const isToday = state === "Today";
  const isDisabled = state === "Disabled";
  const isOutside = state === "Outside";
  const isSemibold = isFilled || isToday;

  const background = isFilled
    ? "var(--color-action-primary, #dc2b10)"
    : isRangeMid
      ? "var(--color-background-brand-subtle, #ffedec)"
      : state === "Hover" || (hovered && (state === "Default" || state === "Outside"))
        ? "var(--color-background-muted, #f2f2f6)"
        : "transparent";

  const color = isFilled
    ? "var(--color-action-on-action, #ffffff)"
    : isToday || isRangeMid
      ? "var(--color-text-brand, #be240c)"
      : isDisabled
        ? "var(--color-text-disabled, #b4b5bd)"
        : isOutside
          ? "var(--color-text-tertiary, #75757d)"
          : "var(--color-text-primary, #303036)";

  const border = isToday
    ? "var(--border-emphasis, 1.5px) solid var(--color-border-brand, #dc2b10)"
    : state === "Focus"
      ? "var(--border-focus-ring, 2px) solid var(--color-border-focus, #be240c)"
      : "none";

  return { background, color, border, isSemibold, isFilled, isDisabled };
}

/**
 * C31 — Day Atom (Figma 1166:20)
 * 44×44px cell inside CalendarMonth.
 */
export function Day({
  state = "Default",
  day = 15,
  fullDateLabel,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: DayProps) {
  const [hovered, setHovered] = useState(false);
  const { background, color, border, isSemibold, isFilled, isDisabled } = getDayVisuals(state, hovered);

  return (
    <button
      type="button"
      role="gridcell"
      disabled={isDisabled}
      aria-selected={isFilled}
      aria-disabled={isDisabled || undefined}
      aria-label={fullDateLabel ?? String(day)}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--size-control-md, 44px)",
        height: "var(--size-control-md, 44px)",
        padding: 0,
        background,
        color,
        border,
        fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
        fontSize: "var(--font-size-body-xs, 12px)",
        fontWeight: isSemibold
          ? ("var(--font-weight-semibold, 600)" as React.CSSProperties["fontWeight"])
          : ("var(--font-weight-regular, 400)" as React.CSSProperties["fontWeight"]),
        lineHeight: "var(--line-height-body-xs, 16px)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        userSelect: "none",
        transition: "background-color 120ms ease, color 120ms ease",
        ...getDayRadius(state),
        ...style,
      }}
      {...props}
    >
      {day}
    </button>
  );
}

function StepperChevron({ direction }: { direction: "up" | "down" }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === "up" ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface TimeStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  unit?: "hour" | "minute";
  min?: number;
  max?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

/**
 * C31 — Time Stepper Molecule (Figma 1193:49)
 */
export function TimeStepper({
  value = "09",
  unit = "hour",
  min = unit === "hour" ? 1 : 0,
  max = unit === "hour" ? 12 : 59,
  onIncrement,
  onDecrement,
  style,
  ...props
}: TimeStepperProps) {
  const numVal = parseInt(value, 10) || 0;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        gap: "var(--space-stack-xs, 4px)",
        ...style,
      }}
      {...props}
    >
      <button
        type="button"
        aria-label={`Increment ${unit}`}
        onClick={onIncrement}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--size-control-xs, 28px)",
          height: "var(--size-control-xs, 28px)",
          borderRadius: "var(--radius-control, 12px)",
          background: "transparent",
          border: "none",
          color: "var(--color-icon-brand, #be240c)",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <StepperChevron direction="up" />
      </button>
      <span
        role="spinbutton"
        tabIndex={0}
        aria-label={unit === "hour" ? "Hour" : "Minute"}
        aria-valuenow={numVal}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={`${value} ${unit}`}
        style={{
          fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
          fontSize: "var(--font-size-body-sm, 14px)",
          fontWeight: "var(--font-weight-regular, 400)" as React.CSSProperties["fontWeight"],
          lineHeight: "var(--line-height-body-sm, 20px)",
          color: "var(--color-text-primary, #303036)",
          textAlign: "center",
          width: "100%",
          userSelect: "none",
        }}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={`Decrement ${unit}`}
        onClick={onDecrement}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--size-control-xs, 28px)",
          height: "var(--size-control-xs, 28px)",
          borderRadius: "var(--radius-control, 12px)",
          background: "transparent",
          border: "none",
          color: "var(--color-icon-brand, #be240c)",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <StepperChevron direction="down" />
      </button>
    </div>
  );
}

export interface MeridiemToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  active?: "AM" | "PM";
  onChange?: (meridiem: "AM" | "PM") => void;
}

/**
 * C31 — Meridiem Toggle Molecule (Figma 1193:70)
 */
export function MeridiemToggle({ active = "AM", onChange, style, ...props }: MeridiemToggleProps) {
  return (
    <div
      role="group"
      aria-label="AM or PM"
      style={{
        display: "inline-flex",
        borderRadius: "var(--radius-control-sm, 6px)",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      {(["AM", "PM"] as const).map((m) => {
        const isActive = m === active;
        return (
          <button
            key={m}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange?.(m)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 28,
              paddingInline: 10,
              paddingBlock: 6,
              background: isActive
                ? "var(--color-action-primary, #dc2b10)"
                : "var(--color-background-muted, #f2f2f6)",
              color: isActive
                ? "var(--color-action-on-action, #ffffff)"
                : "var(--color-text-secondary, #5c5c63)",
              border: "none",
              fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
              fontSize: "var(--font-size-body-xs, 12px)",
              fontWeight: "var(--font-weight-semibold, 600)" as React.CSSProperties["fontWeight"],
              lineHeight: "var(--line-height-body-xs, 16px)",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}
