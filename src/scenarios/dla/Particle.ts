import Agent, { AgentBehavior } from "@/engine/Agent"

export const PARTICLE_KIND = "particle"

export type ParticleState = {
  direction: number
  speed: number
}

export function createParticle(x: number, y: number) {
  const state: ParticleState = {
    direction: Math.random() * Math.PI * 2,
    speed: 3,
  }

  const behavior: AgentBehavior<ParticleState> = {
    decide: ({ agent }) => {
      if (Math.random() < 0.2) {
        agent.mutateState((state) => {
          state.direction += Math.random() * Math.PI * 2
        })
      }
    },
    act: ({ agent }) => {
      const state = agent.state

      agent.translate(
        Math.cos(state.direction) * state.speed,
        Math.sin(state.direction) * state.speed,
      )
    },
  }

  return new Agent<ParticleState>({
    x,
    y,
    radius: 2,
    color: "#ffffff",
    kind: PARTICLE_KIND,
    state,
    behavior,
  })
}
