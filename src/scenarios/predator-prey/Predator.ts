import Agent, { type AgentBehavior } from "@/engine/Agent"
import { PREY_KIND, type PreyState } from "./Prey"

export const PREDATOR_KIND = "predator"

export type PredatorState = { speed: number; targetId: number | null }

export function createPredator(x: number, y: number): Agent<PredatorState> {
  const state: PredatorState = { speed: 2.2, targetId: null }

  const behavior: AgentBehavior<PredatorState> = {
    decide: ({ world, agent }) => {
      const preys = world.getAgentsByKind<PreyState>(PREY_KIND)

      if (preys.length === 0) {
        agent.mutateState((state) => {
          state.targetId = null
        })
        return
      }

      const closest = preys.reduce<Agent<PreyState> | null>((current, prey) => {
        if (!current) return prey
        return agent.distanceTo(prey) < agent.distanceTo(current)
          ? prey
          : current
      }, null)

      agent.mutateState((state) => {
        state.targetId = closest?.id ?? null
      })
    },
    act: ({ world, agent }) => {
      let moveX = 0
      let moveY = 0

      // Separation from other predators
      for (const other of world.getAgentsByKind<PredatorState>(PREDATOR_KIND)) {
        if (other === agent) continue
        const dist = agent.distanceTo(other)
        if (dist < 20 && dist > 0) {
          moveX += (agent.x - other.x) / dist
          moveY += (agent.y - other.y) / dist
        }
      }

      if (agent.state.targetId !== null) {
        const target = world
          .getAgentsByKind<PreyState>(PREY_KIND)
          .find((prey) => prey.id === agent.state.targetId)

        if (target) {
          const dx = target.x - agent.x
          const dy = target.y - agent.y
          const magnitude = Math.hypot(dx, dy)

          if (magnitude > 0) {
            moveX += (dx / magnitude) * agent.state.speed
            moveY += (dy / magnitude) * agent.state.speed
          }
        }
      }

      if (moveX !== 0 || moveY !== 0) {
        const mag = Math.hypot(moveX, moveY)
        agent.translate(
          (moveX / mag) * agent.state.speed,
          (moveY / mag) * agent.state.speed,
        )
      }
    },
  }

  return new Agent<PredatorState>({
    x,
    y,
    radius: 8,
    color: "#ef4444",
    kind: PREDATOR_KIND,
    state,
    behavior,
  })
}
