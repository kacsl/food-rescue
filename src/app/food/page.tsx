"use client";

import { useMemo, useState } from "react";
import { Chip } from "valere-DS";
import { KariAvatar } from "@/components/ds/avatar";
import { ListingCard, NearbyCard, type Donation, type NearbyFood } from "@/components/food/cards";
import { PhoneFrame, type FoodScreen } from "@/components/food/phone-frame";
import {
  DonationDetail,
  DonationTabs,
  NearbyDetail,
  NewDonationSheet,
  NotificationDetail,
  SearchField,
  type DonationTab,
  type FoodNotification,
} from "@/components/food/panels";
import { StoreNavIcon, BagNavIcon } from "@/components/ds/bottom-nav";

const NEARBY: NearbyFood[] = [
  {
    id: "oranges",
    title: "10 oranges",
    distance: "0.5 miles",
    area: "Granja Viana",
    host: "Karina Somers",
    image: "/food/oranges.png",
    badge: "Needs scheduling",
  },
  {
    id: "bananas",
    title: "02 bananas",
    distance: "0.5 miles",
    area: "Granja Viana",
    host: "Karina Somers",
    image: "/food/bananas.png",
    badge: "Available now",
  },
];

const INITIAL_DONATIONS: Donation[] = [
  { id: "eggs", title: "5 eggs", image: "/food/eggs.png", status: "open", interested: 5 },
  { id: "strogonoff", title: "Brazilian vegan strogonoff", image: "/food/stroganoff.png", status: "open", interested: 0 },
  { id: "herbs", title: "Garden herbs", image: "/food/bananas.png", status: "closed", interested: 2 },
];

const INITIAL_NOTIFICATIONS: FoodNotification[] = [
  {
    id: "notif-1",
    title: "Pickup request: 10 oranges",
    message: "Karina Somers requested to pick up 10 oranges. Suggested pickup window is today at 4:00 PM.",
    time: "10m ago",
    read: false,
    type: "pickup",
    category: "food_nearby",
    actionLabel: "Confirm pickup time",
  },
  {
    id: "notif-2",
    title: "5 interested neighbors",
    message: "Your donation 5 eggs has 5 neighbors interested in picking up. Coordinate scheduling before it expires.",
    time: "1h ago",
    read: false,
    type: "interest",
    category: "donation",
    actionLabel: "Manage donation",
  },
  {
    id: "notif-3",
    title: "Food rescue reminder",
    message: "Granja Viana community drop-off station is open until 7:00 PM today.",
    time: "3h ago",
    read: true,
    type: "reminder",
    category: "food_nearby",
  },
  {
    id: "notif-4",
    title: "Listing published",
    message: "Brazilian vegan strogonoff was successfully listed and is visible to nearby food seekers.",
    time: "Yesterday",
    read: true,
    type: "system",
    category: "donation",
  },
];

function matches(title: string, query: string) {
  return title.toLowerCase().includes(query.trim().toLowerCase());
}

export default function FoodPage() {
  const [screen, setScreen] = useState<FoodScreen>("nearby");
  const [tab, setTab] = useState<DonationTab>("open");
  const [notifFilter, setNotifFilter] = useState<"all" | "unread">("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [nearbyItem, setNearbyItem] = useState<NearbyFood | null>(null);
  const [donationItem, setDonationItem] = useState<Donation | null>(null);
  const [selectedNotif, setSelectedNotif] = useState<FoodNotification | null>(null);
  const [composing, setComposing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const nearbyVisible = useMemo(
    () => (query.trim() ? NEARBY.filter((item) => matches(item.title, query)) : NEARBY),
    [query],
  );

  const donationVisible = useMemo(() => {
    return donations.filter((item) => {
      if (tab === "open" && item.status !== "open") return false;
      if (tab === "closed" && item.status !== "closed") return false;
      if (query.trim() && !matches(item.title, query)) return false;
      return true;
    });
  }, [donations, query, tab]);

  const notificationsVisible = useMemo(() => {
    return notifications.filter((item) => {
      if (notifFilter === "unread" && item.read) return false;
      if (query.trim() && !matches(item.title + " " + item.message, query)) return false;
      return true;
    });
  }, [notifications, notifFilter, query]);

  function switchScreen(next: FoodScreen) {
    setScreen(next);
    setQuery("");
    setSearchOpen(false);
    setNearbyItem(null);
    setDonationItem(null);
    setSelectedNotif(null);
    setComposing(false);
    setNotice(null);
  }

  function toggleSearch() {
    setSearchOpen((open) => !open);
    setQuery("");
  }

  function markNotificationRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setNotice("All notifications marked as read.");
  }

  const donationCountLabel =
    tab === "closed" ? "closed donations" : tab === "all" ? "donations" : "open donations";
  const donationCount = String(
    donations.filter((item) => (tab === "all" ? true : item.status === tab)).length,
  ).padStart(2, "0");

  const overlay = nearbyItem ? (
    <NearbyDetail
      item={nearbyItem}
      onClose={() => setNearbyItem(null)}
      onReserve={() => {
        setNotice(`Reserved ${nearbyItem.title}. Karina will confirm the pickup.`);
        setNearbyItem(null);
      }}
    />
  ) : donationItem ? (
    <DonationDetail
      item={donationItem}
      onClose={() => setDonationItem(null)}
      onToggleStatus={() => {
        const nextStatus = donationItem.status === "open" ? "closed" : "open";
        setDonations((current) =>
          current.map((item) =>
            item.id === donationItem.id ? { ...item, status: nextStatus } : item,
          ),
        );
        setNotice(
          nextStatus === "closed"
            ? `${donationItem.title} marked as picked up.`
            : `${donationItem.title} is open again.`,
        );
        setDonationItem(null);
        if (nextStatus === "closed") setTab("closed");
        if (nextStatus === "open") setTab("open");
      }}
    />
  ) : selectedNotif ? (
    <NotificationDetail
      item={selectedNotif}
      onClose={() => setSelectedNotif(null)}
      onAction={() => {
        markNotificationRead(selectedNotif.id);
        if (selectedNotif.type === "interest") {
          switchScreen("donations");
          setTab("open");
        } else if (selectedNotif.type === "pickup") {
          setNotice(`Pickup confirmed for ${selectedNotif.title.replace("Pickup request: ", "")}.`);
        }
      }}
    />
  ) : composing ? (
    <NewDonationSheet
      onClose={() => setComposing(false)}
      onPublish={(title) => {
        setDonations((current) => [
          { id: `new-${Date.now()}`, title, image: "/food/eggs.png", status: "open", interested: 0 },
          ...current,
        ]);
        setNotifications((current) => [
          {
            id: `notif-${Date.now()}`,
            title: "New donation published",
            message: `Your listing for "${title}" is now active and discoverable.`,
            time: "Just now",
            read: false,
            type: "system",
          },
          ...current,
        ]);
        setComposing(false);
        setTab("open");
        setNotice(`${title} is now an open donation.`);
      }}
    />
  ) : null;

  return (
    <PhoneFrame
      screen={screen}
      onScreen={switchScreen}
      notificationCount={unreadCount}
      showCreate={screen === "donations"}
      onCreate={() => setComposing(true)}
      overlay={overlay}
    >
      {screen === "nearby" ? (
        <NearbyView
          items={nearbyVisible}
          query={query}
          searchOpen={searchOpen}
          notice={notice}
          onToggleSearch={toggleSearch}
          onQuery={setQuery}
          onOpen={setNearbyItem}
        />
      ) : screen === "donations" ? (
        <DonationsView
          items={donationVisible}
          countLabel={`${donationCount} ${donationCountLabel}`}
          tab={tab}
          query={query}
          searchOpen={searchOpen}
          notice={notice}
          onTab={setTab}
          onToggleSearch={toggleSearch}
          onQuery={setQuery}
          onOpen={setDonationItem}
        />
      ) : (
        <NotificationsView
          items={notificationsVisible}
          filter={notifFilter}
          unreadCount={unreadCount}
          query={query}
          searchOpen={searchOpen}
          notice={notice}
          onFilter={setNotifFilter}
          onMarkAllRead={markAllNotificationsRead}
          onToggleSearch={toggleSearch}
          onQuery={setQuery}
          onOpen={(item) => {
            markNotificationRead(item.id);
            // Open sheet without resetting filter if in unread mode
            setSelectedNotif(item);
          }}
        />
      )}
    </PhoneFrame>
  );
}

function NearbyView({
  items,
  query,
  searchOpen,
  notice,
  onToggleSearch,
  onQuery,
  onOpen,
}: {
  items: NearbyFood[];
  query: string;
  searchOpen: boolean;
  notice: string | null;
  onToggleSearch: () => void;
  onQuery: (value: string) => void;
  onOpen: (item: NearbyFood) => void;
}) {
  const heading = query.trim() ? `${String(items.length).padStart(2, "0")} matches` : "10 options nearby";

  return (
    <>
      <header style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600, lineHeight: 1 }}>Hi, Kari</h1>
          <p style={{ margin: 0, fontSize: "var(--font-size-body-base)", color: "var(--color-text-secondary)", lineHeight: 1 }}>
            Enjoy fresh food before it goes to the bin.
          </p>
        </div>
        <KariAvatar aria-label="Kari profile" style={{ position: "absolute", top: 8, right: 24 }} />
      </header>
      <section style={{ display: "flex", flexDirection: "column", gap: 24, paddingInline: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600, whiteSpace: "nowrap" }}>{heading}</h2>
            <SearchField open={searchOpen} onToggle={onToggleSearch} />
          </div>
          <SearchSlot open={searchOpen} query={query} onToggle={onToggleSearch} onQuery={onQuery} />
        </div>
        {notice ? <Notice>{notice}</Notice> : null}
        {items.length === 0 ? <Empty>No food matches that search.</Empty> : items.map((item) => <NearbyCard key={item.id} item={item} onOpen={onOpen} />)}
      </section>
    </>
  );
}

function DonationsView({
  items,
  countLabel,
  tab,
  query,
  searchOpen,
  notice,
  onTab,
  onToggleSearch,
  onQuery,
  onOpen,
}: {
  items: Donation[];
  countLabel: string;
  tab: DonationTab;
  query: string;
  searchOpen: boolean;
  notice: string | null;
  onTab: (tab: DonationTab) => void;
  onToggleSearch: () => void;
  onQuery: (value: string) => void;
  onOpen: (item: Donation) => void;
}) {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
        <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600, lineHeight: 1 }}>My donations</h1>
        <p style={{ margin: 0, fontSize: "var(--font-size-body-base)", color: "var(--color-text-secondary)", lineHeight: 1 }}>
          Turn extra food into instant impact.
        </p>
        <DonationTabs value={tab} onChange={onTab} />
      </header>
      <section style={{ display: "flex", flexDirection: "column", gap: 24, paddingInline: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600, whiteSpace: "nowrap" }}>{query.trim() ? `${String(items.length).padStart(2, "0")} matches` : countLabel}</h2>
            <SearchField open={searchOpen} onToggle={onToggleSearch} />
          </div>
          <SearchSlot open={searchOpen} query={query} onToggle={onToggleSearch} onQuery={onQuery} />
        </div>
        {notice ? <Notice>{notice}</Notice> : null}
        {items.length === 0 ? <Empty>Nothing in this list yet.</Empty> : items.map((item) => <ListingCard key={item.id} item={item} onOpen={onOpen} />)}
      </section>
    </>
  );
}

function NotificationsView({
  items,
  filter,
  unreadCount,
  query,
  searchOpen,
  notice,
  onFilter,
  onMarkAllRead,
  onToggleSearch,
  onQuery,
  onOpen,
}: {
  items: FoodNotification[];
  filter: "all" | "unread";
  unreadCount: number;
  query: string;
  searchOpen: boolean;
  notice: string | null;
  onFilter: (f: "all" | "unread") => void;
  onMarkAllRead: () => void;
  onToggleSearch: () => void;
  onQuery: (value: string) => void;
  onOpen: (item: FoodNotification) => void;
}) {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600, lineHeight: 1 }}>Notifications</h1>
            <p style={{ margin: "8px 0 0 0", fontSize: "var(--font-size-body-base)", color: "var(--color-text-secondary)", lineHeight: 1 }}>
              Stay updated on reservations and pickups.
            </p>
          </div>
        </div>

        {/* Filter and Mark Read actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          <div role="tablist" aria-label="Notification filter" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span role="tab" aria-selected={filter === "all"} onClick={() => onFilter("all")}>
              <Chip
                label="All"
                selected={filter === "all" ? "True" : "False"}
              />
            </span>
            <span role="tab" aria-selected={filter === "unread"} onClick={() => onFilter("unread")}>
              <Chip
                label={unreadCount > 0 ? `Unread (${unreadCount})` : "Unread"}
                selected={filter === "unread" ? "True" : "False"}
              />
            </span>
          </div>

          {unreadCount > 0 ? (
            <button
              type="button"
              onClick={onMarkAllRead}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--color-text-brand, #be240c)",
                fontSize: "var(--font-size-body-xs)",
                fontWeight: 600,
                cursor: "pointer",
                padding: "4px 8px",
                textDecoration: "none",
              }}
            >
              Mark all read
            </button>
          ) : null}
        </div>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 16, paddingInline: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600, whiteSpace: "nowrap" }}>
              {query.trim()
                ? `${String(items.length).padStart(2, "0")} matches`
                : filter === "unread"
                ? `${String(items.length).padStart(2, "0")} unread`
                : `${String(items.length).padStart(2, "0")} updates`}
            </h2>
            <SearchField open={searchOpen} onToggle={onToggleSearch} />
          </div>
          <SearchSlot open={searchOpen} query={query} onToggle={onToggleSearch} onQuery={onQuery} />
        </div>

        {notice ? <Notice>{notice}</Notice> : null}

        {items.length === 0 ? (
          <Empty>{filter === "unread" ? "You're all caught up! No unread notifications." : "No notifications found."}</Empty>
        ) : (
          items.map((item) => {
            const isDonation = item.category === "donation";
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpen(item)}
                aria-label={`View notification: ${item.title}`}
                className="food-card-interactive"
                style={{
                  width: "100%",
                  padding: 16,
                  margin: 0,
                  textAlign: "left",
                  font: "inherit",
                  color: "inherit",
                  cursor: "pointer",
                  background: item.read ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.45)",
                  border: item.read
                    ? "1px solid var(--color-border-subtle, #e6e7ed)"
                    : "1.5px solid var(--color-action-primary, #dc2b10)",
                  borderRadius: "var(--radius-card, 16px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "9999px",
                        background: item.read ? "var(--color-background-muted, #f2f2f6)" : "var(--color-background-brand-subtle, #ffedec)",
                        color: item.read ? "var(--color-text-secondary, #5c5c63)" : "var(--color-action-primary, #dc2b10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isDonation ? (
                        <span style={{ transform: "scale(0.75)", display: "inline-flex" }}>
                          <BagNavIcon selected={!item.read} />
                        </span>
                      ) : (
                        <span style={{ transform: "scale(0.75)", display: "inline-flex" }}>
                          <StoreNavIcon selected={!item.read} />
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "var(--font-size-body-base, 16px)",
                        fontWeight: item.read ? 500 : 700,
                        color: "var(--color-text-primary, #303036)",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: "var(--font-size-body-xs, 12px)", color: "var(--color-text-tertiary, #75757d)" }}>
                      {item.time}
                    </span>
                    {!item.read ? (
                      <span
                        className="food-unread-dot"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "9999px",
                          background: "var(--color-action-primary, #dc2b10)",
                          display: "inline-block",
                        }}
                      />
                    ) : null}
                  </div>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--font-size-body-sm, 14px)",
                    color: "var(--color-text-secondary, #5c5c63)",
                    lineHeight: 1.45,
                    paddingLeft: 42,
                  }}
                >
                  {item.message}
                </p>
              </button>
            );
          })
        )}
      </section>
    </>
  );
}

function SearchSlot(props: { open: boolean; query: string; onToggle: () => void; onQuery: (value: string) => void }) {
  if (!props.open) return null;
  return (
    <input
      autoFocus
      value={props.query}
      onChange={(event) => props.onQuery(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Escape") props.onToggle();
      }}
      placeholder="Search..."
      aria-label="Search"
      style={{
        width: "100%",
        height: 44,
        marginTop: 16,
        paddingInline: 16,
        borderRadius: "var(--radius-control)",
        border: "1px solid var(--color-border-subtle)",
        background: "rgba(255, 255, 255, 0.72)",
        color: "var(--color-text-primary)",
        font: "inherit",
        fontSize: "var(--font-size-body-base)",
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  );
}

function Notice({ children }: { children: string }) {
  return (
    <p
      role="status"
      style={{
        margin: 0,
        padding: "12px 16px",
        borderRadius: "var(--radius-card)",
        background: "var(--color-background-brand-subtle)",
        color: "var(--color-text-brand)",
        fontSize: "var(--font-size-body-sm)",
      }}
    >
      {children}
    </p>
  );
}

function Empty({ children }: { children: string }) {
  return <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>{children}</p>;
}
