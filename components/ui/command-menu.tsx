import { Search } from "./search";
import { MenuItem } from "./menu-item";
import { Kbd } from "./kbd";

export const COMMAND_MENU_STATES = ["Default", "No results"] as const;

export function CommandMenu({
  state = "Default",
  query = "Inv",
}: {
  state?: (typeof COMMAND_MENU_STATES)[number];
  query?: string;
}) {
  return (
    <div
      role="dialog"
      aria-label="Command menu"
      style={{
        width: "min(100%, var(--size-dialog-md))",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-background-surface)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--elevation-5)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "var(--space-inset-sm)" }}>
        <Search state="Filled" value={query} />
      </div>
      <div role="listbox" style={{ minHeight: "var(--size-multiline-lg)", padding: "var(--space-inset-xs)" }}>
        {state === "No results" ? (
          <p style={{ margin: 0, padding: "var(--space-inset-md)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>
            No commands match “{query}”.
          </p>
        ) : (
          <>
            <p style={{ margin: 0, padding: "var(--space-inset-xs) var(--space-inset-sm)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-overline)", fontWeight: "var(--font-weight-semibold)" }}>
              Navigation
            </p>
            <MenuItem label="Invite teammate" state="Hover" showShortcut shortcut="⌘I" />
            <MenuItem label="Open invoices" showShortcut shortcut="⌘F" />
          </>
        )}
      </div>
      <footer
        style={{
          display: "flex",
          gap: "var(--space-inline-md)",
          padding: "var(--space-inset-sm) var(--space-inset-md)",
          borderTop: "var(--border-hairline) solid var(--color-border-subtle)",
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-body-xs)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
          <Kbd keyLabel="↑" />
          <Kbd keyLabel="↓" />
          to move
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
          <Kbd keyLabel="↵" />
          to select
        </span>
      </footer>
    </div>
  );
}
