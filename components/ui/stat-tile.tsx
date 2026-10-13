import { TrendIndicator } from "./trend-indicator";

export function StatTile({
  label = "Monthly recurring revenue",
  value = "$412,900",
  change = "+12.4%",
  period = "versus last month",
  direction = "Up",
  tone = "Positive",
  showTrend = true,
}: {
  label?: string;
  value?: string;
  change?: string;
  period?: string;
  direction?: "Up" | "Down";
  tone?: "Positive" | "Negative" | "Neutral";
  showTrend?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-sm)",
        padding: "var(--space-inset-md)",
        borderRadius: "var(--radius-card)",
        background: "var(--color-background-surface)",
        border: "var(--border-hairline) solid var(--color-border-subtle)",
      }}
    >
      <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-overline)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
      <strong style={{ fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>{value}</strong>
      {showTrend ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
          <TrendIndicator direction={direction} tone={tone} value={change} />
          <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-body-xs)" }}>{period}</span>
        </span>
      ) : null}
    </div>
  );
}
