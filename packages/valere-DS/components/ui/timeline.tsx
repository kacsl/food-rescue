export const TIMELINE_STATES = ["Default", "Current", "Complete"] as const;

export function TimelineItem({
  state = "Default",
  title = "Invoice sent",
  time = "09:14",
  showConnector = true,
}: {
  state?: (typeof TIMELINE_STATES)[number];
  title?: string;
  time?: string;
  showConnector?: boolean;
}) {
  const current = state === "Current";
  const complete = state === "Complete";
  return (
    <div style={{ display: "flex", gap: "var(--space-inline-md)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span
          style={{
            width: "var(--size-dot-lg)",
            height: "var(--size-dot-lg)",
            borderRadius: "var(--radius-pill)",
            background: complete || current ? "var(--color-action-primary)" : "var(--color-border-default)",
            boxShadow: current ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
          }}
        />
        {showConnector ? (
          <span style={{ width: "var(--size-connector)", flex: 1, minHeight: "var(--spacing-24)", background: "var(--color-border-subtle)" }} />
        ) : null}
      </div>
      <div style={{ paddingBottom: "var(--space-stack-md)" }}>
        <strong style={{ display: "block", fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</strong>
        <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-xs)" }}>{time}</span>
      </div>
    </div>
  );
}
