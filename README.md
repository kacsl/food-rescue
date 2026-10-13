# Valere Design system

Code version of the **Valere** Figma design system.

Tokens, published components, and a gallery that forces every variant / size / state so you can compare against the design file.

- Source file: [Evolve 2.0 | Design System](https://www.figma.com/design/qFD8L5KrNlcImIMBMxgooD/Evolve-2.0-%7C-Design-System)
- Repo: [github.com/shiarauzo/valere-DS](https://github.com/shiarauzo/valere-DS)

## Stack

Next.js, TypeScript, Tailwind CSS v4.

## Use in another project

```bash
npm install github:shiarauzo/valere-DS
```

```tsx
import { Button } from "valere-DS";
import "valere-DS/styles.css";
```

In Next.js, transpile the package because it ships TypeScript source:

```ts
const nextConfig = {
  transpilePackages: ["valere-DS"],
};
```

Load **Lato** in the host app. The token `--font-family-brand` is `var(--font-lato), "Lato", sans-serif`. If you use `next/font`, put the variable on `<html>` as `--font-lato`.

## What’s in the repo

| Path | Role |
|------|------|
| `styles/tokens.css` | Every Figma variable as a CSS custom property. `:root` is light, `.dark` is dark. |
| `styles/evolve.css` | Consumer entry (`valere-DS/styles.css`): tokens + Button CSS. |
| `app/globals.css` | Gallery stylesheet: Tailwind + tokens. |
| `components/ui/` | One file per published Figma component. Props keep Figma names (`variant`, `size`, `state`). |
| `index.ts` | Package barrel for `import { Button } from "valere-DS"`. |
| `app/gallery/page.tsx` | All components and forced states for side-by-side comparison with Figma. |
| `agents.md` | Rule for new pages: only `components/ui` + token variables. |

No component file may use a raw color, radius, or spacing value.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for a single Button. The full system is at `/gallery`.

```bash
npm run build
npm start
```

## Environment

See `.env.example`. `NEXT_PUBLIC_APP_NAME` is the only public key; it labels the gallery.
