export const TAB_STATES = ["Default", "Hover", "Focus", "Disabled"] as const;

export function Tab({
  selected = "False",
  state = "Default",
  label = "Overview",
  showIcon = false,
}: {
  selected?: "False" | "True";
  state?: (typeof TAB_STATES)[number];
  label?: string;
  showIcon?: boolean;
}) {
  const on = selected === "True";
  const disabled = state === "Disabled";
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "var(--size-control-md)",
        paddingInline: "var(--space-inset-sm)",
        border: "none",
        background: "transparent",
        color: disabled ? "var(--color-text-disabled)" : on ? "var(--color-text-brand)" : "var(--color-text-secondary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        fontSize: "var(--font-size-body-sm)",
        fontWeight: "var(--font-weight-semibold)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
        {showIcon ? <span style={{ width: "var(--size-icon-md)", height: "var(--size-icon-md)", borderRadius: "var(--radius-pill)", background: "currentColor" }} /> : null}
        {label}
      </span>
      <span
        style={{
          marginTop: "var(--spacing-2)",
          width: "100%",
          height: "var(--border-width-2)",
          background: on ? "var(--color-action-primary)" : "transparent",
        }}
      />
    </button>
  );
}
