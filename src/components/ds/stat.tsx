type StatProps = {
  value: string;
  label: string;
};

/**
 * A single metric: value and label.
 * valere-DS StatTile is a dashboard tile with a trend, which is a different pattern.
 */
export function Stat({ value, label }: StatProps) {
  return (
    <div>
      <div
        style={{
          fontSize: "var(--font-size-heading-sm, 24px)",
          fontWeight: 700,
          color: "var(--color-text-primary, #303036)",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 2,
          fontSize: "var(--font-size-body-sm, 14px)",
          color: "var(--color-text-secondary, #5c5c63)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
