import { PauseIcon, PlayIcon } from "../../lib/icons";
import { IconButton } from "./icon-button";
import { Progress } from "./progress";

export function MediaControls({
  playing = "False",
  elapsed = "1:24",
  duration = "3:10",
  value = "44%",
}: {
  playing?: "False" | "True";
  elapsed?: string;
  duration?: string;
  value?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-md)",
        width: "100%",
        padding: "var(--space-inset-sm) var(--space-inset-md)",
        borderRadius: "var(--radius-control)",
        background: "var(--color-background-inverse)",
        color: "var(--color-text-inverse)",
      }}
    >
      <IconButton
        variant="Ghost"
        size="SM"
        icon={playing === "True" ? <PauseIcon /> : <PlayIcon />}
        aria-label={playing === "True" ? "Pause" : "Play"}
      />
      <span style={{ fontSize: "var(--font-size-body-xs)", whiteSpace: "nowrap" }}>{elapsed}</span>
      <div style={{ flex: 1 }}>
        <Progress mode="Determinate" value={value} showLabel={false} showValue={false} />
      </div>
      <span style={{ fontSize: "var(--font-size-body-xs)", whiteSpace: "nowrap" }}>{duration}</span>
    </div>
  );
}
