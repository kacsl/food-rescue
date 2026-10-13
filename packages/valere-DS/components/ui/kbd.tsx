export function Kbd({ keyLabel = "⌘", size = "SM" }: { keyLabel?: string; size?: "SM" | "MD" }) {
  return (
    <kbd
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: size === "MD" ? "var(--size-control-xs)" : "var(--spacing-20)",
        height: size === "MD" ? "var(--size-control-xs)" : "var(--spacing-16)",
        paddingInline: "var(--radius-6)",
        borderRadius: "var(--radius-control-sm)",
        border: "var(--border-hairline) solid var(--color-border-subtle)",
        background: "var(--color-background-muted)",
        color: "var(--color-text-secondary)",
        fontFamily: "var(--font-family-brand)",
        fontSize: "var(--font-size-caption)",
        fontWeight: "var(--font-weight-semibold)",
      }}
    >
      {keyLabel}
    </kbd>
  );
}
