import Simulation from "@/engine/Simulation"
import { createAggregate } from "./Aggregate"
import { createParticle } from "./Particle"
import BoundsRule from "@/engine/BoundsRule"
import AggregationRule from "./rules/AggregationRule"

export function setupDLAScenario(simulation: Simulation) {
  const { world } = simulation

  world.addEntity(createAggregate(world.width / 2, world.height / 2))

  for (let i = 0; i < 200; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.max(world.width, world.height) / 2 + 20

    world.addEntity(
      createParticle(
        world.width / 2 + Math.cos(angle) * radius,
        world.height / 2 + Math.sin(angle) * radius,
      ),
    )
  }

  simulation.addRule(new BoundsRule())
  simulation.addRule(new AggregationRule())

  simulation.stopCondition = (sim) => {
    const agents = sim.world.agentsSnapshot
    return !agents.some((a) => a.kind === "particle")
  }
}
