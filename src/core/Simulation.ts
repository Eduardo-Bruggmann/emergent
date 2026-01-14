import CanvasRenderer from "@/renderer/CanvasRenderer"
import RandomScheduler from "./RandomScheduler"
import World from "./World"
import type Rule from "./shared/Rule"
import type Scheduler from "./Scheduler"

export type ScenarioSetup = (simulation: Simulation) => void

export default class Simulation {
  private running = false
  private tickCount = 0
  private readonly world: World
  private rules: Rule[] = []
  private readonly scheduler: Scheduler
  private readonly renderer: CanvasRenderer
  private scenarioSetup: ScenarioSetup

  constructor(canvas: HTMLCanvasElement, scenarioSetup: ScenarioSetup) {
    this.world = new World(canvas.width, canvas.height)
    this.scheduler = new RandomScheduler()
    this.renderer = new CanvasRenderer(canvas, this.world)
    this.scenarioSetup = scenarioSetup

    this.reset()
  }

  start() {
    if (this.running) return
    this.running = true
    this.loop()
  }

  stop() {
    this.running = false
  }

  reset() {
    this.stop()
    this.tickCount = 0
    this.world.clear()
    this.clearRules()

    this.scenarioSetup?.(this)
    this.renderer.render()
  }

  setScenario(setup: ScenarioSetup) {
    this.scenarioSetup = setup
    this.reset()
  }

  addRule(rule: Rule) {
    this.rules.push(rule)
  }

  clearRules() {
    this.rules = []
  }

  getWorld(): World {
    return this.world
  }

  getRules(): readonly Rule[] {
    return this.rules
  }

  private loop() {
    if (!this.running) return

    this.tick()
    requestAnimationFrame(() => this.loop())
  }

  private tick() {
    this.tickCount++

    const scheduled = this.scheduler.schedule(this.world.getEntities())

    for (const entity of scheduled) {
      entity.update(this.world)
    }

    for (const rule of this.rules) {
      rule.apply(this.world)
    }

    this.renderer.render()
  }
}
