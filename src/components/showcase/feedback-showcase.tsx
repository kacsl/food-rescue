import { Banner, Loader, Progress, Skeleton, type BannerTone } from "valere-DS";
import { SectionHeader } from "./section-header";

const BANNER_TONES: { tone: BannerTone; message: string }[] = [
  { tone: "Info", message: "New Kari food waste analytics system tokens synchronized with Figma." },
  { tone: "Success", message: "All 18 food distribution partners connected successfully." },
  { tone: "Warning", message: "Cold storage temperature threshold alert in Facility B." },
  { tone: "Error", message: "Failed to sync inventory ledger. Automatic retry scheduled." },
];

export function FeedbackShowcase() {
  return (
    <section style={{ marginBottom: "var(--space-stack-xl)" }}>
      <SectionHeader
        id="feedback"
        title="Feedback & Status"
        description="Banners, progress bars, loaders, and loading skeletons."
        badge="Components"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-lg)" }}>
        {/* Banners */}
        <div>
          <h4 style={{ margin: "0 0 var(--space-stack-sm) 0", fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
            Banners (All Semantic Tones)
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-sm)", borderRadius: "var(--radius-control)", overflow: "hidden" }}>
            {BANNER_TONES.map((b) => (
              <Banner
                key={b.tone}
                tone={b.tone}
                message={b.message}
                actionLabel="Details"
                showAction
                showClose={false}
                showIcon
              />
            ))}
          </div>
        </div>

        {/* Progress & Loaders */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(calc(var(--size-dialog-xs) + var(--spacing-32)), 1fr))",
            gap: "var(--space-inline-lg)",
            alignItems: "start",
          }}
        >
          {/* Progress */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
            <h4 style={{ margin: 0, fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
              Progress Indicators
            </h4>
            <Progress label="Food rescue quota reached" value="78%" size="MD" />
            <Progress label="Processing transfer logs" mode="Indeterminate" size="LG" />
          </div>

          {/* Loaders */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
            <h4 style={{ margin: 0, fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
              Loaders
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-lg)" }}>
              <Loader scope="Inline" label="Loading data…" />
              <Loader scope="Block" label="Processing…" />
            </div>
          </div>

          {/* Skeletons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
            <h4 style={{ margin: 0, fontSize: "var(--font-size-body-sm)", color: "var(--color-text-secondary)" }}>
              Skeleton Placeholders
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-md)" }}>
              <Skeleton shape="Circle" />
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)", flex: 1 }}>
                <Skeleton shape="Line" />
                <Skeleton shape="Line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
