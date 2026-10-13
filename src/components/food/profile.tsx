import { useState } from "react";
import { Button, IconButton } from "valere-DS";
import { Checkbox } from "@/components/ds/checkbox";
import { Chip } from "@/components/ds/chip";
import { EditableAvatar } from "@/components/ds/editable-avatar";
import { SettingsRow } from "@/components/ds/settings-row";
import { Stat } from "@/components/ds/stat";
import { Toast } from "@/components/ds/toast";
import {
  CheckIcon,
  ChevronLeftIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export type ProfileRecord = {
  name: string;
  email: string;
  password: string;
  photo?: string;
  allergies: string[];
  preferences: string[];
  hideMatchingAllergies: boolean;
  hideNonMatchingPreferences: boolean;
};

export const INITIAL_PROFILE: ProfileRecord = {
  name: "Kari",
  email: "kari@example.com",
  password: "",
  allergies: [],
  preferences: [],
  hideMatchingAllergies: false,
  hideNonMatchingPreferences: false,
};

const ALLERGENS = ["None", "Dairy", "Gluten", "Nuts", "Eggs", "Seafood", "Soy"];
const PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Ovo-lacto vegetarian",
  "Lacto vegetarian",
  "Ovo vegetarian",
  "Pescatarian",
  "Plant-based",
];

export function ProfileMenu({
  profile,
  onClose,
  onOpenData,
  onOpenAllergies,
  onPhotoChange,
}: {
  profile: ProfileRecord;
  onClose: () => void;
  onOpenData: () => void;
  onOpenAllergies: () => void;
  onPhotoChange: (photo: string) => void;
}) {
  return (
    <div
      style={{
        background: "var(--color-background-canvas, #ffffff)",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ padding: "16px 20px 0 20px" }}>
        <IconButton
          variant="Ghost"
          size="MD"
          aria-label="Close profile"
          onClick={onClose}
          icon={<XMarkIcon width={24} height={24} strokeWidth={1.75} aria-hidden="true" />}
          style={{ marginLeft: -8, borderRadius: "var(--radius-pill, 9999px)", color: "var(--color-icon-primary, #303036)" }}
        />
        <h1
          style={{
            margin: "8px 0 0 0",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary, #303036)",
          }}
        >
          Profile
        </h1>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 24, padding: 20, paddingTop: 16 }}>
        {/* Profile Card with enlarged avatar, verified badge, name, location, and metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            alignItems: "center",
            padding: "24px 20px",
            borderRadius: 24,
            background: "var(--color-background-surface, #ffffff)",
            boxShadow: "0 6px 24px rgba(48, 48, 54, 0.08)",
          }}
        >
          {/* Left Column: Avatar + Name with Verified Icon + Location */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              paddingRight: 16,
            }}
          >
            <EditableAvatar name={profile.name} src={profile.photo} size={96} onPhotoChange={onPhotoChange} />

            <div
              style={{
                marginTop: 12,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 22,
                fontWeight: 700,
                color: "var(--color-text-primary, #303036)",
                lineHeight: 1.2,
              }}
            >
              <span>{profile.name}</span>
              <span
                title="Verified neighbor"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "var(--color-icon-muted, #75757d)",
                }}
              >
                <ShieldCheckIcon width={18} height={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                color: "var(--color-text-secondary, #5c5c63)",
              }}
            >
              Granja Viana
            </div>
          </div>

          {/* Right Column: 10 donations ; 10 claims */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Stat value="10" label="Donations" />
            <div style={{ height: 1, background: "var(--color-border-subtle, #e6e7ed)", marginBlock: 16 }} />
            <Stat value="10" label="Claims" />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <SettingsRow icon={<UserCircleIcon width={22} height={22} strokeWidth={1.75} />} label="Profile data" onClick={onOpenData} />
          <SettingsRow icon={<ShieldCheckIcon width={22} height={22} strokeWidth={1.75} />} label="Allergies and preferences" onClick={onOpenAllergies} />
        </div>
      </section>
    </div>
  );
}

export function ProfileDataPage({
  profile,
  onBack,
  onSave,
}: {
  profile: ProfileRecord;
  onBack: () => void;
  onSave: (next: Pick<ProfileRecord, "name" | "email" | "password">) => void;
}) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    const nextName = name.trim();
    const nextEmail = email.trim();
    if (!nextName) {
      setError("Add your name.");
      setSaved(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setError("Enter a valid email.");
      setSaved(false);
      return;
    }
    if (password && password.length < 8) {
      setError("Password must be at least 8 characters.");
      setSaved(false);
      return;
    }
    setError("");
    setSaved(true);
    onSave({ name: nextName, email: nextEmail, password: password || profile.password });
    setPassword("");
  }

  return (
    <div
      style={{
        background: "var(--color-background-canvas, #ffffff)",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageHeader title="Profile data" onBack={onBack} />
      <form
        style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <Field label="Name" value={name} onChange={setName} autoComplete="name" />
        <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" />
        <Field label="Password" value={password} onChange={setPassword} type="password" autoComplete="new-password" placeholder="New password" />
        {error ? <p style={{ margin: 0, color: "var(--color-text-error, #9c1b12)", fontSize: "var(--font-size-body-sm)" }}>{error}</p> : null}
        {saved ? <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-sm)" }}>Saved.</p> : null}
        <Button variant="Primary" size="MD" label="Save" onClick={save} style={{ width: "100%" }} />
      </form>
    </div>
  );
}

export function AllergiesPage({
  profile,
  onBack,
  onSave,
}: {
  profile: ProfileRecord;
  onBack: () => void;
  onSave: (
    next: Pick<
      ProfileRecord,
      "allergies" | "preferences" | "hideMatchingAllergies" | "hideNonMatchingPreferences"
    >,
  ) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [allergies, setAllergies] = useState(profile.allergies ?? []);
  const [preferences, setPreferences] = useState(profile.preferences ?? []);
  const [hideMatchingAllergies, setHideMatchingAllergies] = useState(
    Boolean(profile.hideMatchingAllergies),
  );
  const [hideNonMatchingPreferences, setHideNonMatchingPreferences] = useState(
    Boolean(profile.hideNonMatchingPreferences),
  );
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  function toggleAllergen(name: string) {
    if (!isEditing) return;
    setShowToast(false);
    if (name === "None") {
      setAllergies([]);
      return;
    }
    setAllergies((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]));
  }

  function togglePreference(name: string) {
    if (!isEditing) return;
    setShowToast(false);
    setPreferences((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]));
  }

  function save() {
    onSave({
      allergies,
      preferences,
      hideMatchingAllergies,
      hideNonMatchingPreferences,
    });
    setIsEditing(false);
    setShowToast(true);
  }

  return (
    <div
      style={{
        background: "var(--color-background-canvas, #ffffff)",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageHeader title="Allergies and preferences" onBack={onBack} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "var(--space-stack-lg, 24px)",
          padding: "var(--space-inset-lg, 24px)",
        }}
      >
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm, 8px)" }}>
          <h4
            style={{
              margin: 0,
              fontSize: "var(--font-size-heading-base, 20px)",
              lineHeight: "var(--line-height-heading, 1.2)",
              letterSpacing: "var(--letter-spacing-heading, -0.02em)",
              fontWeight: "var(--font-weight-semibold, 600)",
              color: "var(--color-text-primary)",
            }}
          >
            Allergies
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm, 8px)" }}>
            {ALLERGENS.map((allergen) => {
              const active = allergen === "None" ? allergies.length === 0 : allergies.includes(allergen);
              const chipKey = `allergen-${allergen}`;
              const hovered = isEditing && hoveredChip === chipKey;
              return (
                <div
                  key={allergen}
                  onMouseEnter={() => isEditing && setHoveredChip(chipKey)}
                  onMouseLeave={() => setHoveredChip((current) => (current === chipKey ? null : current))}
                >
                  <Chip
                    label={allergen}
                    selected={active ? "True" : "False"}
                    state={!isEditing ? "Disabled" : hovered ? "Hover" : "Default"}
                    showLeadingIcon={active}
                    leadingIcon={
                      active ? <CheckIcon width={14} height={14} strokeWidth={2.25} aria-hidden="true" /> : undefined
                    }
                    onClick={() => toggleAllergen(allergen)}
                  />
                </div>
              );
            })}
          </div>
          <Checkbox
            selection={hideMatchingAllergies ? "Checked" : "Unchecked"}
            state={isEditing ? "Default" : "Disabled"}
            size="MD"
            label="Hide foods that contain my allergies"
            showDescription={false}
            onClick={() => {
              if (!isEditing) return;
              setShowToast(false);
              setHideMatchingAllergies((prev) => !prev);
            }}
          />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm, 8px)" }}>
          <h4
            style={{
              margin: 0,
              fontSize: "var(--font-size-heading-base, 20px)",
              lineHeight: "var(--line-height-heading, 1.2)",
              letterSpacing: "var(--letter-spacing-heading, -0.02em)",
              fontWeight: "var(--font-weight-semibold, 600)",
              color: "var(--color-text-primary)",
            }}
          >
            Preferences
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm, 8px)" }}>
            {PREFERENCES.map((preference) => {
              const active = preferences.includes(preference);
              const chipKey = `preference-${preference}`;
              const hovered = isEditing && hoveredChip === chipKey;
              return (
                <div
                  key={preference}
                  onMouseEnter={() => isEditing && setHoveredChip(chipKey)}
                  onMouseLeave={() => setHoveredChip((current) => (current === chipKey ? null : current))}
                >
                  <Chip
                    label={preference}
                    selected={active ? "True" : "False"}
                    state={!isEditing ? "Disabled" : hovered ? "Hover" : "Default"}
                    showLeadingIcon={active}
                    leadingIcon={
                      active ? <CheckIcon width={14} height={14} strokeWidth={2.25} aria-hidden="true" /> : undefined
                    }
                    onClick={() => togglePreference(preference)}
                  />
                </div>
              );
            })}
          </div>
          <Checkbox
            selection={hideNonMatchingPreferences ? "Checked" : "Unchecked"}
            state={isEditing ? "Default" : "Disabled"}
            size="MD"
            label="Hide food that doesn't meet my preferences"
            showDescription={false}
            onClick={() => {
              if (!isEditing) return;
              setShowToast(false);
              setHideNonMatchingPreferences((prev) => !prev);
            }}
          />
        </section>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
          {showToast ? (
            <Toast
              tone="Success"
              title="Preferences saved"
              showBody={false}
              showAction={false}
              showClose
              onClose={() => setShowToast(false)}
            />
          ) : null}
          {isEditing ? (
            <Button
              variant="Primary"
              size="MD"
              label="Save"
              onClick={save}
              style={{ width: "100%" }}
            />
          ) : (
            <Button
              variant="Primary"
              size="MD"
              label="Edit"
              onClick={() => {
                setShowToast(false);
                setIsEditing(true);
              }}
              style={{ width: "100%" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function PageHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 8, padding: 24, paddingBottom: 8 }}>
      <IconButton
        variant="Ghost"
        size="MD"
        aria-label="Back to profile"
        onClick={onBack}
        icon={<ChevronLeftIcon width={22} height={22} strokeWidth={1.75} aria-hidden="true" />}
        style={{ marginLeft: -8, borderRadius: "var(--radius-pill, 9999px)", color: "var(--color-icon-primary, #303036)" }}
      />
      <h1 style={{ margin: 0, fontSize: "var(--font-size-body-base, 16px)", fontWeight: 600 }}>{title}</h1>
    </header>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: 600 }}>{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        style={{
          height: 44,
          paddingInline: 14,
          borderRadius: "var(--radius-control, 8px)",
          border: "1px solid var(--color-border-subtle)",
          font: "inherit",
          fontSize: "var(--font-size-body-base)",
          color: "var(--color-text-primary)",
        }}
      />
    </label>
  );
}
