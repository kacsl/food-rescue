import { ChevronLeftIcon, ChevronRightIcon } from "../../lib/icons";
import { Button } from "./button";
import { Day } from "./day";
import { IconButton } from "./icon-button";
import { MenuItem } from "./menu-item";
import { ToggleGroupItem } from "./toggle-group-item";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;
const DAYS = ["29", "30", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "1", "2"] as const;

export function Calendar({
  months = "1",
  showPresets = false,
  showTime = false,
  showFooter = false,
  timeFormat = "24h",
  selectedDay = "12",
}: {
  months?: "1" | "2";
  showPresets?: boolean;
  showTime?: boolean;
  showFooter?: boolean;
  timeFormat?: "12h" | "24h";
  selectedDay?: string;
}) {
  return (
    <div
      role="dialog"
      aria-label="Calendar"
      style={{
        display: "flex",
        gap: "var(--space-inline-md)",
        padding: "var(--space-inset-md)",
        borderRadius: "var(--radius-card)",
        background: "var(--color-background-surface)",
        boxShadow: "var(--elevation-4)",
      }}
    >
      {showPresets ? (
        <div style={{ display: "flex", flexDirection: "column", minWidth: "var(--spacing-96)" }}>
          <MenuItem label="Today" state="Hover" />
          <MenuItem label="This week" />
          <MenuItem label="This month" />
        </div>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
        <div style={{ display: "flex", gap: "var(--space-inline-md)" }}>
          <MonthGrid selectedDay={selectedDay} showPrev showNext={months === "1"} title="September 2026" />
          {months === "2" ? <MonthGrid selectedDay="" showPrev={false} showNext title="October 2026" /> : null}
        </div>
        {showTime ? (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
            <span style={{ fontSize: "var(--font-size-body-sm)" }}>09:30</span>
            {timeFormat === "12h" ? (
              <>
                <ToggleGroupItem position="Start" selected="True" label="AM" />
                <ToggleGroupItem position="End" label="PM" />
              </>
            ) : null}
          </div>
        ) : null}
        {showFooter ? (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-inline-sm)" }}>
            <Button variant="Ghost" size="SM" label="Cancel" />
            <Button variant="Primary" size="SM" label="Confirm" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MonthGrid({
  title,
  selectedDay,
  showPrev,
  showNext,
}: {
  title: string;
  selectedDay: string;
  showPrev: boolean;
  showNext: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {showPrev ? <IconButton variant="Ghost" size="XS" icon={<ChevronLeftIcon />} aria-label="Previous month" /> : <span style={{ width: "var(--size-control-xs)" }} />}
        <strong style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</strong>
        {showNext ? <IconButton variant="Ghost" size="XS" icon={<ChevronRightIcon />} aria-label="Next month" /> : <span style={{ width: "var(--size-control-xs)" }} />}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, var(--size-control-md))" }}>
        {WEEKDAYS.map((day) => (
          <span key={day} style={{ textAlign: "center", color: "var(--color-text-secondary)", fontSize: "var(--font-size-overline)", fontWeight: "var(--font-weight-semibold)" }}>
            {day}
          </span>
        ))}
        {DAYS.map((day, index) => (
          <Day key={`${day}-${index}`} label={day} state={day === selectedDay ? "Selected" : index < 2 || index > 32 ? "Outside" : "Default"} />
        ))}
      </div>
    </div>
  );
}
