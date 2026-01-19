import BoundsRule from "@/engine/BoundsRule"
import { createTree, setTreeState, TREE_KIND, type TreeState } from "./Tree"
import type Simulation from "@/engine/Simulation"

export function setupForestFireScenario(simulation: Simulation) {
  const world = simulation.world

  const spacing = 15

  for (let x = spacing; x < world.width; x += spacing) {
    for (let y = spacing; y < world.height; y += spacing) {
      world.addEntity(createTree(x, y))
    }
  }

  const trees = world.getAgentsByKind<TreeState>(TREE_KIND)
  const starter = trees[Math.floor(Math.random() * trees.length)]
  if (starter) {
    setTreeState(starter, "burning")
  }

  simulation.addRule(new BoundsRule())

  simulation.stopCondition = (sim) => {
    const trees = sim.world.getAgentsByKind<TreeState>(TREE_KIND)
    return trees.every((tree) => tree.state.status !== "burning")
  }
}
