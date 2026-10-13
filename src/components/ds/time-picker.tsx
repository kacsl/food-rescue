"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export type TimePickerSize = "MD" | "LG";
export type TimePickerState =
  | "Default"
  | "Hover"
  | "Focus"
  | "Open"
  | "Selected"
  | "Error"
  | "Disabled";

const FIGMA_TIME_SLOTS = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
] as const;

export function generateQuarterHourSlots(startHour = 6, endHour = 23): string[] {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    for (const m of [0, 15, 30, 45]) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

function ClockTrailingIcon({ color }: { color: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, color }}
    >
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5.83333V10L12.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckOptionIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, color: "var(--color-icon-secondary, #5c5c63)" }}
    >
      <path
        d="M4.16667 10.8333L7.5 14.1667L15.8333 5.83333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface TimeListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options?: readonly string[];
  selectedValue?: string;
  hoveredValue?: string;
  size?: TimePickerSize;
  maxVisibleItems?: number;
  onSelect?: (time: string) => void;
}

/**
 * C33 — Time List Popover (Figma 1169:159)
 * 15-minute interval option list with Default, Hover, and Selected states.
 */
export function TimeList({
  options = FIGMA_TIME_SLOTS,
  selectedValue = "09:30",
  hoveredValue,
  size = "MD",
  maxVisibleItems = 7,
  onSelect,
  style,
  ...props
}: TimeListProps) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const rowHeight = size === "LG" ? 52 : 44;
  const fontSize = size === "LG" ? "var(--font-size-body-md, 16px)" : "var(--font-size-body-sm, 14px)";
  const lineHeight = size === "LG" ? "var(--line-height-body-md, 24px)" : "var(--line-height-body-sm, 20px)";

  useEffect(() => {
    if (selectedRef.current && options.length > maxVisibleItems) {
      selectedRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [options.length, maxVisibleItems]);

  return (
    <div
      role="listbox"
      aria-label="Time options"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBlock: 8,
        background: "var(--color-background-surface, #ffffff)",
        border: "var(--border-hairline, 1px) solid var(--color-border-subtle, #e6e7ed)",
        borderRadius: "var(--radius-card, 16px)",
        boxShadow:
          "var(--elevation-3, 0px 0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 8px 0px rgba(0, 0, 0, 0.06))",
        maxHeight: options.length > maxVisibleItems ? maxVisibleItems * rowHeight + 16 : undefined,
        overflowY: options.length > maxVisibleItems ? "auto" : "hidden",
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    >
      {options.map((slot) => {
        const isSelected = slot === selectedValue;
        const isHovered = !isSelected && (slot === hoveredSlot || slot === hoveredValue);

        return (
          <button
            key={slot}
            ref={isSelected ? selectedRef : undefined}
            type="button"
            role="option"
            aria-selected={isSelected}
            onMouseEnter={() => setHoveredSlot(slot)}
            onMouseLeave={() => setHoveredSlot(null)}
            onClick={() => onSelect?.(slot)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-inline-sm, 8px)",
              width: "100%",
              height: rowHeight,
              flexShrink: 0,
              paddingInline: "var(--space-inset-md, 16px)",
              background: isSelected
                ? "var(--color-background-brand-subtle, #ffedec)"
                : isHovered
                  ? "var(--color-background-muted, #f2f2f6)"
                  : "transparent",
              borderRadius: "var(--radius-control, 12px)",
              border: "none",
              cursor: "pointer",
              boxSizing: "border-box",
              textAlign: "left",
              transition: "background-color 120ms ease",
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
                color: "var(--color-text-primary, #303036)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {slot}
            </span>
            {isSelected && <CheckOptionIcon />}
          </button>
        );
      })}
    </div>
  );
}

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  size?: TimePickerSize;
  state?: TimePickerState;
  label?: string;
  value?: string;
  placeholder?: string;
  helperText?: string;
  showLabel?: boolean;
  showHelper?: boolean;
  required?: boolean;
  options?: readonly string[];
  fullDay?: boolean;
  inlinePopover?: boolean;
  onTriggerClick?: () => void;
  onChange?: (time: string) => void;
}

/**
 * C33 — Time Picker (Figma 90:72 / 1169:2 & 1169:159)
 */
export function TimePicker({
  size = "MD",
  state,
  label = "Time",
  value,
  placeholder = "Select a time",
  helperText = "Helper text",
  showLabel = true,
  showHelper = false,
  required = false,
  options,
  fullDay = false,
  inlinePopover = false,
  onTriggerClick,
  onChange,
  style,
  ...props
}: TimePickerProps) {
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

  const effectiveState: TimePickerState =
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

  const shownText = value ?? (effectiveState === "Selected" || isError ? "09:30" : placeholder);

  const iconColor = isError
    ? "var(--color-icon-error, #b8342c)"
    : isDisabled
      ? "var(--color-icon-disabled, #b4b5bd)"
      : "var(--color-icon-muted, #75757d)";

  const resolvedOptions =
    options ?? (fullDay || onChange !== undefined ? generateQuarterHourSlots(6, 23) : FIGMA_TIME_SLOTS);

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
        aria-haspopup="listbox"
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
        <ClockTrailingIcon color={iconColor} />
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
          {isError && helperText === "Helper text" ? "Invalid time selected" : helperText}
        </span>
      )}

      {isOpenState && !onTriggerClick && (
        <div
          style={
            inlinePopover || state === "Open"
              ? { marginTop: 4, width: "100%" }
              : {
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  zIndex: 40,
                  width: "100%",
                }
          }
        >
          <TimeList
            options={resolvedOptions}
            selectedValue={value ?? "09:30"}
            hoveredValue={state === "Open" && onChange === undefined ? "09:45" : undefined}
            size={size}
            onSelect={(selectedTime) => {
              onChange?.(selectedTime);
              if (state === undefined) {
                setIsOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
