import { ChevronIcon } from "../../lib/icons";

export const ACCORDION_STATES = ["Default", "Hover", "Focus", "Disabled"] as const;

export function AccordionItem({
  expanded = "False",
  state = "Default",
  title = "How do refunds work?",
  body = "Refunds go back to the original payment method within five working days.",
  showDivider = true,
}: {
  expanded?: "False" | "True";
  state?: (typeof ACCORDION_STATES)[number];
  title?: string;
  body?: string;
  showDivider?: boolean;
}) {
  const open = expanded === "True";
  const disabled = state === "Disabled";
  return (
    <div
      style={{
        background: "var(--color-background-surface)",
        borderBottom: showDivider ? "var(--border-hairline) solid var(--color-border-subtle)" : "none",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "var(--size-control-lg)",
          paddingInline: "var(--space-inset-md)",
          boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "none",
        }}
      >
        <strong style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{title}</strong>
        <span style={{ transform: open ? "rotate(180deg)" : "none" }}>
          <ChevronIcon />
        </span>
      </div>
      {open ? (
        <p style={{ margin: 0, padding: "0 var(--space-inset-md) var(--space-inset-md)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
