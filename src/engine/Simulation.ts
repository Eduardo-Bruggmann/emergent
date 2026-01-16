import CanvasRenderer from "@/renderer/CanvasRenderer"
import randomScheduler from "./RandomScheduler"
import World from "./World"
import type Rule from "./shared/Rule"
import type { Scheduler } from "./Scheduler"

export type ScenarioSetup = (simulation: Simulation) => void

export default class Simulation {
  private running = false
  private tickCount = 0
  private readonly _world: World
  private _rules: Rule[] = []
  private readonly scheduler: Scheduler
  private readonly renderer: CanvasRenderer
  private scenarioSetup: ScenarioSetup

  constructor(canvas: HTMLCanvasElement, scenarioSetup: ScenarioSetup) {
    this._world = new World(canvas.width, canvas.height)
    this.scheduler = randomScheduler
    this.renderer = new CanvasRenderer(canvas, this._world)
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
    this.applyRulesOnce()
    this.renderer.render()
  }

  addRule(rule: Rule) {
    this._rules.push(rule)
  }

  clearRules() {
    this._rules = []
  }

  private applyRulesOnce() {
    for (const rule of this.rules) {
      rule.apply(this.world)
    }
  }

  private loop() {
    if (!this.running) return

    this.tick()
    requestAnimationFrame(() => this.loop())
  }

  private tick() {
    this.tickCount++

    const scheduled = this.scheduler(this.world.entities)

    for (const entity of scheduled) {
      entity.update(this.world)
    }

    for (const rule of this.rules) {
      rule.apply(this.world)
    }

    this.renderer.render()
  }

  get world(): World {
    return this._world
  }

  get rules(): readonly Rule[] {
    return this._rules
  }

  set scenario(setup: ScenarioSetup) {
    this.scenarioSetup = setup
    this.reset()
  }
}
