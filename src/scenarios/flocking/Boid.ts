import Agent, { AgentBehavior, Position } from "@/engine/Agent"

export const BOID_KIND = "boid"

export type BoidState = {
  vx: number
  vy: number
  maxSpeed: number
}

export function createBoid(x: number, y: number): Agent<BoidState> {
  const state: BoidState = {
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    maxSpeed: 2,
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
    color: "purple",
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
    limitSpeed(state)
  })
}

function limitSpeed(state: BoidState) {
  const speed = Math.hypot(state.vx, state.vy)
  if (speed > state.maxSpeed) {
    state.vx = (state.vx / speed) * state.maxSpeed
    state.vy = (state.vy / speed) * state.maxSpeed
  }
}
