import PredationRule from "./rules/PredationRule"
import BoundsRule from "@/engine/shared/BoundsRule"
import { createPredator } from "./Predator"
import { createPrey } from "./Prey"
import type Simulation from "@/engine/Simulation"

export function setupPredatorPreyScenario(simulation: Simulation) {
  const world = simulation.world

  world.clear()
  simulation.clearRules()

  for (let i = 0; i < 20; i++) {
    world.addEntity(
      createPrey(Math.random() * world.width, Math.random() * world.height)
    )
  }

  for (let i = 0; i < 5; i++) {
    world.addEntity(
      createPredator(Math.random() * world.width, Math.random() * world.height)
    )
  }

  simulation.addRule(new BoundsRule())
  simulation.addRule(new PredationRule())
}
