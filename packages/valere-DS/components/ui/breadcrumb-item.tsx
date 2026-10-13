import { ChevronRightIcon } from "../../lib/icons";

export const BREADCRUMB_TYPES = ["Link", "Current"] as const;
export const BREADCRUMB_STATES = ["Default", "Hover", "Focus"] as const;

export function BreadcrumbItem({
  type = "Link",
  state = "Default",
  label = "Projects",
  showSeparator = true,
}: {
  type?: (typeof BREADCRUMB_TYPES)[number];
  state?: (typeof BREADCRUMB_STATES)[number];
  label?: string;
  showSeparator?: boolean;
}) {
  const current = type === "Current";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
      <span
        style={{
          color: current ? "var(--color-text-primary)" : state === "Hover" ? "var(--color-text-brand)" : "var(--color-text-secondary)",
          fontSize: "var(--font-size-body-sm)",
          fontWeight: current ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
          boxShadow: !current && state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
          borderRadius: "var(--radius-control-sm)",
        }}
      >
        {label}
      </span>
      {showSeparator && !current ? (
        <span aria-hidden="true" style={{ color: "var(--color-icon-muted)" }}>
          <ChevronRightIcon size="var(--size-icon-xs)" />
        </span>
      ) : null}
    </span>
  );
}
