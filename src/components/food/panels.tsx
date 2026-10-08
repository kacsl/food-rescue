import { useState, type ReactNode } from "react";
import { Button, IconButton } from "valere-DS";
import type { Donation, NearbyFood } from "./cards";

export type DonationTab = "open" | "closed" | "all";

const TABS: { id: DonationTab; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "closed", label: "Closed" },
  { id: "all", label: "All" },
];

export function DonationTabs({ value, onChange }: { value: DonationTab; onChange: (tab: DonationTab) => void }) {
  return (
    <div role="tablist" aria-label="Donation status" style={{ display: "flex", width: "100%" }}>
      {TABS.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                paddingInline: 16,
                fontSize: "var(--font-size-body-sm)",
                fontWeight: 600,
                color: selected ? "var(--color-text-brand)" : "var(--color-text-secondary)",
              }}
            >
              {tab.label}
            </span>
            <span style={{ height: 2, background: selected ? "var(--color-action-primary)" : "var(--color-border-subtle)" }} />
          </button>
        );
      })}
      <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ height: 44 }} />
        <span style={{ height: 2, background: "var(--color-border-subtle)" }} />
      </span>
    </div>
  );
}

export function SearchField({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <IconButton
      variant="Ghost"
      size="XS"
      aria-label={open ? "Close search" : "Search"}
      aria-expanded={open}
      onClick={onToggle}
      icon={<img src="/food/search.svg" width={16} height={16} alt="" />}
    />
  );
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div
      role="presentation"
      className="food-sheet-backdrop"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 4,
        display: "flex",
        alignItems: "flex-end",
        background: "rgba(48, 48, 54, 0.32)",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="food-sheet-modal"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxHeight: "82%",
          overflow: "auto",
          padding: 24,
          paddingBottom: 108,
          borderTopLeftRadius: "var(--radius-card)",
          borderTopRightRadius: "var(--radius-card)",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 -8px 32px rgba(48, 48, 54, 0.16)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", fontWeight: 600 }}>{title}</h2>
          <IconButton variant="Ghost" size="XS" aria-label="Close" onClick={onClose} icon={<CloseMark />} />
        </div>
        {children}
      </div>
    </div>
  );
}

function CloseMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="#DC2B10" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NearbyDetail({ item, onClose, onReserve }: { item: NearbyFood; onClose: () => void; onReserve: () => void }) {
  return (
    <Sheet title={item.title} onClose={onClose}>
      <img src={item.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "var(--radius-card)" }} />
      <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)" }}>
        {item.distance} • {item.area}
      </p>
      <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>
        Shared by {item.host}. {item.badge}.
      </p>
      <Button variant="Primary" size="MD" label="Reserve this food" onClick={onReserve} style={{ width: "100%" }} />
    </Sheet>
  );
}

export function DonationDetail({
  item,
  onClose,
  onToggleStatus,
}: {
  item: Donation;
  onClose: () => void;
  onToggleStatus: () => void;
}) {
  const open = item.status === "open";
  return (
    <Sheet title={item.title} onClose={onClose}>
      <img src={item.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "var(--radius-card)" }} />
      <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>
        {open ? "Open donation" : "Closed donation"} ·{" "}
        {item.interested === 0 ? "No people interested yet" : `${item.interested} people interested`}
      </p>
      <Button variant="Primary" size="MD" label={open ? "Mark as picked up" : "Reopen donation"} onClick={onToggleStatus} style={{ width: "100%" }} />
    </Sheet>
  );
}

export function NewDonationSheet({ onClose, onPublish }: { onClose: () => void; onPublish: (title: string) => void }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function publish() {
    const next = title.trim();
    if (!next) {
      setError("Add a short name for the food.");
      return;
    }
    onPublish(next);
  }

  return (
    <Sheet title="New donation" onClose={onClose}>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: 600 }}>What are you sharing?</span>
        <input
          autoFocus
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          placeholder="5 eggs"
          aria-invalid={Boolean(error)}
          style={{
            height: 44,
            paddingInline: 16,
            borderRadius: "var(--radius-control)",
            border: `1px solid ${error ? "var(--color-status-error-border, #d7463c)" : "var(--color-border-subtle)"}`,
            font: "inherit",
            fontSize: "var(--font-size-body-base)",
            color: "var(--color-text-primary)",
          }}
        />
        {error ? <span style={{ fontSize: "var(--font-size-body-xs)", color: "#b8342c" }}>{error}</span> : null}
      </label>
      <Button variant="Primary" size="MD" label="Publish donation" onClick={publish} style={{ width: "100%" }} />
    </Sheet>
  );
}

export type FoodNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "pickup" | "interest" | "reminder" | "system";
  actionLabel?: string;
};

export function NotificationDetail({
  item,
  onClose,
  onAction,
}: {
  item: FoodNotification;
  onClose: () => void;
  onAction?: () => void;
}) {
  return (
    <Sheet title={item.title} onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontSize: "var(--font-size-body-xs)",
            color: "var(--color-text-secondary)",
            padding: "4px 8px",
            borderRadius: "9999px",
            background: "var(--color-background-muted)",
          }}
        >
          {item.time}
        </span>
        <span style={{ fontSize: "var(--font-size-body-xs)", color: item.read ? "var(--color-text-tertiary)" : "var(--color-action-primary)", fontWeight: 600 }}>
          {item.read ? "Read" : "New"}
        </span>
      </div>
      <p style={{ margin: 0, color: "var(--color-text-primary)", fontSize: "var(--font-size-body-base)", lineHeight: 1.5 }}>
        {item.message}
      </p>
      {item.actionLabel ? (
        <Button
          variant="Primary"
          size="MD"
          label={item.actionLabel}
          onClick={() => {
            onAction?.();
            onClose();
          }}
          style={{ width: "100%" }}
        />
      ) : (
        <Button variant="Outline" size="MD" label="Close" onClick={onClose} style={{ width: "100%" }} />
      )}
    </Sheet>
  );
}
