import Boid from "./Boid.js"
import SeparationRule from "./rules/SeparationRule.js"
import AlignmentRule from "./rules/AlignmentRule.js"
import CohesionRule from "./rules/CohesionRule.js"
import BoundsRule from "../../engine/BoundsRule.js"

export function setupFlockingScenario(simulation) {
  const { world } = simulation

  world.clear()

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
