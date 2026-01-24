import Agent, { type AgentBehavior } from "@/engine/Agent"

export const VIRUS_KIND = "virus"

const RECOVERY_TIME = 300
const INFECTION_RADIUS = 15
const INFECTION_CHANCE = 0.4
const SEPARATION_RADIUS = 12

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
      if (agent.state.status !== "infected" && Math.random() < 0.05) {
        const angle = Math.random() * Math.PI * 2
        agent.mutateState((s) => {
          s.vx = Math.cos(angle) * 1.5
          s.vy = Math.sin(angle) * 1.5
        })
      }

      if (agent.state.status !== "infected") return

      agent.mutateState((state) => {
        state.infectedTime++
      })

      for (const other of world.getAgentsByKind<VirusData>(VIRUS_KIND)) {
        if (other === agent) continue
        if (other.state.status !== "healthy") continue

        if (
          agent.distanceTo(other) < INFECTION_RADIUS &&
          Math.random() < INFECTION_CHANCE
        ) {
          setVirusState(other, "infected")
        }
      }

      if (agent.state.infectedTime >= RECOVERY_TIME) {
        setVirusState(agent, "recovered")
      }
    },
    act: ({ world, agent }) => {
      let moveX = agent.state.vx
      let moveY = agent.state.vy

      if (agent.state.status !== "infected") {
        for (const other of world.getAgentsByKind<VirusData>(VIRUS_KIND)) {
          if (other === agent || other.state.status === "infected") continue
          const dist = agent.distanceTo(other)
          if (dist < SEPARATION_RADIUS && dist > 0) {
            moveX += ((agent.x - other.x) / dist) * 0.5
            moveY += ((agent.y - other.y) / dist) * 0.5
          }
        }
      }

      agent.translate(moveX, moveY)
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
