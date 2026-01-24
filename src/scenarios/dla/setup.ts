import Simulation from "@/engine/Simulation"
import { createAggregate } from "./Aggregate"
import { createParticle } from "./Particle"
import BoundsRule from "@/engine/BoundsRule"
import AggregationRule from "./rules/AggregationRule"

const INITIAL_PARTICLES = 199

export function setupDLAScenario(simulation: Simulation) {
  const { world } = simulation

  world.addEntity(createAggregate(world.width / 2, world.height / 2))

  for (let i = 0; i < INITIAL_PARTICLES; i++) {
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

  simulation.statsProvider = {
    getExtraStats: () => {
      const particles = world.getAgentsByKind("particle").length
      const aggregates = world.getAgentsByKind("aggregate").length
      const progress = Math.floor(
        ((INITIAL_PARTICLES - particles) / INITIAL_PARTICLES) * 100,
      )
      return {
        "Cluster Size": aggregates,
        "Progress %": progress,
      }
    },
  }

  simulation.stopCondition = (sim) => {
    const agents = sim.world.agentsSnapshot
    return !agents.some((a) => a.kind === "particle")
  }
}
