import {
  Checkbox,
  QuantityInput,
  RadioButton,
  Select,
  Switch,
  TextArea,
  TextField,
} from "valere-DS";
import { SectionHeader } from "./section-header";

export function FormShowcase() {
  return (
    <section style={{ marginBottom: "var(--space-stack-xl)" }}>
      <SectionHeader
        id="forms"
        title="Form & Input Controls"
        description="Text inputs, selection controls, switches, and steppers."
        badge="Components"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-lg)" }}>
        {/* Text Fields */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Text Fields
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(calc(var(--size-dialog-xs) + var(--spacing-32)), 1fr))",
              gap: "var(--space-inline-md)",
            }}
          >
            <TextField label="Default state" value="" helperText="Standard input field" showHelper />
            <TextField label="Filled state" value="kari.food@example.com" state="Filled" showHelper />
            <TextField label="Required with error" value="invalid-email" state="Error" required helperText="Please enter a valid email address" showHelper />
            <TextField label="Disabled state" value="Read-only account" state="Disabled" showHelper helperText="Cannot be changed" />
          </div>
        </div>

        {/* Text Area & Select */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Select & Text Area
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(calc(var(--size-dialog-xs) + var(--spacing-32)), 1fr))",
              gap: "var(--space-inline-md)",
            }}
          >
            <Select label="Region" value="North America (East)" state="Selected" showHelper helperText="Primary server routing" />
            <Select label="Disabled Select" value="Unavailable option" state="Disabled" showHelper helperText="Locked by admin" />
            <TextArea label="Notes / Comments" value="Kari food waste reduction initiative tokens verified." showCounter counter="54 / 280" />
          </div>
        </div>

        {/* Checkbox, Radio, Switch, Quantity */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Selection Controls & Steppers
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(calc(var(--size-dialog-xs) + var(--spacing-16)), 1fr))",
              gap: "var(--space-inline-lg)",
              alignItems: "start",
            }}
          >
            {/* Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
              <span style={{ fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)" }}>
                Checkboxes
              </span>
              <Checkbox selection="Checked" state="Default" label="Checked option" />
              <Checkbox selection="Unchecked" state="Default" label="Unchecked option" />
              <Checkbox selection="Indeterminate" state="Default" label="Indeterminate" />
              <Checkbox selection="Checked" state="Disabled" label="Disabled checked" />
            </div>

            {/* Radio Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
              <span style={{ fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)" }}>
                Radio Buttons
              </span>
              <RadioButton selection="Selected" state="Default" label="Selected option" />
              <RadioButton selection="Unselected" state="Default" label="Unselected option" />
              <RadioButton selection="Selected" state="Disabled" label="Disabled selected" />
            </div>

            {/* Switches */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
              <span style={{ fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)" }}>
                Switches
              </span>
              <Switch selection="On" state="Default" label="Enabled switch" />
              <Switch selection="Off" state="Default" label="Disabled switch" />
              <Switch selection="On" state="Disabled" label="Locked on" />
            </div>

            {/* Quantity Stepper */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
              <span style={{ fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)" }}>
                Quantity Stepper
              </span>
              <div style={{ display: "flex", gap: "var(--space-inline-md)", alignItems: "center" }}>
                <QuantityInput state="Default" value="4" />
                <QuantityInput state="Disabled" value="1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
