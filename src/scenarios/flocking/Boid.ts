import Entity, { type EntityBehavior, type Vector2 } from "@/engine/Entity"

export const BOID_KIND = "boid"

export type BoidState = {
  vx: number
  vy: number
  maxSpeed: number
}

export function createBoid(x: number, y: number): Entity<BoidState> {
  const state: BoidState = {
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    maxSpeed: 2,
  }

  const behavior: EntityBehavior<BoidState> = {
    act: ({ entity, state }) => {
      limitSpeed(state)
      entity.translate(state.vx, state.vy)
    },
  }

  return new Entity<BoidState>({
    kind: BOID_KIND,
    x,
    y,
    radius: 6,
    color: "purple",
    state,
    behavior,
  })
}

export function boidVelocity(boid: Entity<BoidState>): Vector2 {
  return { x: boid.state.vx, y: boid.state.vy }
}

export function applyBoidForce(
  boid: Entity<BoidState>,
  fx: number,
  fy: number
) {
  boid.mutateState((state) => {
    state.vx += fx
    state.vy += fy
  })
}

function limitSpeed(state: BoidState) {
  const speed = Math.hypot(state.vx, state.vy)
  if (speed > state.maxSpeed) {
    state.vx = (state.vx / speed) * state.maxSpeed
    state.vy = (state.vy / speed) * state.maxSpeed
  }
}
