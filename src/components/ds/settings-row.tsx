import type { CSSProperties, ReactNode } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type SettingsRowProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

type SettingsSwitchRowProps = {
  icon: ReactNode;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  minHeight: 52,
  padding: "12px 10px",
  marginInline: -10,
  boxSizing: "content-box",
  border: "none",
  borderRadius: 0,
  borderBottom: "1px solid var(--color-border-subtle, #e6e7ed)",
  background: "transparent",
  color: "var(--color-text-primary, #303036)",
  font: "inherit",
  fontSize: "var(--font-size-body-base, 16px)",
  textAlign: "left",
  cursor: "pointer",
};

function RowIcon({ children }: { children: ReactNode }) {
  return (
    <span className="ds-settings-row__icon" style={{ display: "inline-flex", color: "var(--color-icon-primary, #303036)" }}>
      {children}
    </span>
  );
}

/**
 * A tappable settings row with hover and active states.
 * valere-DS ListItem and MenuItem are presentational and do not take an action or a custom icon.
 */
export function SettingsRow({ icon, label, onClick }: SettingsRowProps) {
  return (
    <button type="button" onClick={onClick} className="ds-settings-row" style={rowStyle}>
      <RowIcon>{icon}</RowIcon>
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

/**
 * A settings row that toggles a value. The track uses the valere-DS Switch tokens,
 * which only ships a presentational switch without a change handler.
 */
export function SettingsSwitchRow({ icon, label, checked, onChange }: SettingsSwitchRowProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="ds-settings-row"
      style={rowStyle}
    >
      <RowIcon>{icon}</RowIcon>
      <span style={{ flex: 1 }}>{label}</span>
      <span
        aria-hidden="true"
        className="ds-settings-switch"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: checked ? "flex-end" : "flex-start",
          width: "var(--size-control-md, 44px)",
          height: "var(--size-switch-track-md, 24px)",
          paddingInline: "var(--spacing-4, 4px)",
          boxSizing: "border-box",
          flexShrink: 0,
          borderRadius: "var(--radius-pill, 9999px)",
          background: checked ? "var(--color-action-primary)" : "var(--color-border-default)",
          transition: "background-color 0.18s ease",
        }}
      >
        <span
          style={{
            width: "var(--size-icon-xs, 16px)",
            height: "var(--size-icon-xs, 16px)",
            borderRadius: "var(--radius-pill, 9999px)",
            background: "var(--color-background-surface)",
          }}
        />
      </span>
    </button>
  );
}
