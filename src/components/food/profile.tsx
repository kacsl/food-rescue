import { useState } from "react";
import { Button, IconButton } from "@/components/ds/button";
import { Checkbox } from "@/components/ds/checkbox";
import { Chip } from "@/components/ds/chip";
import { EditableAvatar } from "@/components/ds/editable-avatar";
import { SettingsRow } from "@/components/ds/settings-row";
import { Stat } from "@/components/ds/stat";
import { Toast } from "@/components/ds/toast";
import {
  ChevronLeftIcon,
  PencilIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

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
  onLogout,
}: {
  profile: ProfileRecord;
  onClose: () => void;
  onOpenData: () => void;
  onOpenAllergies: () => void;
  onPhotoChange: (photo: string) => void;
  onLogout: () => void;
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
          <SettingsRow icon={<ShieldExclamationIcon width={22} height={22} strokeWidth={1.75} />} label="Allergies and preferences" onClick={onOpenAllergies} />
        </div>
        <Button
          variant="Link secondary"
          size="SM"
          label="Log out"
          onClick={onLogout}
          style={{ alignSelf: "flex-start" }}
        />
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
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  function save() {
    const nextName = name.trim();
    const nextEmail = email.trim();
    if (!nextName) {
      setError("Add your name.");
      setShowToast(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setError("Enter a valid email.");
      setShowToast(false);
      return;
    }
    if (password && password.length < 8) {
      setError("Password must be at least 8 characters.");
      setShowToast(false);
      return;
    }
    setError("");
    onSave({ name: nextName, email: nextEmail, password: password || profile.password });
    setPassword("");
    setIsEditing(false);
    setShowToast(true);
  }

  return (
    <div
      style={{
        background: "var(--color-background-canvas, #ffffff)",
        minHeight: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageHeader title="Profile data" onBack={onBack} />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "var(--space-stack-md, 16px)",
          padding: "var(--space-inset-lg, 24px)",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (isEditing) {
            save();
          }
        }}
      >
        <Field
          label="Name"
          value={name}
          onChange={(val) => {
            setShowToast(false);
            setName(val);
          }}
          autoComplete="name"
          disabled={!isEditing}
        />
        <Field
          label="Email"
          value={email}
          onChange={(val) => {
            setShowToast(false);
            setEmail(val);
          }}
          type="email"
          autoComplete="email"
          disabled={!isEditing}
        />
        <Field
          label="Password"
          value={isEditing ? password : "••••••••"}
          onChange={(val) => {
            setShowToast(false);
            setPassword(val);
          }}
          type="password"
          autoComplete="new-password"
          placeholder="New password"
          disabled={!isEditing}
        />
        {error ? (
          <p style={{ margin: 0, color: "var(--color-text-error, #9c1b12)", fontSize: "var(--font-size-body-sm)" }}>
            {error}
          </p>
        ) : null}

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-stack-md, 16px)" }}>
          {showToast ? (
            <Toast
              tone="Success"
              title="Edits successfully saved"
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
              leadingIcon
              leadingIconSwap={<PencilIcon width={16} height={16} strokeWidth={2} aria-hidden="true" />}
              onClick={() => {
                setShowToast(false);
                setError("");
                setIsEditing(true);
              }}
              style={{ width: "100%" }}
            />
          )}
        </div>
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
        flex: 1,
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
          {isEditing ? (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm, 8px)" }}>
                {ALLERGENS.map((allergen) => {
                  const active = allergen === "None" ? allergies.length === 0 : allergies.includes(allergen);
                  const chipKey = `allergen-${allergen}`;
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
                        onClick={() => toggleAllergen(allergen)}
                      />
                    </div>
                  );
                })}
              </div>
              <Checkbox
                selection={hideMatchingAllergies ? "Checked" : "Unchecked"}
                state="Default"
                size="MD"
                label="Hide foods that contain my allergies"
                showDescription={false}
                onClick={() => {
                  setShowToast(false);
                  setHideMatchingAllergies((prev) => !prev);
                }}
              />
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs, 4px)" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--font-size-body-base, 16px)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {allergies.length > 0 ? allergies.join(", ") : "None"}
              </p>
              {hideMatchingAllergies ? (
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--font-size-body-base, 16px)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Hide foods that contain my allergies
                </p>
              ) : null}
            </div>
          )}
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
          {isEditing ? (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-inline-sm, 8px)" }}>
                {PREFERENCES.map((preference) => {
                  const active = preferences.includes(preference);
                  const chipKey = `preference-${preference}`;
                  const hovered = hoveredChip === chipKey;
                  return (
                    <div
                      key={preference}
                      onMouseEnter={() => setHoveredChip(chipKey)}
                      onMouseLeave={() => setHoveredChip((current) => (current === chipKey ? null : current))}
                    >
                      <Chip
                        label={preference}
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
                        onClick={() => togglePreference(preference)}
                      />
                    </div>
                  );
                })}
              </div>
              <Checkbox
                selection={hideNonMatchingPreferences ? "Checked" : "Unchecked"}
                state="Default"
                size="MD"
                label="Hide food that doesn't meet my preferences"
                showDescription={false}
                onClick={() => {
                  setShowToast(false);
                  setHideNonMatchingPreferences((prev) => !prev);
                }}
              />
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs, 4px)" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--font-size-body-base, 16px)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {preferences.length > 0 ? preferences.join(", ") : "None"}
              </p>
              {hideNonMatchingPreferences ? (
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--font-size-body-base, 16px)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Hide food that doesn&apos;t meet my preferences
                </p>
              ) : null}
            </div>
          )}
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
              leadingIcon
              leadingIconSwap={<PencilIcon width={16} height={16} strokeWidth={2} aria-hidden="true" />}
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
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: "var(--font-size-body-sm)", fontWeight: 600 }}>{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange(event.target.value)}
        style={{
          height: 44,
          paddingInline: 14,
          borderRadius: "var(--radius-control, 8px)",
          border:
            focused && !disabled
              ? "var(--border-emphasis, 1.5px) solid var(--color-border-focus)"
              : "1px solid var(--color-border-subtle)",
          outline: "none",
          background: disabled ? "var(--color-background-subtle, #f8f9fc)" : "var(--color-background-surface, #ffffff)",
          font: "inherit",
          fontSize: "var(--font-size-body-base)",
          color: disabled ? "var(--color-text-disabled, #b4b5bd)" : "var(--color-text-primary)",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
    </label>
  );
}
