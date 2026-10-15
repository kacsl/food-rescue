import type { CSSProperties } from "react";

type FoodSkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: CSSProperties;
};

function FoodSkeleton({
  width = "100%",
  height = 14,
  borderRadius = "var(--radius-pill, 9999px)",
  className,
  style,
}: FoodSkeletonProps) {
  return (
    <span
      className={["food-skeleton", className].filter(Boolean).join(" ")}
      style={{
        display: "block",
        width,
        height,
        borderRadius,
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

const listCardChrome = {
  width: "100%",
  border: "1px solid var(--color-border-subtle, #e6e7ed)",
  borderRadius: "var(--radius-card, 16px)",
  overflow: "hidden" as const,
  background: "var(--food-glass-bg)",
  backdropFilter: "blur(25px)",
  WebkitBackdropFilter: "blur(25px)",
};

export function NearbyFeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="food-feed-skeleton" aria-busy="true" aria-label="Loading nearby food">
      <FoodSkeleton width={120} height={18} borderRadius={6} style={{ marginBottom: 4 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} style={{ ...listCardChrome, display: "flex", flexDirection: "column" }}>
            <span
              className="food-skeleton food-skeleton--media"
              style={{ display: "block", width: "100%", aspectRatio: "1500 / 1000", borderRadius: 0 }}
              aria-hidden="true"
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 14 }}>
              <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8, minWidth: 0 }}>
                <FoodSkeleton width="78%" height={20} borderRadius={8} />
                <FoodSkeleton width="52%" height={14} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                  <FoodSkeleton width={22} height={22} borderRadius="9999px" />
                  <FoodSkeleton width={96} height={12} />
                </div>
              </div>
              <FoodSkeleton width={28} height={28} borderRadius="9999px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonationsFeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="food-feed-skeleton" aria-busy="true" aria-label="Loading donations">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            style={{
              ...listCardChrome,
              display: "flex",
              alignItems: "stretch",
              minHeight: 84,
            }}
          >
            <span
              className="food-skeleton food-skeleton--donation-thumb"
              style={{ display: "block", width: 80, alignSelf: "stretch", minHeight: 84, borderRadius: 0, flexShrink: 0 }}
              aria-hidden="true"
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, padding: "14px 16px", minWidth: 0 }}>
              <FoodSkeleton width="70%" height={18} borderRadius={8} />
              <FoodSkeleton width="45%" height={14} />
              <FoodSkeleton width="38%" height={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotificationsFeedSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="food-feed-skeleton" aria-busy="true" aria-label="Loading notifications">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            style={{
              ...listCardChrome,
              background: "var(--food-glass-strong-bg)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                <FoodSkeleton width={32} height={32} borderRadius="9999px" />
                <FoodSkeleton width={`${68 - index * 6}%`} height={16} borderRadius={8} />
              </div>
              <FoodSkeleton width={40} height={12} />
            </div>
            <FoodSkeleton width="92%" height={14} />
            <FoodSkeleton width="64%" height={14} />
          </div>
        ))}
      </div>
    </div>
  );
}
