import { CloseIcon, InfoIcon } from "../../lib/icons";
import { Button } from "./button";

export const TOAST_TONES = ["Info", "Success", "Warning", "Error"] as const;
export type ToastTone = (typeof TOAST_TONES)[number];

const border: Record<ToastTone, string> = {
  Info: "var(--color-status-info-border)",
  Success: "var(--color-status-success-border)",
  Warning: "var(--color-status-warning-border)",
  Error: "var(--color-status-error-border)",
};

export function Toast({
  tone = "Info",
  title = "Report published",
  body = "Everyone in the workspace can read it now.",
  showBody = true,
  actionLabel = "Undo",
  showAction = false,
  showClose = true,
}: {
  tone?: ToastTone;
  title?: string;
  body?: string;
  showBody?: boolean;
  actionLabel?: string;
  showAction?: boolean;
  showClose?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-inline-md)",
        width: "min(100%, 25rem)",
        padding: "var(--space-inset-md)",
        borderRadius: "var(--radius-control)",
        border: `var(--border-hairline) solid ${border[tone]}`,
        background: "var(--color-background-surface)",
        boxShadow: "var(--elevation-3)",
      }}
    >
      <span style={{ color: border[tone] }}>
        <InfoIcon />
      </span>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
        <strong style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</strong>
        {showBody ? <p style={{ margin: 0, fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>{body}</p> : null}
        {showAction ? <Button variant="Link" size="SM" label={actionLabel} /> : null}
      </div>
      {showClose ? <Button variant="Ghost" size="XS" showLabel={false} leadingIcon leadingIconSwap={<CloseIcon />} aria-label="Close" /> : null}
    </div>
  );
}
