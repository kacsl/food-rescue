import { DatePicker, DATE_PICKER_STATES } from "@/components/ui/date-picker";
import { InputOtp, OTP_DIGIT_STATES } from "@/components/ui/input-otp";
import { QuantityInput, QUANTITY_STATES } from "@/components/ui/quantity-input";
import { Search, SEARCH_STATES } from "@/components/ui/search";
import { Select, SELECT_STATES, SelectOption, SELECT_OPTION_STATES } from "@/components/ui/select";
import { Slider, SLIDER_STATES } from "@/components/ui/slider";
import { TextArea, TEXT_AREA_STATES } from "@/components/ui/text-area";
import { TextField, TEXT_FIELD_STATES } from "@/components/ui/text-field";
import { TimePicker, TIME_PICKER_STATES } from "@/components/ui/time-picker";
import { TimeStepper } from "@/components/ui/time-stepper";
import { Section, StateRow, Stack } from "./section";

export function FormSections() {
  return (
    <>
      <Section title="03" heading="Text Field">
        <Stack>
          {TEXT_FIELD_STATES.map((state) => (
            <StateRow key={state} label={state}>
              <TextField state={state} />
            </StateRow>
          ))}
        </Stack>
      </Section>
      <Section title="04" heading="Text Area">
        <Stack>
          {TEXT_AREA_STATES.map((state) => (
            <StateRow key={state} label={state}>
              <TextArea state={state} />
            </StateRow>
          ))}
        </Stack>
      </Section>
      <Section title="05" heading="Search">
        <Stack>
          {SEARCH_STATES.map((state) => (
            <StateRow key={state} label={state}>
              <Search state={state} />
            </StateRow>
          ))}
        </Stack>
      </Section>
      <Section title="06" heading="Select">
        <Stack>
          {SELECT_STATES.map((state) => (
            <StateRow key={state} label={state}>
              <Select state={state} />
            </StateRow>
          ))}
          {SELECT_OPTION_STATES.map((state) => (
            <StateRow key={`opt-${state}`} label={`Option ${state}`}>
              <SelectOption state={state} />
            </StateRow>
          ))}
        </Stack>
      </Section>
      <Section title="07" heading="Date & Time">
        <Stack>
          {DATE_PICKER_STATES.map((state) => (
            <StateRow key={state} label={`Date ${state}`}>
              <DatePicker state={state} />
            </StateRow>
          ))}
          {TIME_PICKER_STATES.map((state) => (
            <StateRow key={`time-${state}`} label={`Time ${state}`}>
              <TimePicker state={state} />
            </StateRow>
          ))}
          <StateRow label="Time Stepper">
            <TimeStepper unit="Hour" value="09" />
            <TimeStepper unit="Minute" value="30" />
          </StateRow>
        </Stack>
      </Section>
      <Section title="08" heading="Quantity & Slider">
        <Stack>
          {QUANTITY_STATES.map((state) => (
            <StateRow key={state} label={state}>
              <QuantityInput state={state} />
            </StateRow>
          ))}
          {SLIDER_STATES.map((state) => (
            <StateRow key={`slider-${state}`} label={state}>
              <Slider state={state} />
            </StateRow>
          ))}
          <StateRow label="Range">
            <Slider type="Range" rangePosition="25–75%" />
          </StateRow>
        </Stack>
      </Section>
      <Section title="09" heading="Input OTP">
        <Stack>
          {OTP_DIGIT_STATES.map((state) => (
            <StateRow key={state} label={state}>
              <InputOtp state={state} value={state === "Default" ? "" : "482"} />
            </StateRow>
          ))}
        </Stack>
      </Section>
    </>
  );
}
