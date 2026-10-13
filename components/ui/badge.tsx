export const BADGE_TONES = ["Neutral", "Brand", "Info", "Success", "Warning", "Error"] as const;
export const BADGE_EMPHASES = ["Subtle", "Solid"] as const;
export type BadgeTone = (typeof BADGE_TONES)[number];
export type BadgeEmphasis = (typeof BADGE_EMPHASES)[number];

const subtle: Record<BadgeTone, { bg: string; color: string; border: string }> = {
  Neutral: { bg: "var(--color-background-muted)", color: "var(--color-text-secondary)", border: "var(--color-border-subtle)" },
  Brand: { bg: "var(--color-background-brand-subtle)", color: "var(--color-text-brand)", border: "var(--color-border-brand)" },
  Info: { bg: "var(--color-status-info-bg)", color: "var(--color-status-info-text)", border: "var(--color-status-info-border)" },
  Success: { bg: "var(--color-status-success-bg)", color: "var(--color-status-success-text)", border: "var(--color-status-success-border)" },
  Warning: { bg: "var(--color-status-warning-bg)", color: "var(--color-status-warning-text)", border: "var(--color-status-warning-border)" },
  Error: { bg: "var(--color-status-error-bg)", color: "var(--color-status-error-text)", border: "var(--color-status-error-border)" },
};

const solid: Record<BadgeTone, { bg: string; color: string; border: string }> = {
  Neutral: { bg: "var(--color-background-inverse)", color: "var(--color-text-inverse)", border: "var(--color-background-inverse)" },
  Brand: { bg: "var(--color-background-brand)", color: "var(--color-text-on-brand)", border: "var(--color-background-brand)" },
  Info: { bg: "var(--color-status-info-solid)", color: "var(--color-status-on-solid)", border: "var(--color-status-info-solid)" },
  Success: { bg: "var(--color-status-success-solid)", color: "var(--color-status-on-solid)", border: "var(--color-status-success-solid)" },
  Warning: { bg: "var(--color-status-warning-solid)", color: "var(--color-status-on-solid)", border: "var(--color-status-warning-solid)" },
  Error: { bg: "var(--color-status-error-solid)", color: "var(--color-status-on-solid)", border: "var(--color-status-error-solid)" },
};

export function Badge({
  tone = "Neutral",
  emphasis = "Subtle",
  label = "Label",
  showDot = false,
}: {
  tone?: BadgeTone;
  emphasis?: BadgeEmphasis;
  label?: string;
  showDot?: boolean;
}) {
  const paint = emphasis === "Solid" ? solid[tone] : subtle[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        height: "var(--spacing-20)",
        paddingInline: "var(--space-inset-xs)",
        borderRadius: "var(--radius-pill)",
        border: `${"var(--border-hairline)"} solid ${paint.border}`,
        background: paint.bg,
        color: paint.color,
        fontSize: "var(--font-size-body-xs)",
        fontWeight: "var(--font-weight-semibold)",
        lineHeight: "1",
      }}
    >
      {showDot ? (
        <span style={{ width: "var(--size-dot-sm)", height: "var(--size-dot-sm)", borderRadius: "var(--radius-pill)", background: "currentColor" }} />
      ) : null}
      {label}
    </span>
  );
}
