import { AccordionItem, ACCORDION_STATES } from "@/components/ui/accordion-item";
import { Badge, BADGE_EMPHASES, BADGE_TONES } from "@/components/ui/badge";
import { Checkbox, CHECKBOX_SELECTIONS, CHECKBOX_STATES } from "@/components/ui/checkbox";
import { Chip, CHIP_STATES } from "@/components/ui/chip";
import { RadioButton, RADIO_SELECTIONS, RADIO_STATES } from "@/components/ui/radio-button";
import { Switch, SWITCH_SELECTIONS, SWITCH_STATES } from "@/components/ui/switch";
import { Tab, TAB_STATES } from "@/components/ui/tab";
import { ToggleGroupItem, TOGGLE_STATES } from "@/components/ui/toggle-group-item";
import { Section, StateRow } from "./section";

export function SelectionSections() {
  return (
    <>
      <Section title="10" heading="Checkbox">
        {CHECKBOX_SELECTIONS.map((selection) =>
          CHECKBOX_STATES.map((state) => (
            <StateRow key={`${selection}-${state}`} label={`${selection} ${state}`}>
              <Checkbox selection={selection} state={state} />
            </StateRow>
          )),
        )}
      </Section>
      <Section title="11" heading="Radio Button">
        {RADIO_SELECTIONS.map((selection) =>
          RADIO_STATES.map((state) => (
            <StateRow key={`${selection}-${state}`} label={`${selection} ${state}`}>
              <RadioButton selection={selection} state={state} />
            </StateRow>
          )),
        )}
      </Section>
      <Section title="12" heading="Switch">
        {SWITCH_SELECTIONS.map((selection) =>
          SWITCH_STATES.map((state) => (
            <StateRow key={`${selection}-${state}`} label={`${selection} ${state}`}>
              <Switch selection={selection} state={state} />
            </StateRow>
          )),
        )}
      </Section>
      <Section title="13" heading="Chip">
        {CHIP_STATES.map((state) => (
          <StateRow key={state} label={state}>
            <Chip state={state} />
            <Chip state={state} selected="True" />
            <Chip state={state} showRemove />
          </StateRow>
        ))}
      </Section>
      <Section title="14" heading="Badge">
        {BADGE_TONES.map((tone) => (
          <StateRow key={tone} label={tone}>
            {BADGE_EMPHASES.map((emphasis) => (
              <Badge key={emphasis} tone={tone} emphasis={emphasis} label={emphasis} showDot />
            ))}
          </StateRow>
        ))}
      </Section>
      <Section title="15" heading="Tab & Toggle">
        {TAB_STATES.map((state) => (
          <StateRow key={state} label={`Tab ${state}`}>
            <Tab state={state} />
            <Tab state={state} selected="True" />
          </StateRow>
        ))}
        <StateRow label="Toggle Group">
          <ToggleGroupItem position="Start" selected="True" label="Day" />
          <ToggleGroupItem position="Middle" label="Week" />
          <ToggleGroupItem position="End" label="Month" />
        </StateRow>
        {TOGGLE_STATES.map((state) => (
          <StateRow key={state} label={state}>
            <ToggleGroupItem position="Start" state={state} label={state} />
          </StateRow>
        ))}
      </Section>
      <Section title="16" heading="Accordion">
        {ACCORDION_STATES.map((state) => (
          <StateRow key={state} label={state}>
            <div style={{ width: "100%", maxWidth: "var(--size-dialog-md)" }}>
              <AccordionItem state={state} />
              <AccordionItem state={state} expanded="True" title="Open item" />
            </div>
          </StateRow>
        ))}
      </Section>
    </>
  );
}
