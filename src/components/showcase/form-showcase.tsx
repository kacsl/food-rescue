import {
  Checkbox,
  QuantityInput,
  RadioButton,
  Select,
  Switch,
  TextArea,
  TextField,
} from "valere-DS";
import { Calendar, Day, MeridiemToggle, TimeStepper } from "@/components/ds/calendar";
import { DatePicker } from "@/components/ds/date-picker";
import { TimeList, TimePicker } from "@/components/ds/time-picker";
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
            <TextField label="Focus state" value="kari.food@example.com" state="Focus" helperText="Focused input field" showHelper />
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

        {/* C31 — Calendar (Figma 90:70) */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Calendar &amp; Day States (Figma 90:70)
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm)", alignItems: "center" }}>
              <Day state="Default" day={15} />
              <Day state="Hover" day={15} />
              <Day state="Selected" day={15} />
              <Day state="Today" day={15} />
              <Day state="Range start" day={15} />
              <Day state="Range middle" day={15} />
              <Day state="Range end" day={15} />
              <Day state="Disabled" day={15} />
              <Day state="Outside" day={15} />
              <TimeStepper value="09" unit="hour" />
              <MeridiemToggle active="AM" />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-lg)", alignItems: "flex-start" }}>
              <Calendar months={1} showPresets={false} showTime={false} showFooter />
              <Calendar months={1} showPresets={false} showTime showFooter timeFormat="12h" />
            </div>
          </div>
        </div>

        {/* C32 Date Picker & C33 Time Picker (Figma 90:71 & 1169:159) */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Date Picker &amp; Time Picker (Figma 90:71 &amp; 1169:159)
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-lg)", alignItems: "flex-start" }}>
            <DatePicker label="Date" state="Selected" value="2026-08-15" showHelper helperText="Helper text" />
            <TimePicker label="Time" state="Selected" value="09:30" showHelper helperText="Helper text" />
            <div style={{ width: 280 }}>
              <TimeList selectedValue="09:30" hoveredValue="09:45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
