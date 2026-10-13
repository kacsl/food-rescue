"use client";

import React, { useMemo, useState } from "react";
import { Day, DayState, MeridiemToggle, TimeStepper } from "./day";

export { Day, MeridiemToggle, TimeStepper };
export type { DayProps, DayState, MeridiemToggleProps, TimeStepperProps } from "./day";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const PRESETS = [
  "Today",
  "Tomorrow",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
] as const;

export interface CalendarCellData {
  day: number;
  iso?: string;
  state: DayState;
  label: string;
}

function NavChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 12L6 8L10 4" : "M6 4L10 8L6 12"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function toIsoDate(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function buildFigmaShowcaseGrid(monthLabel: string, selectedDay?: number): CalendarCellData[][] {
  const baseRows = [
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, 1, 2, 3, 4, 5, 6],
  ];
  return baseRows.map((row, rIdx) =>
    row.map((d, cIdx) => {
      const isOutside = (rIdx === 0 && cIdx < 5) || (rIdx === 5 && cIdx > 0);
      let state: DayState = "Default";
      if (isOutside) state = "Outside";
      else if (selectedDay !== undefined && d === selectedDay) state = "Selected";
      else if (selectedDay === undefined && d === 5) state = "Today";
      else if (selectedDay === undefined && d === 15) state = "Selected";
      else if (selectedDay === undefined && d === 18) state = "Range start";
      else if (selectedDay === undefined && (d === 19 || d === 20 || d === 21)) state = "Range middle";
      else if (selectedDay === undefined && d === 22) state = "Range end";
      else if (selectedDay === undefined && d === 28 && rIdx === 4) state = "Disabled";
      return {
        day: d,
        state,
        label: isOutside ? `${d} (adjacent month)` : `${monthLabel.split(" ")[0]} ${d}, ${monthLabel.split(" ")[1] ?? "2026"}`,
      };
    })
  );
}

function buildInteractiveMonthGrid(
  year: number,
  monthIndex: number,
  selectedIso?: string,
  todayIso?: string,
  minDate?: string,
  maxDate?: string
): CalendarCellData[][] {
  const firstDayDow = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();
  const cells: CalendarCellData[] = [];

  for (let i = firstDayDow - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevDate = new Date(year, monthIndex - 1, d);
    const iso = toIsoDate(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate());
    const disabled = Boolean((minDate && iso < minDate) || (maxDate && iso > maxDate));
    cells.push({
      day: d,
      iso,
      state: disabled ? "Disabled" : "Outside",
      label: `${MONTH_NAMES[prevDate.getMonth()]} ${d}, ${prevDate.getFullYear()}`,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = toIsoDate(year, monthIndex, d);
    const disabled = Boolean((minDate && iso < minDate) || (maxDate && iso > maxDate));
    let state: DayState = "Default";
    if (disabled) state = "Disabled";
    else if (selectedIso && iso === selectedIso) state = "Selected";
    else if (todayIso && iso === todayIso) state = "Today";
    cells.push({
      day: d,
      iso,
      state,
      label: `${MONTH_NAMES[monthIndex]} ${d}, ${year}`,
    });
  }

  let nextDay = 1;
  while (cells.length < 42) {
    const nextDate = new Date(year, monthIndex + 1, nextDay);
    const iso = toIsoDate(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());
    const disabled = Boolean((minDate && iso < minDate) || (maxDate && iso > maxDate));
    cells.push({
      day: nextDay,
      iso,
      state: disabled ? "Disabled" : "Outside",
      label: `${MONTH_NAMES[nextDate.getMonth()]} ${nextDay}, ${nextDate.getFullYear()}`,
    });
    nextDay++;
  }

  const rows: CalendarCellData[][] = [];
  for (let r = 0; r < 6; r++) {
    rows.push(cells.slice(r * 7, r * 7 + 7));
  }
  return rows;
}

export interface CalendarMonthProps extends React.HTMLAttributes<HTMLDivElement> {
  month?: string;
  showPrev?: boolean;
  showNext?: boolean;
  selectedDay?: number;
  rows?: CalendarCellData[][];
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onSelectCell?: (cell: CalendarCellData) => void;
}

/**
 * C31 — Calendar Month Molecule (Figma 1167:2)
 */
export function CalendarMonth({
  month = "August 2026",
  showPrev = true,
  showNext = true,
  selectedDay,
  rows: customRows,
  onPrevMonth,
  onNextMonth,
  onSelectCell,
  style,
  ...props
}: CalendarMonthProps) {
  const rows = useMemo(
    () => customRows ?? buildFigmaShowcaseGrid(month, selectedDay),
    [customRows, month, selectedDay]
  );

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "var(--space-stack-sm, 8px)",
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    >
      {/* Header (Figma 1167:3) */}
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div
          style={{
            width: "var(--size-control-sm, 36px)",
            height: "var(--size-control-sm, 36px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {showPrev && (
            <button
              type="button"
              aria-label="Previous month"
              onClick={onPrevMonth}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "var(--size-control-sm, 36px)",
                height: "var(--size-control-sm, 36px)",
                borderRadius: "var(--radius-control, 12px)",
                background: "transparent",
                border: "none",
                color: "var(--color-icon-brand, #be240c)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <NavChevron direction="left" />
            </button>
          )}
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
            fontSize: "var(--font-size-body-sm, 14px)",
            fontWeight: "var(--font-weight-semibold, 600)" as React.CSSProperties["fontWeight"],
            lineHeight: "var(--line-height-body-sm, 20px)",
            color: "var(--color-text-primary, #303036)",
          }}
        >
          {month}
        </div>
        <div
          style={{
            width: "var(--size-control-sm, 36px)",
            height: "var(--size-control-sm, 36px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {showNext && (
            <button
              type="button"
              aria-label="Next month"
              onClick={onNextMonth}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "var(--size-control-sm, 36px)",
                height: "var(--size-control-sm, 36px)",
                borderRadius: "var(--radius-control, 12px)",
                background: "transparent",
                border: "none",
                color: "var(--color-icon-brand, #be240c)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <NavChevron direction="right" />
            </button>
          )}
        </div>
      </div>

      {/* Weekdays (Figma 1167:14) */}
      <div role="row" style={{ display: "flex", width: "100%" }}>
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            role="columnheader"
            aria-label={wd}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "var(--size-control-md, 44px)",
              height: 28,
              flex: "1 1 0",
              minWidth: 0,
              fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
              fontSize: "var(--font-size-overline, 12px)",
              fontWeight: "var(--font-weight-regular, 400)" as React.CSSProperties["fontWeight"],
              lineHeight: "var(--line-height-overline, 16px)",
              color: "var(--color-text-secondary, #5c5c63)",
              letterSpacing: "var(--letter-spacing-overline, 0.08em)",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Days Grid (Figma 1167:29) */}
      <div role="grid" aria-label={month} style={{ display: "flex", flexDirection: "column" }}>
        {rows.map((row, rIdx) => (
          <div key={rIdx} role="row" style={{ display: "flex" }}>
            {row.map((cell, cIdx) => (
              <Day
                key={cIdx}
                day={cell.day}
                state={cell.state}
                fullDateLabel={cell.label}
                onClick={() => {
                  if (cell.state !== "Disabled") {
                    onSelectCell?.(cell);
                  }
                }}
                style={{ flex: "1 1 0", minWidth: 0 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export type CalendarMonths = 1 | 2;
export type CalendarTimeFormat = "12h" | "24h";

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  months?: CalendarMonths;
  showPresets?: boolean;
  showTime?: boolean;
  showFooter?: boolean;
  timeFormat?: CalendarTimeFormat;
  selectedDay?: number;
  value?: string;
  onChange?: (dateIso: string) => void;
  minDate?: string;
  maxDate?: string;
  onClear?: () => void;
  onConfirm?: () => void;
}

/**
 * C31 — Calendar Organism (Figma 90:70 / 1194:1168)
 */
export function Calendar({
  months = 1,
  showPresets = false,
  showTime = false,
  showFooter = true,
  timeFormat = "12h",
  selectedDay,
  value,
  onChange,
  minDate,
  maxDate,
  onClear,
  onConfirm,
  style,
  ...props
}: CalendarProps) {
  const isInteractive = value !== undefined || onChange !== undefined || minDate !== undefined;
  const todayObj = useMemo(() => new Date(), []);
  const todayIso = useMemo(
    () => toIsoDate(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate()),
    [todayObj]
  );

  const initialDate = useMemo(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return isInteractive ? todayObj : new Date(2026, 7, 15);
  }, [value, isInteractive, todayObj]);

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [localSelectedDay, setLocalSelectedDay] = useState<number | undefined>(selectedDay);
  const [hour, setHour] = useState(timeFormat === "12h" ? 9 : 14);
  const [minute, setMinute] = useState(30);
  const [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const secondMonthDate = useMemo(() => new Date(viewYear, viewMonth + 1, 1), [viewYear, viewMonth]);

  const firstMonthRows = useMemo(
    () =>
      isInteractive
        ? buildInteractiveMonthGrid(viewYear, viewMonth, value, todayIso, minDate, maxDate)
        : undefined,
    [isInteractive, viewYear, viewMonth, value, todayIso, minDate, maxDate]
  );

  const secondMonthRows = useMemo(
    () =>
      isInteractive
        ? buildInteractiveMonthGrid(
            secondMonthDate.getFullYear(),
            secondMonthDate.getMonth(),
            value,
            todayIso,
            minDate,
            maxDate
          )
        : undefined,
    [isInteractive, secondMonthDate, value, todayIso, minDate, maxDate]
  );

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        background: "var(--color-background-surface, #ffffff)",
        border: "var(--border-hairline, 1px) solid var(--color-border-subtle, #e6e7ed)",
        borderRadius: "var(--radius-card, 16px)",
        boxShadow:
          "var(--elevation-3, 0px 0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 8px 0px rgba(0, 0, 0, 0.06))",
        overflow: "hidden",
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    >
      {showPresets && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 176,
            padding: "var(--space-inset-sm, 12px)",
            gap: 2,
            borderRight: "var(--border-hairline, 1px) solid var(--color-border-subtle, #e6e7ed)",
            alignSelf: "stretch",
            boxSizing: "border-box",
          }}
        >
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                if (preset === "Today") {
                  setViewYear(todayObj.getFullYear());
                  setViewMonth(todayObj.getMonth());
                  onChange?.(todayIso);
                } else if (preset === "Tomorrow") {
                  const tmw = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate() + 1);
                  setViewYear(tmw.getFullYear());
                  setViewMonth(tmw.getMonth());
                  onChange?.(toIsoDate(tmw.getFullYear(), tmw.getMonth(), tmw.getDate()));
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                height: "var(--size-control-sm, 36px)",
                paddingInline: "var(--space-inset-sm, 12px)",
                borderRadius: "var(--radius-control-sm, 6px)",
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
                fontSize: "var(--font-size-body-sm, 14px)",
                fontWeight: "var(--font-weight-regular, 400)" as React.CSSProperties["fontWeight"],
                lineHeight: "var(--line-height-body-sm, 20px)",
                color: "var(--color-text-primary, #303036)",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {preset}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "var(--space-inset-md, 16px)",
          flex: 1,
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--space-inset-lg, 24px)",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <CalendarMonth
            month={`${MONTH_NAMES[viewMonth]} ${viewYear}`}
            showPrev
            showNext={months === 1}
            selectedDay={localSelectedDay}
            rows={firstMonthRows}
            onPrevMonth={handlePrev}
            onNextMonth={handleNext}
            onSelectCell={(cell) => {
              if (cell.iso) {
                onChange?.(cell.iso);
              } else {
                setLocalSelectedDay(cell.day);
              }
            }}
            style={{ width: "100%" }}
          />
          {months === 2 && (
            <CalendarMonth
              month={`${MONTH_NAMES[secondMonthDate.getMonth()]} ${secondMonthDate.getFullYear()}`}
              showPrev={false}
              showNext
              rows={secondMonthRows}
              onNextMonth={handleNext}
              onSelectCell={(cell) => {
                if (cell.iso) {
                  onChange?.(cell.iso);
                } else {
                  setLocalSelectedDay(cell.day);
                }
              }}
              style={{ width: "100%" }}
            />
          )}
        </div>

        {showTime && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <div
              style={{
                height: 1,
                width: "100%",
                background: "var(--color-border-subtle, #e6e7ed)",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TimeStepper
                value={String(hour).padStart(2, "0")}
                unit="hour"
                min={timeFormat === "12h" ? 1 : 0}
                max={timeFormat === "12h" ? 12 : 23}
                onIncrement={() =>
                  setHour((h) => (timeFormat === "12h" ? (h % 12) + 1 : (h + 1) % 24))
                }
                onDecrement={() =>
                  setHour((h) =>
                    timeFormat === "12h" ? (h - 2 + 12) % 12 + 1 : (h - 1 + 24) % 24
                  )
                }
              />
              <TimeStepper
                value={String(minute).padStart(2, "0")}
                unit="minute"
                min={0}
                max={59}
                onIncrement={() => setMinute((m) => (m + 1) % 60)}
                onDecrement={() => setMinute((m) => (m - 1 + 60) % 60)}
              />
              {timeFormat === "12h" && (
                <MeridiemToggle active={meridiem} onChange={setMeridiem} />
              )}
            </div>
          </div>
        )}

        {showFooter && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <div
              style={{
                height: 1,
                width: "100%",
                background: "var(--color-border-subtle, #e6e7ed)",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setLocalSelectedDay(undefined);
                  onClear?.();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "var(--size-control-md, 44px)",
                  paddingInline: "var(--space-inset-md, 16px)",
                  borderRadius: "var(--radius-control, 12px)",
                  background: "transparent",
                  color: "var(--color-text-brand, #be240c)",
                  border: "none",
                  fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
                  fontSize: "var(--font-size-body-sm, 14px)",
                  fontWeight: "var(--font-weight-semibold, 600)" as React.CSSProperties["fontWeight"],
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onConfirm}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "var(--size-control-md, 44px)",
                  paddingInline: "var(--space-inset-md, 16px)",
                  borderRadius: "var(--radius-control, 12px)",
                  background: "var(--color-action-primary, #dc2b10)",
                  color: "var(--color-action-on-action, #ffffff)",
                  border: "none",
                  fontFamily: "var(--font-family-body, 'Plus Jakarta Sans', sans-serif)",
                  fontSize: "var(--font-size-body-sm, 14px)",
                  fontWeight: "var(--font-weight-semibold, 600)" as React.CSSProperties["fontWeight"],
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
