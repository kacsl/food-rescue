export const TOOLTIP_PLACEMENTS = ["Top", "Bottom", "Left", "Right"] as const;

export function Tooltip({
  label = "Copy to clipboard",
  placement = "Top",
}: {
  label?: string;
  placement?: (typeof TOOLTIP_PLACEMENTS)[number];
}) {
  return (
    <span
      data-placement={placement}
      style={{
        display: "inline-flex",
        padding: "var(--space-stack-sm) var(--space-inset-sm)",
        borderRadius: "var(--radius-control-sm)",
        background: "var(--color-background-inverse)",
        color: "var(--color-text-inverse)",
        boxShadow: "var(--elevation-2)",
        fontSize: "var(--font-size-body-xs)",
        fontWeight: "var(--font-weight-semibold)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
