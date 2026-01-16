import Entity, { EntityBehavior } from "@/engine/Entity"

export type ParticleState = {
  direction: number
  speed: number
}

export const PARTICLE_KIND = "particle"

export function createParticle(x: number, y: number) {
  const state: ParticleState = {
    direction: Math.random() * Math.PI * 2,
    speed: 1.2,
  }

  const behavior: EntityBehavior<ParticleState> = {
    decide: ({ state }) => {
      if (Math.random() < 0.2) {
        state.direction += Math.random() * Math.PI * 2
      }
    },
    act: ({ entity, state }) => {
      entity.translate(
        Math.cos(state.direction) * state.speed,
        Math.sin(state.direction) * state.speed
      )
    },
  }

  return new Entity<ParticleState>({
    kind: PARTICLE_KIND,
    x,
    y,
    radius: 2,
    color: "#ffffff",
    state,
    behavior,
  })
}
