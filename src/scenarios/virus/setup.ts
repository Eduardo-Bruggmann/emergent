import BoundsRule from "@/core/shared/BoundsRule"
import Virus from "./Virus"
import type Simulation from "@/core/Simulation"

export function setupVirusScenario(simulation: Simulation) {
  const world = simulation.getWorld()

  world.clear()
  simulation.clearRules()

  for (let i = 0; i < 100; i++) {
    world.addEntity(
      new Virus(Math.random() * world.width, Math.random() * world.height)
    )
  }

  const [patientZero] = world.getEntitiesOfType(Virus)
  patientZero?.setState("infected")

  simulation.addRule(new BoundsRule())
}
