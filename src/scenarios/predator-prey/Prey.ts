import Entity, { type EntityBehavior } from "@/engine/Entity"

export type PreyState = { direction: number; speed: number }
export const PREY_KIND = "prey"

export function createPrey(x: number, y: number): Entity<PreyState> {
  const state: PreyState = {
    direction: Math.random() * Math.PI * 2,
    speed: 1.5,
  }

  const behavior: EntityBehavior<PreyState> = {
    decide: ({ state }) => {
      if (Math.random() < 0.05) {
        state.direction = Math.random() * Math.PI * 2
      }
    },
    act: ({ entity, state }) => {
      entity.translate(
        Math.cos(state.direction) * state.speed,
        Math.sin(state.direction) * state.speed
      )
    },
  }

  return new Entity<PreyState>({
    kind: PREY_KIND,
    x,
    y,
    radius: 7,
    color: "#22c55e",
    state,
    behavior,
  })
}
