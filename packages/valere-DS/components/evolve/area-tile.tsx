import { AREA_ICONS, AreaIcon, type AreaIconName } from "./icons/area";

export const AREA_TILE_GLYPHS = Object.keys(AREA_ICONS) as AreaIconName[];
export type AreaTileGlyph = (typeof AREA_TILE_GLYPHS)[number];

const LABELS: Record<AreaTileGlyph, string> = {
  engineering: "Engineering",
  product: "Product",
  sales: "Sales",
  marketing: "Marketing",
  design: "Design",
  other: "Other",
};

export function AreaTile({
  glyph = "engineering",
  label,
  selected = "False",
}: {
  glyph?: AreaTileGlyph;
  label?: string;
  selected?: "False" | "True";
}) {
  const on = selected === "True";
  return (
    <button
      type="button"
      aria-pressed={on}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--space-stack-sm)",
        width: "100%",
        margin: 0,
        padding: "var(--spacing-20)",
        background: on ? "var(--color-background-brand-subtle)" : "var(--color-background-surface)",
        border: `var(--border-hairline) solid ${on ? "var(--color-border-brand)" : "var(--color-border-subtle)"}`,
        borderRadius: "var(--radius-card)",
        color: on ? "var(--color-text-brand)" : "var(--color-text-secondary)",
        fontFamily: "var(--font-family-brand)",
        fontSize: "var(--font-size-body-xs)",
        lineHeight: 1,
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <AreaIcon name={glyph} filled={on} />
      <span>{label ?? LABELS[glyph]}</span>
    </button>
  );
}
