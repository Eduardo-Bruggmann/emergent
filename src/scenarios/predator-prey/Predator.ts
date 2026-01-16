import Entity, { type EntityBehavior } from "@/engine/Entity"
import { PREY_KIND, type PreyState } from "./Prey"

export type PredatorState = { speed: number; targetId: number | null }
export const PREDATOR_KIND = "predator"

export function createPredator(x: number, y: number): Entity<PredatorState> {
  const state: PredatorState = { speed: 2.2, targetId: null }

  const behavior: EntityBehavior<PredatorState> = {
    decide: ({ world, entity, state }) => {
      const preys = world.getEntitiesByKind<PreyState>(PREY_KIND)

      if (preys.length === 0) {
        state.targetId = null
        return
      }

      const closest = preys.reduce<Entity<PreyState> | null>(
        (current, prey) => {
          if (!current) return prey
          return entity.distanceTo(prey) < entity.distanceTo(current)
            ? prey
            : current
        },
        null
      )

      state.targetId = closest?.id ?? null
    },
    act: ({ world, entity, state }) => {
      if (state.targetId === null) return

      const target = world
        .getEntitiesByKind<PreyState>(PREY_KIND)
        .find((prey) => prey.id === state.targetId)

      if (!target) return

      const dx = target.x - entity.x
      const dy = target.y - entity.y
      const magnitude = Math.hypot(dx, dy)

      if (magnitude === 0) return

      entity.translate(
        (dx / magnitude) * state.speed,
        (dy / magnitude) * state.speed
      )
    },
  }

  return new Entity<PredatorState>({
    kind: PREDATOR_KIND,
    x,
    y,
    radius: 8,
    color: "#ef4444",
    state,
    behavior,
  })
}
