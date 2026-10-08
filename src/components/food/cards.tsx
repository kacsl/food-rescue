import { Badge } from "valere-DS";
import { ClockIcon, ShieldCheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const cardChrome = {
  width: "100%",
  padding: 0,
  margin: 0,
  textAlign: "left" as const,
  font: "inherit",
  color: "inherit",
  cursor: "pointer",
  background: "rgba(255, 255, 255, 0.35)",
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
  allergens: string[];
  address: string; // Unlocked after claim
  pickupType: "immediate" | "scheduled";
  slots?: PickupSlot[];
  status: "available" | "claimed" | "picked_up" | "expired";
  claimedBy?: string;
  claimedSlot?: string;
};

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
        borderColor: isClaimed
          ? "var(--color-border-brand, #dc2b10)"
          : isExpired
          ? "var(--color-border-subtle, #e6e7ed)"
          : "var(--color-border-subtle, #e6e7ed)",
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
            background: "linear-gradient(to top, rgba(254, 243, 230, 0.45) 30%, rgba(254, 243, 230, 0) 100%)",
          }}
        />

        {/* Top Badges: Countdown Timer + Status */}
        <span
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
            borderRadius: "var(--radius-pill, 9999px)",
            background: isExpired
              ? "rgba(117, 117, 125, 0.88)"
              : item.pickupType === "immediate"
              ? "rgba(220, 43, 16, 0.92)"
              : "rgba(48, 48, 54, 0.85)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 700,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}
        >
          <ClockIcon width={13} height={13} strokeWidth={2.4} aria-hidden="true" />
          <span>{item.timeLeft}</span>
        </span>

        <span style={{ position: "absolute", top: 8, right: 9 }}>
          {isClaimed ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 8px",
                borderRadius: "9999px",
                background: "var(--color-background-brand-subtle, #ffedec)",
                color: "var(--color-text-brand, #be240c)",
                border: "1px solid var(--color-border-brand, #dc2b10)",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              Claimed
            </span>
          ) : isExpired ? (
            <Badge tone="Neutral" emphasis="Solid" label="Expired" />
          ) : (
            <Badge
              tone={item.badge === "Available now" ? "Brand" : "Neutral"}
              emphasis="Subtle"
              label={item.badge}
            />
          )}
        </span>
      </span>

      {/* Card Body with Key Info at a Glance */}
      <span style={{ display: "flex", alignItems: "center", gap: 8, padding: 14 }}>
        <span style={{ display: "flex", flex: 1, flexDirection: "column", gap: 6, minWidth: 0 }}>
          <span
            style={{
              fontSize: "var(--font-size-heading-base, 18px)",
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

          {/* Freshness, Cook Time & Allergens preview */}
          <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-text-brand, #be240c)",
                background: "var(--color-background-brand-subtle, #ffedec)",
                padding: "2px 6px",
                borderRadius: "6px",
              }}
            >
              {item.foodAge}
            </span>

            <span
              style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary, #75757d)",
                background: "var(--color-background-muted, #f2f2f6)",
                padding: "2px 6px",
                borderRadius: "6px",
              }}
            >
              {item.allergens.length === 0
                ? "No allergens"
                : `Contains ${item.allergens.slice(0, 2).join(", ")}`}
            </span>
          </span>

          {/* Host info with verified check */}
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
              <span
                title="Phone verified neighbor"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  fontSize: "10px",
                  color: "#287d3c",
                  fontWeight: 600,
                }}
              >
                <ShieldCheckIcon width={13} height={13} />
                <span>Verified</span>
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
  timeLeft?: string;
  distance?: string;
  foodAge?: string;
  allergens?: string[];
  claimStatus?: "unclaimed" | "claimed" | "picked_up";
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
        display: "flex",
        alignItems: "center",
        gap: 12,
        minHeight: 84,
        background: isClaimed ? "rgba(255, 237, 236, 0.7)" : "#ffffff",
        border: isClaimed
          ? "1.5px solid var(--color-action-primary, #dc2b10)"
          : "1px solid var(--color-border-subtle, #e6e7ed)",
      }}
    >
      <span
        style={{
          position: "relative",
          width: 84,
          height: 84,
          flexShrink: 0,
          overflow: "hidden",
          borderRight: "1px solid var(--color-border-subtle)",
        }}
      >
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
            background: "linear-gradient(to left, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.7) 100%)",
          }}
        />
      </span>

      <span style={{ display: "flex", flex: 1, flexDirection: "column", gap: 4, minWidth: 0, paddingBlock: 10 }}>
        <span
          style={{
            fontSize: "var(--font-size-body-base, 15px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
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
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--color-action-primary, #dc2b10)",
            }}
          >
            <span>🚨 Claimed by {item.claimedBy || "Neighbor"}</span>
            <span style={{ fontWeight: 500, color: "var(--color-text-secondary)" }}>
              • {item.claimedSlot || "4:00 PM"}
            </span>
          </span>
        ) : isClosed ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: "12px",
              fontWeight: 600,
              color: "#287d3c",
            }}
          >
            <CheckCircleIcon width={14} height={14} />
            <span>Picked up • Rescued in 42m</span>
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "var(--font-size-body-xs, 12px)", color: "var(--color-text-secondary)" }}>
              {item.interested === 0
                ? "No claims yet"
                : `${item.interested} interested neighbor${item.interested === 1 ? "" : "s"}`}
            </span>
            <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
              • {item.timeLeft || "45m left"}
            </span>
          </span>
        )}

        <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
          {item.foodAge || "Cooked today"} • {item.allergens?.length ? item.allergens.join(", ") : "Allergen-free"}
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
          marginRight: 8,
          flexShrink: 0,
        }}
      >
        <img src="/food/chevron.svg" width={16} height={16} alt="" />
      </span>
    </button>
  );
}
