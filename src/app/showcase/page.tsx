"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ds/logo";
import { BadgeChipShowcase } from "@/components/showcase/badge-chip-showcase";
import { ButtonShowcase } from "@/components/showcase/button-showcase";
import { DataShowcase } from "@/components/showcase/data-showcase";
import { FeedbackShowcase } from "@/components/showcase/feedback-showcase";
import { FormShowcase } from "@/components/showcase/form-showcase";
import { TokenPaletteShowcase } from "@/components/showcase/token-palette";

const SECTIONS = [
  { id: "color-tokens", label: "Color Tokens" },
  { id: "buttons", label: "Buttons" },
  { id: "badges-chips", label: "Badges & Chips" },
  { id: "forms", label: "Forms & Inputs" },
  { id: "feedback", label: "Feedback" },
  { id: "data-containers", label: "Data & Cards" },
];

function ShowcaseHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "var(--space-inline-md)",
        paddingBottom: "var(--space-stack-lg)",
        borderBottom: "var(--border-hairline) solid var(--color-border-subtle)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-md)" }}>
        <Logo variant="landscape" size="md" />

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack-xs)" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "var(--font-size-heading-lg)",
              fontWeight: "var(--font-weight-bold)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-text-primary)",
            }}
          >
            Design System Components
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "var(--font-size-body-base)",
              color: "var(--color-text-secondary)",
            }}
          >
            Valere Design System components with tokens synchronized from Figma. Supports full Light and Dark modes.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-inline-sm)" }}>
        <ThemeToggle />
      </div>
    </header>
  );
}

function SectionNav() {
  return (
    <nav
      aria-label="Component sections"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-inline-xs)",
        paddingBlock: "var(--space-stack-sm)",
      }}
    >
      {SECTIONS.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "var(--space-inset-xs) var(--space-inset-sm)",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-background-subtle)",
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-caption)",
            fontWeight: "var(--font-weight-semibold)",
            textDecoration: "none",
            border: "var(--border-hairline) solid var(--color-border-subtle)",
          }}
        >
          {sec.label}
        </a>
      ))}
    </nav>
  );
}

export default function ShowcasePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-background-canvas)",
        color: "var(--color-text-primary)",
      }}
    >
      <main
        style={{
          maxWidth: "calc(var(--size-dialog-lg) + var(--size-dialog-md))",
          width: "100%",
          margin: "0 auto",
          paddingInline: "var(--space-inset-lg)",
          paddingBlock: "var(--space-stack-xl)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-stack-lg)",
        }}
      >
        <ShowcaseHeader />
        <SectionNav />

        <TokenPaletteShowcase />
        <ButtonShowcase />
        <BadgeChipShowcase />
        <FormShowcase />
        <FeedbackShowcase />
        <DataShowcase />
      </main>
    </div>
  );
}
