import CanvasRenderer from "../renderer/CanvasRenderer.js"
import RandomScheduler from "./RandomScheduler.js"
import World from "./World.js"

export default class Simulation {
  constructor(canvas, scenarioSetup) {
    this.isRunning = false
    this.tickCount = 0

    this.world = new World(1000, 520)
    this.rules = []
    this.scheduler = new RandomScheduler()
    this.renderer = new CanvasRenderer(canvas, this.world)

    this.scenarioSetup = scenarioSetup
    this.reset()
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.loop()
  }

  stop() {
    this.isRunning = false
  }

  reset() {
    this.stop()
    this.tickCount = 0
    this.world.clear()
    this.rules = []

    if (this.scenarioSetup) {
      this.scenarioSetup(this)
    }

    this.renderer.render()
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
      entity.update?.(this.world)
    }

    for (const rule of this.rules) {
      rule.apply(this.world)
    }

    this.renderer.render()
  }

  addRule(rule) {
    this.rules.push(rule)
  }
}
