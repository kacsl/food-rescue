import { useState, type ReactNode } from "react";
import { Button, IconButton } from "@/components/ds/button";
import type { Donation, NearbyFood } from "./cards";
import { StoreNavIcon, BagNavIcon } from "@/components/ds/bottom-nav";
import {
  ClockIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export { NewDonationSheet, type DonationPublishPayload } from "./donation-step-flow";

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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: "var(--color-text-primary, #303036)" }}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
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
            background: isExpired ? "rgba(117, 117, 125, 0.9)" : "rgba(48, 48, 54, 0.85)",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          <ClockIcon width={14} height={14} strokeWidth={2} />
          <span>{isExpired ? "Expired" : item.timeLeft}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
          src="/food/karina.png"
          alt=""
          width={32}
          height={32}
          style={{ width: 32, height: 32, borderRadius: 9999, objectFit: "cover" }}
        />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            {item.host}
            {item.hostVerified !== false ? (
              <span title="Phone verified neighbor" style={{ display: "inline-flex", color: "var(--color-text-tertiary)" }}>
                <ShieldCheckIcon width={14} height={14} aria-hidden="true" />
              </span>
            ) : null}
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
            {item.distance} • {item.area}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "13px", color: "var(--color-text-primary)" }}>
        <span style={{ fontWeight: 700 }}>Freshness</span>
        <span>Prepared: {item.foodAge}</span>
        <span>Refrigeration: {item.keptRefrigerated ? "Kept cold" : "Not confirmed"}</span>
        <span>Allergens: {item.allergens.length === 0 ? "None" : item.allergens.join(", ")}</span>
      </div>

      <div>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", display: "block", marginBottom: 8 }}>
          {item.pickupType === "immediate" ? "Pickup" : "Choose a pickup slot"}
        </span>

        {item.pickupType === "immediate" ? (
          <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)" }}>
            Immediate pickup (next 60 min)
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
                    border: "1px solid var(--color-border-subtle, #e6e7ed)",
                    background: isSelected ? "var(--color-background-muted, #f2f2f6)" : "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
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
                      border: isSelected ? "5px solid var(--color-text-primary)" : "2px solid #b4b5bd",
                      background: "#fff",
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "12px",
          borderRadius: "10px",
          background: "var(--color-background-muted, #f2f2f6)",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={riskAcknowledged}
          onChange={(e) => setRiskAcknowledged(e.target.checked)}
          style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--color-text-primary, #303036)", cursor: "pointer" }}
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
    <Sheet title="Food claimed" onClose={onClose}>
      <p style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)" }}>
        You&apos;re rescuing {food.title}.
      </p>

      {/* Address Card (Revealed after claim) */}
      <div
        style={{
          padding: 16,
          borderRadius: "12px",
          background: "#ffffff",
          border: "1px solid var(--color-border-subtle, #e6e7ed)",
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
              color: "var(--color-text-secondary)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {copied ? "✓ Copied!" : "Copy address"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <MapPinIcon width={20} height={20} color="var(--color-text-secondary)" style={{ flexShrink: 0, marginTop: 2 }} />
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
          <ClockIcon width={18} height={18} color="var(--color-text-secondary)" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Slot: {selectedSlot}
          </span>
        </div>
        <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
          {food.timeLeft}
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
            background: "var(--color-background-muted, #f2f2f6)",
            color: "var(--color-text-secondary)",
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
                border: "var(--border-emphasis, 1.5px) solid var(--color-border-focus)",
                outline: "none",
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
                border: "var(--border-emphasis, 1.5px) solid var(--color-border-focus)",
                outline: "none",
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
        <>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)" }}>
            Claimed by {item.claimedBy || "Dev"}. Slot: {item.claimedSlot || "Today 4:00 PM"}.
          </p>
          <button
            type="button"
            onClick={openWhatsAppClaimer}
            style={{
              padding: "10px 12px",
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
            <span>Chat with {item.claimedBy || "claimer"} on WhatsApp</span>
          </button>
        </>
      ) : isClosed ? (
        <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)" }}>Picked up.</p>
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
            background: "var(--color-background-muted, #f2f2f6)",
            color: "var(--color-text-secondary)",
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
