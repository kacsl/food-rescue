import { Badge } from "valere-DS";

const cardChrome = {
  width: "100%",
  padding: 0,
  margin: 0,
  textAlign: "left" as const,
  font: "inherit",
  color: "inherit",
  cursor: "pointer",
  background: "rgba(255, 255, 255, 0.3)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-card)",
  overflow: "hidden",
  backdropFilter: "blur(25px)",
  WebkitBackdropFilter: "blur(25px)",
};

export type NearbyFood = {
  id: string;
  title: string;
  distance: string;
  area: string;
  host: string;
  image: string;
  badge: string;
};

export function NearbyCard({ item, onOpen }: { item: NearbyFood; onOpen: (item: NearbyFood) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.title}`}
      className="food-card-interactive"
      style={{ ...cardChrome, display: "flex", flexDirection: "column" }}
    >
      <span style={{ position: "relative", display: "block", aspectRatio: "1500 / 1000", overflow: "hidden" }}>
        <img
          src={item.image}
          alt=""
          className="food-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(254, 243, 230, 0.4) 50%, rgba(254, 243, 230, 0) 100%)",
          }}
        />
        <span style={{ position: "absolute", top: 8, right: 9 }}>
          <Badge tone="Neutral" emphasis="Subtle" label={item.badge} />
        </span>
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 8, padding: 16 }}>
        <span style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: "var(--font-size-heading-base)", fontWeight: 600, color: "var(--color-text-primary)" }}>{item.title}</span>
          <span style={{ fontSize: "var(--font-size-body-base)", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
            {item.distance} • {item.area}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/food/karina.png" alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 9999, objectFit: "cover" }} />
            <span style={{ fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>{item.host}</span>
          </span>
        </span>
        <span className="food-card-chevron" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, flexShrink: 0 }}>
          <img src="/food/chevron.svg" width={16} height={16} alt="" />
        </span>
      </span>
    </button>
  );
}

export type Donation = {
  id: string;
  title: string;
  image: string;
  status: "open" | "closed";
  interested: number;
};

export function ListingCard({ item, onOpen }: { item: Donation; onOpen: (item: Donation) => void }) {
  const people =
    item.interested === 0
      ? "No people interested yet"
      : `${item.interested} ${item.interested === 1 ? "person" : "people"} interested`;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.title}`}
      className="food-card-interactive"
      style={{ ...cardChrome, display: "flex", alignItems: "center", gap: 12, height: 79, background: "#fff" }}
    >
      <span style={{ position: "relative", width: 80, height: "100%", flexShrink: 0, overflow: "hidden", borderRight: "1px solid var(--color-border-subtle)" }}>
        <img
          src={item.image}
          alt=""
          className="food-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to left, rgba(255, 255, 255, 0.4) 43%, rgba(255, 255, 255, 0) 81%)",
          }}
        />
      </span>
      <span style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8, minWidth: 0, paddingBlock: 12 }}>
        <span
          style={{
            fontSize: "var(--font-size-body-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {item.interested > 0 ? (
            <span style={{ display: "flex", alignItems: "center" }}>
              <img src="/food/karina.png" alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 9999, objectFit: "cover", marginRight: -8 }} />
              <img src="/food/karina.png" alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 9999, objectFit: "cover" }} />
            </span>
          ) : null}
          <span style={{ fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>{people}</span>
        </span>
      </span>
      <span className="food-card-chevron" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, marginRight: 4, flexShrink: 0 }}>
        <img src="/food/chevron.svg" width={16} height={16} alt="" />
      </span>
    </button>
  );
}
