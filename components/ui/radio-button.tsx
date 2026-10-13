export const RADIO_SELECTIONS = ["Unselected", "Selected"] as const;
export const RADIO_STATES = ["Default", "Hover", "Focus", "Error", "Disabled"] as const;
export type RadioSelection = (typeof RADIO_SELECTIONS)[number];
export type RadioState = (typeof RADIO_STATES)[number];

export function RadioButton({
  selection = "Unselected",
  state = "Default",
  size = "MD",
  label = "Standard delivery",
  description = "Arrives in 3–5 working days.",
  showLabel = true,
  showDescription = false,
}: {
  selection?: RadioSelection;
  state?: RadioState;
  size?: "MD" | "LG";
  label?: string;
  description?: string;
  showLabel?: boolean;
  showDescription?: boolean;
}) {
  const disabled = state === "Disabled";
  const box = size === "LG" ? "var(--size-check-lg)" : "var(--size-check-md)";
  const selected = selection === "Selected";
  const error = state === "Error";
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-inline-md)",
        minHeight: size === "LG" ? "var(--size-control-lg)" : "var(--size-control-md)",
        paddingBlock: "var(--space-inset-sm)",
        color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: box,
          height: box,
          borderRadius: "var(--radius-pill)",
          border: `var(--border-hairline) solid ${
            error ? "var(--color-status-error-border)" : selected ? "var(--color-action-primary)" : "var(--color-border-default)"
          }`,
          background: "var(--color-background-surface)",
          boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        }}
      >
        {selected ? (
          <span
            style={{
              width: "var(--size-dot-md)",
              height: "var(--size-dot-md)",
              borderRadius: "var(--radius-pill)",
              background: error ? "var(--color-action-danger)" : "var(--color-action-primary)",
            }}
          />
        ) : null}
      </span>
      {showLabel ? (
        <span style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
          <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
          {showDescription ? (
            <span style={{ fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
