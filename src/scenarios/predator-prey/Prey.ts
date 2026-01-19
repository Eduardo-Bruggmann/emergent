import Agent, { type AgentBehavior } from "@/engine/Agent"

export const PREY_KIND = "prey"

export type PreyState = { direction: number; speed: number }

export function createPrey(x: number, y: number): Agent<PreyState> {
  const state: PreyState = {
    direction: Math.random() * Math.PI * 2,
    speed: 1.5,
  }

  const behavior: AgentBehavior<PreyState> = {
    decide: ({ agent }) => {
      if (Math.random() < 0.05) {
        agent.mutateState((state) => {
          state.direction = Math.random() * Math.PI * 2
        })
      }
    },
    act: ({ agent }) => {
      agent.translate(
        Math.cos(agent.state.direction) * agent.state.speed,
        Math.sin(agent.state.direction) * agent.state.speed,
      )
    },
  }

  return new Agent<PreyState>({
    kind: PREY_KIND,
    x,
    y,
    radius: 7,
    color: "#22c55e",
    state,
    behavior,
  })
}
