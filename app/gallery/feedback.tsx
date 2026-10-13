import { Avatar, AVATAR_SIZES, AVATAR_TYPES } from "@/components/ui/avatar";
import { Banner, BANNER_TONES } from "@/components/ui/banner";
import { EmptyState, EMPTY_REASONS } from "@/components/ui/empty-state";
import { ErrorState, ERROR_REASONS } from "@/components/ui/error-state";
import { Kbd } from "@/components/ui/kbd";
import { Loader, LOADER_SCOPES } from "@/components/ui/loader";
import { Progress, ProgressCircular } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton, SKELETON_SHAPES } from "@/components/ui/skeleton";
import { Toast, TOAST_TONES } from "@/components/ui/toast";
import { Tooltip, TOOLTIP_PLACEMENTS } from "@/components/ui/tooltip";
import { Section, StateRow } from "./section";

export function FeedbackSections() {
  return (
    <>
      <Section title="17" heading="Banner">
        {BANNER_TONES.map((tone) => (
          <StateRow key={tone} label={tone}>
            <div style={{ width: "100%" }}>
              <Banner tone={tone} />
            </div>
          </StateRow>
        ))}
      </Section>
      <Section title="18" heading="Toast">
        {TOAST_TONES.map((tone) => (
          <StateRow key={tone} label={tone}>
            <Toast tone={tone} showAction={tone === "Info"} />
          </StateRow>
        ))}
      </Section>
      <Section title="19" heading="Tooltip">
        <StateRow label="Placement">
          {TOOLTIP_PLACEMENTS.map((placement) => (
            <Tooltip key={placement} placement={placement} label={placement} />
          ))}
        </StateRow>
      </Section>
      <Section title="20" heading="Progress & Loader">
        <StateRow label="Linear">
          <div style={{ width: "var(--size-dialog-sm)" }}>
            <Progress />
          </div>
        </StateRow>
        <StateRow label="Circular">
          <ProgressCircular />
          <ProgressCircular size="LG" />
        </StateRow>
        {LOADER_SCOPES.map((scope) => (
          <StateRow key={scope} label={scope}>
            <div style={{ width: "var(--size-dialog-sm)", position: "relative" }}>
              <Loader scope={scope} />
            </div>
          </StateRow>
        ))}
      </Section>
      <Section title="21" heading="Skeleton">
        <StateRow label="Shapes">
          {SKELETON_SHAPES.map((shape) => (
            <Skeleton key={shape} shape={shape} />
          ))}
        </StateRow>
      </Section>
      <Section title="22" heading="Avatar">
        {AVATAR_TYPES.map((type) => (
          <StateRow key={type} label={type}>
            {AVATAR_SIZES.map((size) => (
              <Avatar key={size} type={type} size={size} showStatus={size === "MD"} />
            ))}
          </StateRow>
        ))}
      </Section>
      <Section title="23" heading="Separator & Kbd">
        <StateRow label="Separator">
          <div style={{ width: "var(--size-dialog-sm)" }}>
            <Separator />
            <Separator label="Or continue with" />
          </div>
        </StateRow>
        <StateRow label="Kbd">
          <Kbd keyLabel="⌘" />
          <Kbd keyLabel="K" />
          <Kbd keyLabel="Shift" size="MD" />
        </StateRow>
      </Section>
      <Section title="24" heading="Empty & Error">
        {EMPTY_REASONS.map((reason) => (
          <StateRow key={reason} label={reason}>
            <EmptyState reason={reason} />
          </StateRow>
        ))}
        {ERROR_REASONS.map((reason) => (
          <StateRow key={reason} label={reason}>
            <ErrorState reason={reason} />
          </StateRow>
        ))}
      </Section>
    </>
  );
}
