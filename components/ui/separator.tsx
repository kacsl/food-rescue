export function Separator({
  orientation = "Horizontal",
  label = "or",
  showLabel = true,
}: {
  orientation?: "Horizontal" | "Vertical";
  label?: string;
  showLabel?: boolean;
}) {
  const rule = {
    background: "var(--color-border-subtle)",
    flex: 1,
    height: orientation === "Vertical" ? undefined : "var(--border-hairline)",
    width: orientation === "Vertical" ? "var(--border-hairline)" : undefined,
    minHeight: orientation === "Vertical" ? "var(--size-control-md)" : undefined,
  } as const;

  if (orientation === "Vertical") {
    return <span style={{ ...rule, display: "block" }} />;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm)", width: "100%" }}>
      <span style={rule} />
      {showLabel ? (
        <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-semibold)" }}>
          {label}
        </span>
      ) : null}
      <span style={rule} />
    </div>
  );
}
