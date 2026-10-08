"use client";

import { useMemo, useState } from "react";
import { KariAvatar } from "@/components/ds/avatar";
import { ListingCard, NearbyCard, type Donation, type NearbyFood } from "@/components/food/cards";
import { PhoneFrame, type FoodScreen } from "@/components/food/phone-frame";
import { DonationDetail, DonationTabs, NearbyDetail, NewDonationSheet, SearchField, type DonationTab } from "@/components/food/panels";

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

function matches(title: string, query: string) {
  return title.toLowerCase().includes(query.trim().toLowerCase());
}

export default function FoodPage() {
  const [screen, setScreen] = useState<FoodScreen>("nearby");
  const [tab, setTab] = useState<DonationTab>("open");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [nearbyItem, setNearbyItem] = useState<NearbyFood | null>(null);
  const [donationItem, setDonationItem] = useState<Donation | null>(null);
  const [composing, setComposing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

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

  function switchScreen(next: FoodScreen) {
    setScreen(next);
    setQuery("");
    setSearchOpen(false);
    setNearbyItem(null);
    setDonationItem(null);
    setComposing(false);
    setNotice(null);
  }

  function toggleSearch() {
    setSearchOpen((open) => !open);
    setQuery("");
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
        setDonations((current) => current.map((item) => (item.id === donationItem.id ? { ...item, status: nextStatus } : item)));
        setNotice(nextStatus === "closed" ? `${donationItem.title} marked as picked up.` : `${donationItem.title} is open again.`);
        setDonationItem(null);
        if (nextStatus === "closed") setTab("closed");
        if (nextStatus === "open") setTab("open");
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
        setComposing(false);
        setTab("open");
        setNotice(`${title} is now an open donation.`);
      }}
    />
  ) : null;

  return (
    <PhoneFrame screen={screen} onScreen={switchScreen} showCreate={screen === "donations"} onCreate={() => setComposing(true)} overlay={overlay}>
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
      ) : (
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
            <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600 }}>{heading}</h2>
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
            <h2 style={{ margin: 0, fontSize: "var(--font-size-body-base)", fontWeight: 600 }}>{query.trim() ? `${String(items.length).padStart(2, "0")} matches` : countLabel}</h2>
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
      placeholder="Search food"
      aria-label="Search food"
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
