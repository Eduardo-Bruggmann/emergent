import Agent, { AgentBehavior, Position } from "@/engine/Agent"

export const BOID_KIND = "boid"

export type BoidState = {
  vx: number
  vy: number
  maxSpeed: number
  maxForce: number
}

export function createBoid(x: number, y: number): Agent<BoidState> {
  const angle = Math.random() * Math.PI * 2
  const speed = 2 + Math.random() * 2

  const state: BoidState = {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    maxSpeed: 4,
    maxForce: 0.2,
  }

  const behavior: AgentBehavior<BoidState> = {
    act: ({ agent }) => {
      limitSpeed(agent.state)
      agent.translate(agent.state.vx, agent.state.vy)
    },
  }

  return new Agent<BoidState>({
    x,
    y,
    radius: 6,
    color: "#558cf4",
    kind: BOID_KIND,
    state,
    behavior,
  })
}

export function boidVelocity(boid: Agent<BoidState>): Position {
  return { x: boid.state.vx, y: boid.state.vy }
}

export function applyBoidForce(boid: Agent<BoidState>, fx: number, fy: number) {
  boid.mutateState((state) => {
    // Limit force magnitude
    const forceMag = Math.hypot(fx, fy)
    if (forceMag > state.maxForce) {
      fx = (fx / forceMag) * state.maxForce
      fy = (fy / forceMag) * state.maxForce
    }

    // Apply force to velocity
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
