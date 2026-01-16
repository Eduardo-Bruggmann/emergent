import BoundsRule from "@/engine/shared/BoundsRule"
import { createVirus, setVirusState, VIRUS_KIND, type VirusData } from "./Virus"
import type Simulation from "@/engine/Simulation"

export function setupVirusScenario(simulation: Simulation) {
  const world = simulation.world

  world.clear()
  simulation.clearRules()

  for (let i = 0; i < 100; i++) {
    world.addEntity(
      createVirus(Math.random() * world.width, Math.random() * world.height)
    )
  }

  const [patientZero] = world.getEntitiesByKind<VirusData>(VIRUS_KIND)
  if (patientZero) {
    setVirusState(patientZero, "infected")
  }

  simulation.addRule(new BoundsRule())
}
