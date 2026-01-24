import PredationRule from "./rules/PredationRule"
import BoundsRule from "@/engine/BoundsRule"
import { createPredator, PREDATOR_KIND } from "./Predator"
import { createPrey, PREY_KIND } from "./Prey"
import type Simulation from "@/engine/Simulation"

export function setupPredatorPreyScenario(simulation: Simulation) {
  const { world } = simulation

  for (let i = 0; i < 20; i++) {
    world.addEntity(
      createPrey(Math.random() * world.width, Math.random() * world.height),
    )
  }

  for (let i = 0; i < 5; i++) {
    world.addEntity(
      createPredator(Math.random() * world.width, Math.random() * world.height),
    )
  }

  simulation.addRule(new BoundsRule())
  simulation.addRule(new PredationRule())

  simulation.statsProvider = {
    getExtraStats: () => {
      const preys = world.getAgentsByKind(PREY_KIND).length
      const predators = world.getAgentsByKind(PREDATOR_KIND).length
      const ratio = predators > 0 ? (preys / predators).toFixed(1) : "N/A"
      return {
        Preys: preys,
        Predators: predators,
        "Prey/Pred": Number(ratio) || 0,
      }
    },
  }

  simulation.stopCondition = (sim) => {
    const preys = sim.world.getAgentsByKind("prey")
    return preys.length === 0
  }
}
