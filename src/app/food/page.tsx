"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Chip } from "valere-DS";
import { KariAvatar } from "@/components/ds/avatar";
import {
  AddressPage,
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
  type ClaimSheetMode,
  type DonationTab,
  type FoodNotification,
} from "@/components/food/panels";
import { StoreNavIcon, BagNavIcon } from "@/components/ds/bottom-nav";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LoggedOutHome, LoginScreen, SignUpScreen } from "@/components/food/auth-screens";
import { FoodToastProvider, FoodToastViewport, useFoodToast } from "@/components/food/food-toast";
import {
  DonationsFeedSkeleton,
  NearbyFeedSkeleton,
  NotificationsFeedSkeleton,
} from "@/components/food/feed-skeletons";
import { SearchEmptyState } from "@/components/food/search-empty-state";
import {
  clearFoodSession,
  GOOGLE_PROTOTYPE_SESSION,
  readFoodSession,
  writeFoodSession,
  type FoodSession,
} from "@/components/food/auth-session";

const FEED_LOAD_MS = 720;

function useMainFeedLoading(active: boolean, screen: FoodScreen) {
  const [loading, setLoading] = useState(active);

  useEffect(() => {
    if (!active) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), FEED_LOAD_MS);
    return () => window.clearTimeout(timer);
  }, [active, screen]);

  return loading;
}

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
    allergens: ["Soy"],
    address: "Via das Margaridas, 123 - Granja Viana",
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
    address: "Via das Margaridas, 123 - Granja Viana",
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
    keptRefrigerated: true,
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
    keptRefrigerated: true,
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
    keptRefrigerated: false,
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

function donationSectionTitle(tab: DonationTab, count: number) {
  const padded = String(count).padStart(2, "0");
  if (tab === "open") return `${padded} open donations`;
  if (tab === "closed") return `${padded} closed donations`;
  return `${padded} donations`;
}

export default function FoodPage() {
  return (
    <FoodToastProvider>
      <FoodApp />
    </FoodToastProvider>
  );
}

function FoodApp() {
  const { showToast, dismissToast } = useFoodToast();
  const [showSplash, setShowSplash] = useState(true);
  const [splashRevealing, setSplashRevealing] = useState(false);

  const handleSplashFadeStart = useCallback(() => setSplashRevealing(true), []);
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setSplashRevealing(false);
  }, []);
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
  const [claimHandoff, setClaimHandoff] = useState<{ food: NearbyFood; slot: string; mode: ClaimSheetMode } | null>(null);

  // Phone Verification State (BRD Requirement)
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [pendingVerificationAction, setPendingVerificationAction] = useState<(() => void) | null>(null);

  const [profile, setProfile] = useState<ProfileRecord>(INITIAL_PROFILE);
  const [profileView, setProfileView] = useState<null | "menu" | "data" | "address" | "allergies">(null);
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
    showToast({ tone: "Success", title: "All notifications marked as read" });
  }

  // Verification helper
  function triggerPhoneVerification(onSuccess: () => void) {
    setPendingVerificationAction(() => onSuccess);
    setShowPhoneModal(true);
  }

  function onPhoneVerified() {
    setIsUserVerified(true);
    setShowPhoneModal(false);
    showToast({ tone: "Success", title: "Phone verified", body: "Basic accountability enabled." });
    if (pendingVerificationAction) {
      pendingVerificationAction();
      setPendingVerificationAction(null);
    }
  }

  // Claim Flow Handler (Browse -> Risk Acknowledgment -> Claim Handoff)
  function handleClaimFood(food: NearbyFood, slot: string) {
    const updatedFood: NearbyFood = {
      ...food,
      status: "claimed",
      badge: "Claimed",
      claimedBy: "You",
      claimedSlot: slot,
    };

    // 1. Mark item as claimed in nearby list
    setNearbyList((prev) =>
      prev.map((item) => (item.id === food.id ? updatedFood : item)),
    );

    // 2. Close detail sheet and open Requested Handoff Screen (no toast)
    setNearbyItem(null);
    setClaimHandoff({ food: updatedFood, slot, mode: "requested" });

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
  }

  function handleOpenNearbyFood(item: NearbyFood) {
    if (item.status === "claimed") {
      setClaimHandoff({
        food: item,
        slot:
          item.claimedSlot ||
          (item.pickupType === "immediate"
            ? "Immediate pickup"
            : item.slots?.[0]?.label || "Immediate pickup"),
        mode: "claimed",
      });
      return;
    }
    setNearbyItem(item);
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

    showToast({ tone: "Success", title: `${title} marked as picked up`, body: "Food waste prevented." });
  }

  // Cancel / Release Claim (Edge state)
  function handleCancelClaim(foodId: string, title: string) {
    setNearbyList((prev) =>
      prev.map((item) =>
        item.id === foodId
          ? {
              ...item,
              status: "available",
              badge: item.pickupType === "scheduled" ? "Needs scheduling" : "Available now",
              claimedBy: undefined,
              claimedSlot: undefined,
            }
          : item,
      ),
    );
    setClaimHandoff(null);
    showToast({
      tone: "Info",
      title: `Claim cancelled for ${title}`,
      body: "Item released back to nearby neighbors.",
    });
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
    slotLabels?: string[];
  }) {
    const newId = `donation-${Date.now()}`;
    const listingImage = data.image || "/food/eggs.png";
    const resolvedSlots =
      data.pickupType === "scheduled"
        ? (data.slotLabels && data.slotLabels.length > 0 ? data.slotLabels : [data.slotLabel]).map((label, index) => ({
            id: `slot-new-${index + 1}`,
            label,
          }))
        : undefined;

    const newDonation: Donation = {
      id: newId,
      title: data.title,
      image: listingImage,
      status: "open",
      interested: 0,
      claimStatus: "unclaimed",
      timeLeft: data.pickupType === "immediate" ? "60m left" : resolvedSlots?.[0]?.label ?? "Today 6:00 PM",
      foodAge: data.foodAge,
      keptRefrigerated: data.keptRefrigerated,
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
      slots: resolvedSlots,
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
    if (!isUserVerified) {
      setShowPhoneModal(true);
      return;
    }
    showToast({ tone: "Success", title: `${data.title} is live`, body: "Neighbors nearby can claim it now." });
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
      mode={claimHandoff.mode}
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
      onAcceptClaim={() => {
        const updated: Donation = { ...donationItem, claimAccepted: true };
        setDonations((current) =>
          current.map((item) => (item.id === donationItem.id ? updated : item)),
        );
        setDonationItem(updated);
        showToast({
          tone: "Success",
          title: "Claim accepted",
          body: "Your pickup location will be shared with the claimer.",
          position: "top",
        });
      }}
      onToggleStatus={() => {
        const nextStatus = donationItem.status === "open" ? "closed" : "open";
        setDonations((current) =>
          current.map((item) =>
            item.id === donationItem.id ? { ...item, status: nextStatus } : item,
          ),
        );
        showToast({
          tone: "Success",
          title:
            nextStatus === "closed"
              ? `${donationItem.title} marked as picked up`
              : `${donationItem.title} is open again`,
        });
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
  const feedLoading = useMainFeedLoading(loggedIn, screen);

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
    setIsUserVerified(false);
    setShowPhoneModal(false);
    dismissToast();
  }

  const showCreate = loggedIn && screen === "donations" && donationVisible.length > 0 && !profileView && !composing;
  const createButtonVisible = showCreate && !modalOverlay;

  const overlay = (
    <>
      {loggedIn ? modalOverlay : null}
      {showSplash ? (
        <SplashScreen onFadeStart={handleSplashFadeStart} onComplete={handleSplashComplete} />
      ) : null}
      <FoodToastViewport raised={createButtonVisible} />
    </>
  );

  return (
    <PhoneFrame
      screen={screen}
      onScreen={switchScreen}
      notificationCount={unreadCount}
      showCreate={showCreate}
      onCreate={() => setComposing(true)}
      hideNav={!loggedIn || Boolean(profileView || composing)}
      hideBlobs={
        (!loggedIn && authView === "home") || (loggedIn && Boolean(profileView || composing))
      }
      gateBlobs={!loggedIn && authView !== "home"}
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
            revealPanel={splashRevealing || !showSplash}
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
          onOpenAddress={() => setProfileView("address")}
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
      ) : profileView === "address" ? (
        <AddressPage
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
          loading={feedLoading}
          query={query}
          searchOpen={searchOpen}
          onToggleSearch={toggleSearch}
          onQuery={setQuery}
          onOpen={handleOpenNearbyFood}
          onOpenProfile={() => setProfileView("menu")}
          displayName={profile.name}
        />
      ) : screen === "donations" ? (
        <DonationsView
          items={donationVisible}
          loading={feedLoading}
          query={query}
          searchOpen={searchOpen}
          onToggleSearch={toggleSearch}
          onQuery={setQuery}
          tab={tab}
          onTab={setTab}
          onOpen={setDonationItem}
          onCreate={() => setComposing(true)}
        />
      ) : (
        <NotificationsView
          items={notificationsVisible}
          loading={feedLoading}
          filter={notifFilter}
          unreadCount={unreadCount}
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
  loading,
  query,
  searchOpen,
  onToggleSearch,
  onQuery,
  onOpen,
  onOpenProfile,
  displayName,
}: {
  items: NearbyFood[];
  loading?: boolean;
  query: string;
  searchOpen: boolean;
  onToggleSearch: () => void;
  onQuery: (value: string) => void;
  onOpen: (item: NearbyFood) => void;
  onOpenProfile: () => void;
  displayName: string;
}) {
  const searchNoResults = Boolean(query.trim() && !loading && items.length === 0);

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
          <div style={{ display: "flex", alignItems: "center", justifyContent: searchNoResults ? "flex-end" : "space-between" }}>
            {!searchNoResults ? (
              <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600, whiteSpace: "nowrap" }}>
                {loading
                  ? "Loading nearby…"
                  : query.trim()
                    ? `${String(items.length).padStart(2, "0")} matches`
                    : `${String(items.length).padStart(2, "0")} options nearby`}
              </h2>
            ) : null}
            <SearchField open={searchOpen} onToggle={onToggleSearch} />
          </div>
          <SearchSlot open={searchOpen} query={query} onToggle={onToggleSearch} onQuery={onQuery} />
        </div>

        {loading ? (
          <NearbyFeedSkeleton />
        ) : items.length === 0 && query.trim() ? (
          <SearchEmptyState onClear={() => onQuery("")} />
        ) : items.length === 0 ? (
          <Empty>No food nearby right now. Check back soon.</Empty>
        ) : (
          items.map((item) => <NearbyCard key={item.id} item={item} onOpen={onOpen} />)
        )}
      </section>
    </>
  );
}

function DonationsView({
  items,
  loading,
  query,
  searchOpen,
  onToggleSearch,
  onQuery,
  tab,
  onTab,
  onOpen,
  onCreate,
}: {
  items: Donation[];
  loading?: boolean;
  query: string;
  searchOpen: boolean;
  onToggleSearch: () => void;
  onQuery: (value: string) => void;
  tab: DonationTab;
  onTab: (tab: DonationTab) => void;
  onOpen: (item: Donation) => void;
  onCreate?: () => void;
}) {
  const emptyCopy =
    tab === "open" ? "No open donations yet." : tab === "closed" ? "No closed donations yet." : "No donations yet.";
  const searchNoResults = Boolean(query.trim() && !loading && items.length === 0);

  return (
    <>
      <header style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24, paddingBottom: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>My donations</h1>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>
            Turn extra food into instant impact.
          </p>
          <DonationTabs value={tab} onChange={onTab} />
        </div>
      </header>

      <section className="food-donations-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: searchNoResults ? "flex-end" : "space-between",
            width: "100%",
          }}
        >
          {!searchNoResults ? (
            <h2
              style={{
                margin: 0,
                fontSize: "var(--font-size-body-base, 16px)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Loading donations…" : donationSectionTitle(tab, items.length)}
            </h2>
          ) : null}
          <SearchField open={searchOpen} onToggle={onToggleSearch} />
        </div>

        {searchOpen ? (
          <SearchSlot open={searchOpen} query={query} onToggle={onToggleSearch} onQuery={onQuery} compact />
        ) : null}

        {loading ? (
          <DonationsFeedSkeleton />
        ) : items.length === 0 && query.trim() ? (
          <SearchEmptyState onClear={() => onQuery("")} />
        ) : items.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", paddingBlock: 24 }}>
            <Empty>{emptyCopy}</Empty>
            {onCreate ? (
              <button
                type="button"
                onClick={onCreate}
                style={{
                  border: "none",
                  background: "var(--color-action-primary, #dc2b10)",
                  color: "var(--color-action-on-action)",
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
          <div className="food-donations-section__cards">
            {items.map((item) => (
              <ListingCard key={item.id} item={item} onOpen={onOpen} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function NotificationsView({
  items,
  loading,
  filter,
  unreadCount,
  onFilter,
  onMarkAllRead,
  onOpen,
}: {
  items: FoodNotification[];
  loading?: boolean;
  filter: "all" | "unread";
  unreadCount: number;
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
        {loading ? (
          <NotificationsFeedSkeleton />
        ) : items.length === 0 ? (
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
                  background: "var(--food-glass-strong-bg)",
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

function SearchSlot(props: {
  open: boolean;
  query: string;
  onToggle: () => void;
  onQuery: (value: string) => void;
  compact?: boolean;
}) {
  if (!props.open) return null;
  return (
    <div className={props.compact ? "food-search-slot food-search-slot--compact" : "food-search-slot"}>
      <input
        autoFocus
        className="food-search-slot__input"
        value={props.query}
        onChange={(event) => props.onQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") props.onToggle();
        }}
        placeholder="Search..."
        aria-label="Search"
      />
      {props.query ? (
        <button
          type="button"
          className="food-search-slot__clear"
          aria-label="Clear search"
          onClick={() => props.onQuery("")}
        >
          <XMarkIcon width={14} height={14} strokeWidth={2} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <div style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>{children}</div>;
}
