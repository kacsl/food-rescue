import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Progress } from "valere-DS";
import { Button, IconButton } from "@/components/ds/button";
import { Calendar } from "@/components/ds/calendar";
import { Chip } from "@/components/ds/chip";
import { DatePicker } from "@/components/ds/date-picker";
import { TimeList, TimePicker, generateQuarterHourSlots } from "@/components/ds/time-picker";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export type DonationPublishPayload = {
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
};

type FoodCategory = "meal" | "pantry";
type CookTiming = "today" | "one_to_three_days";
type StorageChoice = "refrigerated" | "room_temp";
type PackagingChoice = "packaged" | "unpackaged";
type ExpirationWindow = "within_3_days" | "four_plus_days";
type HomeDuration =
  | "one_to_two_days"
  | "three_to_five_days"
  | "five_to_ten_days"
  | "eleven_to_fifteen_days"
  | "sixteen_to_thirty_days";
type AllergenChoice = "none" | "contains";
type PickupChoice = "immediate" | "scheduled";
type PhotoSource = "upload" | "generate";
type ActivePickerSheet = "expiration-date" | "pickup-date" | "pickup-time" | null;
type OptionVisualState = "Default" | "Hover" | "Focus" | "Pressed" | "Selected" | "Error" | "Disabled";

const ALLERGEN_OPTIONS = ["None", "Dairy", "Gluten", "Nuts", "Eggs", "Seafood", "Soy"];
const HOME_DURATION_OPTIONS: { id: HomeDuration; label: string }[] = [
  { id: "one_to_two_days", label: "1 to 2 days" },
  { id: "three_to_five_days", label: "3 to 5 days" },
  { id: "five_to_ten_days", label: "5 to 10 days" },
  { id: "eleven_to_fifteen_days", label: "11 to 15 days" },
  { id: "sixteen_to_thirty_days", label: "16-30 days" },
];
const HOME_DURATION_DAYS: Record<HomeDuration, number> = {
  one_to_two_days: 1,
  three_to_five_days: 3,
  five_to_ten_days: 7,
  eleven_to_fifteen_days: 13,
  sixteen_to_thirty_days: 23,
};
const TOTAL_STEPS = 8;

function inferFoodPhoto(titleText: string, cat: FoodCategory | null): string {
  const lower = titleText.toLowerCase();
  if (lower.includes("orange") || lower.includes("citrus")) return "/food/oranges.png";
  if (lower.includes("banana") || lower.includes("herb") || lower.includes("fruit")) return "/food/bananas.png";
  if (lower.includes("egg") || lower.includes("bread") || lower.includes("loaf")) return "/food/eggs.png";
  if (cat === "meal" || lower.includes("soup") || lower.includes("strogonoff") || lower.includes("pasta")) {
    return "/food/stroganoff.png";
  }
  return cat === "pantry" ? "/food/oranges.png" : "/food/stroganoff.png";
}

function optionPaint(state: OptionVisualState) {
  if (state === "Disabled") {
    return {
      background: "var(--color-background-subtle)",
      border: "var(--color-border-subtle)",
      borderWidth: "var(--border-hairline)",
      color: "var(--color-text-disabled)",
      shadow: "none",
    };
  }
  if (state === "Error") {
    return {
      background: "var(--color-status-error-bg)",
      border: "var(--color-status-error-border)",
      borderWidth: "var(--border-width-2)",
      color: "var(--color-status-error-text)",
      shadow: "none",
    };
  }
  if (state === "Selected") {
    return {
      background: "var(--color-background-canvas)",
      border: "var(--color-border-brand)",
      borderWidth: "var(--border-width-2)",
      color: "var(--color-text-primary)",
      shadow: "none",
    };
  }
  if (state === "Focus") {
    return {
      background: "var(--color-background-surface)",
      border: "var(--color-border-focus)",
      borderWidth: "var(--border-emphasis)",
      color: "var(--color-text-primary)",
      shadow: "none",
    };
  }
  if (state === "Pressed") {
    return {
      background: "var(--color-background-muted)",
      border: "var(--color-border-strong)",
      borderWidth: "var(--border-hairline)",
      color: "var(--color-text-primary)",
      shadow: "none",
    };
  }
  if (state === "Hover") {
    return {
      background: "var(--color-background-subtle)",
      border: "var(--color-border-strong)",
      borderWidth: "var(--border-hairline)",
      color: "var(--color-text-primary)",
      shadow: "none",
    };
  }
  return {
    background: "var(--color-background-surface)",
    border: "var(--color-border-default)",
    borderWidth: "var(--border-hairline)",
    color: "var(--color-text-primary)",
    shadow: "none",
  };
}

export function OptionCard({
  label,
  description,
  selected,
  error = false,
  disabled = false,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  error?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const state: OptionVisualState = disabled
    ? "Disabled"
    : error && selected
      ? "Error"
      : selected
        ? "Selected"
        : pressed
          ? "Pressed"
          : focused
            ? "Focus"
            : hovered
              ? "Hover"
              : "Default";
  const paint = optionPaint(state);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: "100%",
        minHeight: description ? "var(--size-control-xl)" : "var(--size-control-lg)",
        paddingInline: "var(--space-inset-md)",
        paddingBlock: "var(--space-inset-sm)",
        borderRadius: "var(--radius-control)",
        border: `${paint.borderWidth} solid ${paint.border}`,
        background: paint.background,
        color: paint.color,
        boxShadow: paint.shadow,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-md)",
        textAlign: "left",
        font: "inherit",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--opacity-disabled)" : 1,
        transition: "background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease",
      }}
    >
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
        <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
        {description ? (
          <span style={{ fontSize: "var(--font-size-body-xs)", color: "var(--color-text-secondary)" }}>{description}</span>
        ) : null}
      </span>
      {selected ? (
        <CheckCircleIcon
          width={20}
          height={20}
          aria-hidden="true"
          style={{
            flexShrink: 0,
            color: error ? "var(--color-status-error-text)" : "var(--color-icon-brand)",
          }}
        />
      ) : (
        <span aria-hidden="true" style={{ width: 20, height: 20, flexShrink: 0 }} />
      )}
    </button>
  );
}

function PickerField({
  type,
  label,
  value,
  isOpen = false,
  onOpen,
}: {
  type: "date" | "time";
  label: string;
  value: string;
  isOpen?: boolean;
  onOpen: () => void;
}) {
  if (type === "date") {
    return (
      <DatePicker
        label={label}
        value={value}
        state={isOpen ? "Open" : undefined}
        onTriggerClick={onOpen}
        style={{ width: "100%" }}
      />
    );
  }

  return (
    <TimePicker
      label={label}
      value={value}
      state={isOpen ? "Open" : undefined}
      onTriggerClick={onOpen}
      style={{ width: "100%" }}
    />
  );
}

function formatPickupSlot(date: string, time: string) {
  const parsed = new Date(`${date}T${time}`);
  if (Number.isNaN(parsed.getTime())) return `${date} ${time}`;
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
  return `${formatted}, ${time}`;
}

function formatPickupSlots(date: string, times: string[]) {
  if (times.length === 0) return "";
  return times.map((time) => formatPickupSlot(date, time)).join(" • ");
}

function StepAlert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      style={{
        padding: "var(--space-inset-sm, 12px) var(--space-inset-md, 16px)",
        borderRadius: "var(--radius-control, 12px)",
        background: "var(--color-status-error-bg, #ffebeb)",
        border: "1px solid var(--color-status-error-border, #d7463c)",
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-inline-sm, 8px)",
        fontSize: "var(--font-size-body-xs, 12px)",
        color: "var(--color-status-error-text, #9c1b12)",
        lineHeight: 1.45,
      }}
    >
      <ExclamationTriangleIcon width={18} height={18} style={{ flexShrink: 0, marginTop: 1 }} />
      <span>{children}</span>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "var(--space-inline-md, 12px)",
        paddingBlock: "var(--space-inset-sm, 12px)",
        borderBottom: "1px solid var(--color-border-subtle, #e6e7ed)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span
          style={{
            fontSize: "var(--font-size-body-xs, 12px)",
            color: "var(--color-text-secondary, #5c5c63)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "var(--font-size-body-sm, 14px)",
            color: "var(--color-text-primary, #303036)",
            fontWeight: 600,
            wordBreak: "break-word",
          }}
        >
          {value}
        </span>
      </div>
      <Button variant="Link secondary" size="SM" label="Edit" onClick={onEdit} />
    </div>
  );
}

export function NewDonationSheet({
  onClose,
  isUserVerified,
  onPublish,
  onNeedsVerification,
}: {
  onClose: () => void;
  isUserVerified: boolean;
  onPublish: (listing: DonationPublishPayload) => void;
  onNeedsVerification: () => void;
}) {
  const [step, setStep] = useState<number>(1);
  const [editingFromReview, setEditingFromReview] = useState<boolean>(false);

  // Step 1: Category
  const [category, setCategory] = useState<FoodCategory | null>(null);

  // Branch A (Home-cooked meal): Step 2 & Step 3
  const [cookTiming, setCookTiming] = useState<CookTiming | null>(null);
  const [showThreeDaySheet, setShowThreeDaySheet] = useState<boolean>(false);
  const [storageChoice, setStorageChoice] = useState<StorageChoice | null>(null);

  // Branch B (Pantry or produce): Step 2 & Step 3
  const [packagingChoice, setPackagingChoice] = useState<PackagingChoice | null>(null);
  const [expirationWindow, setExpirationWindow] = useState<ExpirationWindow | null>(null);
  const [expirationDate, setExpirationDate] = useState<string>("2026-10-16");
  const [homeDuration, setHomeDuration] = useState<HomeDuration | null>(null);

  // Step 4: Allergens
  const [allergenChoice, setAllergenChoice] = useState<AllergenChoice | null>(null);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);

  // Step 5: Pickup timing (Pre-selected default: immediate pickup per MVP metric)
  const [pickupType, setPickupType] = useState<PickupChoice>("immediate");
  const [pickupDate, setPickupDate] = useState<string>("");
  const [pickupTimes, setPickupTimes] = useState<string[]>([]);
  const [activePickerSheet, setActivePickerSheet] = useState<ActivePickerSheet>(null);

  function togglePickupTime(time: string) {
    setPickupTimes((prev) => {
      const next = prev.includes(time) ? prev.filter((item) => item !== time) : [...prev, time];
      return [...next].sort();
    });
  }

  // Step 6: Title
  const [title, setTitle] = useState<string>("");
  const [titleFocused, setTitleFocused] = useState<boolean>(true);

  // Step 7: Photo (upload or generate)
  const [photoSource, setPhotoSource] = useState<PhotoSource | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photoImproved, setPhotoImproved] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadPhotoSelect() {
    setPhotoSource("upload");
    setPhotoImproved(false);
    if (!photoUrl || photoSource === "generate") {
      setPhotoUrl("/food/eggs.png");
    }
    fileInputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoSource("upload");
        setPhotoImproved(false);
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleGeneratePhotoSelect() {
    setPhotoSource("generate");
    setPhotoImproved(false);
    setPhotoUrl(inferFoodPhoto(title, category));
  }

  function handleSelectCategory(next: FoodCategory) {
    if (category && category !== next) {
      // Clear category-dependent steps (Steps 2 and 3), keep Steps 4, 5, and 6
      setCookTiming(null);
      setShowThreeDaySheet(false);
      setStorageChoice(null);
      setPackagingChoice(null);
      setExpirationWindow(null);
      setHomeDuration(null);
      setEditingFromReview(false);
    }
    setCategory(next);
  }

  function handleSelectPackaging(next: PackagingChoice) {
    if (packagingChoice && packagingChoice !== next) {
      // Clear Step 3B when switching packaged vs unpackaged, keep Steps 4, 5, and 6
      setExpirationWindow(null);
      setHomeDuration(null);
      setEditingFromReview(false);
    }
    setPackagingChoice(next);
  }

  function toggleAllergenChip(name: string) {
    if (name === "None") {
      setAllergenChoice("none");
      setAllergens([]);
      return;
    }
    setAllergens((prev) => {
      const next = prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name];
      setAllergenChoice(next.length > 0 ? "contains" : null);
      return next;
    });
  }

  function isStepValid(currentStep: number): boolean {
    if (currentStep === 1) return category !== null;
    if (currentStep === 2) {
      if (category === "meal") return cookTiming !== null;
      return packagingChoice !== null;
    }
    if (currentStep === 3) {
      if (category === "meal") return storageChoice === "refrigerated";
      if (packagingChoice === "packaged") {
        return expirationWindow !== null && expirationDate.trim().length > 0;
      }
      return homeDuration !== null;
    }
    if (currentStep === 4) {
      if (allergenChoice === "none") return true;
      if (allergenChoice === "contains") return allergens.length > 0;
      return false;
    }
    if (currentStep === 5) {
      if (pickupType === "immediate") return true;
      return pickupDate.trim().length > 0 && pickupTimes.length > 0;
    }
    if (currentStep === 6) {
      return title.trim().length > 0;
    }
    if (currentStep === 7) {
      return photoSource !== null && photoUrl.trim().length > 0;
    }
    return true;
  }

  function canReturnToReview(): boolean {
    return (
      editingFromReview &&
      isStepValid(1) &&
      isStepValid(2) &&
      isStepValid(3) &&
      isStepValid(4) &&
      isStepValid(5) &&
      isStepValid(6) &&
      isStepValid(7)
    );
  }

  function handleContinue() {
    if (!isStepValid(step)) return;
    if (canReturnToReview()) {
      setEditingFromReview(false);
      setStep(TOTAL_STEPS);
      return;
    }
    setStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
  }

  function handleBack() {
    if (step <= 1) return;
    setStep((prev) => prev - 1);
  }

  function jumpToStep(targetStep: number) {
    setEditingFromReview(true);
    setStep(targetStep);
  }

  function computeFoodAgeSummary(): { foodAge: string; preparedDaysAgo: number; expirationInfo?: string } {
    if (category === "meal") {
      if (cookTiming === "today") {
        return { foodAge: "Cooked today", preparedDaysAgo: 0 };
      }
      return { foodAge: "Cooked 1 to 3 days ago", preparedDaysAgo: 2 };
    }
    if (packagingChoice === "packaged") {
      const label =
        expirationWindow === "within_3_days"
          ? `Expires within 3 days (${expirationDate})`
          : `Expires ${expirationDate}`;
      return { foodAge: label, preparedDaysAgo: 0, expirationInfo: label };
    }
    const duration = HOME_DURATION_OPTIONS.find((option) => option.id === homeDuration);
    const label = duration ? `In home ${duration.label}` : "In home";
    return {
      foodAge: label,
      preparedDaysAgo: homeDuration ? HOME_DURATION_DAYS[homeDuration] : 0,
      expirationInfo: label,
    };
  }

  function handlePublish() {
    const { foodAge, preparedDaysAgo, expirationInfo } = computeFoodAgeSummary();
    const formattedSlots = pickupTimes.map((time) => formatPickupSlot(pickupDate, time));
    onPublish({
      title: title.trim(),
      image: photoUrl || undefined,
      foodAge,
      preparedDaysAgo,
      keptRefrigerated: category === "meal" ? storageChoice === "refrigerated" : true,
      packagingType: category === "pantry" && packagingChoice ? packagingChoice : undefined,
      expirationInfo,
      allergens: allergenChoice === "contains" ? allergens : [],
      pickupType,
      slotLabel:
        pickupType === "immediate"
          ? "Immediate (Next 60 min)"
          : formatPickupSlots(pickupDate, pickupTimes),
      slotLabels: pickupType === "scheduled" ? formattedSlots : undefined,
    });
  }

  const progressPercent = `${Math.round((step / TOTAL_STEPS) * 100)}%`;

  function getStepHeader(): { headline: string; helper: string } {
    if (step === 1) {
      return {
        headline: "What kind of food are you sharing?",
        helper: "Choose the category that best matches your surplus food.",
      };
    }
    if (step === 2) {
      if (category === "meal") {
        return {
          headline: "When did you cook this meal?",
          helper: "Meals must be cooked within the last 3 days to keep neighbors safe.",
        };
      }
      return {
        headline: "Is the food sealed with an expiration date?",
        helper: "This tells us which freshness detail to show neighbors.",
      };
    }
    if (step === 3) {
      if (category === "meal") {
        return {
          headline: "How was this meal stored?",
          helper: "Home-cooked meals must stay refrigerated until pickup.",
        };
      }
      if (packagingChoice === "packaged") {
        return {
          headline: "When does this item expire?",
          helper: "Check the printed expiration date on the package.",
        };
      }
      return {
        headline: "How long has it been in your home?",
        helper: "",
      };
    }
    if (step === 4) {
      return {
        headline: "Does this food contain common allergens?",
        helper: "Neighbors with allergies rely on accurate disclosures.",
      };
    }
    if (step === 5) {
      return {
        headline: "When can a neighbor pick this up?",
        helper: "Immediate pickup helps neighbors rescue food within 60 minutes.",
      };
    }
    if (step === 6) {
      return {
        headline: "What should we call this listing?",
        helper: "Write a short, clear title with the food item and quantity.",
      };
    }
    if (step === 7) {
      return {
        headline: "Add a photo of your food",
        helper: "Upload a photo or generate one from your listing title.",
      };
    }
    return {
      headline: "Review your listing before publishing",
      helper: "Check your answers below. Tap Edit on any row to make changes.",
    };
  }

  const { headline, helper } = getStepHeader();
  const valid = isStepValid(step);

  return (
    <div
      style={{
        position: "relative",
        background: "var(--color-background-canvas, #ffffff)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar: Close + Progress */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-stack-sm, 8px)",
          padding: "16px 24px 8px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", minHeight: 36 }}>
          <IconButton
            variant="Ghost"
            size="SM"
            aria-label="Close donation flow"
            onClick={onClose}
            icon={<XMarkIcon width={20} height={20} strokeWidth={1.75} aria-hidden="true" />}
            style={{
              marginLeft: -8,
              borderRadius: "var(--radius-pill, 9999px)",
              color: "var(--color-icon-primary, #303036)",
            }}
          />
        </div>

        <Progress
          size="MD"
          mode="Determinate"
          value={progressPercent}
          showLabel={false}
          showValue={false}
        />
      </header>

      {/* Step Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "var(--space-stack-lg, 24px)",
          padding: "var(--space-inset-lg, 24px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs, 4px)" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "var(--font-size-heading-base, 20px)",
              lineHeight: "var(--line-height-heading, 1.2)",
              letterSpacing: "var(--letter-spacing-heading, -0.02em)",
              fontWeight: "var(--font-weight-semibold, 600)",
              color: "var(--color-text-primary, #303036)",
            }}
          >
            {headline}
          </h1>
          {helper ? (
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-body-sm, 14px)",
                color: "var(--color-text-secondary, #5c5c63)",
                lineHeight: 1.45,
              }}
            >
              {helper}
            </p>
          ) : null}
        </div>

        {/* Step 1: Food Category (2 options) */}
        {step === 1 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <OptionCard
              label="Home-cooked meal"
              description="A dish or meal you cooked at home."
              selected={category === "meal"}
              onClick={() => handleSelectCategory("meal")}
            />
            <OptionCard
              label="Pantry or produce"
              description="Groceries, fresh produce, or bakery items."
              selected={category === "pantry"}
              onClick={() => handleSelectCategory("pantry")}
            />
          </div>
        ) : null}

        {/* Step 2A: Cook Timing for Home-cooked meal (2 options) */}
        {step === 2 && category === "meal" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <OptionCard
              label="Cooked today"
              description="Prepared within the last 24 hours."
              selected={cookTiming === "today"}
              onClick={() => setCookTiming("today")}
            />
            <OptionCard
              label="1 to 3 days ago"
              description="Prepared within our 3-day safety limit."
              selected={cookTiming === "one_to_three_days"}
              onClick={() => setCookTiming("one_to_three_days")}
            />

            <button
              type="button"
              onClick={() => setShowThreeDaySheet(true)}
              style={{
                alignSelf: "flex-start",
                border: "none",
                background: "transparent",
                padding: "4px 0",
                fontSize: "var(--font-size-body-xs, 12px)",
                fontWeight: 600,
                color: "var(--color-text-secondary, #5c5c63)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Was this meal cooked more than 3 days ago?
            </button>
          </div>
        ) : null}

        {/* Step 2B: Packaging for Pantry or produce (2 options) */}
        {step === 2 && category === "pantry" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <OptionCard
              label="Packaged with date"
              description="Sealed item with a printed expiration date."
              selected={packagingChoice === "packaged"}
              onClick={() => handleSelectPackaging("packaged")}
            />
            <OptionCard
              label="Unpackaged item"
              description="Fresh produce, bread, or loose pantry food."
              selected={packagingChoice === "unpackaged"}
              onClick={() => handleSelectPackaging("unpackaged")}
            />
          </div>
        ) : null}

        {/* Step 3A: Storage for Home-cooked meal (2 options) */}
        {step === 3 && category === "meal" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <OptionCard
              label="Kept refrigerated"
              description="Stored in the fridge continuously since cooking."
              selected={storageChoice === "refrigerated"}
              onClick={() => setStorageChoice("refrigerated")}
            />
            <OptionCard
              label="Room temperature"
              description="Left out without refrigeration."
              selected={storageChoice === "room_temp"}
              error={storageChoice === "room_temp"}
              onClick={() => setStorageChoice("room_temp")}
            />

            {storageChoice === "room_temp" ? (
              <StepAlert>
                <strong>Refrigeration required:</strong> Home-cooked meals must be kept refrigerated to be listed on Kari.
              </StepAlert>
            ) : null}
          </div>
        ) : null}

        {/* Step 3B-1: Expiration window for Packaged food (2 options + date input) */}
        {step === 3 && category === "pantry" && packagingChoice === "packaged" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <OptionCard
              label="Within 3 days"
              description="Best used right away."
              selected={expirationWindow === "within_3_days"}
              onClick={() => {
                setExpirationWindow("within_3_days");
                setExpirationDate("2026-10-15");
              }}
            />
            <OptionCard
              label="In 4 or more days"
              description="Still has plenty of shelf life left."
              selected={expirationWindow === "four_plus_days"}
              onClick={() => {
                setExpirationWindow("four_plus_days");
                setExpirationDate("2026-10-24");
              }}
            />

            <PickerField
              type="date"
              label="Printed expiration date"
              value={expirationDate}
              isOpen={activePickerSheet === "expiration-date"}
              onOpen={() => setActivePickerSheet("expiration-date")}
            />
          </div>
        ) : null}

        {/* Step 3B-2: Time in house for Unpackaged food (2 options) */}
        {step === 3 && category === "pantry" && packagingChoice === "unpackaged" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm, 8px)" }}>
            {HOME_DURATION_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                selected={homeDuration === option.id}
                onClick={() => setHomeDuration(option.id)}
              />
            ))}
          </div>
        ) : null}

        {/* Step 4: Allergens (2 options + conditional chips) */}
        {step === 4 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm, 8px)" }}>
            {ALLERGEN_OPTIONS.map((allergen) => {
              const active = allergen === "None" ? allergenChoice === "none" : allergens.includes(allergen);
              const chipKey = `donation-allergen-${allergen}`;
              const hovered = hoveredChip === chipKey;
              return (
                <div
                  key={allergen}
                  onMouseEnter={() => setHoveredChip(chipKey)}
                  onMouseLeave={() => setHoveredChip((current) => (current === chipKey ? null : current))}
                >
                  <Chip
                    label={allergen}
                    selected={active ? "True" : "False"}
                    state={hovered ? "Hover" : "Default"}
                    showLeadingIcon={active}
                    leadingIcon={
                      active ? (
                        <CheckCircleIcon
                          width={16}
                          height={16}
                          style={{ color: "var(--color-icon-brand)" }}
                          aria-hidden="true"
                        />
                      ) : undefined
                    }
                    onClick={() => toggleAllergenChip(allergen)}
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Step 5: Pickup Timing (2 options, default: immediate) */}
        {step === 5 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <OptionCard
              label="Right now (next 60 min)"
              description="Ready for immediate neighborhood pickup."
              selected={pickupType === "immediate"}
              onClick={() => setPickupType("immediate")}
            />
            <OptionCard
              label="Scheduled time window"
              description="Offer one or more time slots for pickup."
              selected={pickupType === "scheduled"}
              onClick={() => setPickupType("scheduled")}
            />

            {pickupType === "scheduled" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
                <PickerField
                  type="date"
                  label="Pickup date"
                  value={pickupDate}
                  isOpen={activePickerSheet === "pickup-date"}
                  onOpen={() => setActivePickerSheet("pickup-date")}
                />
                <PickerField
                  type="time"
                  label="Pickup time slots"
                  value={pickupTimes.join(", ")}
                  isOpen={activePickerSheet === "pickup-time"}
                  onOpen={() => setActivePickerSheet("pickup-time")}
                />
                {pickupTimes.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm, 8px)" }}>
                    {pickupTimes.map((slotTime) => {
                      const chipKey = `pickup-slot-${slotTime}`;
                      const hovered = hoveredChip === chipKey;
                      return (
                        <div
                          key={slotTime}
                          onMouseEnter={() => setHoveredChip(chipKey)}
                          onMouseLeave={() => setHoveredChip((current) => (current === chipKey ? null : current))}
                        >
                          <Chip
                            label={slotTime}
                            selected="True"
                            state={hovered ? "Hover" : "Default"}
                            showRemove
                            onClick={() => togglePickupTime(slotTime)}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Step 6: Listing Title (1 option) */}
        {step === 6 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  fontSize: "var(--font-size-body-sm, 14px)",
                  fontWeight: 600,
                  color: "var(--color-text-primary, #303036)",
                }}
              >
                Listing title
              </span>
              <input
                autoFocus
                value={title}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="For example: 5 organic eggs, vegetable soup"
                style={{
                  height: 44,
                  paddingInline: 14,
                  borderRadius: "var(--radius-control, 8px)",
                  border: titleFocused
                    ? "var(--border-emphasis, 1.5px) solid var(--color-border-focus, #be240c)"
                    : "1px solid var(--color-border-subtle, #e6e7ed)",
                  outline: "none",
                  background: "var(--color-background-surface, #ffffff)",
                  font: "inherit",
                  fontSize: "var(--font-size-body-base, 16px)",
                  color: "var(--color-text-primary, #303036)",
                }}
              />
            </label>
          </div>
        ) : null}

        {/* Step 7: Upload or Generate Photo */}
        {step === 7 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              tabIndex={-1}
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <OptionCard
              label="Upload a photo"
              description="Choose a photo from your device."
              selected={photoSource === "upload"}
              onClick={handleUploadPhotoSelect}
            />
            <OptionCard
              label="Generate a photo"
              description="Create a photo from your listing title."
              selected={photoSource === "generate"}
              onClick={handleGeneratePhotoSelect}
            />

            {photoUrl ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs, 4px)" }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "15 / 10",
                    borderRadius: "var(--radius-card, 16px)",
                    overflow: "hidden",
                    background: "var(--color-background-subtle, #f8f9fc)",
                  }}
                >
                  <img
                    src={photoUrl}
                    alt="Food listing preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: photoImproved ? "brightness(1.08) contrast(1.08) saturate(1.16)" : "none",
                      transition: "filter 200ms ease",
                    }}
                  />
                </div>

                {photoSource === "upload" ? (
                  <Button
                    variant="Link secondary"
                    size="SM"
                    leadingIcon
                    leadingIconSwap={<SparklesIcon width={16} height={16} strokeWidth={2} aria-hidden="true" />}
                    label={photoImproved ? "Improved with AI" : "Improve with AI"}
                    onClick={() => setPhotoImproved((prev) => !prev)}
                    style={{ alignSelf: "flex-start" }}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Step 8: Review & Publish */}
        {step === 8 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ReviewRow
              label="Food category"
              value={category === "meal" ? "Home-cooked meal" : "Pantry or produce"}
              onEdit={() => jumpToStep(1)}
            />
            <ReviewRow
              label={category === "meal" ? "Cook time" : "Packaging"}
              value={
                category === "meal"
                  ? cookTiming === "today"
                    ? "Cooked today"
                    : "1 to 3 days ago"
                  : packagingChoice === "packaged"
                    ? "Packaged with date"
                    : "Unpackaged item"
              }
              onEdit={() => jumpToStep(2)}
            />
            <ReviewRow
              label={
                category === "meal"
                  ? "Storage"
                  : packagingChoice === "packaged"
                    ? "Expiration"
                    : "Time in home"
              }
              value={
                category === "meal"
                  ? "Kept refrigerated"
                  : packagingChoice === "packaged"
                    ? `${expirationWindow === "within_3_days" ? "Within 3 days" : "In 4 or more days"} (${expirationDate})`
                    : HOME_DURATION_OPTIONS.find((option) => option.id === homeDuration)?.label ?? ""
              }
              onEdit={() => jumpToStep(3)}
            />
            <ReviewRow
              label="Allergens"
              value={allergenChoice === "contains" && allergens.length > 0 ? allergens.join(", ") : "None"}
              onEdit={() => jumpToStep(4)}
            />
            <ReviewRow
              label="Pickup timing"
              value={pickupType === "immediate" ? "Right now (next 60 min)" : formatPickupSlots(pickupDate, pickupTimes)}
              onEdit={() => jumpToStep(5)}
            />
            <ReviewRow
              label="Listing title"
              value={title.trim()}
              onEdit={() => jumpToStep(6)}
            />
            <ReviewRow
              label="Photo"
              value={
                photoSource === "generate"
                  ? "Generated photo"
                  : photoImproved
                    ? "Uploaded photo (improved with AI)"
                    : "Uploaded photo"
              }
              onEdit={() => jumpToStep(7)}
            />
          </div>
        ) : null}

        {/* Bottom Action Bar */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-stack-sm, 8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm, 8px)", width: "100%" }}>
            {step > 1 ? (
              <Button
                variant="Outline"
                size="MD"
                label="Previous"
                leadingIcon
                leadingIconSwap={
                  <ChevronLeftIcon
                    width={16}
                    height={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                }
                onClick={handleBack}
                style={{ flex: 1 }}
              />
            ) : null}

            {step < TOTAL_STEPS ? (
              <Button
                variant="Primary"
                size="MD"
                disabled={!valid}
                label={
                  canReturnToReview()
                    ? "Save & return"
                    : step === TOTAL_STEPS - 1
                      ? "Review listing"
                      : "Continue"
                }
                trailingIcon
                trailingIconSwap={
                  <ChevronRightIcon
                    width={16}
                    height={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                }
                onClick={handleContinue}
                style={{ flex: 1 }}
              />
            ) : (
              <Button
                variant="Primary"
                size="MD"
                label="Publish donation"
                onClick={handlePublish}
                style={{ flex: 1 }}
              />
            )}
          </div>
        </div>
      </div>

      {showThreeDaySheet ? (
        <div
          role="presentation"
          className="food-sheet-backdrop"
          onClick={() => setShowThreeDaySheet(false)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "flex-end",
            background: "rgba(48, 48, 54, 0.4)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="three-day-rule-title"
            className="food-sheet-modal"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-stack-md, 16px)",
              padding: "var(--space-inset-lg, 24px)",
              background: "var(--color-background-surface, #ffffff)",
              borderRadius: "var(--radius-sheet, 28px) var(--radius-sheet, 28px) 0 0",
              boxShadow: "var(--elevation-5)",
              color: "var(--color-text-secondary, #5c5c63)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                alignSelf: "center",
                width: "var(--spacing-48, 48px)",
                height: "var(--size-dot-sm, 8px)",
                marginTop: -8,
                borderRadius: "var(--radius-pill, 9999px)",
                background: "var(--color-border-subtle, #e6e7ed)",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-inline-sm, 8px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm, 8px)" }}>
                <ExclamationTriangleIcon
                  width={20}
                  height={20}
                  aria-hidden="true"
                  style={{ flexShrink: 0, color: "var(--color-text-secondary, #5c5c63)" }}
                />
                <h2
                  id="three-day-rule-title"
                  style={{
                    margin: 0,
                    fontSize: "var(--font-size-heading-sm, 18px)",
                    fontWeight: "var(--font-weight-semibold, 700)",
                    color: "var(--color-text-secondary, #5c5c63)",
                  }}
                >
                  3-Day Safety Rule
                </h2>
              </div>
              <IconButton
                variant="Ghost"
                size="SM"
                aria-label="Close"
                onClick={() => setShowThreeDaySheet(false)}
                icon={<XMarkIcon width={18} height={18} strokeWidth={1.75} aria-hidden="true" />}
                style={{
                  marginRight: -8,
                  borderRadius: "var(--radius-pill, 9999px)",
                  color: "var(--color-text-secondary, #5c5c63)",
                }}
              />
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-body-sm, 14px)",
                lineHeight: 1.5,
                color: "var(--color-text-secondary, #5c5c63)",
              }}
            >
              Meals cooked more than 3 days ago cannot be posted on Kari to protect neighbor health. Please compost or dispose of it safely.
            </p>
          </div>
        </div>
      ) : null}

      {activePickerSheet ? (
        <div
          role="presentation"
          className="food-sheet-backdrop"
          onClick={() => setActivePickerSheet(null)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "flex-end",
            background: "rgba(48, 48, 54, 0.4)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="picker-sheet-title"
            className="food-sheet-modal"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-stack-sm, 8px)",
              padding: "var(--space-inset-md, 16px) var(--space-inset-lg, 24px) var(--space-inset-lg, 24px)",
              background: "var(--color-background-surface, #ffffff)",
              borderRadius: "var(--radius-sheet, 28px) var(--radius-sheet, 28px) 0 0",
              boxShadow: "var(--elevation-5)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                alignSelf: "center",
                width: "var(--spacing-48, 48px)",
                height: "var(--size-dot-sm, 8px)",
                borderRadius: "var(--radius-pill, 9999px)",
                background: "var(--color-border-subtle, #e6e7ed)",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-inline-sm, 8px)",
              }}
            >
              <h2
                id="picker-sheet-title"
                style={{
                  margin: 0,
                  fontSize: "var(--font-size-heading-sm, 18px)",
                  fontWeight: "var(--font-weight-semibold, 600)",
                  color: "var(--color-text-primary, #303036)",
                }}
              >
                {activePickerSheet === "expiration-date"
                  ? "Printed expiration date"
                  : activePickerSheet === "pickup-date"
                    ? "Pickup date"
                    : "Pickup time slots"}
              </h2>
              <IconButton
                variant="Ghost"
                size="SM"
                aria-label="Close"
                onClick={() => setActivePickerSheet(null)}
                icon={<XMarkIcon width={18} height={18} strokeWidth={1.75} aria-hidden="true" />}
                style={{
                  marginRight: -8,
                  borderRadius: "var(--radius-pill, 9999px)",
                  color: "var(--color-text-secondary, #5c5c63)",
                }}
              />
            </div>

            {activePickerSheet === "expiration-date" || activePickerSheet === "pickup-date" ? (
              <Calendar
                months={1}
                showPresets={false}
                showTime={false}
                showFooter={false}
                value={activePickerSheet === "expiration-date" ? expirationDate : pickupDate}
                onChange={(iso) => {
                  if (activePickerSheet === "expiration-date") {
                    setExpirationDate(iso);
                  } else {
                    setPickupDate(iso);
                  }
                  setActivePickerSheet(null);
                }}
                style={{
                  width: "100%",
                  border: "none",
                  boxShadow: "none",
                  padding: 0,
                }}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
                <TimeList
                  options={generateQuarterHourSlots(6, 23)}
                  selectedValue={pickupTimes[0] || "09:30"}
                  selectedValues={pickupTimes}
                  maxVisibleItems={6}
                  onSelect={togglePickupTime}
                  style={{
                    border: "none",
                    boxShadow: "none",
                    paddingBlock: 0,
                  }}
                />
                <Button
                  variant="Primary"
                  size="MD"
                  label={pickupTimes.length > 0 ? `Done (${pickupTimes.length} selected)` : "Done"}
                  onClick={() => setActivePickerSheet(null)}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
