import { InfoIcon } from "../../lib/icons";
import { Button } from "./button";

export const ERROR_REASONS = ["Generic", "Not found", "No connection", "Server"] as const;

const copy: Record<(typeof ERROR_REASONS)[number], { title: string; body: string; action: string; code?: string }> = {
  Generic: {
    title: "Something went wrong",
    body: "Nothing was saved, so it is safe to try again.",
    action: "Try again",
  },
  "Not found": {
    title: "This page is gone",
    body: "The link is out of date. Nothing was lost.",
    action: "Back to home",
  },
  "No connection": {
    title: "You are offline",
    body: "Reconnect and we will pick up where you left off.",
    action: "Retry",
  },
  Server: {
    title: "The server could not finish this",
    body: "Nothing was saved. Share the reference with support if it keeps happening.",
    action: "Try again",
    code: "EV-4821",
  },
};

export function ErrorState({
  reason = "Generic",
  showAction = true,
}: {
  reason?: (typeof ERROR_REASONS)[number];
  showAction?: boolean;
}) {
  const text = copy[reason];
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-stack-md)",
        padding: "var(--space-inset-lg)",
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          padding: "var(--space-inset-sm)",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-status-error-bg)",
          color: "var(--color-icon-error)",
        }}
      >
        <InfoIcon size="var(--size-icon-xl)" />
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
        <h3 style={{ margin: 0, fontSize: "var(--font-size-heading-sm)", fontWeight: "var(--font-weight-semibold)" }}>{text.title}</h3>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>{text.body}</p>
        {text.code ? <p style={{ margin: 0, color: "var(--color-text-tertiary)", fontSize: "var(--font-size-body-xs)" }}>Reference {text.code}</p> : null}
      </div>
      {showAction ? <Button variant="Primary" size="SM" label={text.action} /> : null}
    </div>
  );
}
