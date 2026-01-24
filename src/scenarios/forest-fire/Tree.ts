import Agent, { type AgentBehavior } from "@/engine/Agent"
import type World from "@/engine/World"

export const TREE_KIND = "tree"

const MAX_BURN_TIME = 120
const FIRE_RADIUS = 18
const SPREAD_CHANCE = 0.05

export type TreeStage = "tree" | "burning" | "burned"
export type TreeState = { status: TreeStage; burnTime: number }

export function createTree(
  x: number,
  y: number,
  stage: TreeStage = "tree",
): Agent<TreeState> {
  const state: TreeState = { status: stage, burnTime: 0 }

  const behavior: AgentBehavior<TreeState> = {
    decide: ({ world, agent }) => {
      if (agent.state.status !== "burning") return

      agent.mutateState((s) => s.burnTime++)

      for (const other of world.getAgentsByKind<TreeState>(TREE_KIND)) {
        if (other === agent || other.state.status !== "tree") continue
        if (
          agent.distanceTo(other) <= FIRE_RADIUS &&
          Math.random() < SPREAD_CHANCE
        ) {
          setTreeState(other, "burning")
        }
      }

      if (agent.state.burnTime >= MAX_BURN_TIME) {
        setTreeState(agent, "burned")
      }
    },
  }

  const tree = new Agent<TreeState>({
    x,
    y,
    radius: 4,
    color: "#22c55e",
    kind: TREE_KIND,
    state,
    behavior,
  })

  setTreeState(tree, stage)
  return tree
}

export function setTreeState(agent: Agent<TreeState>, stage: TreeStage) {
  agent.mutateState((state) => {
    state.status = stage
    if (stage === "burning") state.burnTime = 0
  })

  if (stage === "tree") agent.color = "#22c55e"
  if (stage === "burning") agent.color = "#f97316"
  if (stage === "burned") agent.color = "#475569"
}
