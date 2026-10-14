import { Badge } from "valere-DS";
import { ChevronRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const cardChrome = {
  width: "100%",
  padding: 0,
  margin: 0,
  textAlign: "left" as const,
  font: "inherit",
  color: "inherit",
  cursor: "pointer",
  background: "var(--food-glass-bg)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-card, 16px)",
  overflow: "hidden",
  backdropFilter: "blur(25px)",
  WebkitBackdropFilter: "blur(25px)",
};

export type PickupSlot = {
  id: string;
  label: string;
  isImmediate?: boolean;
};

export type NearbyFood = {
  id: string;
  title: string;
  description?: string;
  distance: string;
  area: string;
  host: string;
  hostPhone?: string;
  hostVerified?: boolean;
  image: string;
  badge: string; // "Available now" | "Needs scheduling" | "Claimed" | "Expired"
  timeLeft: string; // e.g. "45m left"
  minutesLeft: number;
  foodAge: string; // "Cooked today" | "Prepared 1 day ago"
  preparedDaysAgo: number;
  keptRefrigerated: boolean;
  packagingType?: "packaged" | "unpackaged";
  expirationInfo?: string;
  allergens: string[];
  address: string; // Unlocked after claim
  pickupType: "immediate" | "scheduled";
  slots?: PickupSlot[];
  status: "available" | "claimed" | "picked_up" | "expired";
  claimedBy?: string;
  claimedSlot?: string;
};

function deliveryBadge(item: NearbyFood): { label: string; tone: "Neutral" } {
  if (item.status === "expired" || item.minutesLeft <= 0) return { label: "Expired", tone: "Neutral" };
  if (item.status === "picked_up") return { label: "Picked up", tone: "Neutral" };
  if (item.status === "claimed") return { label: "Claimed", tone: "Neutral" };
  if (item.pickupType === "scheduled" || item.badge === "Needs scheduling") {
    return { label: "Needs scheduling", tone: "Neutral" };
  }
  return { label: "Available now", tone: "Neutral" };
}

export function NearbyCard({ item, onOpen }: { item: NearbyFood; onOpen: (item: NearbyFood) => void }) {
  const isExpired = item.status === "expired" || item.minutesLeft <= 0;
  const isClaimed = item.status === "claimed";

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.title}`}
      className="food-card-interactive"
      style={{
        ...cardChrome,
        display: "flex",
        flexDirection: "column",
        opacity: isExpired ? 0.72 : 1,
      }}
    >
      <span style={{ position: "relative", display: "block", aspectRatio: "1500 / 1000", overflow: "hidden" }}>
        <img
          src={item.image}
          alt=""
          className="food-card-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: isExpired ? "grayscale(40%)" : "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--food-blob-color) 45%, transparent) 30%, transparent 100%)",
          }}
        />

        {/* Top-right delivery badge */}
        <span style={{ position: "absolute", top: 8, right: 9 }}>
          <Badge
            tone={deliveryBadge(item).tone}
            emphasis="Subtle"
            label={deliveryBadge(item).label}
          />
        </span>
      </span>

      {/* Card Body with Key Info at a Glance */}
      <span style={{ display: "flex", alignItems: "center", gap: 8, padding: 14 }}>
        <span style={{ display: "flex", flex: 1, flexDirection: "column", gap: 6, minWidth: 0 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "var(--color-text-primary, #303036)",
            }}
          >
            {item.title}
          </span>

          <span
            style={{
              fontSize: "var(--font-size-body-sm, 14px)",
              color: "var(--color-text-secondary, #5c5c63)",
              whiteSpace: "nowrap",
            }}
          >
            {item.distance} • {item.area}
          </span>

          <span style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <img
              src="/food/karina.png"
              alt=""
              width={22}
              height={22}
              style={{ width: 22, height: 22, borderRadius: 9999, objectFit: "cover" }}
            />
            <span style={{ fontSize: "var(--font-size-body-xs, 12px)", color: "var(--color-text-secondary, #5c5c63)" }}>
              {item.host}
            </span>
            {item.hostVerified !== false ? (
              <span title="Phone verified neighbor" style={{ display: "inline-flex", color: "var(--color-text-tertiary, #75757d)" }}>
                <ShieldCheckIcon width={14} height={14} aria-hidden="true" />
              </span>
            ) : null}
          </span>
        </span>

        <span
          className="food-card-chevron"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            flexShrink: 0,
          }}
        >
          <ChevronRightIcon width={16} height={16} aria-hidden="true" style={{ color: "var(--color-text-tertiary, #75757d)" }} />
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
  timeLeft?: string;
  distance?: string;
  foodAge?: string;
  keptRefrigerated?: boolean;
  allergens?: string[];
  claimStatus?: "unclaimed" | "claimed" | "picked_up";
  claimAccepted?: boolean;
  claimedBy?: string;
  claimedSlot?: string;
  claimerPhone?: string;
  address?: string;
  pickedUpAt?: string;
};

export function ListingCard({ item, onOpen }: { item: Donation; onOpen: (item: Donation) => void }) {
  const isClaimed = item.claimStatus === "claimed";
  const isClosed = item.status === "closed";

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.title}`}
      className="food-card-interactive"
      style={{
        ...cardChrome,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 12,
        minHeight: isClaimed ? 95 : 84,
      }}
    >
      <span
        style={{
          position: "relative",
          alignSelf: "stretch",
          width: 80,
          minHeight: isClaimed ? 93 : 82,
          flexShrink: 0,
          overflow: "hidden",
          borderRight: "1px solid var(--color-border-subtle, #e6e7ed)",
        }}
      >
        <img
          src={item.image}
          alt=""
          className="food-card-img"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(-89.9963deg, color-mix(in srgb, var(--color-background-surface) 40%, transparent) 43.482%, transparent 81.17%)",
            pointerEvents: "none",
          }}
        />
      </span>

      <span
        style={{
          position: "relative",
          display: "flex",
          flex: "1 0 0",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8,
          minWidth: 0,
          paddingBlock: 12,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -45,
            top: -3,
            width: 265,
            height: 80,
            background: "color-mix(in srgb, var(--color-background-surface) 30%, transparent)",
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "relative",
            width: "100%",
            fontSize: "var(--font-size-body-base, 16px)",
            fontWeight: "var(--font-weight-semibold, 600)",
            lineHeight: "normal",
            color: "var(--color-text-primary, #303036)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </span>

        {isClaimed ? (
          <span
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
              width: "100%",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                fontSize: "var(--font-size-body-sm, 14px)",
                fontWeight: "var(--font-weight-regular, 400)",
                lineHeight: "normal",
                color: "var(--color-text-secondary, #5c5c63)",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src="/food/karina.png"
                alt=""
                width={16}
                height={16}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "var(--radius-pill, 9999px)",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <span>Claimed by {item.claimedBy || "a neighbor"}</span>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                fontSize: "var(--font-size-body-sm, 14px)",
                fontWeight: "var(--font-weight-regular, 400)",
                lineHeight: "normal",
                color: "var(--color-text-secondary, #5c5c63)",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src="/food/listing-clock.svg"
                alt=""
                width={16}
                height={16}
                style={{ display: "block", flexShrink: 0 }}
              />
              <span>{item.claimedSlot || "10:00 AM"}</span>
            </span>
          </span>
        ) : (
          <span
            style={{
              position: "relative",
              fontSize: "var(--font-size-body-sm, 14px)",
              fontWeight: "var(--font-weight-regular, 400)",
              lineHeight: "normal",
              color: "var(--color-text-secondary, #5c5c63)",
            }}
          >
            {isClosed
              ? "Picked up"
              : item.interested === 0
              ? `No claims yet · ${item.timeLeft || "45m left"}`
              : `${item.interested} interested · ${item.timeLeft || "45m left"}`}
          </span>
        )}
      </span>

      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          paddingRight: 4,
          flexShrink: 0,
        }}
      >
        <span
          className="food-card-chevron"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "var(--radius-control, 12px)",
            flexShrink: 0,
          }}
        >
          <img
            src="/food/listing-chevron.svg"
            alt=""
            width={16}
            height={16}
            style={{ display: "block", flexShrink: 0 }}
          />
        </span>
      </span>
    </button>
  );
}
