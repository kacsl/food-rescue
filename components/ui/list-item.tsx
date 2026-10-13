import { Avatar } from "./avatar";
import { ChevronRightIcon } from "../../lib/icons";

export const LIST_ITEM_LINES = ["One", "Two"] as const;
export const LIST_ITEM_STATES = ["Default", "Hover", "Selected", "Disabled"] as const;

export function ListItem({
  lines = "One",
  state = "Default",
  title = "Amelia Chen",
  supporting = "Finance · Lisbon",
  meta = "2h",
  showAvatar = true,
  showMeta = true,
  showChevron = true,
}: {
  lines?: (typeof LIST_ITEM_LINES)[number];
  state?: (typeof LIST_ITEM_STATES)[number];
  title?: string;
  supporting?: string;
  meta?: string;
  showAvatar?: boolean;
  showMeta?: boolean;
  showChevron?: boolean;
}) {
  const disabled = state === "Disabled";
  return (
    <div
      role="listitem"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-md)",
        minHeight: lines === "Two" ? "var(--size-control-xl)" : "var(--size-control-lg)",
        paddingInline: "var(--space-inset-md)",
        background:
          state === "Selected"
            ? "var(--color-background-brand-subtle)"
            : state === "Hover"
              ? "var(--color-background-subtle)"
              : "var(--color-background-surface)",
        color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
      }}
    >
      {showAvatar ? <Avatar size="SM" initials="AC" /> : null}
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
        <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</span>
        {lines === "Two" ? <span style={{ fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>{supporting}</span> : null}
      </span>
      {showMeta ? <span style={{ fontSize: "var(--font-size-body-xs)", color: "var(--color-text-tertiary)" }}>{meta}</span> : null}
      {showChevron ? (
        <span aria-hidden="true" style={{ color: "var(--color-icon-muted)" }}>
          <ChevronRightIcon />
        </span>
      ) : null}
    </div>
  );
}
