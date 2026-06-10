# The Stramont Cafe UI

A cozy React + Vite + Tailwind + TypeScript landing page for The Stramont.

## What changed in this version

- Removed the rigid full-screen panel snapping.
- Replaced it with natural smooth scrolling.
- Added fade-rise-on-scroll reveals with IntersectionObserver.
- Added floating cards and softer motion.
- Changed the visual direction to a cafe-first palette: cream, coffee brown, sage, pastry gold, and warm terracotta.
- Kept the manual fading video loop from the original spec.
- Kept Instrument Serif for display text and Inter for body text.

## Run locally

```bash
npm config set registry https://registry.npmjs.org/
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```bash
http://localhost:5173/
```

## Main files

- `src/App.tsx` — page sections, scroll reveal logic, and content
- `src/components/ManualLoopVideo.tsx` — custom video fade loop
- `src/components/Navigation.tsx` — floating cafe-style navigation
- `src/components/ScrollRail.tsx` — right-side section indicator
- `src/styles/fonts.css` — Instrument Serif + Inter imports
- `src/styles/theme.css` — cozy palette, smooth reveal animation, scrollbar styling
- `tailwind.config.ts` — theme tokens and shadows
