import type { ReactNode } from "react";
import { Badge } from "./badge";
import { Button } from "./button";

export const CARD_VARIANTS = ["Outlined", "Elevated"] as const;
export const CARD_STATES = ["Default", "Hover", "Focus"] as const;

export function Card({
  variant = "Outlined",
  state = "Default",
  title = "Quarterly report",
  body = "Revenue, retention and the experiments that moved them.",
  actionLabel = "Open",
  showBadge = true,
  showAction = true,
  media,
}: {
  variant?: (typeof CARD_VARIANTS)[number];
  state?: (typeof CARD_STATES)[number];
  title?: string;
  body?: string;
  actionLabel?: string;
  showBadge?: boolean;
  showAction?: boolean;
  media?: ReactNode;
}) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-md)",
        width: "100%",
        padding: "var(--space-inset-lg)",
        borderRadius: "var(--radius-card)",
        background: state === "Hover" ? "var(--color-background-subtle)" : "var(--color-background-surface)",
        border: variant === "Outlined" ? "var(--border-hairline) solid var(--color-border-subtle)" : "none",
        boxShadow: variant === "Elevated" ? "var(--elevation-3)" : "none",
        outline: state === "Focus" ? "var(--border-focus-ring) solid var(--color-border-focus)" : "none",
      }}
    >
      {media}
      {showBadge ? <Badge tone="Brand" label="Insight" /> : null}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
        <h3 style={{ margin: 0, fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</h3>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>{body}</p>
      </div>
      {showAction ? <Button variant="Outline" size="SM" label={actionLabel} /> : null}
    </article>
  );
}
