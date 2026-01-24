import { createTree, setTreeState, TREE_KIND, type TreeState } from "./Tree"
import type Simulation from "@/engine/Simulation"

export function setupForestFireScenario(simulation: Simulation) {
  const { world } = simulation

  const spacing = 15
  let totalTrees = 0

  for (let x = spacing; x < world.width; x += spacing) {
    for (let y = spacing; y < world.height; y += spacing) {
      world.addEntity(createTree(x, y))
      totalTrees++
    }
  }

  world.flush()

  const trees = world.getAgentsByKind<TreeState>(TREE_KIND)
  const starter = trees[Math.floor(Math.random() * trees.length)]
  if (starter) {
    setTreeState(starter, "burning")
  }

  simulation.statsProvider = {
    getExtraStats: () => {
      const trees = world.getAgentsByKind<TreeState>(TREE_KIND)
      const alive = trees.filter((t) => t.state.status === "tree").length
      const burning = trees.filter((t) => t.state.status === "burning").length
      const burned = trees.filter((t) => t.state.status === "burned").length

      return {
        Alive: alive,
        Burning: burning,
        Burned: burned,
      }
    },
  }

  simulation.stopCondition = (sim) => {
    const trees = sim.world.getAgentsByKind<TreeState>(TREE_KIND)
    return trees.every((tree) => tree.state.status !== "burning")
  }
}
