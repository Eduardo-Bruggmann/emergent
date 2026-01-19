import Agent, { type AgentBehavior } from "@/engine/Agent"

export const VIRUS_KIND = "virus"

const RECOVERY_TIME = 300
const INFECTION_RADIUS = 10

export type VirusState = "healthy" | "infected" | "recovered"

export type VirusData = {
  status: VirusState
  vx: number
  vy: number
  infectedTime: number
}

export function createVirus(
  x: number,
  y: number,
  status: VirusState = "healthy",
): Agent<VirusData> {
  const state: VirusData = {
    status,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    infectedTime: 0,
  }

  const behavior: AgentBehavior<VirusData> = {
    decide: ({ world, agent }) => {
      if (agent.state.status !== "infected") return

      agent.mutateState((state) => {
        state.infectedTime++
      })

      for (const other of world.getAgentsByKind<VirusData>(VIRUS_KIND)) {
        if (other === agent) continue

        const otherState = other.state
        if (otherState.status !== "healthy") continue

        if (agent.distanceTo(other) < INFECTION_RADIUS && Math.random() < 0.2) {
          setVirusState(other, "infected")
        }
      }

      if (agent.state.infectedTime >= RECOVERY_TIME) {
        setVirusState(agent, "recovered")
      }
    },
    act: ({ agent }) => {
      agent.translate(agent.state.vx, agent.state.vy)
    },
  }

  const virus = new Agent<VirusData>({
    kind: VIRUS_KIND,
    x,
    y,
    radius: 5,
    color: "#22c55e",
    state,
    behavior,
  })

  setVirusState(virus, status)
  return virus
}

export function setVirusState(agent: Agent<VirusData>, status: VirusState) {
  agent.mutateState((state) => {
    state.status = status
    if (status !== "infected") state.infectedTime = 0
  })

  if (status === "healthy") agent.color = "#22c55e"
  if (status === "infected") agent.color = "#fbbf24"
  if (status === "recovered") agent.color = "#38bdf8"
}
