import { TrendDownIcon, TrendUpIcon } from "../../lib/icons";

export const TREND_DIRECTIONS = ["Up", "Down"] as const;
export const TREND_TONES = ["Positive", "Negative", "Neutral"] as const;

const toneColor: Record<(typeof TREND_TONES)[number], string> = {
  Positive: "var(--color-status-success-text)",
  Negative: "var(--color-status-error-text)",
  Neutral: "var(--color-text-secondary)",
};

export function TrendIndicator({
  direction = "Up",
  tone = "Positive",
  value = "+12.4%",
}: {
  direction?: (typeof TREND_DIRECTIONS)[number];
  tone?: (typeof TREND_TONES)[number];
  value?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        color: toneColor[tone],
        fontSize: "var(--font-size-body-xs)",
        fontWeight: "var(--font-weight-semibold)",
      }}
    >
      <span aria-hidden="true">{direction === "Up" ? <TrendUpIcon /> : <TrendDownIcon />}</span>
      {value}
    </span>
  );
}
