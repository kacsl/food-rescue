import type { ReactNode } from "react";
import { Avatar } from "./avatar";
import { IconButton } from "./icon-button";
import { MenuItem } from "./menu-item";
import { Search } from "./search";

export function AppShell({
  title = "Projects",
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--size-sidebar) 1fr",
        gridTemplateRows: "var(--size-topbar) 1fr",
        minHeight: "var(--spacing-128)",
        background: "var(--color-background-canvas)",
        border: "var(--border-hairline) solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      <aside
        style={{
          gridRow: "1 / -1",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-stack-sm)",
          padding: "var(--space-inset-md)",
          background: "var(--color-background-surface)",
          borderRight: "var(--border-hairline) solid var(--color-border-subtle)",
        }}
      >
        <strong style={{ paddingInline: "var(--space-inset-sm)", fontSize: "var(--font-size-body-sm)" }}>Evolve</strong>
        <MenuItem label="Projects" state="Selected" leadingIcon />
        <MenuItem label="Invoices" leadingIcon />
        <MenuItem label="Settings" leadingIcon />
      </aside>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-inline-md)",
          paddingInline: "var(--space-inset-lg)",
          background: "var(--color-background-surface)",
          borderBottom: "var(--border-hairline) solid var(--color-border-subtle)",
        }}
      >
        <h1 style={{ margin: 0, flex: 1, fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</h1>
        <div style={{ width: "var(--spacing-128)" }}>
          <Search size="MD" value="Search" />
        </div>
        <IconButton variant="Ghost" size="SM" aria-label="Notifications" />
        <Avatar size="SM" initials="VA" />
      </header>
      <main style={{ padding: "var(--space-inset-lg)", background: "var(--color-background-subtle)" }}>{children}</main>
    </div>
  );
}
