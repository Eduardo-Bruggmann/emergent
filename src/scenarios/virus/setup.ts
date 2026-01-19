import BoundsRule from "@/engine/BoundsRule"
import { createVirus, setVirusState, VIRUS_KIND, type VirusData } from "./Virus"
import type Simulation from "@/engine/Simulation"

export function setupVirusScenario(simulation: Simulation) {
  const world = simulation.world

  for (let i = 0; i < 100; i++) {
    world.addEntity(
      createVirus(Math.random() * world.width, Math.random() * world.height),
    )
  }

  const [patientZero] = world.getAgentsByKind<VirusData>(VIRUS_KIND)
  if (patientZero) {
    setVirusState(patientZero, "infected")
  }

  simulation.addRule(new BoundsRule())

  simulation.stopCondition = (sim) => {
    const viruses = sim.world.getAgentsByKind<VirusData>(VIRUS_KIND)
    return viruses.every((v) => v.state.status !== "infected")
  }
}
