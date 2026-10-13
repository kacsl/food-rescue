export const SKELETON_SHAPES = ["Line", "Circle", "Block"] as const;
export type SkeletonShape = (typeof SKELETON_SHAPES)[number];

export function Skeleton({ shape = "Line" }: { shape?: SkeletonShape }) {
  if (shape === "Circle") {
    return (
      <span
        style={{
          display: "block",
          width: "var(--size-control-md)",
          height: "var(--size-control-md)",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-background-muted)",
        }}
      />
    );
  }
  if (shape === "Block") {
    return (
      <span
        style={{
          display: "block",
          width: "var(--spacing-128)",
          height: "var(--size-multiline-md)",
          borderRadius: "var(--radius-control)",
          background: "var(--color-background-muted)",
        }}
      />
    );
  }
  return (
    <span
      style={{
        display: "block",
        width: "var(--spacing-128)",
        height: "var(--font-size-body-sm)",
        borderRadius: "var(--radius-pill)",
        background: "var(--color-background-muted)",
      }}
    />
  );
}
