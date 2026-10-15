"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ds/logo";
import { StatusBar } from "./status-bar";

export interface SplashScreenProps {
  /** Fires when the splash begins its fade-out (login content can enter underneath). */
  onFadeStart?: () => void;
  /** Called once the splash screen finishes its soft fade-out */
  onComplete?: () => void;
  /** Total duration (ms) before fade-out begins. Default: 2400ms */
  holdDurationMs?: number;
  /** Fade-out transition duration (ms). Default: 1100ms */
  fadeOutDurationMs?: number;
}

/**
 * Animated Splash Screen (Figma Node 44:4746)
 *
 * - Exact layout & background blur ellipses matching Figma node 44:4746 (`393x852`)
 * - Logo fades in as one mark, then the screen softly fades out
 */
export function SplashScreen({
  onFadeStart,
  onComplete,
  holdDurationMs = 2400,
  fadeOutDurationMs = 1100,
}: SplashScreenProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const [exitMs, setExitMs] = useState(fadeOutDurationMs);

  function beginFadeOut() {
    if (fadingOut) return;
    setFadingOut(true);
    onFadeStart?.();
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nextExitMs = reduced ? 200 : fadeOutDurationMs;
    setExitMs(nextExitMs);

    const fadeTimer = window.setTimeout(() => {
      beginFadeOut();
    }, holdDurationMs);

    const doneTimer = window.setTimeout(() => {
      onComplete?.();
    }, holdDurationMs + nextExitMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [holdDurationMs, fadeOutDurationMs, onComplete, onFadeStart]);

  function handleSkip() {
    if (fadingOut) return;
    beginFadeOut();
    window.setTimeout(() => {
      onComplete?.();
    }, exitMs);
  }

  return (
    <div
      className={`food-splash ${fadingOut ? "food-splash--fading-out" : ""}`}
      onClick={handleSkip}
      role="region"
      aria-label="Food Rescue splash screen"
      style={{
        transitionDuration: `${exitMs}ms`,
      }}
    >
      <span aria-hidden="true" className="food-splash__blob food-blob--shape-bottom food-splash__blob--top-left" />
      <span aria-hidden="true" className="food-splash__blob food-blob--shape-top food-splash__blob--bottom-right" />

      <div className="food-splash__status-bar">
        <StatusBar />
      </div>

      <div className="food-splash__logo-portrait" data-node-id="3087:7383">
        <Logo variant="portrait" width={309} height={208} role="img" aria-label="Food Rescue" />
      </div>
    </div>
  );
}
