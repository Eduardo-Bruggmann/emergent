import Predator from "./Predator.js"
import Prey from "./Prey.js"
import BoundsRule from "./rules/BoundsRule.js"
import PredationRule from "./rules/PredationRule.js"

export function setupPredatorPreyScenario(simulation) {
  const { world } = simulation

  for (let i = 0; i < 20; i++) {
    world.addEntity(new Prey(Math.random() * 800, Math.random() * 600))
  }

  for (let i = 0; i < 5; i++) {
    world.addEntity(new Predator(Math.random() * 800, Math.random() * 600))
  }

  simulation.addRule(new BoundsRule())
  simulation.addRule(new PredationRule())
}
