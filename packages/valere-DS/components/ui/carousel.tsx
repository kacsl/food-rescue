import { ChevronLeftIcon, ChevronRightIcon } from "../../lib/icons";
import { CarouselIndicator } from "./carousel-indicator";
import { IconButton } from "./icon-button";
import { Media } from "./media";

export function Carousel({
  current = "3",
  total = "7",
}: {
  current?: string;
  total?: string;
}) {
  const active = Number(current);
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
        <IconButton variant="Outline" size="SM" icon={<ChevronLeftIcon />} aria-label="Previous slide" />
        <div
          style={{
            display: "flex",
            gap: "var(--space-inline-md)",
            overflow: "hidden",
            flex: 1,
          }}
        >
          <Media fallback="None" alt={`Slide ${current} of ${total}`} />
          <Media fallback="None" alt="" />
        </div>
        <IconButton variant="Outline" size="SM" icon={<ChevronRightIcon />} aria-label="Next slide" />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Array.from({ length: Number(total) }, (_, index) => (
          <CarouselIndicator key={index} selected={index + 1 === active ? "True" : "False"} label={`Slide ${index + 1} of ${total}`} />
        ))}
      </div>
    </section>
  );
}
