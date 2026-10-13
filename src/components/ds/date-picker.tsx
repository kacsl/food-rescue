"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Calendar } from "./calendar";

export type DatePickerSize = "MD" | "LG";
export type DatePickerState =
  | "Default"
  | "Hover"
  | "Focus"
  | "Open"
  | "Selected"
  | "Error"
  | "Disabled";

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  size?: DatePickerSize;
  state?: DatePickerState;
  label?: string;
  value?: string;
  displayValue?: string;
  placeholder?: string;
  helperText?: string;
  showLabel?: boolean;
  showHelper?: boolean;
  required?: boolean;
  minDate?: string;
  maxDate?: string;
  inlinePopover?: boolean;
  onTriggerClick?: () => void;
  onChange?: (dateIso: string) => void;
}

function CalendarTrailingIcon({ color }: { color: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, color }}
    >
      <rect
        x="2.5"
        y="3.75"
        width="15"
        height="13.75"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 2.08333V5.41667M6.66667 2.08333V5.41667M2.5 8.33333H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export function formatIsoDateDisplay(value?: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return `${SHORT_MONTHS[(m - 1 + 12) % 12]} ${d}, ${y}`;
  }
  return value;
}

/**
 * C32 — Date Picker (Figma 90:71 / 1168:2 & 1168:159)
 */
export function DatePicker({
  size = "MD",
  state,
  label = "Date",
  value,
  displayValue,
  placeholder = "Select a date",
  helperText = "Helper text",
  showLabel = true,
  showHelper = false,
  required = false,
  minDate,
  maxDate,
  inlinePopover = false,
  onTriggerClick,
  onChange,
  style,
  ...props
}: DatePickerProps) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const helperId = `${uid}-helper`;
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(state === "Open");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (state !== undefined) {
      setIsOpen(state === "Open");
    }
  }, [state]);

  useEffect(() => {
    if (!isOpen || state === "Open") return;
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, state]);

  const effectiveState: DatePickerState =
    state ?? (isOpen ? "Open" : focused ? "Focus" : hovered ? "Hover" : value ? "Selected" : "Default");

  const isDisabled = effectiveState === "Disabled";
  const isError = effectiveState === "Error";
  const isFocus = effectiveState === "Focus";
  const isOpenState = effectiveState === "Open";
  const hasValue = Boolean(value) || effectiveState === "Selected" || isError;

  const height = size === "LG" ? "var(--size-control-lg, 52px)" : "var(--size-control-md, 44px)";
  const fontSize = size === "LG" ? "var(--font-size-body-md, 16px)" : "var(--font-size-body-sm, 14px)";
  const lineHeight = size === "LG" ? "var(--line-height-body-md, 24px)" : "var(--line-height-body-sm, 20px)";

  const border = isOpenState || isFocus
    ? "var(--border-emphasis, 1.5px) solid var(--color-border-focus, #be240c)"
    : isError
      ? "var(--border-emphasis, 1.5px) solid var(--color-status-error-border, #d7463c)"
      : effectiveState === "Hover"
        ? "var(--border-hairline, 1px) solid var(--color-border-strong, #75757d)"
        : isDisabled
          ? "var(--border-hairline, 1px) solid var(--color-border-subtle, #e6e7ed)"
          : "var(--border-hairline, 1px) solid var(--color-border-default, #93949b)";

  const shownText =
    displayValue ??
    (value ? formatIsoDateDisplay(value) : effectiveState === "Selected" || isError ? "Aug 15, 2026" : placeholder);

  const iconColor = isError
    ? "var(--color-icon-error, #b8342c)"
    : isDisabled
      ? "var(--color-icon-disabled, #b4b5bd)"
      : "var(--color-icon-muted, #75757d)";

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        gap: "var(--space-stack-xs, 4px)",
        width: 280,
        ...style,
      }}
      {...props}
    >
      {showLabel && (
        <label
          id={labelId}
          style={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
            fontSize: "var(--font-size-body-sm, 14px)",
            fontWeight: "var(--font-weight-semibold, 600)" as React.CSSProperties["fontWeight"],
            lineHeight: "var(--line-height-body-sm, 20px)",
            color: isDisabled
              ? "var(--color-text-disabled, #b4b5bd)"
              : "var(--color-text-secondary, #5c5c63)",
          }}
        >
          <span>{label}</span>
          {required && <span style={{ color: "var(--color-status-error-text, #b8342c)" }}>*</span>}
        </label>
      )}

      <button
        type="button"
        disabled={isDisabled}
        aria-haspopup="dialog"
        aria-expanded={isOpenState}
        aria-labelledby={showLabel ? labelId : undefined}
        aria-label={!showLabel ? label : undefined}
        aria-invalid={isError || undefined}
        aria-describedby={showHelper ? helperId : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={() => {
          if (isDisabled) return;
          if (onTriggerClick) {
            onTriggerClick();
            return;
          }
          if (state === undefined) {
            setIsOpen((prev) => !prev);
          }
        }}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-inline-sm, 8px)",
          width: "100%",
          height,
          paddingInline: "var(--space-inset-md, 16px)",
          background: isDisabled
            ? "var(--color-background-subtle, #f8f9fc)"
            : "var(--color-background-surface, #ffffff)",
          border,
          borderRadius: "var(--radius-control, 12px)",
          outline: "none",
          cursor: isDisabled ? "not-allowed" : "pointer",
          boxSizing: "border-box",
          textAlign: "left",
        }}
      >
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
            fontSize,
            fontWeight: "var(--font-weight-regular, 400)" as React.CSSProperties["fontWeight"],
            lineHeight,
            color: isDisabled
              ? "var(--color-text-disabled, #b4b5bd)"
              : hasValue
                ? "var(--color-text-primary, #303036)"
                : "var(--color-text-tertiary, #75757d)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {shownText}
        </span>
        <CalendarTrailingIcon color={iconColor} />
      </button>

      {showHelper && (
        <span
          id={helperId}
          role={isError ? "alert" : undefined}
          style={{
            fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
            fontSize: "var(--font-size-body-xs, 12px)",
            lineHeight: "var(--line-height-body-xs, 16px)",
            color: isError
              ? "var(--color-status-error-text, #b8342c)"
              : isDisabled
                ? "var(--color-text-disabled, #b4b5bd)"
                : "var(--color-text-tertiary, #75757d)",
          }}
        >
          {isError && helperText === "Helper text" ? "Invalid date selected" : helperText}
        </span>
      )}

      {isOpenState && !onTriggerClick && (
        <div
          style={
            inlinePopover || state === "Open"
              ? { marginTop: 4, width: "100%", display: "flex", justifyContent: "center" }
              : {
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  zIndex: 40,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }
          }
        >
          <Calendar
            months={1}
            showPresets={false}
            showTime={false}
            showFooter={false}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(iso) => {
              onChange?.(iso);
              if (state === undefined) {
                setIsOpen(false);
              }
            }}
            style={{ width: "100%", maxWidth: 340 }}
          />
        </div>
      )}
    </div>
  );
}
