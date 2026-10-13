import { CheckIcon } from "../../lib/icons";

export const STEP_STATUSES = ["Upcoming", "Current", "Complete"] as const;
export type StepStatus = (typeof STEP_STATUSES)[number];

export function Step({
  status = "Upcoming",
  title = "Shipping",
  description = "Where should we send it?",
  index = "1",
  showConnector = true,
  orientation = "Horizontal",
}: {
  status?: StepStatus;
  title?: string;
  description?: string;
  index?: string;
  showConnector?: boolean;
  orientation?: "Horizontal" | "Vertical";
}) {
  const current = status === "Current";
  const complete = status === "Complete";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "Vertical" ? "column" : "row",
        alignItems: orientation === "Vertical" ? "flex-start" : "center",
        gap: "var(--space-inline-md)",
        flex: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-md)", flex: 1 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--size-control-sm)",
            height: "var(--size-control-sm)",
            borderRadius: "var(--radius-pill)",
            background: complete || current ? "var(--color-action-primary)" : "var(--color-background-muted)",
            color: complete || current ? "var(--color-action-on-action)" : "var(--color-text-secondary)",
            fontSize: "var(--font-size-body-xs)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          {complete ? <CheckIcon /> : index}
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
          <strong style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)", color: current ? "var(--color-text-brand)" : "var(--color-text-primary)" }}>
            {title}
          </strong>
          <span style={{ fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>{description}</span>
        </span>
      </div>
      {showConnector ? (
        <span
          style={{
            flex: 1,
            minWidth: orientation === "Horizontal" ? "var(--spacing-24)" : "var(--size-connector)",
            minHeight: orientation === "Horizontal" ? "var(--size-connector)" : "var(--spacing-24)",
            background: complete ? "var(--color-action-primary)" : "var(--color-border-subtle)",
          }}
        />
      ) : null}
    </div>
  );
}
