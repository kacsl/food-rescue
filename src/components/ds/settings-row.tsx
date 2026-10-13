import type { ReactNode } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type SettingsRowProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

/**
 * A tappable settings row with hover and active states.
 * valere-DS ListItem and MenuItem are presentational and do not take an action or a custom icon.
 */
export function SettingsRow({ icon, label, onClick }: SettingsRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ds-settings-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        minHeight: 52,
        padding: "12px 10px",
        marginInline: -10,
        boxSizing: "content-box",
        border: "none",
        borderRadius: "var(--radius-control, 12px)",
        borderBottom: "1px solid var(--color-border-subtle, #e6e7ed)",
        background: "transparent",
        color: "var(--color-text-primary, #303036)",
        font: "inherit",
        fontSize: "var(--font-size-body-base, 16px)",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <span className="ds-settings-row__icon" style={{ display: "inline-flex", color: "var(--color-icon-primary, #303036)" }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      <ChevronRightIcon
        width={16}
        height={16}
        aria-hidden="true"
        className="ds-settings-row__chevron"
        style={{ color: "var(--color-icon-muted, #75757d)" }}
      />
    </button>
  );
}
