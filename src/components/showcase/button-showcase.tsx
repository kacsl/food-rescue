import { Button, IconButton, type ButtonSize, type ButtonState, type ButtonVariant } from "@/components/ds/button";
import { SectionHeader } from "./section-header";

const VARIANTS: ButtonVariant[] = ["Primary", "Secondary", "Outline", "Ghost", "Link", "Link secondary", "Error"];
const ICON_BUTTON_VARIANTS = ["Primary", "Secondary", "Outline", "Ghost", "Error"] as const;
const SIZES: ButtonSize[] = ["XS", "SM", "MD", "LG", "XL"];
const STATES: ButtonState[] = ["Default", "Hover", "Focus", "Active", "Disabled", "Invalid"];

function PlusIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function ButtonShowcase() {
  return (
    <section style={{ marginBottom: "var(--space-stack-xl)" }}>
      <SectionHeader
        id="buttons"
        title="Buttons & Icon Buttons"
        description="All button variants, sizes, and interactive states styled with Kari tokens."
        badge="Components"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-lg)" }}>
        {/* Variants */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Variants (Size MD)
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-md)" }}>
            {VARIANTS.map((v) => (
              <Button key={v} variant={v} size="MD" state="Default" label={v} />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Sizes (Primary Variant)
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-md)" }}>
            {SIZES.map((s) => (
              <Button key={s} variant="Primary" size={s} state="Default" label={`Size ${s}`} />
            ))}
          </div>
        </div>

        {/* States & Icons */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            States & Icon Adornments
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-md)" }}>
            <Button variant="Primary" size="MD" state="Default" label="Default" />
            <Button variant="Primary" size="MD" state="Hover" label="Hover state" />
            <Button variant="Primary" size="MD" state="Focus" label="Focus state" />
            <Button variant="Primary" size="MD" state="Disabled" label="Disabled state" disabled />
            <Button variant="Primary" size="MD" state="Default" label="With Leading Icon" leadingIcon leadingIconSwap={<PlusIcon />} />
            <Button variant="Secondary" size="MD" state="Default" label="With Trailing Icon" trailingIcon trailingIconSwap={<CheckIcon />} />
          </div>
        </div>

        {/* Link Secondary States */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Link Secondary States
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-md)" }}>
            {STATES.map((st) => (
              <Button
                key={st}
                variant="Link secondary"
                size="MD"
                state={st}
                disabled={st === "Disabled"}
                label={st}
              />
            ))}
          </div>
        </div>

        {/* Icon Buttons */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Icon Buttons
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-inline-md)" }}>
            {ICON_BUTTON_VARIANTS.map((v) => (
              <IconButton key={v} variant={v} size="MD" state="Default" icon={<PlusIcon />} aria-label={`${v} icon button`} />
            ))}
            <IconButton variant="Primary" size="MD" state="Disabled" icon={<PlusIcon />} aria-label="Disabled icon button" disabled />
          </div>
        </div>
      </div>
    </section>
  );
}
