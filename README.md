# food-rescue-karina

Next.js app built on the [Valere design system](https://github.com/shiarauzo/valere-DS) with Kari project tokens and components synchronized from Figma.

## Setup

The design system is a private GitHub repo. Make sure `git` can read `github.com/shiarauzo/valere-DS` before installing.

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design System & Tokens

- **Tokens**: Synchronized from Figma (`src/styles/tokens.css`), supporting full Light and Dark modes.
- **Typography**: DM Sans via `next/font/google`.
- **Custom Components**:
  - `C48 - Logo` (`src/components/ds/logo.tsx`): Icon mark and horizontal landscape logo.
  - `C49 - Bottom navigation` (`src/components/ds/bottom-nav.tsx`): Frosted glass bottom pill bar with custom icons.
  - `C17 – Avatar` (`src/components/ds/avatar.tsx`): 50px pill avatar with Kari mascot and interactive state overlays.
- **Base Components**: Imported from `valere-DS`.

## Structure

| Path | Role |
|------|------|
| `src/app/layout.tsx` | Root layout: DS stylesheet + DM Sans font + Dark mode script |
| `src/app/page.tsx` | Design system component showcase (Tokens, Buttons, Badges, Inputs, Feedback, Cards, Logo, Bottom Nav, Avatar) |
| `src/app/food/` | Interactive Kari mobile app prototype with live bottom navigation |
| `src/components/ds/` | Custom design system component implementations |
| `src/styles/tokens.css` | Design token variables (Light/Dark themes, colors, typography, elevations) |

## Commands

```bash
npm run dev     # local dev server (--webpack)
npm run build   # production build
npm run lint    # eslint
```
