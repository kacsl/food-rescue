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

# Surplus Food MVP[cite: 1]

**An app that allows home cooks to post surplus food so nearby neighbors can claim and pick it up before it spoils.**[cite: 1]

## The Problem It Solves
Home cooks regularly end up with good food they cannot use before it spoils, while budget-conscious neighbors blocks away have no fast way to know it exists.[cite: 1] This app bridges that gap to reduce environmental food waste, save households money, and build a local, trust-based community.[cite: 1]

## Core Features
* **Post and Claim Food:** Home cooks can offer food for immediate pickup or provide a scheduled pickup time slot.[cite: 1]
* **Nearby Feed:** Users browse a feed of live listings that displays available food, how far away it is, and a countdown of how much time is left.[cite: 1]
* **Strict Safety Rules:** Posters must include expiration dates, cook times, and allergen information.[cite: 1] Prepared meals must be no more than 3 days old, and posters must confirm they were kept refrigerated.[cite: 1] Claimers must acknowledge risks before claiming the food.[cite: 1]
* **Coordination:** Users sign up with phone-verified accounts for basic accountability.[cite: 1] Claimers can access the donor's WhatsApp to align on pickup details.[cite: 1]
* **Tracking and Notifications:** The app sends push notifications for new nearby listings and when donations are claimed.[cite: 1] After the handoff, both the donor and the claimer can mark the food as picked up.[cite: 1]

## Project Goal
Our early launch goal is to see at least 20% of listings offered for immediate pickup get claimed and picked up within 60 minutes in our launch neighborhood.[cite: 1] This tests our biggest assumption first: that supply and demand can meet fast enough in one neighborhood.[cite: 1]
