import Virus from "./Virus"
import BoundsRule from "../../engine/BoundsRule.js"

export function setupVirusScenario(simulation) {
  const { world } = simulation

  world.clear()
  simulation.rules = []

  for (let i = 0; i < 100; i++) {
    world.addEntity(
      new Virus(Math.random() * world.width, Math.random() * world.height)
    )
  }

  world.getEntities()[0].state = "infected"

  simulation.addRule(new BoundsRule())
}
