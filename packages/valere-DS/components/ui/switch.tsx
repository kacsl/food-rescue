export const SWITCH_SELECTIONS = ["Off", "On"] as const;
export const SWITCH_STATES = ["Default", "Hover", "Focus", "Disabled"] as const;
export type SwitchSelection = (typeof SWITCH_SELECTIONS)[number];
export type SwitchState = (typeof SWITCH_STATES)[number];

export function Switch({
  selection = "Off",
  state = "Default",
  size = "MD",
  label = "Two-factor authentication",
  description = "Ask for a code from your authenticator app when you sign in.",
  showLabel = true,
  showDescription = false,
}: {
  selection?: SwitchSelection;
  state?: SwitchState;
  size?: "MD" | "LG";
  label?: string;
  description?: string;
  showLabel?: boolean;
  showDescription?: boolean;
}) {
  const on = selection === "On";
  const disabled = state === "Disabled";
  const trackH = size === "LG" ? "var(--size-switch-track-lg)" : "var(--size-switch-track-md)";
  const trackW = size === "LG" ? "var(--size-control-lg)" : "var(--size-control-md)";
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-inline-md)",
        minHeight: size === "LG" ? "var(--size-control-lg)" : "var(--size-control-md)",
        paddingBlock: "var(--space-stack-sm)",
        color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {showLabel ? (
        <span style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
          <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
          {showDescription ? (
            <span style={{ fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>{description}</span>
          ) : null}
        </span>
      ) : (
        <span />
      )}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          width: trackW,
          height: trackH,
          paddingInline: "var(--spacing-4)",
          borderRadius: "var(--radius-pill)",
          background: disabled
            ? "var(--color-background-muted)"
            : on
              ? "var(--color-action-primary)"
              : "var(--color-border-default)",
          justifyContent: on ? "flex-end" : "flex-start",
          boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        }}
      >
        <span
          style={{
            width: "var(--size-icon-xs)",
            height: "var(--size-icon-xs)",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-background-surface)",
          }}
        />
      </span>
    </label>
  );
}
