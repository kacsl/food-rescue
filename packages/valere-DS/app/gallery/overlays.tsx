import { AppShell } from "@/components/ui/app-shell";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Calendar } from "@/components/ui/calendar";
import { Card, CARD_STATES, CARD_VARIANTS } from "@/components/ui/card";
import { CommandMenu } from "@/components/ui/command-menu";
import { Dialog, DialogScrim, DIALOG_SIZES } from "@/components/ui/dialog";
import { Popover } from "@/components/ui/popover";
import { Section, StateRow } from "./section";

export function OverlaySections() {
  return (
    <>
      <Section title="30" heading="Card">
        {CARD_VARIANTS.map((variant) =>
          CARD_STATES.map((state) => (
            <StateRow key={`${variant}-${state}`} label={`${variant} ${state}`}>
              <div style={{ width: "var(--size-dialog-sm)" }}>
                <Card variant={variant} state={state} />
              </div>
            </StateRow>
          )),
        )}
      </Section>
      <Section title="31" heading="Popover">
        <StateRow label="Default">
          <Popover />
        </StateRow>
      </Section>
      <Section title="32" heading="Dialog">
        {DIALOG_SIZES.map((size) => (
          <StateRow key={size} label={size}>
            <DialogScrim>
              <Dialog size={size} />
            </DialogScrim>
          </StateRow>
        ))}
      </Section>
      <Section title="33" heading="Bottom Sheet">
        <StateRow label="Default">
          <div style={{ width: "var(--size-dialog-sm)" }}>
            <BottomSheet />
          </div>
        </StateRow>
      </Section>
      <Section title="34" heading="Calendar">
        <StateRow label="Date only">
          <Calendar />
        </StateRow>
        <StateRow label="Presets + time">
          <Calendar showPresets showTime showFooter timeFormat="12h" />
        </StateRow>
      </Section>
      <Section title="35" heading="Command Menu">
        <StateRow label="Default">
          <CommandMenu />
        </StateRow>
        <StateRow label="No results">
          <CommandMenu state="No results" query="xyz" />
        </StateRow>
      </Section>
      <Section title="36" heading="App Shell">
        <AppShell>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>Content frame</p>
        </AppShell>
      </Section>
    </>
  );
}
