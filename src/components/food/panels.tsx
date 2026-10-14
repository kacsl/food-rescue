import { useEffect, useRef, useState, type ReactNode } from "react";
import { Badge } from "valere-DS";
import { Button, IconButton } from "@/components/ds/button";
import type { Donation, NearbyFood } from "./cards";
import { StoreNavIcon, BagNavIcon } from "@/components/ds/bottom-nav";
import { useFoodToast } from "./food-toast";
import { NewDonationSheet, OptionCard, type DonationPublishPayload } from "./donation-step-flow";
import {
  CheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export { NewDonationSheet, OptionCard, type DonationPublishPayload };

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

export function Sheet({
  title,
  headerIcon,
  subtitle,
  gap = 24,
  paddingBottom = 32,
  onClose,
  children,
}: {
  title: string;
  headerIcon?: ReactNode;
  subtitle?: ReactNode;
  gap?: number;
  paddingBottom?: number;
  onClose: () => void;
  children: ReactNode;
}) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleScrollActivity() {
    setIsScrolling(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 750);
  }

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

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
        className={isScrolling ? "food-sheet-modal food-sheet-modal--scrolling" : "food-sheet-modal"}
        onClick={(event) => event.stopPropagation()}
        onScroll={handleScrollActivity}
        onWheel={handleScrollActivity}
        onTouchMove={handleScrollActivity}
        style={{
          width: "100%",
          maxHeight: "86%",
          overflowY: "auto",
          padding: 24,
          paddingBottom,
          borderTopLeftRadius: "var(--radius-card, 20px)",
          borderTopRightRadius: "var(--radius-card, 20px)",
          background: "var(--color-background-surface)",
          display: "flex",
          flexDirection: "column",
          gap,
          boxShadow: "0 -8px 36px rgba(48, 48, 54, 0.2)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: headerIcon ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: 12,
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0 }}>
              {headerIcon}
              <h2
                style={{
                  margin: 0,
                  fontSize: "var(--font-size-heading-lg, 20px)",
                  fontWeight: "var(--font-weight-bold, 700)",
                  color: "var(--color-text-primary)",
                }}
              >
                {title}
              </h2>
            </div>
            <IconButton variant="Ghost" size="XS" aria-label="Close" onClick={onClose} icon={<CloseMark />} />
          </div>
          {subtitle}
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
 * Displays food details, freshness, pickup availability/slot selection, and risk acknowledgment.
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
  const defaultSlot = item.slots && item.slots.length > 0 ? item.slots[0].label : "Immediate pickup";
  const [selectedSlot, setSelectedSlot] = useState<string>(defaultSlot);
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);

  const badgeLabel = isExpired
    ? "Expired"
    : isClaimed
    ? "Claimed"
    : item.pickupType === "scheduled"
    ? "Needs scheduling"
    : "Available now";

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
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 180,
          minHeight: 180,
          flexShrink: 0,
          borderRadius: "var(--radius-card, 16px)",
          overflow: "hidden",
        }}
      >
        <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <Badge tone="Neutral" emphasis="Subtle" label={badgeLabel} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
          src="/food/karina.png"
          alt=""
          width={32}
          height={32}
          style={{ width: 32, height: 32, borderRadius: 9999, objectFit: "cover", flexShrink: 0 }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: "var(--font-size-body-sm, 14px)",
              fontWeight: "var(--font-weight-semibold, 600)",
              color: "var(--color-text-primary)",
            }}
          >
            <span>{item.host}</span>
            {item.hostVerified !== false ? (
              <span title="Phone verified neighbor" style={{ display: "inline-flex", color: "var(--color-icon-muted, #75757d)" }}>
                <ShieldCheckIcon width={14} height={14} aria-hidden="true" />
              </span>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: "var(--font-size-body-xs, 12px)",
              fontWeight: "var(--font-weight-regular, 400)",
              color: "var(--color-text-tertiary, #75757d)",
            }}
          >
            <MapPinIcon width={14} height={14} aria-hidden="true" style={{ color: "var(--color-icon-muted, #75757d)", flexShrink: 0 }} />
            <span>
              {item.distance} • {item.area}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          fontSize: "var(--font-size-body-sm, 14px)",
          fontWeight: "var(--font-weight-regular, 400)",
          color: "var(--color-text-secondary, #5c5c63)",
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-body-base, 16px)",
            fontWeight: "var(--font-weight-semibold, 600)",
            color: "var(--color-text-primary)",
          }}
        >
          Freshness
        </span>
        <span>{item.foodAge}</span>
        <span>{item.keptRefrigerated ? "Kept cold" : "Room temperature"}</span>
        <span>
          {item.allergens.length === 0 ? "No allergens" : `Contains ${item.allergens.join(", ").toLowerCase()}`}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontSize: "var(--font-size-body-base, 16px)",
            fontWeight: "var(--font-weight-semibold, 600)",
            color: "var(--color-text-primary)",
          }}
        >
          Pickup
        </span>

        {item.pickupType === "immediate" ? (
          <div
            style={{
              fontSize: "var(--font-size-body-sm, 14px)",
              fontWeight: "var(--font-weight-regular, 400)",
              color: "var(--color-text-secondary, #5c5c63)",
            }}
          >
            Available now
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm, 8px)" }}>
            {(item.slots || [{ id: "slot-1", label: "Today 4:00 PM – 4:30 PM" }, { id: "slot-2", label: "Today 4:30 PM – 5:00 PM" }]).map((slot) => (
              <OptionCard
                key={slot.id}
                label={slot.label}
                selected={selectedSlot === slot.label}
                onClick={() => setSelectedSlot(slot.label)}
              />
            ))}
          </div>
        )}
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: 12,
          borderRadius: 10,
          background: "var(--color-background-subtle, #f8f9fc)",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <input
          type="checkbox"
          checked={riskAcknowledged}
          onChange={(e) => setRiskAcknowledged(e.target.checked)}
          style={{
            position: "absolute",
            opacity: 0,
            width: 1,
            height: 1,
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            width: "var(--size-icon-md, 20px)",
            height: "var(--size-icon-md, 20px)",
            borderRadius: "var(--radius-control-sm, 6px)",
            border: riskAcknowledged
              ? "var(--border-hairline, 1px) solid var(--color-action-primary)"
              : "var(--border-hairline, 1px) solid var(--color-border-default, #93949b)",
            background: riskAcknowledged ? "var(--color-action-primary)" : "var(--color-background-surface)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {riskAcknowledged ? (
            <CheckIcon width={16} height={16} strokeWidth={2} style={{ color: "var(--color-action-on-action, #ffffff)" }} />
          ) : null}
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0, color: "var(--color-text-primary)" }}>
          <span
            style={{
              fontSize: "var(--font-size-body-sm, 14px)",
              fontWeight: "var(--font-weight-bold, 700)",
              lineHeight: "17px",
              minHeight: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            Safety risk acknowledgment
          </span>
          <span
            style={{
              fontSize: "var(--font-size-body-xs, 12px)",
              fontWeight: "var(--font-weight-regular, 400)",
              lineHeight: "17px",
            }}
          >
            I know a neighbor made this food. I’ll give it a quick check when I pick it up and enjoy it at my own risk.
          </span>
        </span>
      </label>

      {/* Action Button */}
      {isExpired ? (
        <Button variant="Secondary" size="LG" disabled label="Listing Expired" style={{ width: "100%", flexShrink: 0 }} />
      ) : isClaimed ? (
        <Button variant="Secondary" size="LG" disabled label="Claim food" style={{ width: "100%", flexShrink: 0 }} />
      ) : (
        <Button
          variant="Primary"
          size="LG"
          disabled={!riskAcknowledged}
          label="Claim food"
          onClick={handleClaimClick}
          style={{ width: "100%", flexShrink: 0 }}
        />
      )}
    </Sheet>
  );
}

export type ClaimSheetMode = "requested" | "claimed";

/**
 * Flow 3: Pickup Handoff Sheets
 * - "requested" (55:5741): Shown immediately after claiming food; exact location pending host acceptance.
 * - "claimed" (65:6570): Shown when opening an already-claimed food; request accepted with full address and copy action.
 */
export function ClaimHandoffSheet({
  food,
  selectedSlot,
  mode = "requested",
  onClose,
  onCancelClaim,
}: {
  food: NearbyFood;
  selectedSlot: string;
  mode?: ClaimSheetMode;
  onClose: () => void;
  onMarkPickedUp?: () => void;
  onCancelClaim: () => void;
}) {
  const { showToast } = useFoodToast();
  const hostFirstName = food.host.split(" ")[0] || food.host;
  const slotLabel = food.pickupType === "immediate" ? "Immediate pickup" : selectedSlot;
  const areaWithCity = food.area.includes("Cotia") ? food.area : `${food.area}, Cotia`;
  const streetAddress = food.address
    ? food.address.split(" - ")[0].trim()
    : "Via das Margaridas, 123";

  async function copyAddress() {
    const fullAddress = `${streetAddress}, ${areaWithCity}`;
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(fullAddress);
      showToast({ tone: "Success", title: "Address copied" });
    } catch {
      showToast({ tone: "Error", title: "Couldn't copy the address", body: "Select the address to copy it manually." });
    }
  }

  function openWhatsApp() {
    const text = encodeURIComponent(
      `Hi ${food.host}! I just claimed your ${food.title} on Kari. I'm picking it up for the slot: ${slotLabel}.`,
    );
    window.open(`https://wa.me/5511988776655?text=${text}`, "_blank");
  }

  const isAccepted = mode === "claimed";

  return (
    <Sheet
      gap={32}
      title={isAccepted ? "Request accepted!" : "Food claimed!"}
      headerIcon={
        <img
          src={isAccepted ? "/food/claimed-check.svg" : "/food/claimed-pending.svg"}
          alt=""
          width={48}
          height={48}
          style={{ display: "block" }}
        />
      }
      subtitle={
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: "var(--font-weight-regular, 400)",
            color: "var(--color-text-primary)",
          }}
        >
          {isAccepted ? `Message ${hostFirstName} to settle the pickup details.` : `You're rescuing ${food.title}.`}
        </p>
      }
      onClose={onClose}
    >
      {isAccepted ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <MapPinIcon
                width={20}
                height={20}
                aria-hidden="true"
                style={{ color: "var(--color-icon-muted, #75757d)", flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "var(--font-size-body-base, 16px)",
                  fontWeight: "var(--font-weight-regular, 400)",
                  color: "var(--color-text-tertiary, #75757d)",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {streetAddress}
              </span>
            </div>
            <div style={{ paddingLeft: 30 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--font-size-body-sm, 14px)",
                  fontWeight: "var(--font-weight-regular, 400)",
                  color: "var(--color-text-tertiary, #75757d)",
                }}
              >
                {areaWithCity}
              </p>
            </div>
          </div>
          <IconButton
            variant="Ghost"
            size="MD"
            aria-label="Copy address"
            onClick={copyAddress}
            icon={<img src="/food/copy.svg" alt="" width={20} height={20} style={{ display: "block" }} />}
          />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <MapPinIcon
              width={20}
              height={20}
              aria-hidden="true"
              style={{ color: "var(--color-icon-muted, #75757d)", flexShrink: 0 }}
            />
            <span
              style={{
                fontSize: "var(--font-size-body-base, 16px)",
                fontWeight: "var(--font-weight-regular, 400)",
                color: "var(--color-text-tertiary, #75757d)",
                flex: 1,
                minWidth: 0,
              }}
            >
              {areaWithCity}
            </span>
          </div>
          <div style={{ paddingLeft: 30 }}>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-body-sm, 14px)",
                fontWeight: "var(--font-weight-regular, 400)",
                color: "var(--color-text-tertiary, #75757d)",
              }}
            >
              The exact location is revealed once {hostFirstName} accepts your request
            </p>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <ClockIcon
          width={18}
          height={18}
          aria-hidden="true"
          style={{ color: "var(--color-icon-muted, #75757d)", flexShrink: 0 }}
        />
        <span
          style={{
            fontSize: "var(--font-size-body-base, 16px)",
            fontWeight: "var(--font-weight-regular, 400)",
            color: "var(--color-text-tertiary, #75757d)",
          }}
        >
          {slotLabel}
        </span>
      </div>

      <Button
        variant="Outline"
        size="LG"
        leadingIcon
        leadingIconSwap={<img src="/food/whatsapp.svg" alt="" width={20} height={20} style={{ display: "block" }} />}
        label={`Message ${hostFirstName}`}
        onClick={openWhatsApp}
        style={{ width: "100%" }}
      />

      <button
        type="button"
        onClick={onCancelClaim}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          width: "100%",
          color: "var(--color-text-tertiary, #75757d)",
          fontSize: "var(--font-size-body-xs, 12px)",
          fontWeight: "var(--font-weight-semibold, 600)",
          cursor: "pointer",
          textAlign: "center",
          fontFamily: "inherit",
        }}
      >
        Can’t make it? Release it so someone else can claim it.
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

function WhatsAppGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
      <path
        d="M10.0333 1.66667C5.48333 1.66667 1.775 5.375 1.775 9.925C1.775 11.3833 2.15833 12.8 2.875 14.05L1.70833 18.3333L6.08333 17.1833C7.29167 17.8417 8.65 18.1917 10.0333 18.1917C14.5833 18.1917 18.2917 14.4833 18.2917 9.93333C18.2917 7.725 17.4333 5.65 15.875 4.09167C14.3167 2.525 12.2417 1.66667 10.0333 1.66667ZM10.0417 3.05833C11.875 3.05833 13.5917 3.775 14.8917 5.075C16.1833 6.375 16.9 8.1 16.9 9.93333C16.9 13.7167 13.8167 16.7917 10.0333 16.7917C8.8 16.7917 7.59167 16.4667 6.54167 15.8333L6.29167 15.6917L3.69167 16.375L4.38333 13.8417L4.21667 13.575C3.53333 12.5 3.16667 11.225 3.16667 9.925C3.175 6.14167 6.25 3.05833 10.0417 3.05833ZM7.10833 6.10833C6.975 6.10833 6.75 6.15833 6.55833 6.36667C6.375 6.575 5.83333 7.08333 5.83333 8.09167C5.83333 9.10833 6.575 10.0833 6.66667 10.225C6.78333 10.3667 8.13333 12.45 10.2083 13.3333C10.7 13.5583 11.0833 13.6833 11.3833 13.775C11.875 13.9333 12.325 13.9083 12.6833 13.8583C13.0833 13.8 13.9 13.3583 14.075 12.875C14.25 12.3917 14.25 11.9833 14.2 11.8917C14.1417 11.8083 14.0083 11.7583 13.8 11.6667C13.5917 11.55 12.575 11.05 12.3917 10.9833C12.2 10.9167 12.0833 10.8833 11.925 11.0833C11.7917 11.2917 11.3917 11.7583 11.275 11.8917C11.15 12.0333 11.0333 12.05 10.8333 11.95C10.6167 11.8417 9.95 11.625 9.16667 10.925C8.55 10.375 8.14167 9.7 8.01667 9.49167C7.91667 9.29167 8.00833 9.16667 8.10833 9.075C8.2 8.98333 8.33333 8.83333 8.41667 8.70833C8.525 8.59167 8.55833 8.5 8.625 8.36667C8.69167 8.225 8.65833 8.10833 8.60833 8.00833C8.55833 7.91667 8.14167 6.88333 7.96667 6.475C7.8 6.075 7.63333 6.125 7.5 6.11667C7.38333 6.11667 7.25 6.10833 7.10833 6.10833Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Donor Detail view with claim management, "Accept claim", and "Mark as Picked Up".
 */
export function DonationDetail({
  item,
  onClose,
  onToggleStatus,
  onAcceptClaim,
  onMarkPickedUp,
}: {
  item: Donation;
  onClose: () => void;
  onToggleStatus: () => void;
  onAcceptClaim?: () => void;
  onMarkPickedUp?: () => void;
}) {
  const { showToast } = useFoodToast();
  const [localAccepted, setLocalAccepted] = useState(false);

  const isClaimed = item.claimStatus === "claimed";
  const isClosed = item.status === "closed";
  const isAccepted = Boolean(item.claimAccepted || localAccepted);
  const claimerFirstName = (item.claimedBy || "Dev").split(" ")[0] || "claimer";

  const badgeLabel = isClosed
    ? "Picked up"
    : isClaimed
    ? isAccepted
      ? "Claim accepted"
      : "Claimed"
    : "Available now";

  function openWhatsAppClaimer() {
    const text = encodeURIComponent(`Hi ${item.claimedBy || "there"}! I'm ready for your pickup of ${item.title}.`);
    window.open(`https://wa.me/5511987654321?text=${text}`, "_blank");
  }

  function handleAcceptClaim() {
    setLocalAccepted(true);
    if (onAcceptClaim) {
      onAcceptClaim();
    } else {
      showToast({
        tone: "Success",
        title: "Claim accepted",
        body: "Your pickup location will be shared with the claimer.",
        position: "top",
      });
    }
  }

  return (
    <Sheet title={item.title} onClose={onClose}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 180,
          minHeight: 180,
          flexShrink: 0,
          borderRadius: "var(--radius-card, 16px)",
          overflow: "hidden",
        }}
      >
        <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <Badge tone="Neutral" emphasis="Subtle" label={badgeLabel} />
        </div>
      </div>

      {/* Claim Status Notification for Donor */}
      {isClaimed ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="/food/karina.png"
              alt=""
              width={32}
              height={32}
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-pill, 9999px)",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "var(--font-size-body-sm, 14px)",
                  fontWeight: "var(--font-weight-semibold, 600)",
                  color: "var(--color-text-primary)",
                }}
              >
                <span>Claimed by {item.claimedBy || "Dev"}</span>
                <span title="Phone verified neighbor" style={{ display: "inline-flex", color: "var(--color-icon-muted, #75757d)" }}>
                  <ShieldCheckIcon width={14} height={14} aria-hidden="true" />
                </span>
              </div>
              <span
                style={{
                  fontSize: "var(--font-size-body-xs, 12px)",
                  fontWeight: "var(--font-weight-regular, 400)",
                  color: "var(--color-text-tertiary, #75757d)",
                }}
              >
                {isAccepted
                  ? `Pickup location shared with ${claimerFirstName}`
                  : "Accept claim to share your pickup location"}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "var(--font-size-body-base, 16px)",
              fontWeight: "var(--font-weight-regular, 400)",
              color: "var(--color-text-tertiary, #75757d)",
            }}
          >
            <ClockIcon
              width={18}
              height={18}
              aria-hidden="true"
              style={{ color: "var(--color-icon-muted, #75757d)", flexShrink: 0 }}
            />
            <span>{item.claimedSlot || "Today 4:00 PM"}</span>
          </div>
        </div>
      ) : isClosed ? (
        <p style={{ margin: 0, fontSize: "var(--font-size-body-sm, 14px)", color: "var(--color-text-secondary)" }}>
          {item.pickedUpAt ? `Picked up • ${item.pickedUpAt}` : "Picked up."}
        </p>
      ) : (
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm, 14px)" }}>
          Active listing · {item.interested === 0 ? "No claims yet" : `${item.interested} neighbors interested`}
        </p>
      )}

      {item.foodAge ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: "var(--font-size-body-sm, 14px)",
            fontWeight: "var(--font-weight-regular, 400)",
            color: "var(--color-text-secondary, #5c5c63)",
          }}
        >
          <span
            style={{
              fontSize: "var(--font-size-body-base, 16px)",
              fontWeight: "var(--font-weight-semibold, 600)",
              color: "var(--color-text-primary)",
            }}
          >
            Freshness
          </span>
          <span>{item.foodAge}</span>
          {item.keptRefrigerated !== undefined ? (
            <span>{item.keptRefrigerated ? "Kept cold" : "Room temperature"}</span>
          ) : null}
          {item.allergens ? (
            <span>
              {item.allergens.length === 0 ? "No allergens" : `Contains ${item.allergens.join(", ").toLowerCase()}`}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Action Buttons */}
      {isClaimed ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          {!isAccepted ? (
            <>
              <Button
                variant="Primary"
                size="LG"
                label="Accept claim"
                onClick={handleAcceptClaim}
                style={{ width: "100%", flexShrink: 0 }}
              />
              <Button
                variant="Outline"
                size="LG"
                leadingIcon
                leadingIconSwap={<WhatsAppGlyph />}
                label={`Message ${claimerFirstName}`}
                onClick={openWhatsAppClaimer}
                style={{ width: "100%", flexShrink: 0 }}
              />
            </>
          ) : (
            <>
              <Button
                variant="Primary"
                size="LG"
                leadingIcon
                leadingIconSwap={<WhatsAppGlyph />}
                label={`Message ${claimerFirstName}`}
                onClick={openWhatsAppClaimer}
                style={{ width: "100%", flexShrink: 0 }}
              />
              <Button
                variant="Ghost"
                size="LG"
                leadingIcon
                leadingIconSwap={<CheckIcon width={20} height={20} strokeWidth={2} aria-hidden="true" />}
                label="Mark as picked up"
                onClick={onMarkPickedUp || onToggleStatus}
                style={{ width: "100%", flexShrink: 0 }}
              />
            </>
          )}
        </div>
      ) : (
        <Button
          variant="Primary"
          size="LG"
          label={isClosed ? "Reopen donation" : "Close donation"}
          onClick={onToggleStatus}
          style={{ width: "100%", flexShrink: 0 }}
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
