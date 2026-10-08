import {
  Avatar,
  BreadcrumbItem,
  Card,
  Kbd,
  Separator,
  StatTile,
  Tab,
  type AvatarSize,
} from "valere-DS";
import { KariAvatar } from "@/components/ds/avatar";
import { BottomNav } from "@/components/ds/bottom-nav";
import { SectionHeader } from "./section-header";

const AVATAR_SIZES: AvatarSize[] = ["SM", "MD", "LG", "XL", "2XL"];

export function DataShowcase() {
  return (
    <section style={{ marginBottom: "var(--space-stack-xl)" }}>
      <SectionHeader
        id="data-containers"
        title="Data, Containers & Navigation"
        description="Cards, metrics tiles, avatars, tabs, breadcrumbs, and badges."
        badge="Components"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-lg)" }}>
        {/* Stat Tiles */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Stat Tiles
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(calc(var(--size-dialog-xs) - var(--spacing-32)), 1fr))",
              gap: "var(--space-inline-md)",
            }}
          >
            <StatTile label="Rescued Food Volume" value="14,820 kg" change="+18.4%" direction="Up" tone="Positive" period="vs last month" />
            <StatTile label="Landfill Diverted" value="92.4%" change="+4.1%" direction="Up" tone="Positive" period="vs goal" />
            <StatTile label="Storage Spoilage" value="2.1%" change="-0.8%" direction="Down" tone="Positive" period="vs last week" />
            <StatTile label="Delayed Logistics" value="12 runs" change="+3 runs" direction="Up" tone="Negative" period="needs attention" />
          </div>
        </div>

        {/* Avatars & Kbd */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(calc(var(--size-dialog-xs) + var(--spacing-16)), 1fr))",
            gap: "var(--space-inline-lg)",
            alignItems: "start",
          }}
        >
          {/* C17 - Avatar (Figma Specification) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-xs)" }}>
              <h4 style={{ margin: 0, fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
                C17 – Avatar (Updated from Figma)
              </h4>
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 6px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--color-background-brand-subtle)",
                  color: "var(--color-text-brand)",
                  fontWeight: 600,
                }}
              >
                Figma 90:47
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-md)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <KariAvatar state="Default" />
                <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Default</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <KariAvatar state="Hover" />
                <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Hover</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <KariAvatar state="Pressed" />
                <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Pressed</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <KariAvatar state="Disabled" />
                <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Disabled</span>
              </div>
            </div>
          </div>

          {/* Standard DS Avatars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
            <h4 style={{ margin: 0, fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
              Base DS Avatars (Initials SM to 2XL)
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-md)" }}>
              {AVATAR_SIZES.map((size) => (
                <Avatar key={size} size={size} initials="KF" showStatus />
              ))}
            </div>
          </div>
        </div>

        {/* Keyboard Keys */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)" }}>
          <h4 style={{ margin: 0, fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Keyboard Shortcut Badges (Kbd)
          </h4>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-xs)" }}>
            <Kbd keyLabel="⌘" size="MD" />
            <Kbd keyLabel="K" size="MD" />
            <span style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-tertiary)", marginLeft: "var(--space-inline-xs)" }}>
              Quick search
            </span>
          </div>
        </div>

        {/* C49 - Bottom Navigation (Figma Specification) */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-xs)", marginBottom: "var(--space-stack-sm)" }}>
            <h4 style={{ margin: 0, fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
              C49 - Bottom navigation (Updated from Figma)
            </h4>
            <span
              style={{
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "var(--radius-pill)",
                background: "var(--color-background-brand-subtle)",
                color: "var(--color-text-brand)",
                fontWeight: 600,
              }}
            >
              Figma 3035:7430
            </span>
          </div>
          <div
            style={{
              padding: "var(--space-inset-lg)",
              borderRadius: "var(--radius-card-md, 12px)",
              border: "1px dashed var(--color-border-subtle)",
              background: "var(--color-background-subtle)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BottomNav />
          </div>
        </div>

        {/* Navigation Elements: Breadcrumbs & Tabs */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Navigation Elements (Breadcrumbs & Tabs)
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
            {/* Breadcrumb row */}
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-xs)" }}>
              <BreadcrumbItem label="Home" type="Link" showSeparator />
              <BreadcrumbItem label="Projects" type="Link" showSeparator />
              <BreadcrumbItem label="Kari Food Waste" type="Current" showSeparator={false} />
            </nav>

            <Separator />

            {/* Tabs row */}
            <div role="tablist" style={{ display: "flex", gap: "var(--space-inline-xs)" }}>
              <Tab label="Component Specs" selected="True" state="Default" />
              <Tab label="Token Bindings" selected="False" state="Default" />
              <Tab label="Figma Variants" selected="False" state="Default" />
              <Tab label="Disabled Tab" selected="False" state="Disabled" />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Cards (Outlined & Elevated)
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(calc(var(--size-dialog-xs) + var(--spacing-32)), 1fr))",
              gap: "var(--space-inline-md)",
            }}
          >
            <Card
              variant="Outlined"
              title="Outlined Card Variant"
              body="Uses subtle border variable with canvas/surface background."
              actionLabel="Inspect Token"
            />
            <Card
              variant="Elevated"
              title="Elevated Card Variant"
              body="Uses elevation shadows defined in the Valere design tokens."
              actionLabel="View Elevation"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
