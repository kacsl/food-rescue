import type { ReactNode } from "react";
import { Badge } from "valere-DS";

interface SectionHeaderProps {
  id: string;
  title: string;
  description: string;
  badge?: string;
  children?: ReactNode;
}

export function SectionHeader({ id, title, description, badge, children }: SectionHeaderProps) {
  return (
    <div
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-xs)",
        paddingBottom: "var(--space-stack-md)",
        borderBottom: "var(--border-hairline) solid var(--color-border-subtle)",
        marginBottom: "var(--space-stack-md)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-inline-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "var(--font-size-heading-md)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </h2>
          {badge ? <Badge tone="Brand" emphasis="Subtle" label={badge} /> : null}
        </div>
        {children}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "var(--font-size-body-sm)",
          color: "var(--color-text-secondary)",
        }}
      >
        {description}
      </p>
    </div>
  );
}
