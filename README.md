# mustang-project

React + React Three Fiber 3D Mustang configurator, built through a multi-agent Git worktree workflow.

**Public repository:** https://github.com/systemfluxionist-linux/mustang-project  
**Live branch:** `main` (PR #15 merged 2026-11-27)  
**License note:** the car is a **2005 Ford Mustang GT** CC BY 4.0 model by Ricy. It is not a 1960 Mustang; the project started with that goal, but the only reliably downloadable licensed Mustang asset found was this one.

---

## 1. What this project does

- Renders a real Mustang GT model in the browser with React Three Fiber.
- Lets the user change body paint with four swatches (Race Red, Midnight, Frost, Onyx).
- Uses a dark, premium, sharp-cornered configurator UI inspired by the BMW design system.
- Supports drag-to-orbit and scroll-to-zoom via `OrbitControls`.
- Loads the GLB from `public/models/` with `useGLTF`; no runtime CDN or API calls.
- Bundles the model locally so `npm run build` produces a self-contained `dist/`.

---

## 2. Current stack

- React 19 / React DOM
- React Three Fiber
- `@react-three/drei` (`useGLTF`, `OrbitControls`, `ContactShadows`)
- Three.js
- Vite
- No CSS framework, no font CDN, no external runtime APIs.

Existing dependencies only. No new package was added for the redesigns.

---

## 3. Repository layout

```text
mustang-project/
├── public/
│   └── models/
│       ├── mustang-2005.glb          # 7.4 MB, real Ford Mustang GT
│       └── MUSTANG-LICENSE.md        # CC BY 4.0 attribution
├── src/
│   ├── main.jsx                      # React entry point
│   └── components/
│       ├── App.jsx                   # Canvas + configurator UI + paint state
│       ├── Mustang.jsx               # GLB loader, centering, paint override
│       ├── Scene.jsx                 # lights, ground, contact shadow, controls
│       └── styles.css                # dark premium UI
├── index.html
├── package.json
├── vite.config.js
├── README.md                          # this file
├── REFERENCE.md                       # original visual reference notes
└── REVIEW.md                          # original review checklist
```

---

## 4. How to run

```bash
cd ~/mustang-project-central
git pull origin main        # or check out a PR branch
npm install
npm run dev                 # local dev server
```

Production build and preview:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Expected build output: `dist/index.html`, hashed JS/CSS, and the GLB copied from `public/models/`. A Vite chunk-size warning appears because Three.js + the GLB loader are large; the build still succeeds.

---

## 5. Multi-agent Git worktree workflow

The original task was executed through terminal-only agents, each with an isolated folder, branch, issue and responsibility. Nothing was done through a GUI.

| Agent | Worktree folder | Branch | Issue / responsibility | Status |
|---|---|---|---|---|
| browse-agent | `~/mustang_project/browse-agent` | `feat/browse-reference` | #1 — inspect reference URL, write `REFERENCE.md` | merged (#6) |
| model-agent | `~/mustang_project/model-agent` | `feat/mustang-model` | #2 — procedural Mustang component | merged (#7) |
| scene-agent | `~/mustang_project/scene-agent` | `feat/scene-lighting` | #3 — scene/lighting/controls | closed (#8, superseded) |
| scaffold-agent | `~/mustang_project/scaffold-agent` | `feat/scaffold` | #4 — Vite/React scaffold | closed (#9, superseded) |
| review-agent | `~/mustang_project/review-agent` | `feat/review` | #5 — `REVIEW.md`, `selfcheck.sh` | merged (#10) |
| integration-agent | `~/mustang_project/integration-agent` | `feat/integration` | integrate all five branches | merged (#11) |
| geo-agent | `~/mustang_project/geo-agent` | `feat/geo-redesign` | redesign geometry | superseded (#12) |
| scene-redesign-agent | `~/mustang_project/scene-redesign-agent` | `feat/scene-redesign` | redesign scene | superseded (#12) |
| qa-agent | `~/mustang_project/qa-agent` | `feat/qa-redesign` | QA checklist | superseded (#12) |
| redesign-agent | `~/mustang_project/redesign-agent` | `feat/mustang-redesign` | v2 manual correction | closed (#12) |
| showcase-agent | `~/mustang_project/showcase-agent` | `feat/mustang-showcase` | v3 configurator UI + car | closed (#13) |
| gltf-agent | `~/mustang_project/gltf-agent` | `feat/mustang-gltf` | v4 CC0 fastback GLB | closed (#14) |
| mustang-gt-agent | `~/mustang_project/mustang-gt-agent` | `feat/mustang-gt` | v5 real Mustang GT GLB | open (#15) |

Central clone: `~/mustang-project-central`.

Typical agent invocation used the free `arch` route:

```bash
hermes -m arch chat -q "<task instructions scoped to this worktree>"
```

The `advanced-delegation` plugin was installed from the curated Hermes plugin catalog (source: `NousResearch/hermes-official-plugins`) and recorded in `~/hermes-workspace/swarm.yaml` alongside `obsidian-memory`. Free aliases used at various stages: `free`, `fast`, `terminal`, `code`, `chat`, `vision`, `reason`, `arch`.

---

## 6. Pull request history

- **#6** Visual reference notes — merged.
- **#7** Procedural 1960 Mustang — merged.
- **#8** Scene lighting and controls — closed; content superseded by #11.
- **#9** Scaffold Vite React app — closed; content superseded by #11.
- **#10** Review checklist and selfcheck — merged.
- **#11** Integrate all agent branches — merged; first working combined app.
- **#12** Redesign 1960 Mustang (detailed geometry + studio scene) — closed; visually incorrect.
- **#13** Mustang showcase rebuild (v3) — closed; still stylized primitives.
- **#14** Mustang v4: real CC0 1960s fastback GLB — closed; model was not actually a Mustang.
- **#15** Mustang v5: real Ford Mustang GT model — merged; current implementation.

PRs #8/#9 conflicted because #11 already contained their files. Later redesign PRs were closed only after a replacement was built and verified.

---

## 7. Design and implementation iterations

### v1 — Multi-agent scaffold

Five agents produced:
- Vite/React scaffold
- procedural Mustang component
- scene/lighting/controls
- reference notes
- review checklist

Integration PR #11 made a buildable app, but the car was a crude collection of boxes.

### v2 — Corrected procedural model

The first "detailed" agent extrusion was rotated incorrectly, laying the car on its side. It was replaced with a correctly oriented extruded profile, wheel-arch trim, grille, glass and studio lighting. Build passed; visual result still looked like a blocky car.

### v3 — Configurator shell + lower fastback

Added the dark premium site shell, paint swatches, responsive overlay, lower roofline, longer hood and exposed wheel hubs. Still stylized primitives, not acceptable.

### v4 — CC0 generic fastback GLB

Replaced procedural geometry with a real GLB from Grab3D (CC0, 18.5k triangles). This produced a genuine car render with long hood, fender humps, chrome wheels and PBR textures, but it was a generic 1960s fastback — not a Mustang.

### v5 — Real Mustang GT (current)

Replaced the generic model with a **2005 Ford Mustang GT** GLB from FormDrive, originally by Ricy on Sketchfab under **CC BY 4.0**.

- Creator: Ricy — https://sketchfab.com/ngon_3d
- Model source: https://sketchfab.com/3d-models/2005-ford-mustang-gt-26b6b60cf2804370ac3c64424242dc1f
- Redistribution source: https://github.com/nesdesignco/FormDrive
- License file: `public/models/MUSTANG-LICENSE.md`

Attribution appears in the UI as `CC BY 4.0 model · Ricy`.

---

## 8. Current implementation details

`src/components/Mustang.jsx`:

- `useGLTF('/models/mustang-2005.glb')`
- clones the scene so the cached original is not mutated
- scales the model to `1.3`
- traverses meshes and replaces materials whose names contain `carpaint` with a `MeshPhysicalMaterial` using the selected swatch color, metalness `0.35`, roughness `0.22`, clearcoat `1`
- computes a `Box3`, centers X/Z, and grounds Y so the wheels sit on the stage

`src/components/Scene.jsx`:

- dark background
- hemisphere + ambient + key/fill/rim lights
- ground plane and `ContactShadows`
- `OrbitControls` with damping and distance limits

`src/components/App.jsx`:

- holds paint state
- renders `Canvas` with camera `[7, 3.2, 8]`, fov `35`, dpr `[1, 1.75]`
- renders the configurator overlay and four accessible paint buttons

---

## 9. Original constraints and how they were handled

Original constraints:

- React front-end — kept.
- All agents operate via terminal — kept.
- Distinct agent responsibilities — kept through separate worktrees/files.
- Preserve the reference URL — kept unchanged:
  https://sketchfab.com/3d-models/ford-mustang-gt3-78c40bf430c94e588136b1412247bcbb
- No external libraries/assets beyond a basic React 3D setup — initially kept; later explicitly relaxed by user approval to use a licensed GLB.
- Only free Nim aliases — kept for agent invocations.
- Public GitHub repos — kept.
- 1M context limit — respected by using the `arch` alias.
- Obsidian memory integration — notes stored under `~/Hermes Explore/Hermes Explore/Memory/Projects/`.

---

## 10. Obsidian memory

Project notes were written to:

- `~/Hermes Explore/Hermes Explore/Memory/Projects/1960-Mustang-React.md`
- `~/Hermes Explore/Hermes Explore/Memory/Projects/1960-Mustang-React-Public.md`
- linked from `Memory/Index.md`

Shared coding skills were indexed in:

- `~/Hermes Explore/Hermes Explore/Memory/Skills/Shared-Coding-Skills.md`

These notes record the agent table, PR state, constraints, and verification results.

---

## 11. Verification performed

- `npm install && npm run build` — passed on every integrated branch.
- Vite preview served the app; page title and JS asset returned HTTP 200.
- Browser screenshots captured for each major redesign.
- Paint swatches tested live: Race Red → Midnight → Race Red.
- WebGL context loss from stacked preview tabs was diagnosed and fixed by closing stale tabs.

Not verified:

- mobile-width screenshot
- automated visual regression
- long-run performance on low-end devices

---

## 12. Known issues

- The model is a **2005** Mustang GT, not the originally requested 1960 model. Finding a first-gen Mustang GLB required a logged-in Sketchfab download, so a licensed, directly downloadable alternative was used instead.
- The Vite build emits a chunk-size warning because Three.js and the GLB loader are large.
- Opening many preview tabs can exhaust browser WebGL contexts, causing a black canvas; close stale tabs.
- Some terminal output includes zsh warnings (`gitstatus failed to initialize`, `can't change option: monitor`). These are wrapper noise, not task failures.
- The LiteLLM proxy needed by Claude Code must be restarted after reboot with `~/.local/bin/start-litellm.sh`; this does not affect the React app.

---

## 13. Future work

- Source a CC BY or CC0 first-generation (1964½–1966) Mustang GLB and swap `public/models/mustang-2005.glb`.
- Add wheel/color presets and camera preset buttons.
- Add a loading indicator while the GLB streams.
- Code-split Three.js to reduce the initial bundle warning.
- Add automated screenshot checks with Playwright.
