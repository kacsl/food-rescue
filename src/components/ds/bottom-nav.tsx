import React from "react";
import {
  BellIcon as BellOutline,
  BuildingStorefrontIcon as BuildingStorefrontOutline,
  ShoppingBagIcon as ShoppingBagOutline,
} from "@heroicons/react/24/outline";
import {
  BellIcon as BellSolid,
  ShoppingBagIcon as ShoppingBagSolid,
} from "@heroicons/react/24/solid";

export interface BottomNavItemProps {
  id: string;
  label: string;
  icon: "store" | "bag" | "bell" | React.ReactNode;
  badge?: number | string;
  selected?: boolean;
  onClick?: () => void;
}

export interface BottomNavProps {
  items?: BottomNavItemProps[];
  activeId?: string;
  notificationCount?: number;
  onSelect?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/** Store Icon from Figma C49 / Heroicons building-storefront */
export function StoreNavIcon({ selected = false }: { selected?: boolean }) {
  if (!selected) {
    return (
      <BuildingStorefrontOutline
        width={24}
        height={24}
        aria-hidden="true"
        data-token="heroicons-outline/building-storefront"
        style={{
          color: "var(--color-text-tertiary, #75757d)",
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5.223 2.25C4.726 2.25 4.249 2.448 3.898 2.8L2.598 4.098C1.92623 4.76853 1.53371 5.66884 1.49961 6.61738C1.46551 7.56592 1.79236 8.4921 2.41425 9.20913C3.03613 9.92617 3.90679 10.3807 4.85061 10.4811C5.79444 10.5815 6.74122 10.3202 7.5 9.75C8.127 10.22 8.906 10.5 9.75 10.5C10.594 10.5 11.374 10.22 12 9.75C12.626 10.22 13.406 10.5 14.25 10.5C15.094 10.5 15.873 10.22 16.5 9.75C17.2588 10.3202 18.2056 10.5815 19.1494 10.4811C20.0932 10.3807 20.9639 9.92617 21.5858 9.20913C22.2076 8.4921 22.5345 7.56592 22.5004 6.61738C22.4663 5.66884 22.0738 4.76853 21.402 4.098L20.102 2.799C19.7505 2.44764 19.274 2.25017 18.777 2.25H5.223Z"
        fill="var(--color-icon-primary, #303036)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 20.25V11.495C4.42 12.169 6.08 12.168 7.5 11.495C8.20313 11.8285 8.97178 12.001 9.75 12C10.554 12 11.318 11.818 12 11.494C12.7031 11.8279 13.4717 12.0007 14.25 12C15.054 12 15.817 11.818 16.5 11.494C17.92 12.168 19.58 12.169 21 11.495V20.25H21.75C21.9489 20.25 22.1397 20.329 22.2803 20.4697C22.421 20.6103 22.5 20.8011 22.5 21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H2.25C2.05109 21.75 1.86032 21.671 1.71967 21.5303C1.57902 21.3897 1.5 21.1989 1.5 21C1.5 20.8011 1.57902 20.6103 1.71967 20.4697C1.86032 20.329 2.05109 20.25 2.25 20.25H3ZM6 14.25C6 14.0511 6.07902 13.8603 6.21967 13.7197C6.36032 13.579 6.55109 13.5 6.75 13.5H9.75C9.94891 13.5 10.1397 13.579 10.2803 13.7197C10.421 13.8603 10.5 14.0511 10.5 14.25V17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18H6.75C6.55109 18 6.36032 17.921 6.21967 17.7803C6.07902 17.6397 6 17.4489 6 17.25V14.25ZM14.25 13.5C14.0511 13.5 13.8603 13.579 13.7197 13.7197C13.579 13.8603 13.5 14.0511 13.5 14.25V19.5C13.5 19.914 13.836 20.25 14.25 20.25H17.25C17.4489 20.25 17.6397 20.171 17.7803 20.0303C17.921 19.8897 18 19.6989 18 19.5V14.25C18 14.0511 17.921 13.8603 17.7803 13.7197C17.6397 13.579 17.4489 13.5 17.25 13.5H14.25Z"
        fill="var(--color-icon-primary, #303036)"
      />
    </svg>
  );
}

/**
 * My donations icon for bottom navigation tab (C49).
 * Tokens:
 * - Unselected: heroicons-outline/shopping-bag (outline shopping-bag icon token)
 * - Selected: heroicons-solid/shopping-bag (solid shopping-bag icon token)
 */
export function BagNavIcon({ selected = false }: { selected?: boolean }) {
  if (selected) {
    return (
      <ShoppingBagSolid
        width={24}
        height={24}
        aria-hidden="true"
        data-token="heroicons-solid/shopping-bag"
        style={{
          color: "var(--color-icon-primary, #303036)",
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transform: "scale(1.04)",
        }}
      />
    );
  }
  return (
    <ShoppingBagOutline
      width={24}
      height={24}
      aria-hidden="true"
      data-token="heroicons-outline/shopping-bag"
      style={{
        color: "var(--color-text-tertiary, #75757d)",
        transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    />
  );
}

/**
 * Notifications icon for bottom navigation tab.
 * Tokens:
 * - Unselected: heroicons-outline/bell (outline notifications icon token)
 * - Selected: heroicons-solid/bell (filled notifications icon token)
 */
export function BellNavIcon({ selected = false }: { selected?: boolean }) {
  if (selected) {
    return (
      <BellSolid
        width={24}
        height={24}
        aria-hidden="true"
        data-token="heroicons-solid/bell"
        style={{
          color: "var(--color-icon-primary, #303036)",
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transform: "scale(1.04)",
        }}
      />
    );
  }
  return (
    <BellOutline
      width={24}
      height={24}
      aria-hidden="true"
      data-token="heroicons-outline/bell"
      style={{
        color: "var(--color-text-tertiary, #75757d)",
        transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    />
  );
}

/**
 * C49 - Bottom navigation
 *
 * Description:
 * Bottom navigation bar with glassmorphic pill container.
 * - Food Nearby tab:
 *   - Unselected: heroicons-outline/building-storefront (outline building-storefront icon token)
 *   - Selected: Store icon (Figma C49 / filled store)
 * - My donations tab: Bag icon
 * - Notifications tab:
 *   - Unselected: heroicons-outline/bell (outline notifications icon token)
 *   - Selected: heroicons-solid/bell (filled notifications icon token)
 *
 * Synchronized with Figma C49 - Bottom navigation (Page 3035:7430).
 */
export function BottomNav({
  items,
  activeId,
  notificationCount,
  onSelect,
  className,
  style,
}: BottomNavProps) {
  const defaultItems: BottomNavItemProps[] = [
    { id: "nearby", label: "Food Nearby", icon: "store" },
    { id: "donations", label: "My donations", icon: "bag" },
    { id: "notifications", label: "Notifications", icon: "bell", badge: notificationCount },
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
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "18px",
        paddingRight: "18px",
        gap: "18px",
        borderRadius: "9999px",
        border: "1px solid var(--color-border-subtle, rgba(230, 231, 237, 0.8))",
        background: "color-mix(in srgb, var(--color-background-surface, #f8f9fc) 65%, transparent)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        boxShadow: "0 8px 32px rgba(48, 48, 54, 0.08)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        ...style,
      }}
    >
      {currentItems.map((item) => {
        const isSelected = item.selected !== undefined ? item.selected : item.id === currentActive;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              item.onClick?.();
              onSelect?.(item.id);
            }}
            className="bottom-nav-item"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "2px",
              background: "transparent",
              border: "none",
              padding: "4px 8px",
              margin: 0,
              cursor: "pointer",
              outline: "none",
              borderRadius: "12px",
              color: isSelected ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
              transform: isSelected ? "scale(1.02)" : "scale(1)",
              transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.18s ease, opacity 0.18s ease",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon === "store" ? (
                <StoreNavIcon selected={isSelected} />
              ) : item.icon === "bag" ? (
                <BagNavIcon selected={isSelected} />
              ) : item.icon === "bell" ? (
                <BellNavIcon selected={isSelected} />
              ) : (
                item.icon
              )}

              {/* Notification badge / dot */}
              {item.badge !== undefined && Number(item.badge) > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -7,
                    minWidth: 16,
                    height: 16,
                    paddingInline: 4,
                    borderRadius: "9999px",
                    background: "var(--color-action-primary, #dc2b10)",
                    color: "var(--color-action-on-action)",
                    fontSize: "10px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                    boxShadow: "0 0 0 1.5px var(--color-background-surface), 0 2px 4px rgba(220, 43, 16, 0.3)",
                    animation: "bottomNavBadgePop 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                fontWeight: isSelected ? 600 : 400,
                color: "inherit",
                whiteSpace: "nowrap",
                letterSpacing: isSelected ? "-0.1px" : "0",
                transition: "color 0.18s ease, font-weight 0.18s ease",
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

