export function Progress({
  size = "MD",
  mode = "Determinate",
  label = "Uploading files",
  value = "72%",
  showLabel = true,
  showValue = true,
}: {
  size?: "MD" | "LG";
  mode?: "Determinate" | "Indeterminate";
  label?: string;
  value?: string;
  showLabel?: boolean;
  showValue?: boolean;
}) {
  const track = size === "LG" ? "var(--size-track-lg)" : "var(--size-track-md)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)", width: "100%" }}>
      {showLabel || showValue ? (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>
          {showLabel ? <span>{label}</span> : <span />}
          {showValue && mode === "Determinate" ? <span>{value}</span> : null}
        </div>
      ) : null}
      <div style={{ height: track, borderRadius: "var(--radius-pill)", background: "var(--color-background-muted)", overflow: "hidden" }}>
        <div
          style={{
            width: mode === "Indeterminate" ? "40%" : value,
            height: "100%",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-action-primary)",
          }}
        />
      </div>
    </div>
  );
}

export function ProgressCircular({
  size = "MD",
  value = "65%",
  showValue = true,
}: {
  size?: "MD" | "LG";
  value?: string;
  showValue?: boolean;
}) {
  const dim = size === "LG" ? "var(--size-control-xl)" : "var(--size-control-lg)";
  return (
    <div style={{ position: "relative", width: dim, height: dim, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-pill)", border: "var(--border-emphasis) solid var(--color-background-muted)" }} />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "var(--radius-pill)",
          border: "var(--border-emphasis) solid var(--color-action-primary)",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
        }}
      />
      {showValue ? <span style={{ fontSize: "var(--font-size-body-xs)", fontWeight: "var(--font-weight-semibold)" }}>{value}</span> : null}
    </div>
  );
}
