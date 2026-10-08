import { useState, type ReactNode } from "react";
import { Button, IconButton } from "valere-DS";
import type { Donation, NearbyFood } from "./cards";
import { StoreNavIcon, BagNavIcon } from "@/components/ds/bottom-nav";
import {
  ClockIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

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
            <span
              style={{
                height: 2,
                background: selected ? "var(--color-action-primary)" : "var(--color-border-subtle)",
              }}
            />
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

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
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
        background: "rgba(48, 48, 54, 0.4)",
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
          maxHeight: "86%",
          overflowY: "auto",
          padding: 24,
          paddingBottom: 112,
          borderTopLeftRadius: "var(--radius-card, 20px)",
          borderTopRightRadius: "var(--radius-card, 20px)",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 -8px 36px rgba(48, 48, 54, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: "var(--font-size-heading-lg, 20px)", fontWeight: 700, color: "var(--color-text-primary)" }}>
            {title}
          </h2>
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
      <path d="M4 4l8 8M12 4l-8 8" stroke="#DC2B10" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Flow 2: Browse and Claim Flow
 * Displays countdown timer, food's age, allergens, slot selection, and risk acknowledgment.
 */
export function NearbyDetail({
  item,
  isUserVerified,
  onClose,
  onClaim,
  onNeedsVerification,
}: {
  item: NearbyFood;
  isUserVerified: boolean;
  onClose: () => void;
  onClaim: (slot: string) => void;
  onNeedsVerification: () => void;
}) {
  const isExpired = item.status === "expired" || item.minutesLeft <= 0;
  const isClaimed = item.status === "claimed";
  const defaultSlot = item.slots && item.slots.length > 0 ? item.slots[0].label : "Immediate (Next 60 min)";
  const [selectedSlot, setSelectedSlot] = useState<string>(defaultSlot);
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);

  function handleClaimClick() {
    if (!riskAcknowledged) return;
    if (!isUserVerified) {
      onNeedsVerification();
      return;
    }
    onClaim(selectedSlot);
  }

  return (
    <Sheet title={item.title} onClose={onClose}>
      <div style={{ position: "relative", width: "100%", height: 180, borderRadius: "var(--radius-card, 16px)", overflow: "hidden" }}>
        <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        
        {/* Countdown Badge overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: "9999px",
            background: isExpired ? "rgba(117, 117, 125, 0.9)" : "rgba(220, 43, 16, 0.94)",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 700,
            boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
          }}
        >
          <ClockIcon width={14} height={14} strokeWidth={2.4} />
          <span>{isExpired ? "Expired" : `${item.timeLeft} for pickup`}</span>
        </div>
      </div>

      {/* Host & Location Info */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/food/karina.png"
            alt=""
            width={32}
            height={32}
            style={{ width: 32, height: 32, borderRadius: 9999, objectFit: "cover" }}
          />
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)" }}>
              {item.host}
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
              {item.distance} • {item.area}
            </div>
          </div>
        </div>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: "11px",
            fontWeight: 600,
            color: "#287d3c",
            background: "#edf7ee",
            padding: "4px 8px",
            borderRadius: "9999px",
          }}
        >
          <ShieldCheckIcon width={14} height={14} />
          <span>Phone Verified</span>
        </span>
      </div>

      {/* Freshness & Safety Card (BRD Requirement) */}
      <div
        style={{
          padding: 14,
          borderRadius: "12px",
          background: "var(--color-background-subtle, #f8f9fc)",
          border: "1px solid var(--color-border-subtle, #e6e7ed)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 6 }}>
          <ShieldCheckIcon width={16} height={16} color="var(--color-action-primary, #dc2b10)" />
          <span>Food Safety & Freshness Check</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: "12px" }}>
          <div>
            <span style={{ color: "var(--color-text-tertiary)", display: "block" }}>Cooked / Prepared:</span>
            <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{item.foodAge}</span>
          </div>
          <div>
            <span style={{ color: "var(--color-text-tertiary)", display: "block" }}>Refrigeration:</span>
            <span style={{ fontWeight: 600, color: "#287d3c" }}>✓ Continuous cold</span>
          </div>
        </div>

        <div>
          <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)", display: "block", marginBottom: 4 }}>
            Allergens:
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {item.allergens.length === 0 ? (
              <span
                style={{
                  fontSize: "11px",
                  background: "#edf7ee",
                  color: "#287d3c",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontWeight: 600,
                }}
              >
                No allergens declared
              </span>
            ) : (
              item.allergens.map((allergen) => (
                <span
                  key={allergen}
                  style={{
                    fontSize: "11px",
                    background: "var(--color-background-brand-subtle, #ffedec)",
                    color: "var(--color-text-brand, #be240c)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontWeight: 600,
                  }}
                >
                  {allergen}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pickup Slot Selection (BRD: immediate or scheduled slots) */}
      <div>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", display: "block", marginBottom: 8 }}>
          {item.pickupType === "immediate" ? "Pickup Window (Immediate)" : "Choose a Pickup Slot:"}
        </span>

        {item.pickupType === "immediate" ? (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              background: "#fff5f4",
              border: "1.5px solid var(--color-action-primary, #dc2b10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "16px" }}>⚡️</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                  Immediate Pickup (Next 60 min)
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                  Must be collected within 60m to prevent waste
                </div>
              </div>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-action-primary)" }}>
              Active
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(item.slots || [{ id: "slot-1", label: "Today 4:00 PM – 4:30 PM" }, { id: "slot-2", label: "Today 4:30 PM – 5:00 PM" }]).map((slot) => {
              const isSelected = selectedSlot === slot.label;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: isSelected
                      ? "1.5px solid var(--color-action-primary, #dc2b10)"
                      : "1px solid var(--color-border-subtle, #e6e7ed)",
                    background: isSelected ? "var(--color-background-brand-subtle, #ffedec)" : "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: isSelected ? 700 : 500, color: "var(--color-text-primary)" }}>
                    {slot.label}
                  </span>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 9999,
                      border: isSelected ? "5px solid var(--color-action-primary)" : "2px solid #b4b5bd",
                      background: "#fff",
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Address Unlock Notice */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "12px", color: "var(--color-text-secondary)" }}>
        <MapPinIcon width={16} height={16} color="var(--color-action-primary)" />
        <span>Exact pickup address & donor WhatsApp unlock immediately upon claiming.</span>
      </div>

      {/* Risk Acknowledgment Checkbox (BRD Mandate) */}
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "12px",
          borderRadius: "10px",
          background: riskAcknowledged ? "#fff5f4" : "var(--color-background-muted, #f2f2f6)",
          border: `1px solid ${riskAcknowledged ? "var(--color-action-primary)" : "var(--color-border-subtle)"}`,
          cursor: "pointer",
          transition: "all 0.18s ease",
        }}
      >
        <input
          type="checkbox"
          checked={riskAcknowledged}
          onChange={(e) => setRiskAcknowledged(e.target.checked)}
          style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--color-action-primary, #dc2b10)", cursor: "pointer" }}
        />
        <span style={{ fontSize: "12px", lineHeight: "17px", color: "var(--color-text-primary)" }}>
          <strong>Safety risk acknowledgment:</strong> I understand this food is prepared by a neighbor home cook. I agree to inspect freshness upon pickup and consume at my own discretion.
        </span>
      </label>

      {/* Action Button */}
      {isExpired ? (
        <Button variant="Secondary" size="MD" disabled label="Listing Expired" style={{ width: "100%" }} />
      ) : isClaimed ? (
        <Button variant="Secondary" size="MD" disabled label="Already Claimed by a Neighbor" style={{ width: "100%" }} />
      ) : (
        <Button
          variant="Primary"
          size="MD"
          disabled={!riskAcknowledged}
          label={
            !riskAcknowledged
              ? "Acknowledge risk above to claim"
              : item.pickupType === "immediate"
              ? "Claim for Immediate Pickup (60m)"
              : `Claim slot (${selectedSlot.split(" ")[0]}...)`
          }
          onClick={handleClaimClick}
          style={{ width: "100%" }}
        />
      )}
    </Sheet>
  );
}

/**
 * Flow 3: Pickup Handoff Screen (The Metric's Climax & Second Event)
 * Shows exact address, WhatsApp button, active timer, and "Mark as Picked Up".
 */
export function ClaimHandoffSheet({
  food,
  selectedSlot,
  onClose,
  onMarkPickedUp,
  onCancelClaim,
}: {
  food: NearbyFood;
  selectedSlot: string;
  onClose: () => void;
  onMarkPickedUp: () => void;
  onCancelClaim: () => void;
}) {
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    navigator.clipboard?.writeText(food.address || "Rua das Acácias, 142, Apt 4B - Granja Viana");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openWhatsApp() {
    const text = encodeURIComponent(
      `Hi ${food.host}! I just claimed your ${food.title} on Kari. I'm picking it up for the slot: ${selectedSlot}.`,
    );
    window.open(`https://wa.me/5511988776655?text=${text}`, "_blank");
  }

  return (
    <Sheet title="Food Claimed!" onClose={onClose}>
      {/* Celebration Banner */}
      <div
        style={{
          padding: "16px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #ffedec 0%, #fff7f6 100%)",
          border: "1.5px solid var(--color-action-primary, #dc2b10)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "28px" }}>🎉</span>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-primary)" }}>
            You&apos;re rescuing {food.title}!
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
            Pickup coordinated with {food.host}. Keep the 60m neighborhood goal!
          </div>
        </div>
      </div>

      {/* Address Card (Revealed after claim) */}
      <div
        style={{
          padding: 16,
          borderRadius: "12px",
          background: "#ffffff",
          border: "1px solid var(--color-border-subtle, #e6e7ed)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Pickup Address
          </span>
          <button
            type="button"
            onClick={copyAddress}
            style={{
              border: "none",
              background: "transparent",
              color: "var(--color-action-primary)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {copied ? "✓ Copied!" : "Copy address"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <MapPinIcon width={20} height={20} color="var(--color-action-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-primary)" }}>
              {food.address || "Rua das Acácias, 142, Apt 4B"}
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
              {food.area} • Ring buzzer 4B or message below
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Slot & Countdown */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          borderRadius: "10px",
          background: "var(--color-background-subtle, #f8f9fc)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ClockIcon width={18} height={18} color="var(--color-action-primary)" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Slot: {selectedSlot}
          </span>
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--color-action-primary)",
            background: "var(--color-background-brand-subtle)",
            padding: "2px 8px",
            borderRadius: "9999px",
          }}
        >
          45m left
        </span>
      </div>

      {/* WhatsApp Coordination Button (BRD Mandate) */}
      <button
        type="button"
        onClick={openWhatsApp}
        className="food-card-interactive"
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "12px",
          border: "none",
          background: "#25D366",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)",
        }}
      >
        <ChatBubbleLeftRightIcon width={18} height={18} />
        <span>Coordinate with {food.host} on WhatsApp</span>
      </button>

      {/* Mark as Picked Up Button (The Metric's Second Event) */}
      <Button
        variant="Primary"
        size="MD"
        label="✓ I Have Picked Up the Food"
        onClick={onMarkPickedUp}
        style={{ width: "100%", height: 48, fontSize: "15px" }}
      />

      <button
        type="button"
        onClick={onCancelClaim}
        style={{
          border: "none",
          background: "transparent",
          color: "var(--color-text-tertiary)",
          fontSize: "12px",
          cursor: "pointer",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        Can&apos;t make it? Release food so another neighbor can claim
      </button>
    </Sheet>
  );
}

/**
 * Flow 1: Create a Listing with Required Safety Fields & Pickup Slots
 * Strict 3-day rule poka-yoke, refrigeration confirmation, and pickup windows.
 */
export function NewDonationSheet({
  onClose,
  isUserVerified,
  onPublish,
  onNeedsVerification,
}: {
  onClose: () => void;
  isUserVerified: boolean;
  onPublish: (listing: {
    title: string;
    foodAge: string;
    preparedDaysAgo: number;
    keptRefrigerated: boolean;
    allergens: string[];
    pickupType: "immediate" | "scheduled";
    slotLabel: string;
  }) => void;
  onNeedsVerification: () => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"prepared" | "produce">("prepared");
  const [cookAgeDays, setCookAgeDays] = useState<number>(0);
  const [keptRefrigerated, setKeptRefrigerated] = useState(true);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [pickupType, setPickupType] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledSlot, setScheduledSlot] = useState("Today 4:00 PM – 5:30 PM");
  const [error, setError] = useState("");

  const fails3DayRule = category === "prepared" && cookAgeDays > 3;

  function toggleAllergen(name: string) {
    if (name === "None") {
      setAllergens([]);
      return;
    }
    setAllergens((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    );
  }

  function handlePublish() {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Add a clear title for the food.");
      return;
    }
    if (fails3DayRule) {
      setError("Food prepared more than 3 days ago cannot be shared.");
      return;
    }
    if (!keptRefrigerated) {
      setError("You must confirm the food was kept refrigerated.");
      return;
    }

    if (!isUserVerified) {
      onNeedsVerification();
      return;
    }

    onPublish({
      title: cleanTitle,
      foodAge: cookAgeDays === 0 ? "Cooked today" : `Cooked ${cookAgeDays} day${cookAgeDays > 1 ? "s" : ""} ago`,
      preparedDaysAgo: cookAgeDays,
      keptRefrigerated,
      allergens,
      pickupType,
      slotLabel: pickupType === "immediate" ? "Immediate (Next 60 min)" : scheduledSlot,
    });
  }

  return (
    <Sheet title="Share Surplus Food" onClose={onClose}>
      {/* Field 1: Title */}
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)" }}>
          What are you sharing? *
        </span>
        <input
          autoFocus
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          placeholder="e.g. 5 organic eggs, Homemade vegetable soup"
          style={{
            height: 42,
            paddingInline: 14,
            borderRadius: "var(--radius-control, 8px)",
            border: `1px solid ${error ? "#d7463c" : "var(--color-border-subtle, #e6e7ed)"}`,
            font: "inherit",
            fontSize: "14px",
            color: "var(--color-text-primary)",
          }}
        />
      </label>

      {/* Field 2: Food Category */}
      <div>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", display: "block", marginBottom: 6 }}>
          Food Type *
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button
            type="button"
            onClick={() => setCategory("prepared")}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: category === "prepared" ? "1.5px solid var(--color-action-primary)" : "1px solid var(--color-border-subtle)",
              background: category === "prepared" ? "var(--color-background-brand-subtle)" : "#fff",
              fontWeight: category === "prepared" ? 700 : 500,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🍲 Prepared Meal
          </button>
          <button
            type="button"
            onClick={() => setCategory("produce")}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: category === "produce" ? "1.5px solid var(--color-action-primary)" : "1px solid var(--color-border-subtle)",
              background: category === "produce" ? "var(--color-background-brand-subtle)" : "#fff",
              fontWeight: category === "produce" ? 700 : 500,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🍎 Fresh Produce / Pantry
          </button>
        </div>
      </div>

      {/* Field 3: Cook Time / Freshness (Poka-Yoke 3-Day Rule) */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)" }}>
            When was it prepared? *
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: fails3DayRule ? "#b8342c" : "var(--color-text-tertiary)" }}>
            Max 3 days allowed
          </span>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { label: "Today", days: 0 },
            { label: "Yesterday", days: 1 },
            { label: "2 days ago", days: 2 },
            { label: "3 days ago", days: 3 },
            { label: "4+ days ago", days: 4 },
          ].map((option) => {
            const isSelected = cookAgeDays === option.days;
            return (
              <button
                key={option.days}
                type="button"
                onClick={() => setCookAgeDays(option.days)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: isSelected ? 700 : 500,
                  border: isSelected
                    ? option.days > 3
                      ? "1.5px solid #d7463c"
                      : "1.5px solid var(--color-action-primary)"
                    : "1px solid var(--color-border-subtle)",
                  background: isSelected
                    ? option.days > 3
                      ? "#ffebeb"
                      : "var(--color-action-primary)"
                    : "#fff",
                  color: isSelected && option.days <= 3 ? "#fff" : option.days > 3 && isSelected ? "#b8342c" : "var(--color-text-primary)",
                  cursor: "pointer",
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Poka-Yoke Block Error State for > 3 days */}
        {fails3DayRule ? (
          <div
            style={{
              marginTop: 10,
              padding: "10px 12px",
              borderRadius: "8px",
              background: "#ffebeb",
              border: "1px solid #d7463c",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              fontSize: "12px",
              color: "#9c1b12",
              lineHeight: 1.4,
            }}
          >
            <ExclamationTriangleIcon width={18} height={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              <strong>3-Day Safety Rule:</strong> Meals prepared more than 3 days ago cannot be posted on Kari to protect neighbor health. Please dispose of or compost safely.
            </span>
          </div>
        ) : null}
      </div>

      {/* Field 4: Refrigeration Confirmation (BRD Requirement) */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: "8px",
          background: keptRefrigerated ? "#f4faf5" : "#fff",
          border: `1px solid ${keptRefrigerated ? "#287d3c" : "var(--color-border-subtle)"}`,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={keptRefrigerated}
          onChange={(e) => setKeptRefrigerated(e.target.checked)}
          style={{ width: 16, height: 16, accentColor: "#287d3c" }}
        />
        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>
          ❄️ I confirm this food was kept continuously refrigerated. *
        </span>
      </label>

      {/* Field 5: Allergens Disclosures */}
      <div>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", display: "block", marginBottom: 6 }}>
          Allergen information:
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["None", "Dairy", "Gluten", "Nuts", "Eggs", "Seafood", "Soy"].map((allergen) => {
            const active = allergen === "None" ? allergens.length === 0 : allergens.includes(allergen);
            return (
              <button
                key={allergen}
                type="button"
                onClick={() => toggleAllergen(allergen)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: active ? 700 : 500,
                  border: active ? "1.5px solid var(--color-action-primary)" : "1px solid var(--color-border-subtle)",
                  background: active ? "var(--color-background-brand-subtle)" : "#fff",
                  color: active ? "var(--color-text-brand)" : "var(--color-text-secondary)",
                  cursor: "pointer",
                }}
              >
                {allergen === "None" ? "✓ None" : allergen}
              </button>
            );
          })}
        </div>
      </div>

      {/* Field 6: Pickup Mode (Direct alignment with 60-min MVP goal) */}
      <div>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", display: "block", marginBottom: 6 }}>
          Pickup Option *
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderRadius: "8px",
              border: pickupType === "immediate" ? "1.5px solid var(--color-action-primary)" : "1px solid var(--color-border-subtle)",
              background: pickupType === "immediate" ? "#fff5f4" : "#fff",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="radio"
                name="pickupType"
                checked={pickupType === "immediate"}
                onChange={() => setPickupType("immediate")}
                style={{ accentColor: "var(--color-action-primary)" }}
              />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                  ⚡️ Immediate pickup (Next 60 min)
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                  Supports our 60-minute neighborhood rescue goal
                </div>
              </div>
            </div>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-action-primary)", background: "var(--color-background-brand-subtle)", padding: "2px 6px", borderRadius: 4 }}>
              MVP Target
            </span>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderRadius: "8px",
              border: pickupType === "scheduled" ? "1.5px solid var(--color-action-primary)" : "1px solid var(--color-border-subtle)",
              background: pickupType === "scheduled" ? "#fff5f4" : "#fff",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="radio"
                name="pickupType"
                checked={pickupType === "scheduled"}
                onChange={() => setPickupType("scheduled")}
                style={{ accentColor: "var(--color-action-primary)" }}
              />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                  🗓 Scheduled pickup window
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                  Set a specific window for neighbor pickup
                </div>
              </div>
            </div>
          </label>
        </div>

        {pickupType === "scheduled" ? (
          <input
            value={scheduledSlot}
            onChange={(e) => setScheduledSlot(e.target.value)}
            placeholder="e.g. Today 4:00 PM – 5:30 PM"
            style={{
              width: "100%",
              height: 38,
              marginTop: 8,
              paddingInline: 12,
              borderRadius: "6px",
              border: "1px solid var(--color-border-subtle)",
              fontSize: "13px",
              boxSizing: "border-box",
            }}
          />
        ) : null}
      </div>

      {error ? (
        <div style={{ fontSize: "12px", color: "#b8342c", fontWeight: 600 }}>
          {error}
        </div>
      ) : null}

      <Button
        variant="Primary"
        size="MD"
        disabled={fails3DayRule || !keptRefrigerated || !title.trim()}
        label={fails3DayRule ? "Blocked by 3-day rule" : "Publish Donation"}
        onClick={handlePublish}
        style={{ width: "100%", height: 46 }}
      />
    </Sheet>
  );
}

/**
 * Flow 4: Phone Verification Flow (BRD Accountability)
 * Seamless 4-digit code confirmation for both posters and claimers.
 */
export function PhoneVerificationModal({
  onClose,
  onVerified,
}: {
  onClose: () => void;
  onVerified: () => void;
}) {
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [verifying, setVerifying] = useState(false);

  function handleSendCode() {
    if (!phone.trim()) return;
    setStep("code");
    setCode("4219"); // Demo prefilled helper for effortless flow
  }

  function handleVerify() {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onVerified();
    }, 450);
  }

  return (
    <Sheet title="Verify Your Phone" onClose={onClose}>
      <div style={{ textAlign: "center", paddingBlock: 8 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 9999,
            background: "var(--color-background-brand-subtle)",
            color: "var(--color-action-primary)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <PhoneIcon width={24} height={24} />
        </div>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: 700 }}>
          Neighborhood Accountability
        </h3>
        <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
          To keep our local food rescue safe and trustworthy, home cooks and claimers must verify their phone number.
        </p>
      </div>

      {step === "phone" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)" }}>
              Mobile Phone Number
            </span>
            <input
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 98765-4321"
              style={{
                height: 44,
                paddingInline: 14,
                borderRadius: "8px",
                border: "1px solid var(--color-border-subtle)",
                fontSize: "15px",
                fontWeight: 600,
              }}
            />
          </label>
          <Button variant="Primary" size="MD" label="Send 4-Digit Code" onClick={handleSendCode} style={{ width: "100%" }} />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)" }}>
              Enter 4-digit code sent to {phone}
            </span>
            <input
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={4}
              placeholder="4219"
              style={{
                height: 48,
                textAlign: "center",
                letterSpacing: "8px",
                borderRadius: "8px",
                border: "1.5px solid var(--color-action-primary)",
                fontSize: "22px",
                fontWeight: 700,
              }}
            />
          </label>
          <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", textAlign: "center" }}>
            Demo helper: 4219 is auto-filled for testing
          </div>
          <Button
            variant="Primary"
            size="MD"
            disabled={verifying || code.length < 4}
            label={verifying ? "Verifying..." : "Verify & Complete"}
            onClick={handleVerify}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </Sheet>
  );
}

/**
 * Donor Detail view with claim management and "Mark as Picked Up".
 */
export function DonationDetail({
  item,
  onClose,
  onToggleStatus,
  onMarkPickedUp,
}: {
  item: Donation;
  onClose: () => void;
  onToggleStatus: () => void;
  onMarkPickedUp?: () => void;
}) {
  const isClaimed = item.claimStatus === "claimed";
  const isClosed = item.status === "closed";

  function openWhatsAppClaimer() {
    const text = encodeURIComponent(`Hi ${item.claimedBy || "there"}! I'm ready for your pickup of ${item.title}.`);
    window.open(`https://wa.me/5511987654321?text=${text}`, "_blank");
  }

  return (
    <Sheet title={item.title} onClose={onClose}>
      <img
        src={item.image}
        alt=""
        style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "var(--radius-card, 16px)" }}
      />

      {/* Claim Status Notification for Donor */}
      {isClaimed ? (
        <div
          style={{
            padding: 14,
            borderRadius: "12px",
            background: "#fff5f4",
            border: "1.5px solid var(--color-action-primary, #dc2b10)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-action-primary)" }}>
              🎉 Food Claimed by Neighbor!
            </span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#287d3c", background: "#edf7ee", padding: "2px 6px", borderRadius: 4 }}>
              Slot: {item.claimedSlot || "4:00 PM"}
            </span>
          </div>

          <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
            <strong>{item.claimedBy || "Dev"}</strong> has claimed this donation. Your address was securely released.
          </p>

          <button
            type="button"
            onClick={openWhatsAppClaimer}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: "#25D366",
              color: "#fff",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <ChatBubbleLeftRightIcon width={16} height={16} />
            <span>Chat with {item.claimedBy || "Claimer"} on WhatsApp</span>
          </button>
        </div>
      ) : isClosed ? (
        <div
          style={{
            padding: 12,
            borderRadius: "10px",
            background: "#edf7ee",
            border: "1px solid #287d3c",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "13px",
            color: "#287d3c",
            fontWeight: 600,
          }}
        >
          <CheckCircleIcon width={18} height={18} />
          <span>Completed: Food was picked up and rescued!</span>
        </div>
      ) : (
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>
          Active listing · {item.interested === 0 ? "No claims yet" : `${item.interested} neighbors interested`}
        </p>
      )}

      {/* Action Buttons */}
      {isClaimed ? (
        <Button
          variant="Primary"
          size="MD"
          label="✓ Confirm Food Picked Up"
          onClick={onMarkPickedUp || onToggleStatus}
          style={{ width: "100%", height: 46 }}
        />
      ) : (
        <Button
          variant="Primary"
          size="MD"
          label={isClosed ? "Reopen Donation" : "Close Donation"}
          onClick={onToggleStatus}
          style={{ width: "100%" }}
        />
      )}
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
  category?: "food_nearby" | "donation";
  actionLabel?: string;
  targetFoodId?: string;
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
  const isDonation = item.category === "donation";
  return (
    <Sheet title={item.title} onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "9999px",
            background: "var(--color-background-brand-subtle, #ffedec)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isDonation ? (
            <span style={{ transform: "scale(0.75)", display: "inline-flex" }}>
              <BagNavIcon selected />
            </span>
          ) : (
            <span style={{ transform: "scale(0.75)", display: "inline-flex" }}>
              <StoreNavIcon selected />
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: "var(--font-size-body-xs)",
            color: "var(--color-text-tertiary)",
          }}
        >
          {item.time}
        </span>
      </div>

      <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-base)", lineHeight: 1.5 }}>
        {item.message}
      </p>

      {item.actionLabel ? (
        <Button
          variant="Primary"
          size="MD"
          label={item.actionLabel}
          onClick={() => {
            onClose();
            onAction?.();
          }}
          style={{ width: "100%" }}
        />
      ) : null}
    </Sheet>
  );
}
