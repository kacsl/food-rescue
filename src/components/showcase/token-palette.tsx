import { SectionHeader } from "./section-header";

interface SwatchProps {
  name: string;
  variable: string;
  lightHex: string;
}

function Swatch({ name, variable, lightHex }: SwatchProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack-xs)",
        minWidth: "var(--size-control-xl)",
        flex: "1 1 calc(var(--size-control-xl) + var(--size-control-sm))",
      }}
    >
      <div
        style={{
          height: "var(--size-control-md)",
          borderRadius: "var(--radius-control-sm)",
          background: `var(${variable})`,
          border: "var(--border-hairline) solid var(--color-border-subtle)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>
          {name}
        </span>
        <span style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-tertiary)" }}>
          {lightHex}
        </span>
      </div>
    </div>
  );
}

const PRIMARY_SWATCHES = [
  { name: "50", variable: "--primitive-primary-50", lightHex: "#ffedec" },
  { name: "100", variable: "--primitive-primary-100", lightHex: "#fed2d0" },
  { name: "200", variable: "--primitive-primary-200", lightHex: "#fda6a3" },
  { name: "300", variable: "--primitive-primary-300", lightHex: "#fd7b74" },
  { name: "400", variable: "--primitive-primary-400", lightHex: "#fc4433" },
  { name: "500 ★", variable: "--primitive-primary-500", lightHex: "#dc2b10" },
  { name: "600", variable: "--primitive-primary-600", lightHex: "#be240c" },
  { name: "700", variable: "--primitive-primary-700", lightHex: "#971a07" },
  { name: "800", variable: "--primitive-primary-800", lightHex: "#6c1004" },
  { name: "900", variable: "--primitive-primary-900", lightHex: "#410601" },
];

const SECONDARY_SWATCHES = [
  { name: "50", variable: "--primitive-secondary-50", lightHex: "#cafce1" },
  { name: "100", variable: "--primitive-secondary-100", lightHex: "#69f6b7" },
  { name: "200", variable: "--primitive-secondary-200", lightHex: "#5ad59e" },
  { name: "300", variable: "--primitive-secondary-300", lightHex: "#4db888" },
  { name: "400", variable: "--primitive-secondary-400", lightHex: "#419e74" },
  { name: "500", variable: "--primitive-secondary-500", lightHex: "#368662" },
  { name: "600", variable: "--primitive-secondary-600", lightHex: "#2d7354" },
  { name: "700 ★", variable: "--primitive-secondary-700", lightHex: "#225a40" },
  { name: "800", variable: "--primitive-secondary-800", lightHex: "#153e2c" },
  { name: "900", variable: "--primitive-secondary-900", lightHex: "#082317" },
  { name: "950", variable: "--primitive-secondary-950", lightHex: "#04140c" },
];

const STATUS_SWATCHES = [
  { name: "Success", variable: "--color-status-success-solid", lightHex: "#1a7f3d" },
  { name: "Warning", variable: "--color-status-warning-solid", lightHex: "#8f5f00" },
  { name: "Error", variable: "--color-status-error-solid", lightHex: "#b8342c" },
  { name: "Info", variable: "--color-status-info-solid", lightHex: "#00668f" },
];

export function TokenPaletteShowcase() {
  return (
    <section style={{ marginBottom: "var(--space-stack-xl)" }}>
      <SectionHeader
        id="color-tokens"
        title="Figma Color Tokens"
        description="Synchronized from Figma node 90:4 (Kari Food Waste Project). Automatically adapts in Light and Dark mode."
        badge="Tokens"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-xs) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Primary Scale (Coral / Red — Main Action)
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm)" }}>
            {PRIMARY_SWATCHES.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-xs) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Secondary Scale (Green / Mint — Accent)
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm)" }}>
            {SECONDARY_SWATCHES.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-xs) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Semantic Status Colors
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm)" }}>
            {STATUS_SWATCHES.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
