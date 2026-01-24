import BoundsRule from "@/engine/BoundsRule"
import { createVirus, setVirusState, VIRUS_KIND, type VirusData } from "./Virus"
import type Simulation from "@/engine/Simulation"

const POPULATION = 100

export function setupVirusScenario(simulation: Simulation) {
  const { world } = simulation

  for (let i = 0; i < POPULATION; i++) {
    world.addEntity(
      createVirus(Math.random() * world.width, Math.random() * world.height),
    )
  }

  world.flush()

  const [patientZero] = world.getAgentsByKind<VirusData>(VIRUS_KIND)
  if (patientZero) {
    setVirusState(patientZero, "infected")
  }

  simulation.addRule(new BoundsRule())

  simulation.statsProvider = {
    getExtraStats: () => {
      const viruses = world.getAgentsByKind<VirusData>(VIRUS_KIND)
      const healthy = viruses.filter((v) => v.state.status === "healthy").length
      const infected = viruses.filter(
        (v) => v.state.status === "infected",
      ).length
      const recovered = viruses.filter(
        (v) => v.state.status === "recovered",
      ).length
      return {
        Healthy: healthy,
        Infected: infected,
        Recovered: recovered,
      }
    },
  }

  simulation.stopCondition = (sim) => {
    const viruses = sim.world.getAgentsByKind<VirusData>(VIRUS_KIND)
    return viruses.every((v) => v.state.status !== "infected")
  }
}
