"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  BUTTON_SIZES,
  BUTTON_STATES,
  BUTTON_VARIANTS,
  ICON_BUTTON_VARIANTS,
  type ButtonSize,
  type ButtonState,
  type ButtonVariant,
  type IconButtonVariant,
} from "@/lib/button-tone";
import { env } from "@/lib/env";
import { DataSections } from "./data";
import { EvolveSections } from "./evolve";
import { FeedbackSections } from "./feedback";
import { FormSections } from "./forms";
import { NavigationSections } from "./navigation";
import { OverlaySections } from "./overlays";
import { Section } from "./section";
import { SelectionSections } from "./selection";

export default function GalleryPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [dark]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-background-canvas)",
        color: "var(--color-text-primary)",
        padding: "var(--space-inset-lg)",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "var(--space-inline-md)",
          marginBottom: "var(--space-stack-lg)",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-overline)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            {env.appName}
          </p>
          <h1
            style={{
              margin: "var(--space-stack-xs) 0 0",
              fontSize: "var(--font-size-heading-lg)",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "1",
            }}
          >
            Evolve 2.0
          </h1>
          <p
            style={{
              margin: "var(--space-stack-sm) 0 0",
              maxWidth: "40rem",
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-body-sm)",
            }}
          >
            Published Figma components. Every swatch is a forced variant / size / state so you can compare against the design file.
          </p>
        </div>
        <Button variant="Outline" size="SM" label={dark ? "Light" : "Dark"} onClick={() => setDark((value) => !value)} />
      </header>

      <Section title="01" heading="Buttons">
        <Matrix
          variants={BUTTON_VARIANTS}
          render={(variant, size, state) => <Button variant={variant} size={size} state={state} label="Button" />}
        />
      </Section>
      <Section title="02" heading="Icon Buttons">
        <Matrix
          variants={ICON_BUTTON_VARIANTS}
          render={(variant, size, state) => (
            <IconButton variant={variant as IconButtonVariant} size={size} state={state} aria-label={`${variant} ${size} ${state}`} />
          )}
        />
      </Section>
      <FormSections />
      <SelectionSections />
      <FeedbackSections />
      <NavigationSections />
      <OverlaySections />
      <DataSections />
      <EvolveSections />
    </main>
  );
}

function Matrix({
  variants,
  render,
}: {
  variants: readonly ButtonVariant[] | readonly IconButtonVariant[];
  render: (variant: ButtonVariant, size: ButtonSize, state: ButtonState) => ReactNode;
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      {BUTTON_SIZES.map((size) => (
        <div key={size} style={{ marginBottom: "var(--space-stack-lg)" }}>
          <p
            style={{
              margin: "0 0 var(--space-stack-sm)",
              color: "var(--color-text-tertiary)",
              fontSize: "var(--font-size-overline)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            {size}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `var(--spacing-96) repeat(${BUTTON_STATES.length}, minmax(var(--size-control-xl), auto))`,
              gap: "var(--space-stack-sm)",
              alignItems: "center",
            }}
          >
            <span />
            {BUTTON_STATES.map((state) => (
              <span key={state} style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-caption)", fontWeight: "var(--font-weight-semibold)" }}>
                {state}
              </span>
            ))}
            {variants.map((variant) =>
              BUTTON_STATES.map((state, stateIndex) => (
                <Cell key={`${variant}-${size}-${state}`} label={stateIndex === 0 ? variant : undefined} first={stateIndex === 0}>
                  {render(variant as ButtonVariant, size, state)}
                </Cell>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Cell({
  label,
  first,
  children,
}: {
  label?: string;
  first: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {first ? (
        <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-body-xs)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
      ) : null}
      <div>{children}</div>
    </>
  );
}
