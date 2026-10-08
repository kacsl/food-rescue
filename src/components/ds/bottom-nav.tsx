import React from "react";

export interface BottomNavItemProps {
  id: string;
  label: string;
  icon: "store" | "bag" | React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export interface BottomNavProps {
  items?: BottomNavItemProps[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/** Store Icon from Figma C49 */
export function StoreNavIcon({ selected = false }: { selected?: boolean }) {
  const fillColor = selected ? "var(--color-icon-primary, #303036)" : "var(--color-text-tertiary, #75757d)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5.223 2.25C4.726 2.25 4.249 2.448 3.898 2.8L2.598 4.098C1.92623 4.76853 1.53371 5.66884 1.49961 6.61738C1.46551 7.56592 1.79236 8.4921 2.41425 9.20913C3.03613 9.92617 3.90679 10.3807 4.85061 10.4811C5.79444 10.5815 6.74122 10.3202 7.5 9.75C8.127 10.22 8.906 10.5 9.75 10.5C10.594 10.5 11.374 10.22 12 9.75C12.626 10.22 13.406 10.5 14.25 10.5C15.094 10.5 15.873 10.22 16.5 9.75C17.2588 10.3202 18.2056 10.5815 19.1494 10.4811C20.0932 10.3807 20.9639 9.92617 21.5858 9.20913C22.2076 8.4921 22.5345 7.56592 22.5004 6.61738C22.4663 5.66884 22.0738 4.76853 21.402 4.098L20.102 2.799C19.7505 2.44764 19.274 2.25017 18.777 2.25H5.223Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 20.25V11.495C4.42 12.169 6.08 12.168 7.5 11.495C8.20313 11.8285 8.97178 12.001 9.75 12C10.554 12 11.318 11.818 12 11.494C12.7031 11.8279 13.4717 12.0007 14.25 12C15.054 12 15.817 11.818 16.5 11.494C17.92 12.168 19.58 12.169 21 11.495V20.25H21.75C21.9489 20.25 22.1397 20.329 22.2803 20.4697C22.421 20.6103 22.5 20.8011 22.5 21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H2.25C2.05109 21.75 1.86032 21.671 1.71967 21.5303C1.57902 21.3897 1.5 21.1989 1.5 21C1.5 20.8011 1.57902 20.6103 1.71967 20.4697C1.86032 20.329 2.05109 20.25 2.25 20.25H3ZM6 14.25C6 14.0511 6.07902 13.8603 6.21967 13.7197C6.36032 13.579 6.55109 13.5 6.75 13.5H9.75C9.94891 13.5 10.1397 13.579 10.2803 13.7197C10.421 13.8603 10.5 14.0511 10.5 14.25V17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18H6.75C6.55109 18 6.36032 17.921 6.21967 17.7803C6.07902 17.6397 6 17.4489 6 17.25V14.25ZM14.25 13.5C14.0511 13.5 13.8603 13.579 13.7197 13.7197C13.579 13.8603 13.5 14.0511 13.5 14.25V19.5C13.5 19.914 13.836 20.25 14.25 20.25H17.25C17.4489 20.25 17.6397 20.171 17.7803 20.0303C17.921 19.8897 18 19.6989 18 19.5V14.25C18 14.0511 17.921 13.8603 17.7803 13.7197C17.6397 13.579 17.4489 13.5 17.25 13.5H14.25Z"
        fill={fillColor}
      />
    </svg>
  );
}

/** Bag Icon from Figma C49 */
export function BagNavIcon({ selected = false }: { selected?: boolean }) {
  const strokeColor = selected ? "var(--color-icon-primary, #303036)" : "var(--color-text-tertiary, #75757d)";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M15.75 10.5V6C15.75 5.00544 15.3549 4.05161 14.6517 3.34835C13.9484 2.64509 12.9946 2.25 12 2.25C11.0054 2.25 10.0516 2.64509 9.34835 3.34835C8.64509 4.05161 8.25 5.00544 8.25 6V10.5M19.606 8.507L20.869 20.507C20.939 21.172 20.419 21.75 19.75 21.75H4.25C4.09221 21.7502 3.93614 21.7171 3.79195 21.6531C3.64775 21.589 3.51865 21.4953 3.41302 21.3781C3.3074 21.2608 3.22761 21.1227 3.17885 20.9726C3.13009 20.8226 3.11345 20.6639 3.13 20.507L4.394 8.507C4.42316 8.23056 4.55363 7.9747 4.76025 7.78876C4.96688 7.60281 5.23503 7.49995 5.513 7.5H18.487C19.063 7.5 19.546 7.935 19.606 8.507ZM8.625 10.5C8.625 10.5995 8.58549 10.6948 8.51517 10.7652C8.44484 10.8355 8.34946 10.875 8.25 10.875C8.15054 10.875 8.05516 10.8355 7.98484 10.7652C7.91451 10.6948 7.875 10.5995 7.875 10.5C7.875 10.4005 7.91451 10.3052 7.98484 10.2348C8.05516 10.1645 8.15054 10.125 8.25 10.125C8.34946 10.125 8.44484 10.1645 8.51517 10.2348C8.58549 10.3052 8.625 10.4005 8.625 10.5ZM16.125 10.5C16.125 10.5995 16.0855 10.6948 16.0152 10.7652C15.9448 10.8355 15.8495 10.875 15.75 10.875C15.6505 10.875 15.5552 10.8355 15.4848 10.7652C15.4145 10.6948 15.375 10.5995 15.375 10.5C15.375 10.4005 15.4145 10.3052 15.4848 10.2348C15.5552 10.1645 15.6505 10.125 15.75 10.125C15.8495 10.125 15.9448 10.1645 16.0152 10.2348C16.0855 10.3052 16.125 10.4005 16.125 10.5Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * C49 - Bottom Navigation Component
 * Strictly synchronized with Figma Page 3035:7430 (C49 - Bottom navigation)
 *
 * Characteristics:
 * - Pill container: 222px × 68px (auto-adjusts to items), corner-radius 9999px
 * - Semi-transparent frosted glass: background blur 50px (25px-50px)
 * - Padding: 12px top/bottom, 24px left/right, item spacing 22px
 * - 1px subtle border: var(--color-border-subtle)
 * - Selected state: font-weight 600, color var(--color-text-primary)
 * - Not selected state: font-weight 400, color var(--color-text-tertiary)
 */
export function BottomNav({
  items,
  activeId,
  onSelect,
  className,
  style,
}: BottomNavProps) {
  const defaultItems: BottomNavItemProps[] = [
    { id: "nearby", label: "Food Nearby", icon: "store" },
    { id: "donations", label: "My donations", icon: "bag" },
  ];

  const currentItems = items || defaultItems;
  const currentActive = activeId || currentItems[0]?.id;

  return (
    <nav
      aria-label="Bottom navigation"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "12px",
        paddingBottom: "12px",
        paddingLeft: "24px",
        paddingRight: "24px",
        gap: "22px",
        borderRadius: "9999px",
        border: "1px solid var(--color-border-subtle, rgba(230, 231, 237, 0.8))",
        background: "color-mix(in srgb, var(--color-background-surface, #f8f9fc) 60%, transparent)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        ...style,
      }}
    >
      {currentItems.map((item) => {
        const isSelected = item.id === currentActive;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              item.onClick?.();
              onSelect?.(item.id);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "2px",
              background: "transparent",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              outline: "none",
              color: isSelected ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
              transition: "color 0.15s ease",
            }}
          >
            <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {item.icon === "store" ? (
                <StoreNavIcon selected={isSelected} />
              ) : item.icon === "bag" ? (
                <BagNavIcon selected={isSelected} />
              ) : (
                item.icon
              )}
            </div>
            <span
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                fontWeight: isSelected ? 600 : 400,
                color: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
