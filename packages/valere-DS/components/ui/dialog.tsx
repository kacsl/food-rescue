import type { ReactNode } from "react";
import { CloseIcon } from "../../lib/icons";
import { Button } from "./button";

export const DIALOG_SIZES = ["SM", "MD", "LG"] as const;

const width: Record<(typeof DIALOG_SIZES)[number], string> = {
  SM: "var(--size-dialog-sm)",
  MD: "var(--size-dialog-md)",
  LG: "var(--size-dialog-lg)",
};

export function Dialog({
  size = "MD",
  title = "Discard draft?",
  body = "This cannot be undone. The draft will be removed from every device.",
  confirmLabel = "Discard",
  cancelLabel = "Keep editing",
  showClose = true,
}: {
  size?: (typeof DIALOG_SIZES)[number];
  title?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  showClose?: boolean;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evolve-dialog-title"
      style={{
        width: "min(100%, " + width[size] + ")",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-background-surface)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--elevation-5)",
      }}
    >
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-inline-md)", padding: "var(--space-inset-lg)" }}>
        <h2 id="evolve-dialog-title" style={{ margin: 0, fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>
          {title}
        </h2>
        {showClose ? <Button variant="Ghost" size="XS" showLabel={false} leadingIcon leadingIconSwap={<CloseIcon />} aria-label="Close" /> : null}
      </header>
      <div style={{ padding: "0 var(--space-inset-lg) var(--space-inset-lg)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>{body}</div>
      <footer style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-inline-sm)", padding: "var(--space-inset-md) var(--space-inset-lg) var(--space-inset-lg)" }}>
        <Button variant="Ghost" size="SM" label={cancelLabel} />
        <Button variant="Primary" size="SM" label={confirmLabel} />
      </footer>
    </div>
  );
}

export function DialogScrim({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        padding: "var(--space-inset-lg)",
        background: "color-mix(in srgb, var(--color-background-inverse) calc(var(--opacity-scrim) * 100%), transparent)",
        minHeight: "var(--size-multiline-lg)",
      }}
    >
      {children}
    </div>
  );
}
