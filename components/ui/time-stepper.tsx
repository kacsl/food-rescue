import { ChevronIcon } from "../../lib/icons";
import { IconButton } from "./icon-button";

export function TimeStepper({
  unit = "Hour",
  value = "09",
}: {
  unit?: "Hour" | "Minute" | "Second";
  value?: string;
}) {
  return (
    <div
      role="spinbutton"
      aria-label={unit}
      aria-valuenow={Number(value)}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-stack-xs)",
      }}
    >
      <IconButton variant="Ghost" size="XS" icon={<span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><ChevronIcon size="var(--size-icon-xs)" /></span>} aria-label={`Increase ${unit}`} />
      <span style={{ fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>{value}</span>
      <IconButton variant="Ghost" size="XS" icon={<ChevronIcon size="var(--size-icon-xs)" />} aria-label={`Decrease ${unit}`} />
    </div>
  );
}
