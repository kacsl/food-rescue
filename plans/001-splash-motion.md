# 001 — Fix splash entrance, exit, and reduced motion

- **Status**: DONE
- **Commit**: b535920
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 2 files, small

## Problem

The splash is a once-per-launch brand moment (`src/components/food/splash-screen.tsx`, mounted from `src/app/food/page.tsx`). It should stay one mark that fades in, holds, then softly fades out. Three things make that motion feel broken or fragile:

1. The logo is only centered because the entrance keyframe’s end state is `translate(-50%, -50%)` with `animation-fill-mode: both`. The base rule positions the box by its top-left at the screen center. Turning the animation off (or finishing without that fill) parks the logo in the wrong place.
2. The entrance is a 900ms opacity ramp with only 6px of travel, on a one-off curve. It reads as a slow fade, not as a mark arriving.
3. Tap-to-skip unmounts the splash after 420ms while the exit transition runs for 750ms, so the fade is cut off. There is no `prefers-reduced-motion` handling, so the 6px rise, the exit scale, and the blur still run for people who asked for less motion.

Current entrance and exit:

```css
/* src/components/food/food-phone.css:470 — current */
.food-splash {
  position: absolute;
  inset: 0;
  z-index: 25;
  width: 393px;
  height: 852px;
  background: var(--color-background-canvas, #ffffff);
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  opacity: 1;
  transform: scale(1);
  transition-property: opacity, transform, filter;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.food-splash--fading-out {
  opacity: 0;
  transform: scale(1.018);
  filter: blur(2px);
  pointer-events: none;
}

/* src/components/food/food-phone.css:521 — current */
.food-splash__logo-portrait {
  position: absolute;
  left: calc(50% - 0.43px);
  top: calc(50% + 0.5px);
  width: 308.148px;
  height: 205px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20.866px;
  z-index: 3;
  animation: splashLogoFade 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes splashLogoFade {
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 6px));
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
```

```tsx
/* src/components/food/splash-screen.tsx:102 — current */
export function SplashScreen({
  onComplete,
  holdDurationMs = 2000,
  fadeOutDurationMs = 750,
}: SplashScreenProps) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setFadingOut(true);
    }, holdDurationMs);

    const doneTimer = window.setTimeout(() => {
      onComplete?.();
    }, holdDurationMs + fadeOutDurationMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [holdDurationMs, fadeOutDurationMs, onComplete]);

  function handleSkip() {
    if (fadingOut) return;
    setFadingOut(true);
    window.setTimeout(() => {
      onComplete?.();
    }, 420);
  }
```

The inline `transitionDuration: ${fadeOutDurationMs}ms` on the splash root (line 139) is what actually sets the 750ms exit. The skip path ignores it.

## Target

Keep the splash as one centered mark. Do not stagger the hat and the wordmark, and do not animate letters.

Entrance: 600ms, opacity plus an 8px rise and `scale(0.96)`, on the app’s existing ease-out. Both keyframes include the centering translate, and the same translate is the resting transform so layout does not depend on animation fill.

```css
/* target — src/components/food/food-phone.css */
.food-splash {
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
  transition-property: opacity, transform, filter;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.food-splash--fading-out {
  opacity: 0;
  transform: scale(1.018);
  filter: blur(2px);
  pointer-events: none;
}

.food-splash__logo-portrait {
  transform: translate(-50%, -50%);
  animation: splashLogoFade 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes splashLogoFade {
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 8px)) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .food-splash {
    transition-property: opacity;
    transition-duration: 200ms !important;
    transition-timing-function: ease;
  }

  .food-splash--fading-out {
    transform: none;
    filter: none;
  }

  .food-splash__logo-portrait {
    animation: none;
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
```

Exit stays a 750ms soft fade (opacity, `scale(1.018)`, `blur(2px)`) unless the user prefers reduced motion, in which case it is opacity only for 200ms. Skip waits for that same duration. Hold stays 2000ms.

`scale(0.96)` is the initial scale. Do not use `scale(0)`. Do not animate `top`, `left`, `width`, or `height`. Blur stays at 2px, never higher.

## Repo conventions to follow

This app does not use motion-library springs or shared `--ease-*` tokens. Curves are inlined in `src/components/food/food-phone.css`. Match the entrance curve already used for page, sheet, and toast motion:

```css
/* src/components/food/food-phone.css:179 — imitate this curve, do not invent another */
.food-page-view {
  animation: foodPageFade 0.26s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

Use `cubic-bezier(0.16, 1, 0.3, 1)` for the splash entrance and exit. Do not introduce `cubic-bezier(0.23, 1, 0.32, 1)` or a new token in this change. The only other reduced-motion rule in this file is the toast opt-out at `src/components/food/food-phone.css:320`; add the splash query next to the splash rules, not inside the toast block.

## Steps

1. In `src/components/food/food-phone.css`, replace the `.food-splash` transition timing function `cubic-bezier(0.22, 1, 0.36, 1)` with `cubic-bezier(0.16, 1, 0.3, 1)`. Add `filter: blur(0px)` next to the existing `opacity: 1` and `transform: scale(1)` so the blur transition has a start value. Leave `transition-property: opacity, transform, filter` and the exit rule (opacity 0, `scale(1.018)`, `blur(2px)`) as they are.

2. In the same file, set `.food-splash__logo-portrait` to `transform: translate(-50%, -50%)` and `animation: splashLogoFade 600ms cubic-bezier(0.16, 1, 0.3, 1) both`. Replace `@keyframes splashLogoFade` with the 0% / 100% block in Target. Keep the existing `left`, `top`, size, flex, and `z-index` on `.food-splash__logo-portrait`.

3. In the same file, after `.food-splash__wordmark-svg`, add the `prefers-reduced-motion` block from Target. Do not change `.food-toast-viewport` reduced-motion rules.

4. In `src/components/food/splash-screen.tsx`, keep `holdDurationMs = 2000` and `fadeOutDurationMs = 750`. Add state for the exit duration actually used:

```tsx
const [exitMs, setExitMs] = useState(fadeOutDurationMs);

useEffect(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nextExitMs = reduced ? 200 : fadeOutDurationMs;
  setExitMs(nextExitMs);

  const fadeTimer = window.setTimeout(() => {
    setFadingOut(true);
  }, holdDurationMs);

  const doneTimer = window.setTimeout(() => {
    onComplete?.();
  }, holdDurationMs + nextExitMs);

  return () => {
    window.clearTimeout(fadeTimer);
    window.clearTimeout(doneTimer);
  };
}, [holdDurationMs, fadeOutDurationMs, onComplete]);
```

Use `nextExitMs` inside the effect (not the `exitMs` state) so the timer does not wait an extra render. Keep `exitMs` in state so the click path and the inline duration can read it.

5. Change the root inline style from `transitionDuration: ${fadeOutDurationMs}ms` to `transitionDuration: ${exitMs}ms`.

6. Change `handleSkip` so the unmount wait matches that duration. Do not leave the literal `420`.

```tsx
function handleSkip() {
  if (fadingOut) return;
  setFadingOut(true);
  window.setTimeout(() => {
    onComplete?.();
  }, exitMs);
}
```

7. Leave the SVG paths, colors, blob positions, status bar, copy, and the 2000ms hold unchanged.

## Boundaries

- Do NOT touch `src/app/food/page.tsx`, toasts, sheets, nav, or any component other than `SplashScreen`.
- Do NOT split the logo into per-letter or icon-then-wordmark animations. The mark fades in as one piece.
- Do NOT change `holdDurationMs` (2000) or the default `fadeOutDurationMs` (750).
- Do NOT add dependencies, motion libraries, or a new easing token.
- Do NOT animate layout properties. Opacity, transform, and the existing 2px blur only.
- If a step does not match the code at commit `b535920`, STOP and report instead of improvising.

## Verification

- **Mechanical**: from the repo root, `npx tsc --noEmit` exits 0.
- **Feel check**: open `/food`, reload, and watch the splash.
  - The chef mark and wordmark arrive together, slightly risen and slightly small, then settle at the visual center. They do not fade in already sitting at the final spot with no scale.
  - After the hold, the whole splash fades, scales up only to `1.018`, and blurs by about 2px. The app underneath is visible as it leaves. Reload and confirm the logo is still optically centered after the entrance finishes.
  - Click the splash during the hold. The fade runs to completion (about 750ms) before the splash disappears. It must not vanish while still clearly visible.
  - In DevTools Animations, set playback to 10%. Confirm the logo keyframes go from `scale(0.96)` to `scale(1)`, never `scale(0)`, and that `translate(-50%, -50%)` is present at both 0% and 100%.
  - In Rendering, enable `prefers-reduced-motion: reduce` and reload. The logo is centered immediately with no rise and no scale. The later exit is opacity only (no zoom, no blur) and lasts about 200ms, including when you click to skip.
- **Done when**: centering no longer depends on animation fill, skip and the automatic exit use the same duration, and reduced motion keeps the opacity fade while dropping the rise, scale, and blur.
