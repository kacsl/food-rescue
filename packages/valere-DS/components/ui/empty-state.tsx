import { InfoIcon } from "../../lib/icons";
import { Button } from "./button";

export const EMPTY_REASONS = ["First use", "No results", "No access"] as const;

const copy: Record<(typeof EMPTY_REASONS)[number], { title: string; body: string; action: string }> = {
  "First use": {
    title: "Create your first project",
    body: "Projects keep invoices, files and the people on them in one place.",
    action: "New project",
  },
  "No results": {
    title: "No projects match that search",
    body: "Try a shorter name, or clear the filters to see everything again.",
    action: "Clear filters",
  },
  "No access": {
    title: "You do not have access",
    body: "Ask a workspace admin to add you to this project.",
    action: "Request access",
  },
};

export function EmptyState({
  reason = "First use",
  showAction = true,
}: {
  reason?: (typeof EMPTY_REASONS)[number];
  showAction?: boolean;
}) {
  const text = copy[reason];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-stack-md)",
        padding: "var(--space-inset-lg)",
        textAlign: "center",
      }}
    >
      <span style={{ color: "var(--color-icon-muted)" }}>
        <InfoIcon size="var(--size-icon-xl)" />
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
        <h3 style={{ margin: 0, fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>{text.title}</h3>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>{text.body}</p>
      </div>
      {showAction ? <Button variant="Primary" size="SM" label={text.action} /> : null}
    </div>
  );
}
