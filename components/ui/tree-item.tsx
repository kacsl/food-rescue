import { ChevronRightIcon } from "../../lib/icons";

export const TREE_KINDS = ["Branch", "Leaf"] as const;
export const TREE_STATES = ["Default", "Hover", "Selected", "Disabled"] as const;

export function TreeItem({
  kind = "Branch",
  expanded = "False",
  state = "Default",
  label = "Invoices",
  count = "12",
  showCount = true,
}: {
  kind?: (typeof TREE_KINDS)[number];
  expanded?: "False" | "True";
  state?: (typeof TREE_STATES)[number];
  label?: string;
  count?: string;
  showCount?: boolean;
}) {
  const open = expanded === "True";
  const disabled = state === "Disabled";
  return (
    <div
      role="treeitem"
      aria-selected={state === "Selected"}
      aria-expanded={kind === "Branch" ? open : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        height: "var(--size-control-md)",
        paddingInline: "var(--space-inset-sm)",
        borderRadius: "var(--radius-control-sm)",
        background:
          state === "Selected"
            ? "var(--color-background-brand-subtle)"
            : state === "Hover"
              ? "var(--color-background-subtle)"
              : "transparent",
        color: disabled ? "var(--color-text-disabled)" : state === "Selected" ? "var(--color-text-brand)" : "var(--color-text-primary)",
        fontSize: "var(--font-size-body-sm)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "var(--size-twisty)",
          display: "inline-flex",
          justifyContent: "center",
          transform: open ? "rotate(90deg)" : "none",
          visibility: kind === "Branch" ? "visible" : "hidden",
        }}
      >
        <ChevronRightIcon size="var(--size-icon-xs)" />
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {kind === "Branch" && showCount ? (
        <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-body-xs)" }}>{count}</span>
      ) : null}
    </div>
  );
}
