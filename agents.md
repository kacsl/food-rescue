# Evolve agent rules

This repository is the Evolve 2.0 design system in code. Tokens come from Figma. Components are the published Figma components.

## New pages

Any new page or screen:

1. Import UI only from `components/ui`.
2. Use visual values only through CSS variables defined in `app/globals.css`.
3. Do not invent buttons, colors, radii, or spacing.

## Forbidden

- New button markup, custom CTAs, or one-off controls when `Button` or `IconButton` already covers the case
- Hex colors, `rgb()`, Tailwind palette classes (`bg-blue-500`, `text-gray-400`)
- Loose spacing or radius (`p-4`, `gap-2`, `rounded-lg`, `12px`, `16px`)
- Copying values into local constants instead of `var(--token-name)`

## Required

- Figma variant names stay as props: `variant`, `size`, `state`
- Forced `state` is for gallery comparison; interactive pages use `Default` plus native disabled
- If a token or component is missing, add it from Figma first. Do not approximate.
