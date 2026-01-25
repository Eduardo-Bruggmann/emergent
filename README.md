# Emergent

Agent-based simulation playground built with TypeScript + Preact (Vite).

## Scenarios (UI navigation)

Use the arrow buttons in the header to cycle scenarios at runtime:

- **Diffusion-Limited Aggregation (DLA):** particles wander until they stick to a growing cluster at the center.
- **Flocking (Boids):** separation, alignment, and cohesion create swarm motion.
- **Forest Fire:** ignition spreads across neighboring trees until it burns out.
- **Predator–Prey:** predators chase and consume prey while both roam the field.
- **Virus Spread:** one patient zero can infect nearby agents; they eventually recover.

## Controls and stats

- **Start / Stop / Reset** buttons manage the simulation loop.
- **Stats panel** (right) shows counts per agent kind with sparklines and extra metrics per scenario.

## Tech stack

- TypeScript
- Preact
- Vite
- Tailwind utilities (via @tailwindcss/vite)

## Running locally

Prerequisites: Node 18+ and pnpm.

1. Install dependencies

```bash
pnpm install
```

2. Start the dev server

```bash
pnpm dev
```

Open http://localhost:5173 (default Vite port).

## Production build

```bash
pnpm build
pnpm preview  # serve the built assets locally
```
