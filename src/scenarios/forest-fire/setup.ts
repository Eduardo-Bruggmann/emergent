import BoundsRule from "@/engine/shared/BoundsRule"
import { createTree, setTreeState, TREE_KIND, type TreeState } from "./Tree"
import type Simulation from "@/engine/Simulation"

export function setupForestFireScenario(simulation: Simulation) {
  const world = simulation.world

  world.clear()
  simulation.clearRules()

  const spacing = 15

  for (let x = spacing; x < world.width; x += spacing) {
    for (let y = spacing; y < world.height; y += spacing) {
      world.addEntity(createTree(x, y))
    }
  }

  const trees = world.getEntitiesByKind<TreeState>(TREE_KIND)
  const starter = trees[Math.floor(Math.random() * trees.length)]
  if (starter) {
    setTreeState(starter, "burning")
  }

  simulation.addRule(new BoundsRule())
}
