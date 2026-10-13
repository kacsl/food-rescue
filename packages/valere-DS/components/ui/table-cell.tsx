import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";
import { ChevronIcon } from "../../lib/icons";

export const TABLE_CELL_STATES = ["Default", "Hover", "Selected", "Disabled"] as const;
export const TABLE_SORTS = ["None", "Ascending", "Descending"] as const;

function cellSurface(state: (typeof TABLE_CELL_STATES)[number]) {
  if (state === "Selected") return "var(--color-background-brand-subtle)";
  if (state === "Hover") return "var(--color-background-subtle)";
  return "var(--color-background-surface)";
}

export function TableCell({
  state = "Default",
  label = "Amelia Chen",
  showCheckbox = false,
  showAvatar = false,
  showBadge = false,
}: {
  state?: (typeof TABLE_CELL_STATES)[number];
  label?: string;
  showCheckbox?: boolean;
  showAvatar?: boolean;
  showBadge?: boolean;
}) {
  const disabled = state === "Disabled";
  return (
    <div
      aria-selected={state === "Selected"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-md)",
        height: "var(--size-control-lg)",
        paddingInline: "var(--space-inset-md)",
        background: cellSurface(state),
        borderBottom: "var(--border-hairline) solid var(--color-border-subtle)",
        color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        fontSize: "var(--font-size-body-sm)",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
      }}
    >
      {showCheckbox ? <Checkbox selection={state === "Selected" ? "Checked" : "Unchecked"} showLabel={false} /> : null}
      {showAvatar ? <span aria-hidden="true"><Avatar size="SM" initials="AC" /></span> : null}
      <span style={{ flex: 1 }}>{label}</span>
      {showBadge ? <Badge tone="Success" label="Active" /> : null}
    </div>
  );
}

export function TableHeaderCell({
  label = "Name",
  sort = "None",
  showCheckbox = false,
}: {
  label?: string;
  sort?: (typeof TABLE_SORTS)[number];
  showCheckbox?: boolean;
}) {
  const sorted = sort !== "None";
  return (
    <div
      role="columnheader"
      aria-sort={sort === "Ascending" ? "ascending" : sort === "Descending" ? "descending" : "none"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        width: "100%",
        height: "var(--size-control-md)",
        paddingInline: "var(--space-inset-md)",
        border: "none",
        borderBottom: "var(--border-hairline) solid var(--color-border-default)",
        background: "transparent",
        color: sorted ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        fontSize: "var(--font-size-overline)",
        fontWeight: "var(--font-weight-semibold)",
        cursor: "pointer",
      }}
    >
      {showCheckbox ? <Checkbox showLabel={false} /> : null}
      <span>{label}</span>
      {sorted ? (
        <span style={{ color: "var(--color-icon-brand)", transform: sort === "Ascending" ? "rotate(180deg)" : "none" }}>
          <ChevronIcon size="var(--size-icon-xs)" />
        </span>
      ) : null}
    </div>
  );
}
