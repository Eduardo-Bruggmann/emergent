import SeparationRule from "./rules/SeparationRule"
import AlignmentRule from "./rules/AlignmentRule"
import CohesionRule from "./rules/CohesionRule"
import BoundsRule from "@/engine/shared/BoundsRule"
import { createBoid } from "./Boid"
import type Simulation from "@/engine/Simulation"

export function setupFlockingScenario(simulation: Simulation) {
  const world = simulation.world

  world.clear()
  simulation.clearRules()

  for (let i = 0; i < 40; i++) {
    world.addEntity(
      createBoid(Math.random() * world.width, Math.random() * world.height)
    )
  }

  simulation.addRule(new SeparationRule())
  simulation.addRule(new AlignmentRule())
  simulation.addRule(new CohesionRule())
  simulation.addRule(new BoundsRule())
}
