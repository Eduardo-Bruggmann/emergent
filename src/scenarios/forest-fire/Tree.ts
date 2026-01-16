import Entity, { type EntityBehavior } from "@/engine/Entity"

export type TreeStage = "tree" | "burning" | "burned"
export type TreeState = { status: TreeStage; burnTime: number }

export const TREE_KIND = "tree"

const MAX_BURN_TIME = 120
const FIRE_RADIUS = 18
const SPREAD_CHANCE = 0.05

export function createTree(
  x: number,
  y: number,
  stage: TreeStage = "tree"
): Entity<TreeState> {
  const state: TreeState = { status: stage, burnTime: 0 }

  const behavior: EntityBehavior<TreeState> = {
    decide: ({ world, entity, state }) => {
      if (state.status !== "burning") return

      state.burnTime++

      for (const other of world.getEntitiesByKind<TreeState>(TREE_KIND)) {
        if (other === entity) continue

        const otherState = other.state
        if (otherState.status !== "tree") continue

        if (
          entity.distanceTo(other) <= FIRE_RADIUS &&
          Math.random() < SPREAD_CHANCE
        ) {
          setTreeState(other, "burning")
        }
      }

      if (state.burnTime >= MAX_BURN_TIME) {
        setTreeState(entity, "burned")
      }
    },
  }

  const tree = new Entity<TreeState>({
    kind: TREE_KIND,
    x,
    y,
    radius: 4,
    state,
    behavior,
  })

  setTreeState(tree, stage)
  return tree
}

export function setTreeState(entity: Entity<TreeState>, stage: TreeStage) {
  entity.mutateState((state) => {
    state.status = stage
    if (stage !== "burning") state.burnTime = 0
  })

  if (stage === "tree") entity.color = "#22c55e"
  if (stage === "burning") entity.color = "#f97316"
  if (stage === "burned") entity.color = "#475569"
}
