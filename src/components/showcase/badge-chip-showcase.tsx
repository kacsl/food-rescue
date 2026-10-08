import { Badge, Chip, type BadgeTone, type ChipState } from "valere-DS";
import { SectionHeader } from "./section-header";

const TONES: BadgeTone[] = ["Brand", "Neutral", "Success", "Warning", "Error", "Info"];
const CHIP_STATES: { state: ChipState; label: string; selected?: "False" | "True"; showRemove?: boolean }[] = [
  { state: "Default", label: "Default", selected: "False" },
  { state: "Hover", label: "Hover", selected: "False" },
  { state: "Default", label: "Selected", selected: "True" },
  { state: "Default", label: "With Remove", selected: "True", showRemove: true },
  { state: "Disabled", label: "Disabled", selected: "False" },
];

export function BadgeChipShowcase() {
  return (
    <section style={{ marginBottom: "var(--space-stack-xl)" }}>
      <SectionHeader
        id="badges-chips"
        title="Badges & Chips"
        description="Compact status, indicator, and filter elements using Kari semantic colors."
        badge="Components"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-lg)" }}>
        {/* Subtle Badges */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Badges — Subtle Emphasis
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-sm)" }}>
            {TONES.map((t) => (
              <Badge key={t} tone={t} emphasis="Subtle" label={t} />
            ))}
            {TONES.map((t) => (
              <Badge key={`${t}-dot`} tone={t} emphasis="Subtle" label={`${t} (Dot)`} showDot />
            ))}
          </div>
        </div>

        {/* Solid Badges */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Badges — Solid Emphasis
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-sm)" }}>
            {TONES.map((t) => (
              <Badge key={`solid-${t}`} tone={t} emphasis="Solid" label={t} />
            ))}
          </div>
        </div>

        {/* Chips */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Filter Chips
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-sm)" }}>
            {CHIP_STATES.map((c) => (
              <Chip
                key={c.label}
                state={c.state}
                label={c.label}
                selected={c.selected ?? "False"}
                showRemove={c.showRemove ?? false}
                showLeadingIcon
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
