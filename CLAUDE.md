# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (Vite HMR)
npm run build     # production build to dist/
npm run preview   # preview production build locally
```

No test runner is configured.

## Architecture

This is a Vue 3 + Vite single-page app with no backend — all avatar generation happens in-browser.

**Data flow:**
1. `App.vue` holds a reactive `persona` object (name, job, company, type, industry)
2. A `filledPersona` computed prop returns `null` when all identity fields are empty (triggers empty-state avatar)
3. `AvatarDisplay.vue` receives `persona` and `size` props, calls `generateAvatar()` reactively, and renders the result as an `<img src>`
4. `generateAvatar()` in `src/lib/avatarGenerator.js` produces a `data:image/svg+xml;base64,…` string — no file I/O, no network

**Generation logic (`src/lib/avatarGenerator.js`):**
- Seed = concatenation of `name + job + company`
- `seededRandom(seed + x + y)` uses a `Math.sin`-based hash to deterministically pick a color index per pixel
- The 8×8 grid is bilaterally symmetric: left half is generated, right half mirrors it
- Colors come from `getAvatarPalette(type)` (persona type → color palette) and `getIndustryColor(industry)` (industry → background color)

**Theme (`src/lib/theme.js`):**
- `theme.colors` holds a Tailwind-style scale (50–900) for primary, secondary, accent, success, warning, error, neutral
- `getAvatarPalette(type)` maps persona type strings to 4-color arrays from the palette
- `getIndustryColor(industry)` maps industry strings to a light background hex
- Unknown types/industries fall back to primary palette / neutral.50

The `generateAvatar` function is the public API; everything else is internal. To add a new persona type or industry, extend the lookup objects in `theme.js`.
