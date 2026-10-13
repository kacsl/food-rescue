import { AreaTile, AREA_TILE_GLYPHS } from "@/components/evolve/area-tile";
import { Section } from "./section";

export function EvolveSections() {
  return (
    <Section title="E1" heading="Area tile">
      <p
        style={{
          margin: "0 0 var(--space-stack-md)",
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-body-sm)",
        }}
      >
        Evolve onboarding only. Selected uses a brand-subtle fill and a filled glyph.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 10rem))",
          gap: "var(--space-inline-md)",
          maxWidth: "34rem",
        }}
      >
        {AREA_TILE_GLYPHS.map((glyph) => (
          <AreaTile key={glyph} glyph={glyph} selected={glyph === "sales" ? "True" : "False"} />
        ))}
      </div>
    </Section>
  );
}
