import TestAgent from "../scenarios/TestAgent.js"
import World from "./World.js"

export default class Simulation {
  constructor() {
    this.isRunning = false
    this.tickCount = 0
    this.world = new World(800, 600)

    this.agent = new TestAgent(100, 100)
    this.world.addEntity(this.agent)
  }

  start() {
    if (this.isRunning) return

    this.isRunning = true
    console.log("Simulation started.")
    this.loop()
  }

  stop() {
    this.isRunning = false
    console.log("Simulation stopped.")
  }

  loop() {
    if (!this.isRunning) return

    this.tick()
    requestAnimationFrame(() => this.loop())
  }

  tick() {
    this.tickCount++

    const entities = this.world.getEntities()

    for (const entity of entities) {
      if (typeof entity.update === "function") {
        entity.update(this.world)
      }
    }

    console.log(
      `Tick ${this.tickCount} | Entities: ${this.world.getEntities().length}`
    )

    console.log(`Agent position: ${this.agent.x}, ${this.agent.y}`)

    if (this.tickCount >= 100) {
      this.stop()
    }
  }
}
