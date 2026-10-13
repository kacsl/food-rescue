import { InfoIcon } from "../../lib/icons";
import { Skeleton } from "./skeleton";

export const MEDIA_FALLBACKS = ["None", "Loading", "Empty", "Error"] as const;

export function Media({
  fallback = "None",
  alt = "Product photo",
  src,
}: {
  fallback?: (typeof MEDIA_FALLBACKS)[number];
  alt?: string;
  src?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "var(--size-media-w)",
        height: "var(--size-media-h)",
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        background: "var(--color-background-muted)",
        color: "var(--color-text-secondary)",
      }}
    >
      {fallback === "Loading" ? (
        <span aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }}>
          <Skeleton shape="Block" />
        </span>
      ) : null}
      {fallback === "Empty" || fallback === "Error" ? (
        <span
          role={fallback === "Error" ? "alert" : undefined}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-stack-sm)",
            fontSize: "var(--font-size-body-xs)",
          }}
        >
          <InfoIcon />
          {fallback === "Error" ? "Image failed to load" : "No image yet"}
        </span>
      ) : null}
      {fallback === "None" && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={alt} src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : null}
      {fallback === "None" && !src ? (
        <span style={{ position: "absolute", inset: 0, background: "var(--color-background-brand-subtle)" }} aria-hidden={!alt} />
      ) : null}
    </div>
  );
}
