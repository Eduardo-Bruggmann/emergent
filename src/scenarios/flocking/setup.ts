import SeparationRule from "./rules/SeparationRule"
import AlignmentRule from "./rules/AlignmentRule"
import CohesionRule from "./rules/CohesionRule"
import BoundsRule from "@/engine/BoundsRule"
import { createBoid, BOID_KIND, type BoidState } from "./Boid"
import type Simulation from "@/engine/Simulation"

export function setupFlockingScenario(simulation: Simulation) {
  const { world } = simulation

  for (let i = 0; i < 100; i++) {
    world.addEntity(
      createBoid(Math.random() * world.width, Math.random() * world.height),
    )
  }

  simulation.addRule(new SeparationRule())
  simulation.addRule(new AlignmentRule())
  simulation.addRule(new CohesionRule())
  simulation.addRule(new BoundsRule())

  simulation.statsProvider = {
    getExtraStats: () => {
      const boids = world.getAgentsByKind<BoidState>(BOID_KIND)
      if (boids.length === 0) return { "Avg Speed": 0, Boids: 0 }

      const totalSpeed = boids.reduce((sum, b) => {
        return sum + Math.hypot(b.state.vx, b.state.vy)
      }, 0)
      const avgSpeed = (totalSpeed / boids.length).toFixed(2)

      return {
        Boids: boids.length,
        "Avg Speed": Number(avgSpeed),
      }
    },
  }
}
