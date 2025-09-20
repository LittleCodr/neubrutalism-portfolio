# Portfolio (Neon Dark + 3D)

A Vite + React + TypeScript portfolio with a neon-dark theme, GSAP motion, and a real-time 3D hero built using React Three Fiber.

## Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- GSAP + ScrollTrigger
- three, @react-three/fiber, @react-three/drei

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Open the dev URL shown in the terminal (typically http://localhost:5173).

### Build
```bash
npm run build
```

### Preview (after build)
```bash
npm run preview
```

## Project Structure
```
root/
├─ public/
│  └─ models/
│     └─ model.glb              # Place your GLB here (optional)
├─ src/
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ HeroSection.tsx
│  │  ├─ ThreeScene.tsx         # 3D scene (stars + neon knot or GLB)
│  │  ├─ ModelGLTF.tsx          # Minimal GLTF loader
│  │  ├─ AboutSection.tsx
│  │  ├─ SkillsSection.tsx
│  │  ├─ ProjectsSection.tsx
│  │  ├─ ExperienceSection.tsx
│  │  ├─ ContactSection.tsx
│  │  └─ Footer.tsx
│  ├─ hooks/
│  │  └─ useGSAP.ts
│  ├─ data/
│  │  └─ data.ts                # Skills/Projects/Experience data
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css                 # Neon dark theme + utilities
└─ package.json
```

## Theming
Global variables live in `src/index.css` under `:root`:
- `--primary`, `--secondary`, `--tertiary`, `--accent`
- `--dark`, `--light`
- `--border-thickness`, `--shadow-offset`

Useful utilities:
- `.glass` for frosted translucent panels
- `.neon-text` for glowing headlines
- `.neubrutalism-button` and `.neubrutalism-box` with adjusted dark styling
- `.grid-bg` for a subtle grid background

Adjust colors there to quickly rebrand.

## 3D Model Usage
The hero uses `ThreeScene.tsx`. It attempts to load `/models/model.glb` and falls back to a neon torus knot if the model is missing.

Steps:
1. Export or prepare a GLB model.
2. Place it at `public/models/model.glb`.
3. Refresh the site. A small loader shows while it loads.

Recommendations:
- Keep the model lightweight (ideally < 5–10MB).
- Reduce polygon count and texture size.
- Avoid huge embedded textures when possible.

To tweak camera/lighting, edit `src/components/ThreeScene.tsx`.

## Animations
- `useGSAP.ts` provides a simple helper for staged animations with ScrollTrigger.
- Sections such as `HeroSection`, `SkillsSection`, and `ProjectsSection` make use of these effects.

## Environment & Security
`src/components/ContactSection.tsx` currently contains a hard-coded Telegram Bot token and chat ID (for demo purposes). You should secure this by moving credentials into environment variables.

Example (Vite `.env`):
```
VITE_TELEGRAM_BOT_TOKEN=xxxx
VITE_TELEGRAM_CHAT_ID=xxxx
```
Then import with `import.meta.env.VITE_TELEGRAM_BOT_TOKEN` in the client, or preferably send via a serverless/API route.

## Troubleshooting
- If you see a Vite error overlay about missing modules, run:
  ```bash
  npm i three @react-three/fiber @react-three/drei three-stdlib --legacy-peer-deps
  ```
- If Tailwind directives show warnings in your editor (`@tailwind`, `@apply`), they are normal editor lint warnings; Tailwind processes them correctly at build time.
- If the model doesn’t show, verify the file path `public/models/model.glb` and check the console for network 404s.

## Deployment
You can deploy the `dist/` output to Netlify, Vercel, GitHub Pages, etc.
- Vercel: select the repo, set framework to Vite, and build command `npm run build` with output `dist`.
- Netlify: drag-and-drop `dist/` or connect repo (build: `npm run build`, publish: `dist`).

## License
MIT
