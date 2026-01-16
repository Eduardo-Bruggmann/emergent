import Entity, { type EntityBehavior } from "@/engine/Entity"

export type VirusState = "healthy" | "infected" | "recovered"
export type VirusData = {
  status: VirusState
  vx: number
  vy: number
  infectedTime: number
}

export const VIRUS_KIND = "virus"

const RECOVERY_TIME = 300
const INFECTION_RADIUS = 10

export function createVirus(
  x: number,
  y: number,
  status: VirusState = "healthy"
): Entity<VirusData> {
  const state: VirusData = {
    status,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    infectedTime: 0,
  }

  const behavior: EntityBehavior<VirusData> = {
    decide: ({ world, entity, state }) => {
      if (state.status !== "infected") return

      state.infectedTime++

      for (const other of world.getEntitiesByKind<VirusData>(VIRUS_KIND)) {
        if (other === entity) continue

        const otherState = other.state
        if (otherState.status !== "healthy") continue

        if (
          entity.distanceTo(other) < INFECTION_RADIUS &&
          Math.random() < 0.2
        ) {
          setVirusState(other, "infected")
        }
      }

      if (state.infectedTime >= RECOVERY_TIME) {
        setVirusState(entity, "recovered")
      }
    },
    act: ({ entity, state }) => {
      entity.translate(state.vx, state.vy)
    },
  }

  const virus = new Entity<VirusData>({
    kind: VIRUS_KIND,
    x,
    y,
    radius: 5,
    state,
    behavior,
  })

  setVirusState(virus, status)
  return virus
}

export function setVirusState(entity: Entity<VirusData>, status: VirusState) {
  entity.mutateState((state) => {
    state.status = status
    if (status !== "infected") state.infectedTime = 0
  })

  if (status === "healthy") entity.color = "#22c55e"
  if (status === "infected") entity.color = "#fbbf24"
  if (status === "recovered") entity.color = "#38bdf8"
}
