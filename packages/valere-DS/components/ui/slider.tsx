export const SLIDER_TYPES = ["Single", "Range"] as const;
export const SLIDER_STATES = ["Default", "Hover", "Focus", "Dragging", "Disabled"] as const;
export const SLIDER_POSITIONS = ["0%", "25%", "50%", "75%", "100%"] as const;
export const SLIDER_RANGE_POSITIONS = ["0–25%", "0–50%", "25–75%", "50–100%", "75–100%"] as const;

export type SliderType = (typeof SLIDER_TYPES)[number];
export type SliderState = (typeof SLIDER_STATES)[number];
export type SliderPosition = (typeof SLIDER_POSITIONS)[number];
export type SliderRangePosition = (typeof SLIDER_RANGE_POSITIONS)[number];

function parseSingle(position: SliderPosition): { start: number; end: number } {
  const end = Number.parseInt(position, 10);
  return { start: 0, end };
}

function parseRange(position: SliderRangePosition): { start: number; end: number } {
  const [start, end] = position.split("–").map((part) => Number.parseInt(part, 10));
  return { start, end };
}

function Thumb({ state }: { state: SliderState }) {
  const dragging = state === "Dragging";
  return (
    <span
      style={{
        width: dragging ? "var(--size-thumb-dragging)" : "var(--size-thumb)",
        height: dragging ? "var(--size-thumb-dragging)" : "var(--size-thumb)",
        borderRadius: "var(--radius-pill)",
        background: "var(--color-background-surface)",
        border: "var(--border-emphasis) solid var(--color-action-primary)",
        boxShadow: state === "Focus" ? "0 0 0 var(--border-focus-ring) var(--color-border-focus)" : "var(--elevation-1)",
        opacity: state === "Disabled" ? "var(--opacity-disabled)" : 1,
      }}
    />
  );
}

export function Slider({
  type = "Single",
  state = "Default",
  position = "50%",
  rangePosition = "25–75%",
}: {
  type?: SliderType;
  state?: SliderState;
  position?: SliderPosition;
  rangePosition?: SliderRangePosition;
}) {
  const { start, end } = type === "Range" ? parseRange(rangePosition) : parseSingle(position);
  return (
    <div
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={end}
      aria-disabled={state === "Disabled"}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "var(--size-control-md)",
        opacity: state === "Disabled" ? "var(--opacity-disabled)" : 1,
      }}
    >
      <span
        style={{
          position: "absolute",
          insetInline: 0,
          height: "var(--size-track-md)",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-background-muted)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: `${start}%`,
          width: `${end - start}%`,
          height: "var(--size-track-md)",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-action-primary)",
        }}
      />
      {type === "Range" ? (
        <span style={{ position: "absolute", left: `${start}%`, transform: "translateX(-50%)" }}>
          <Thumb state={state} />
        </span>
      ) : null}
      <span style={{ position: "absolute", left: `${end}%`, transform: "translateX(-50%)" }}>
        <Thumb state={state} />
      </span>
    </div>
  );
}
