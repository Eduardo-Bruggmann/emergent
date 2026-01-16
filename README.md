# Emergent

Agent-based simulation playground that lets you plug in different rules and watch complex behaviors emerge. Built with TypeScript + Preact on top of Vite.

## Scenarios

- **Diffusion-Limited Aggregation (DLA):** particles wander until they stick to a growing cluster at the center, producing branching crystal-like patterns.
- **Flocking (Boids):** agents follow separation, alignment, and cohesion rules to move as a coherent swarm.
- **Forest Fire:** a grid of trees where ignition spreads across neighbors until it burns out.
- **Predator–Prey:** two populations; predators chase and consume prey while both roam the field.
- **Virus Spread:** individuals move freely, with one patient zero starting an infection that can propagate through contacts.

## Tech Stack

- TypeScript
- Preact
- Vite
- Tailwind (utility classes via `@tailwindcss/vite`)

## Running Locally

Prerequisites: Node 18+ and pnpm installed.

1. Install deps

```bash
pnpm install
```

2. Start the dev server

```bash
pnpm dev
```

The app runs on http://localhost:5173 (Vite default).

## Switching Scenarios

The UI currently boots with the DLA setup. To try a different scenario, swap the setup function passed to `new Simulation` in `src/ui/App.tsx` (the other imports are already present and can be uncommented).

## Production Build

```bash
pnpm build
pnpm preview  # serve the built assets locally
```
