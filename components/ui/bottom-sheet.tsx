import { Button } from "./button";

export function BottomSheet({
  title = "Share report",
  body = "Send a link or export a PDF. Recipients keep the same filters you have open.",
  confirmLabel = "Share link",
  cancelLabel = "Cancel",
}: {
  title?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evolve-sheet-title"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-background-surface)",
        borderRadius: "var(--radius-sheet) var(--radius-sheet) 0 0",
        boxShadow: "var(--elevation-5)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          alignSelf: "center",
          width: "var(--spacing-48)",
          height: "var(--size-dot-sm)",
          marginTop: "var(--space-stack-sm)",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-border-subtle)",
        }}
      />
      <header style={{ padding: "var(--space-inset-md) var(--space-inset-lg)" }}>
        <h2 id="evolve-sheet-title" style={{ margin: 0, fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>
          {title}
        </h2>
      </header>
      <div style={{ padding: "0 var(--space-inset-lg) var(--space-inset-md)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>{body}</div>
      <footer style={{ display: "flex", gap: "var(--space-inline-sm)", padding: "var(--space-inset-md) var(--space-inset-lg) var(--space-inset-lg)" }}>
        <Button variant="Ghost" size="MD" label={cancelLabel} style={{ flex: 1 }} />
        <Button variant="Primary" size="MD" label={confirmLabel} style={{ flex: 1 }} />
      </footer>
    </div>
  );
}
