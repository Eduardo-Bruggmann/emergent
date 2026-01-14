import Tree from "./Tree"
import BoundsRule from "../../engine/BoundsRule.js"

export function setupForestFireScenario(simulation) {
  const { world } = simulation

  world.clear()
  simulation.rules = []

  const spacing = 15

  for (let x = spacing; x < world.width; x += spacing) {
    for (let y = spacing; y < world.height; y += spacing) {
      world.addEntity(new Tree(x, y))
    }
  }

  const trees = world.getEntities()
  trees[Math.floor(Math.random() * trees.length)].state = "burning"

  simulation.addRule(new BoundsRule())
}
