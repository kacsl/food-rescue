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
  ClaimHandoffSheet,
  PhoneVerificationModal,
  type DonationTab,
  type FoodNotification,
} from "@/components/food/panels";
import { StoreNavIcon, BagNavIcon } from "@/components/ds/bottom-nav";

const INITIAL_NEARBY: NearbyFood[] = [
  {
    id: "oranges",
    title: "10 fresh sweet oranges",
    distance: "0.5 miles",
    area: "Granja Viana",
    host: "Karina Somers",
    hostPhone: "+55 11 98877-6655",
    hostVerified: true,
    image: "/food/oranges.png",
    badge: "Available now",
    timeLeft: "45m left",
    minutesLeft: 45,
    foodAge: "Harvested today",
    preparedDaysAgo: 0,
    keptRefrigerated: true,
    allergens: [],
    address: "Rua das Acácias, 142, Apt 4B - Granja Viana",
    pickupType: "immediate",
    status: "available",
  },
  {
    id: "bananas",
    title: "02 organic bananas",
    distance: "0.5 miles",
    area: "Granja Viana",
    host: "Karina Somers",
    hostPhone: "+55 11 98877-6655",
    hostVerified: true,
    image: "/food/bananas.png",
    badge: "Needs scheduling",
    timeLeft: "1h 15m left",
    minutesLeft: 75,
    foodAge: "Fresh (ripe)",
    preparedDaysAgo: 1,
    keptRefrigerated: true,
    allergens: [],
    address: "Rua das Acácias, 142, Apt 4B - Granja Viana",
    pickupType: "scheduled",
    slots: [
      { id: "slot-1", label: "Today 4:00 PM – 4:30 PM" },
      { id: "slot-2", label: "Today 4:30 PM – 5:00 PM" },
      { id: "slot-3", label: "Today 5:00 PM – 5:30 PM" },
    ],
    status: "available",
  },
  {
    id: "strogonoff-nearby",
    title: "Brazilian vegan strogonoff (2 portions)",
    distance: "0.8 miles",
    area: "Granja Viana",
    host: "Carlos Mendes",
    hostPhone: "+55 11 97766-5544",
    hostVerified: true,
    image: "/food/stroganoff.png",
    badge: "Available now",
    timeLeft: "30m left",
    minutesLeft: 30,
    foodAge: "Cooked today (2h ago)",
    preparedDaysAgo: 0,
    keptRefrigerated: true,
    allergens: ["Soy", "Mushrooms"],
    address: "Av. São Camilo, 980 - Granja Viana",
    pickupType: "immediate",
    status: "available",
  },
  {
    id: "bread-expired",
    title: "Organic artisan sourdough loaf",
    distance: "1.2 miles",
    area: "Granja Viana",
    host: "Lucia Rocha",
    hostPhone: "+55 11 96655-4433",
    hostVerified: true,
    image: "/food/eggs.png",
    badge: "Expired",
    timeLeft: "Expired",
    minutesLeft: 0,
    foodAge: "Baked 2 days ago",
    preparedDaysAgo: 2,
    keptRefrigerated: false,
    allergens: ["Gluten"],
    address: "Rua Monet, 55 - Granja Viana",
    pickupType: "immediate",
    status: "expired",
  },
];

const INITIAL_DONATIONS: Donation[] = [
  {
    id: "eggs",
    title: "5 fresh eggs",
    image: "/food/eggs.png",
    status: "open",
    interested: 5,
    claimStatus: "claimed",
    claimedBy: "Dev",
    claimedSlot: "Today 4:00 PM",
    claimerPhone: "+55 11 98765-4321",
    timeLeft: "35m left",
    foodAge: "Fresh today",
    allergens: ["Eggs"],
  },
  {
    id: "strogonoff",
    title: "Brazilian vegan strogonoff",
    image: "/food/stroganoff.png",
    status: "open",
    interested: 0,
    claimStatus: "unclaimed",
    timeLeft: "50m left",
    foodAge: "Cooked today",
    allergens: ["Soy"],
  },
  {
    id: "herbs",
    title: "Garden herbs assortment",
    image: "/food/bananas.png",
    status: "closed",
    interested: 2,
    claimStatus: "picked_up",
    pickedUpAt: "Rescued in 38m",
    foodAge: "Harvested yesterday",
    allergens: [],
  },
];

const INITIAL_NOTIFICATIONS: FoodNotification[] = [
  {
    id: "notif-1",
    title: "Pickup request: 5 fresh eggs",
    message: "Dev claimed your 5 fresh eggs for the 4:00 PM slot. Address has been released for pickup.",
    time: "10m ago",
    read: false,
    type: "pickup",
    category: "donation",
    actionLabel: "Manage pickup",
  },
  {
    id: "notif-2",
    title: "5 interested neighbors",
    message: "Your donation 5 eggs has 5 neighbors interested. Coordinate scheduling before it expires.",
    time: "1h ago",
    read: false,
    type: "interest",
    category: "donation",
    actionLabel: "View donation",
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

  // Core Data States
  const [nearbyList, setNearbyList] = useState<NearbyFood[]>(INITIAL_NEARBY);
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  const [notifications, setNotifications] = useState<FoodNotification[]>(INITIAL_NOTIFICATIONS);

  // Active Flow Overlays & Modals
  const [nearbyItem, setNearbyItem] = useState<NearbyFood | null>(null);
  const [donationItem, setDonationItem] = useState<Donation | null>(null);
  const [selectedNotif, setSelectedNotif] = useState<FoodNotification | null>(null);
  const [composing, setComposing] = useState(false);
  const [claimHandoff, setClaimHandoff] = useState<{ food: NearbyFood; slot: string } | null>(null);

  // Phone Verification State (BRD Requirement)
  const [isUserVerified, setIsUserVerified] = useState(true);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [pendingVerificationAction, setPendingVerificationAction] = useState<(() => void) | null>(null);

  const [notice, setNotice] = useState<string | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const nearbyVisible = useMemo(() => {
    return query.trim()
      ? nearbyList.filter((item) => matches(item.title + " " + item.area + " " + item.host, query))
      : nearbyList;
  }, [nearbyList, query]);

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
    setClaimHandoff(null);
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

  // Verification helper
  function triggerPhoneVerification(onSuccess: () => void) {
    setPendingVerificationAction(() => onSuccess);
    setShowPhoneModal(true);
  }

  function onPhoneVerified() {
    setIsUserVerified(true);
    setShowPhoneModal(false);
    setNotice("✓ Phone verified successfully! Basic accountability enabled.");
    if (pendingVerificationAction) {
      pendingVerificationAction();
      setPendingVerificationAction(null);
    }
  }

  // Claim Flow Handler (Browse -> Risk Acknowledgment -> Claim Handoff)
  function handleClaimFood(food: NearbyFood, slot: string) {
    // 1. Mark item as claimed in nearby list
    setNearbyList((prev) =>
      prev.map((item) =>
        item.id === food.id
          ? { ...item, status: "claimed", badge: "Claimed", claimedBy: "You", claimedSlot: slot }
          : item,
      ),
    );

    // 2. Close detail sheet and open Handoff Screen
    setNearbyItem(null);
    setClaimHandoff({ food, slot });

    // 3. Generate push notifications for donor and claimer (BRD requirement)
    setNotifications((prev) => [
      {
        id: `notif-claim-${Date.now()}`,
        title: `Claim confirmed: ${food.title}`,
        message: `Pickup confirmed for ${slot} at ${food.address}. Coordinate on WhatsApp.`,
        time: "Just now",
        read: false,
        type: "pickup",
        category: "food_nearby",
      },
      ...prev,
    ]);

    setNotice(`🎉 You claimed ${food.title}! Address and WhatsApp coordination unlocked.`);
  }

  // Pickup Confirmation (Claimer or Donor records "Picked up")
  function handleMarkPickedUp(foodId: string, title: string) {
    // Update nearby list
    setNearbyList((prev) =>
      prev.map((item) =>
        item.id === foodId ? { ...item, status: "picked_up", badge: "Picked up" } : item,
      ),
    );

    // Update donations list if it belongs to donor
    setDonations((prev) =>
      prev.map((item) =>
        item.id === foodId || item.title.includes(title)
          ? { ...item, status: "closed", claimStatus: "picked_up", pickedUpAt: "Rescued in 42m" }
          : item,
      ),
    );

    setClaimHandoff(null);
    setDonationItem(null);

    // Add milestone notification
    setNotifications((prev) => [
      {
        id: `notif-pickup-${Date.now()}`,
        title: "Food rescue complete!",
        message: `${title} was successfully picked up and rescued within the 60m neighborhood target.`,
        time: "Just now",
        read: false,
        type: "system",
        category: "food_nearby",
      },
      ...prev,
    ]);

    setNotice(`✓ "${title}" marked as picked up! Food waste prevented 🎉`);
  }

  // Cancel / Release Claim (Edge state)
  function handleCancelClaim(foodId: string, title: string) {
    setNearbyList((prev) =>
      prev.map((item) =>
        item.id === foodId ? { ...item, status: "available", badge: "Available now", claimedBy: undefined } : item,
      ),
    );
    setClaimHandoff(null);
    setNotice(`Claim cancelled for ${title}. Item released back to nearby neighbors.`);
  }

  // Create Listing Handler (Supply side)
  function handlePublishDonation(data: {
    title: string;
    foodAge: string;
    preparedDaysAgo: number;
    keptRefrigerated: boolean;
    allergens: string[];
    pickupType: "immediate" | "scheduled";
    slotLabel: string;
  }) {
    const newId = `donation-${Date.now()}`;
    const newDonation: Donation = {
      id: newId,
      title: data.title,
      image: "/food/eggs.png",
      status: "open",
      interested: 0,
      claimStatus: "unclaimed",
      timeLeft: data.pickupType === "immediate" ? "60m left" : "Today 6:00 PM",
      foodAge: data.foodAge,
      allergens: data.allergens,
    };

    const newNearby: NearbyFood = {
      id: newId,
      title: data.title,
      distance: "0.1 miles",
      area: "Granja Viana",
      host: "Karina Somers",
      hostPhone: "+55 11 98877-6655",
      hostVerified: true,
      image: "/food/eggs.png",
      badge: data.pickupType === "immediate" ? "Available now" : "Needs scheduling",
      timeLeft: data.pickupType === "immediate" ? "60m left" : "Available today",
      minutesLeft: 60,
      foodAge: data.foodAge,
      preparedDaysAgo: data.preparedDaysAgo,
      keptRefrigerated: data.keptRefrigerated,
      allergens: data.allergens,
      address: "Rua das Acácias, 142, Apt 4B - Granja Viana",
      pickupType: data.pickupType,
      slots: data.pickupType === "scheduled" ? [{ id: "slot-new", label: data.slotLabel }] : undefined,
      status: "available",
    };

    setDonations((prev) => [newDonation, ...prev]);
    setNearbyList((prev) => [newNearby, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-new-${Date.now()}`,
        title: "New donation live",
        message: `Your listing for "${data.title}" is now visible to nearby neighbors for pickup.`,
        time: "Just now",
        read: false,
        type: "system",
        category: "donation",
      },
      ...prev,
    ]);

    setComposing(false);
    setTab("open");
    setNotice(`"${data.title}" is now live for neighbor pickup!`);
  }

  const donationCountLabel =
    tab === "closed" ? "closed donations" : tab === "all" ? "donations" : "open donations";
  const donationCount = String(
    donations.filter((item) => (tab === "all" ? true : item.status === tab)).length,
  ).padStart(2, "0");

  // Dynamic Modals & Sheets Overlay
  const overlay = claimHandoff ? (
    <ClaimHandoffSheet
      food={claimHandoff.food}
      selectedSlot={claimHandoff.slot}
      onClose={() => setClaimHandoff(null)}
      onMarkPickedUp={() => handleMarkPickedUp(claimHandoff.food.id, claimHandoff.food.title)}
      onCancelClaim={() => handleCancelClaim(claimHandoff.food.id, claimHandoff.food.title)}
    />
  ) : nearbyItem ? (
    <NearbyDetail
      item={nearbyItem}
      isUserVerified={isUserVerified}
      onClose={() => setNearbyItem(null)}
      onClaim={(slot) => handleClaimFood(nearbyItem, slot)}
      onNeedsVerification={() =>
        triggerPhoneVerification(() => handleClaimFood(nearbyItem, "Immediate (Next 60 min)"))
      }
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
      onMarkPickedUp={() => handleMarkPickedUp(donationItem.id, donationItem.title)}
    />
  ) : composing ? (
    <NewDonationSheet
      onClose={() => setComposing(false)}
      isUserVerified={isUserVerified}
      onPublish={handlePublishDonation}
      onNeedsVerification={() => triggerPhoneVerification(() => {})}
    />
  ) : showPhoneModal ? (
    <PhoneVerificationModal
      onClose={() => setShowPhoneModal(false)}
      onVerified={onPhoneVerified}
    />
  ) : selectedNotif ? (
    <NotificationDetail
      item={selectedNotif}
      onClose={() => setSelectedNotif(null)}
      onAction={() => {
        markNotificationRead(selectedNotif.id);
        if (selectedNotif.category === "donation") {
          switchScreen("donations");
          setTab("open");
        } else {
          switchScreen("nearby");
        }
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
          onCreate={() => setComposing(true)}
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
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, padding: 24, paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>Hi, Kari</h1>
          <KariAvatar aria-label="Kari profile" style={{ width: 36, height: 36 }} />
        </div>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>
          Enjoy fresh food before it goes to the bin.
        </p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 16, paddingInline: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600, whiteSpace: "nowrap" }}>
              {query.trim()
                ? `${String(items.length).padStart(2, "0")} matches`
                : `${String(items.length).padStart(2, "0")} options nearby`}
            </h2>
            <SearchField open={searchOpen} onToggle={onToggleSearch} />
          </div>
          <SearchSlot open={searchOpen} query={query} onToggle={onToggleSearch} onQuery={onQuery} />
        </div>

        {notice ? <Notice>{notice}</Notice> : null}

        {items.length === 0 ? (
          <Empty>No food nearby matches your search.</Empty>
        ) : (
          items.map((item) => <NearbyCard key={item.id} item={item} onOpen={onOpen} />)
        )}
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
  onCreate,
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
  onCreate?: () => void;
}) {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, padding: 24, paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>My donations</h1>
          <KariAvatar aria-label="Kari profile" style={{ width: 36, height: 36 }} />
        </div>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>
          Manage your shared food and coordinate neighbor pickups.
        </p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 16, paddingInline: 24 }}>
        <DonationTabs value={tab} onChange={onTab} />
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600, whiteSpace: "nowrap" }}>
              {query.trim() ? `${String(items.length).padStart(2, "0")} matches` : countLabel}
            </h2>
            <SearchField open={searchOpen} onToggle={onToggleSearch} />
          </div>
          <SearchSlot open={searchOpen} query={query} onToggle={onToggleSearch} onQuery={onQuery} />
        </div>

        {notice ? <Notice>{notice}</Notice> : null}

        {items.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", paddingBlock: 24 }}>
            <Empty>No {tab} donations yet.</Empty>
            {onCreate ? (
              <button
                type="button"
                onClick={onCreate}
                style={{
                  border: "none",
                  background: "var(--color-action-primary, #dc2b10)",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Share surplus food
              </button>
            ) : null}
          </div>
        ) : (
          items.map((item) => <ListingCard key={item.id} item={item} onOpen={onOpen} />)
        )}
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
  onFilter: (filter: "all" | "unread") => void;
  onMarkAllRead: () => void;
  onToggleSearch: () => void;
  onQuery: (value: string) => void;
  onOpen: (item: FoodNotification) => void;
}) {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, padding: 24, paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>Notifications</h1>
          <KariAvatar aria-label="Kari profile" style={{ width: 36, height: 36 }} />
        </div>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>
          Stay updated on reservations and pickups.
        </p>

        {/* Filter and Mark Read actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          <div role="tablist" aria-label="Notification filter" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span role="tab" aria-selected={filter === "all"} onClick={() => onFilter("all")}>
              <Chip label="All" selected={filter === "all" ? "True" : "False"} />
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
                color: "var(--color-action-primary, #dc2b10)",
                fontSize: "var(--font-size-body-sm)",
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
                        background: item.read
                          ? "var(--color-background-muted, #f2f2f6)"
                          : "var(--color-background-brand-subtle, #ffedec)",
                        color: item.read
                          ? "var(--color-text-secondary, #5c5c63)"
                          : "var(--color-action-primary, #dc2b10)",
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

function Empty({ children }: { children: ReactNode }) {
  return <div style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>{children}</div>;
}
