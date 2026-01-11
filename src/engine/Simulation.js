import CanvasRenderer from "../renderer/CanvasRenderer.js"
import BoundsRule from "../scenarios/BoundsRule.js"
import TestAgent from "../scenarios/TestAgent.js"
import RandomScheduler from "./RandomScheduler.js"
import World from "./World.js"

export default class Simulation {
  constructor() {
    this.isRunning = false
    this.tickCount = 0
    this.world = new World(800, 600)
    this.rules = []

    this.agent = new TestAgent(100, 100)
    this.world.addEntity(this.agent)

    this.addRule(new BoundsRule())
    this.scheduler = new RandomScheduler()

    const canvas = document.getElementById("sim-canvas")
    this.renderer = new CanvasRenderer(canvas, this.world)
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

    const scheduled = this.scheduler.schedule(this.world.getEntities())

    for (const entity of scheduled) {
      if (typeof entity.update === "function") {
        entity.update(this.world)
      }
    }

    for (const rule of this.rules) {
      rule.apply(this.world)
    }

    console.log(
      `Tick ${this.tickCount} | Entities: ${this.world.getEntities().length}`
    )

    console.log(`Agent position: ${this.agent.x}, ${this.agent.y}`)

    this.renderer.render()

    if (this.tickCount >= 100) {
      this.stop()
    }
  }

  addRule(rule) {
    this.rules.push(rule)
  }
}
