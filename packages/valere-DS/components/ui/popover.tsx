import type { ReactNode } from "react";
import { Button } from "./button";

export const POPOVER_PLACEMENTS = ["Top", "Bottom", "Left", "Right"] as const;

export function Popover({
  title = "Invite teammate",
  body = "They will join with the same role as you.",
  actionLabel = "Send invite",
  placement = "Bottom",
  children,
}: {
  title?: string;
  body?: string;
  actionLabel?: string;
  placement?: (typeof POPOVER_PLACEMENTS)[number];
  children?: ReactNode;
}) {
  return (
    <div
      data-placement={placement}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-md)",
        width: "min(100%, var(--size-dialog-sm))",
        padding: "var(--space-inset-md)",
        borderRadius: "var(--radius-control)",
        background: "var(--color-background-surface)",
        boxShadow: "var(--elevation-3)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
        <strong style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</strong>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-xs)" }}>{body}</p>
      </div>
      {children}
      <Button variant="Primary" size="SM" label={actionLabel} />
    </div>
  );
}
