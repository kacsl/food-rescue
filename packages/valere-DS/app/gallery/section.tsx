import type { ReactNode } from "react";

export function Section({
  title,
  heading,
  children,
}: {
  title: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: "var(--space-stack-lg)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-inline-sm)",
          marginBottom: "var(--space-stack-md)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "var(--size-control-xs)",
            height: "var(--spacing-16)",
            paddingInline: "var(--space-inset-xs)",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-background-muted)",
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-caption)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          {title}
        </span>
        <h2 style={{ margin: 0, fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>{heading}</h2>
      </div>
      {children}
    </section>
  );
}

export function StateRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--spacing-96) 1fr",
        gap: "var(--space-inline-md)",
        alignItems: "center",
        marginBottom: "var(--space-stack-sm)",
      }}
    >
      <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-xs)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-md)" }}>{children}</div>
    </div>
  );
}

export function Stack({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)", maxWidth: "var(--size-dialog-md)" }}>{children}</div>;
}
