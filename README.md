# Avatar Generator

A standalone Vue 3 + Vite app that generates deterministic pixel avatars from persona data.

Avatars are produced entirely in-browser — no external API calls or image assets required. The same persona input always produces the same avatar, making it suitable for consistent UI representation of user personas.

## How it works

- Each avatar is a 12x12 pixel grid rendered as an inline SVG
- The pixel pattern is derived from a seeded hash of the persona's name, job, and company
- Color palette is driven by the persona `type` (e.g. Developer, Executive)
- Background color is driven by the persona `industry` (e.g. Technology, Finance)

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Project structure

```
avatarGenerator/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js
    ├── App.vue                     # Demo page with live persona form
    ├── components/
    │   └── AvatarDisplay.vue       # Renders a persona avatar as <img>
    └── lib/
        ├── avatarGenerator.js      # Core generation logic
        └── theme.js                # Color palettes and industry colors
```

## Usage

Import `generateAvatar` from `src/lib/avatarGenerator.js` and pass a persona object:

```js
import { generateAvatar } from './lib/avatarGenerator'

const src = generateAvatar({
  name: 'Jane Smith',
  job: 'Product Manager',
  company: 'Acme Corp',
  type: 'Decision Maker',
  industry: 'Technology'
}, 100) // second arg is pixel size, default 100

// src is a data:image/svg+xml;base64,... string — use directly in <img src>
```

Or use the `AvatarDisplay` component:

```vue
<AvatarDisplay :persona="persona" :size="64" />
```
