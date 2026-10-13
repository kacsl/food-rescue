import { Carousel } from "@/components/ui/carousel";
import { CarouselIndicator } from "@/components/ui/carousel-indicator";
import { Day, DAY_STATES } from "@/components/ui/day";
import { Media, MEDIA_FALLBACKS } from "@/components/ui/media";
import { MediaControls } from "@/components/ui/media-controls";
import { StatTile } from "@/components/ui/stat-tile";
import { TableCell, TableHeaderCell, TABLE_CELL_STATES } from "@/components/ui/table-cell";
import { TimelineItem } from "@/components/ui/timeline";
import { TrendIndicator } from "@/components/ui/trend-indicator";
import { Section, StateRow } from "./section";

export function DataSections() {
  return (
    <>
      <Section title="37" heading="Table">
        <div style={{ maxWidth: "var(--size-dialog-md)" }}>
          <TableHeaderCell sort="Ascending" />
          {TABLE_CELL_STATES.map((state) => (
            <TableCell key={state} state={state} label={state} showAvatar showBadge={state === "Selected"} showCheckbox />
          ))}
        </div>
      </Section>
      <Section title="38" heading="Day">
        <StateRow label="States">
          {DAY_STATES.map((state) => (
            <Day key={state} state={state} label={state === "Outside" ? "31" : "12"} />
          ))}
        </StateRow>
      </Section>
      <Section title="39" heading="Stat & Trend">
        <StateRow label="Tiles">
          <div style={{ width: "var(--size-dialog-sm)" }}>
            <StatTile />
          </div>
          <div style={{ width: "var(--size-dialog-sm)" }}>
            <StatTile label="Churn" value="2.1%" change="−0.4%" direction="Down" tone="Positive" period="versus last month" />
          </div>
        </StateRow>
        <StateRow label="Trend">
          <TrendIndicator />
          <TrendIndicator direction="Down" tone="Negative" value="−3.2%" />
          <TrendIndicator direction="Up" tone="Neutral" value="+0.1%" />
        </StateRow>
      </Section>
      <Section title="40" heading="Timeline">
        <div>
          <TimelineItem state="Complete" title="Created" time="Mon 09:00" />
          <TimelineItem state="Current" title="In review" time="Today 14:20" />
          <TimelineItem state="Default" title="Published" time="—" showConnector={false} />
        </div>
      </Section>
      <Section title="41" heading="Media">
        {MEDIA_FALLBACKS.map((fallback) => (
          <StateRow key={fallback} label={fallback}>
            <Media fallback={fallback} />
          </StateRow>
        ))}
        <StateRow label="Controls">
          <div style={{ width: "min(100%, var(--size-dialog-md))" }}>
            <MediaControls />
          </div>
        </StateRow>
      </Section>
      <Section title="42" heading="Carousel">
        <Carousel />
        <StateRow label="Indicator">
          <CarouselIndicator />
          <CarouselIndicator selected="True" />
        </StateRow>
      </Section>
    </>
  );
}
