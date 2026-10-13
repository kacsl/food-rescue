import { CloseIcon, InfoIcon } from "../../lib/icons";
import { Button } from "./button";

export const BANNER_TONES = ["Info", "Success", "Warning", "Error"] as const;
export type BannerTone = (typeof BANNER_TONES)[number];

const tonePaint: Record<BannerTone, { bg: string; border: string; color: string }> = {
  Info: { bg: "var(--color-status-info-bg)", border: "var(--color-status-info-border)", color: "var(--color-status-info-text)" },
  Success: { bg: "var(--color-status-success-bg)", border: "var(--color-status-success-border)", color: "var(--color-status-success-text)" },
  Warning: { bg: "var(--color-status-warning-bg)", border: "var(--color-status-warning-border)", color: "var(--color-status-warning-text)" },
  Error: { bg: "var(--color-status-error-bg)", border: "var(--color-status-error-border)", color: "var(--color-status-error-text)" },
};

export function Banner({
  tone = "Info",
  message = "Scheduled maintenance on Sunday 24 August, 02:00–04:00 UTC.",
  actionLabel = "Read more",
  showAction = true,
  showClose = true,
  showIcon = true,
}: {
  tone?: BannerTone;
  message?: string;
  actionLabel?: string;
  showAction?: boolean;
  showClose?: boolean;
  showIcon?: boolean;
}) {
  const paint = tonePaint[tone];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-md)",
        minHeight: "var(--size-control-md)",
        padding: "var(--space-inset-sm) var(--space-inset-lg)",
        background: paint.bg,
        color: paint.color,
        borderBottom: `var(--border-hairline) solid ${paint.border}`,
      }}
    >
      {showIcon ? <InfoIcon /> : null}
      <p style={{ margin: 0, flex: 1, fontSize: "var(--font-size-body-sm)" }}>{message}</p>
      {showAction ? <Button variant="Ghost" size="SM" label={actionLabel} /> : null}
      {showClose ? <Button variant="Ghost" size="XS" showLabel={false} leadingIcon leadingIconSwap={<CloseIcon />} aria-label="Close" /> : null}
    </div>
  );
}
