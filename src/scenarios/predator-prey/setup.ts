import PredationRule from "./rules/PredationRule"
import BoundsRule from "@/core/shared/BoundsRule"
import Predator from "./Predator"
import Prey from "./Prey"
import type Simulation from "@/core/Simulation"

export function setupPredatorPreyScenario(simulation: Simulation) {
  const world = simulation.getWorld()

  world.clear()
  simulation.clearRules()

  for (let i = 0; i < 20; i++) {
    world.addEntity(
      new Prey(Math.random() * world.width, Math.random() * world.height)
    )
  }

  for (let i = 0; i < 5; i++) {
    world.addEntity(
      new Predator(Math.random() * world.width, Math.random() * world.height)
    )
  }

  simulation.addRule(new BoundsRule())
  simulation.addRule(new PredationRule())
}
