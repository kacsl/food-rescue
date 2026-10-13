export function CarouselIndicator({
  selected = "False",
  label = "Slide 1 of 7",
}: {
  selected?: "False" | "True";
  label?: string;
}) {
  const on = selected === "True";
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={on ? "true" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--spacing-24)",
        height: "var(--spacing-24)",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: on ? "var(--spacing-16)" : "var(--size-dot-sm)",
          height: "var(--size-dot-sm)",
          borderRadius: "var(--radius-pill)",
          background: on ? "var(--color-action-primary)" : "var(--color-border-default)",
        }}
      />
    </button>
  );
}
