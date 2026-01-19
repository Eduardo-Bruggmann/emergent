// TODO: fix O(n²) fire spreading performance issue for large forests
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

      advanceBurn(agent)
      spreadFire(world, agent)
      maybeFinishBurn(agent, agent.state.burnTime)
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

function advanceBurn(agent: Agent<TreeState>) {
  agent.mutateState((state) => {
    state.burnTime++
  })
}

function spreadFire(world: World, agent: Agent<TreeState>) {
  for (const other of world.getAgentsByKind<TreeState>(TREE_KIND)) {
    if (other === agent) continue

    const otherState = other.state
    if (otherState.status !== "tree") continue

    if (
      agent.distanceTo(other) <= FIRE_RADIUS &&
      Math.random() < SPREAD_CHANCE
    ) {
      setTreeState(other, "burning")
    }
  }
}

function maybeFinishBurn(agent: Agent<TreeState>, burnTime: number) {
  if (burnTime >= MAX_BURN_TIME) {
    setTreeState(agent, "burned")
  }
}

export function setTreeState(agent: Agent<TreeState>, stage: TreeStage) {
  agent.mutateState((state) => {
    state.status = stage
    state.burnTime = stage === "burning" ? 0 : state.burnTime
  })

  if (stage === "tree") agent.color = "#22c55e"
  if (stage === "burning") agent.color = "#f97316"
  if (stage === "burned") agent.color = "#475569"
}
