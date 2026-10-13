import { CheckIcon, ChevronRightIcon } from "../../lib/icons";
import { Kbd } from "./kbd";

export const MENU_ITEM_STATES = ["Default", "Hover", "Focus", "Selected", "Disabled"] as const;

export function MenuItem({
  state = "Default",
  label = "Rename",
  shortcut = "⌘R",
  showShortcut = false,
  leadingIcon = false,
  checked = false,
  submenu = false,
}: {
  state?: (typeof MENU_ITEM_STATES)[number];
  label?: string;
  shortcut?: string;
  showShortcut?: boolean;
  leadingIcon?: boolean;
  checked?: boolean;
  submenu?: boolean;
}) {
  const selected = state === "Selected" || state === "Hover";
  const disabled = state === "Disabled";
  return (
    <div
      role="menuitem"
      aria-disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        minHeight: "var(--size-control-md)",
        paddingInline: "var(--space-inset-sm)",
        borderRadius: "var(--radius-control-sm)",
        background: selected ? "var(--color-background-brand-subtle)" : "transparent",
        color: disabled ? "var(--color-text-disabled)" : selected ? "var(--color-text-brand)" : "var(--color-text-primary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        fontSize: "var(--font-size-body-sm)",
      }}
    >
      <span style={{ width: "var(--size-icon-md)", display: "inline-flex", justifyContent: "center" }}>
        {checked ? <CheckIcon /> : leadingIcon ? <span style={{ width: "var(--size-dot-sm)", height: "var(--size-dot-sm)", borderRadius: "var(--radius-pill)", background: "currentColor" }} /> : null}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {showShortcut ? <Kbd size="SM" keyLabel={shortcut} /> : null}
      {submenu ? <ChevronRightIcon /> : null}
    </div>
  );
}
