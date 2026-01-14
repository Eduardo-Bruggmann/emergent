import BoundsRule from "@/core/shared/BoundsRule"
import Tree from "./Tree"
import type Simulation from "@/core/Simulation"

export function setupForestFireScenario(simulation: Simulation) {
  const world = simulation.getWorld()

  world.clear()
  simulation.clearRules()

  const spacing = 15

  for (let x = spacing; x < world.width; x += spacing) {
    for (let y = spacing; y < world.height; y += spacing) {
      world.addEntity(new Tree(x, y))
    }
  }

  const trees = world.getEntitiesOfType(Tree)
  const starter = trees[Math.floor(Math.random() * trees.length)]
  starter?.setState("burning")

  simulation.addRule(new BoundsRule())
}
