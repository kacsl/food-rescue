"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Chip } from "valere-DS";
import { KariAvatar } from "@/components/ds/avatar";
import {
  AllergiesPage,
  INITIAL_PROFILE,
  ProfileDataPage,
  ProfileMenu,
  type ProfileRecord,
} from "@/components/food/profile";
import { ListingCard, NearbyCard, type Donation, type NearbyFood } from "@/components/food/cards";
import { PhoneFrame, type FoodScreen } from "@/components/food/phone-frame";
import { SplashScreen } from "@/components/food/splash-screen";
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
import { LoggedOutHome, LoginScreen, SignUpScreen } from "@/components/food/auth-screens";
import {
  clearFoodSession,
  GOOGLE_PROTOTYPE_SESSION,
  readFoodSession,
  writeFoodSession,
  type FoodSession,
} from "@/components/food/auth-session";

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
  const [showSplash, setShowSplash] = useState(true);
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
  const [profile, setProfile] = useState<ProfileRecord>(INITIAL_PROFILE);
  const [profileView, setProfileView] = useState<null | "menu" | "data" | "allergies">(null);
  const [session, setSession] = useState<FoodSession | null>(null);
  const [authView, setAuthView] = useState<"home" | "login" | "signup">("home");

  useEffect(() => {
    const stored = readFoodSession();
    if (!stored) return;
    setSession(stored);
    setProfile((current) => ({ ...current, name: stored.name, email: stored.email, password: stored.password }));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const nearbyVisible = useMemo(() => {
    const searched = query.trim()
      ? nearbyList.filter((item) => matches(item.title + " " + item.area + " " + item.host, query))
      : nearbyList;
    return profile.hideMatchingAllergies
      ? searched.filter((item) => !item.allergens.some((allergen) => profile.allergies.includes(allergen)))
      : searched;
  }, [nearbyList, query, profile.allergies, profile.hideMatchingAllergies]);

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
    setProfileView(null);
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
    image?: string;
    foodAge: string;
    preparedDaysAgo: number;
    keptRefrigerated: boolean;
    packagingType?: "packaged" | "unpackaged";
    expirationInfo?: string;
    allergens: string[];
    pickupType: "immediate" | "scheduled";
    slotLabel: string;
  }) {
    const newId = `donation-${Date.now()}`;
    const listingImage = data.image || "/food/eggs.png";
    const newDonation: Donation = {
      id: newId,
      title: data.title,
      image: listingImage,
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
      image: listingImage,
      badge: data.pickupType === "immediate" ? "Available now" : "Needs scheduling",
      timeLeft: data.pickupType === "immediate" ? "60m left" : "Available today",
      minutesLeft: 60,
      foodAge: data.foodAge,
      preparedDaysAgo: data.preparedDaysAgo,
      keptRefrigerated: data.keptRefrigerated,
      packagingType: data.packagingType,
      expirationInfo: data.expirationInfo,
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

  // Dynamic Modals & Sheets Overlay
  const modalOverlay = showPhoneModal ? (
    <PhoneVerificationModal
      onClose={() => setShowPhoneModal(false)}
      onVerified={onPhoneVerified}
    />
  ) : claimHandoff ? (
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

  const loggedIn = Boolean(session);

  function enterSession(next: FoodSession) {
    writeFoodSession(next);
    setSession(next);
    setProfile({ ...INITIAL_PROFILE, name: next.name, email: next.email, password: next.password });
    setAuthView("home");
    setScreen("nearby");
    setProfileView(null);
  }

  function logout() {
    clearFoodSession();
    setSession(null);
    setProfile(INITIAL_PROFILE);
    setProfileView(null);
    setAuthView("home");
    setScreen("nearby");
    setNearbyItem(null);
    setDonationItem(null);
    setSelectedNotif(null);
    setComposing(false);
    setClaimHandoff(null);
    setNotice(null);
  }

  const overlay = (
    <>
      {loggedIn ? modalOverlay : null}
      {showSplash ? <SplashScreen onComplete={() => setShowSplash(false)} /> : null}
    </>
  );

  return (
    <PhoneFrame
      screen={screen}
      onScreen={switchScreen}
      notificationCount={unreadCount}
      showCreate={loggedIn && screen === "donations" && donationVisible.length > 0 && !profileView && !composing}
      onCreate={() => setComposing(true)}
      hideNav={!loggedIn || Boolean(profileView || composing)}
      hideBlobs={loggedIn && Boolean(profileView || composing)}
      gateBlobs={!loggedIn}
      contentKey={loggedIn ? screen : authView}
      overlay={overlay}
    >
      {!loggedIn ? (
        authView === "login" ? (
          <LoginScreen onBack={() => setAuthView("home")} onSwitch={() => setAuthView("signup")} onSuccess={enterSession} />
        ) : authView === "signup" ? (
          <SignUpScreen onBack={() => setAuthView("home")} onSwitch={() => setAuthView("login")} onSuccess={enterSession} />
        ) : (
          <LoggedOutHome
            onCreateAccount={() => setAuthView("signup")}
            onLogIn={() => setAuthView("login")}
            onGoogle={() => enterSession(GOOGLE_PROTOTYPE_SESSION)}
          />
        )
      ) : composing ? (
        <NewDonationSheet
          onClose={() => setComposing(false)}
          isUserVerified={isUserVerified}
          onPublish={handlePublishDonation}
          onNeedsVerification={() => triggerPhoneVerification(() => {})}
        />
      ) : profileView === "menu" ? (
        <ProfileMenu
          profile={profile}
          onClose={() => setProfileView(null)}
          onOpenData={() => setProfileView("data")}
          onOpenAllergies={() => setProfileView("allergies")}
          onPhotoChange={(photo) => setProfile((current) => ({ ...current, photo }))}
          onLogout={logout}
        />
      ) : profileView === "data" ? (
        <ProfileDataPage
          profile={profile}
          onBack={() => setProfileView("menu")}
          onSave={(next) => setProfile((current) => ({ ...current, ...next }))}
        />
      ) : profileView === "allergies" ? (
        <AllergiesPage
          profile={profile}
          onBack={() => setProfileView("menu")}
          onSave={(next) => setProfile((current) => ({ ...current, ...next }))}
        />
      ) : screen === "nearby" ? (
        <NearbyView
          items={nearbyVisible}
          query={query}
          searchOpen={searchOpen}
          notice={notice}
          onToggleSearch={toggleSearch}
          onQuery={setQuery}
          onOpen={setNearbyItem}
          onOpenProfile={() => setProfileView("menu")}
          displayName={profile.name}
        />
      ) : screen === "donations" ? (
        <DonationsView
          items={donationVisible}
          tab={tab}
          notice={notice}
          onTab={setTab}
          onOpen={setDonationItem}
          onCreate={() => setComposing(true)}
        />
      ) : (
        <NotificationsView
          items={notificationsVisible}
          filter={notifFilter}
          unreadCount={unreadCount}
          notice={notice}
          onFilter={setNotifFilter}
          onMarkAllRead={markAllNotificationsRead}
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
  onOpenProfile,
  displayName,
}: {
  items: NearbyFood[];
  query: string;
  searchOpen: boolean;
  notice: string | null;
  onToggleSearch: () => void;
  onQuery: (value: string) => void;
  onOpen: (item: NearbyFood) => void;
  onOpenProfile: () => void;
  displayName: string;
}) {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, padding: 24, paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>Hi, {displayName}</h1>
          <KariAvatar aria-label="Open profile" onClick={onOpenProfile} style={{ width: 36, height: 36 }} />
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
  tab,
  notice,
  onTab,
  onOpen,
  onCreate,
}: {
  items: Donation[];
  tab: DonationTab;
  notice: string | null;
  onTab: (tab: DonationTab) => void;
  onOpen: (item: Donation) => void;
  onCreate?: () => void;
}) {
  const emptyCopy =
    tab === "open" ? "No open donations yet." : tab === "closed" ? "No closed donations yet." : "No donations yet.";

  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, padding: 24, paddingBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>My donations</h1>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 16, paddingInline: 24 }}>
        <DonationTabs value={tab} onChange={onTab} />

        {notice ? <Notice>{notice}</Notice> : null}

        {items.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", paddingBlock: 24 }}>
            <Empty>{emptyCopy}</Empty>
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
                Share surplus food
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
  notice,
  onFilter,
  onMarkAllRead,
  onOpen,
}: {
  items: FoodNotification[];
  filter: "all" | "unread";
  unreadCount: number;
  notice: string | null;
  onFilter: (filter: "all" | "unread") => void;
  onMarkAllRead: () => void;
  onOpen: (item: FoodNotification) => void;
}) {
  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, padding: 24, paddingBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>Notifications</h1>

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
                color: "var(--color-text-secondary)",
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
        {notice ? <Notice>{notice}</Notice> : null}

        {items.length === 0 ? (
          <Empty>{filter === "unread" ? "No unread notifications." : "No notifications."}</Empty>
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
                  background: "rgba(255, 255, 255, 0.45)",
                  border: "1px solid var(--color-border-subtle, #e6e7ed)",
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
                        background: "var(--color-background-muted, #f2f2f6)",
                        color: "var(--color-text-secondary, #5c5c63)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isDonation ? (
                        <span style={{ transform: "scale(0.75)", display: "inline-flex" }}>
                          <BagNavIcon selected={false} />
                        </span>
                      ) : (
                        <span style={{ transform: "scale(0.75)", display: "inline-flex" }}>
                          <StoreNavIcon selected={false} />
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
  const [focused, setFocused] = useState(true);
  if (!props.open) return null;
  return (
    <input
      autoFocus
      value={props.query}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
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
        border: focused
          ? "var(--border-emphasis, 1.5px) solid var(--color-border-focus)"
          : "1px solid var(--color-border-subtle)",
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
