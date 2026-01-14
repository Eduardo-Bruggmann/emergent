import SeparationRule from "./rules/SeparationRule"
import AlignmentRule from "./rules/AlignmentRule"
import CohesionRule from "./rules/CohesionRule"
import BoundsRule from "@/core/shared/BoundsRule"
import Boid from "./Boid"
import type Simulation from "@/core/Simulation"

export function setupFlockingScenario(simulation: Simulation) {
  const world = simulation.getWorld()

  world.clear()
  simulation.clearRules()

  for (let i = 0; i < 40; i++) {
    world.addEntity(
      new Boid(Math.random() * world.width, Math.random() * world.height)
    )
  }

  simulation.addRule(new SeparationRule())
  simulation.addRule(new AlignmentRule())
  simulation.addRule(new CohesionRule())
  simulation.addRule(new BoundsRule())
}
