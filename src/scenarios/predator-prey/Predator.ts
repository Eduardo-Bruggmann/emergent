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
      if (agent.state.targetId === null) return

      const target = world
        .getAgentsByKind<PreyState>(PREY_KIND)
        .find((prey) => prey.id === agent.state.targetId)
      if (!target) return

      const dx = target.x - agent.x
      const dy = target.y - agent.y
      const magnitude = Math.hypot(dx, dy)

      if (magnitude === 0) return

      agent.translate(
        (dx / magnitude) * agent.state.speed,
        (dy / magnitude) * agent.state.speed,
      )
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
