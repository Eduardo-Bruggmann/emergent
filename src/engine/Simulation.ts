import CanvasRenderer from "@/renderer/CanvasRenderer"
import randomScheduler from "./RandomScheduler"
import StatsCollector, { type StatsSnapshot } from "./StatsCollector"
import World from "./World"
import type Rule from "./Rule"
import type { Scheduler } from "./Scheduler"

export type ScenarioSetup = (simulation: Simulation) => void

export type StopCondition = (simulation: Simulation) => boolean

export default class Simulation {
  private running = false
  private tickCount = 0
  private readonly _world: World
  private _rules: Rule[] = []
  private readonly scheduler: Scheduler
  private readonly renderer: CanvasRenderer
  private scenarioSetup: ScenarioSetup
  private _stopCondition?: StopCondition
  private readonly stats: StatsCollector

  constructor(canvas: HTMLCanvasElement, scenarioSetup: ScenarioSetup) {
    this._world = new World(canvas.width, canvas.height)
    this.scheduler = randomScheduler
    this.renderer = new CanvasRenderer(canvas, this._world)
    this.scenarioSetup = scenarioSetup
    this.stats = new StatsCollector()

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
    this._stopCondition = undefined
    this.world.reset()
    this.clearRules()

    this.scenarioSetup?.(this)
    this.world.flush()
    this.applyRulesOnce()
    this.world.flush()
    this.renderer.render()
    this.stats.reset()
    this.stats.record(this.tickCount, this.collectCounts())
  }

  private loop() {
    if (!this.running) return

    this.tick()
    requestAnimationFrame(() => this.loop())
  }

  private tick() {
    if (this._stopCondition?.(this)) {
      this.stop()
      return
    }

    this.tickCount++

    const scheduled = this.scheduler(this.world.agentsSnapshot)

    for (const entity of scheduled) {
      entity.update(this.world)
    }

    for (const rule of this.rules) {
      rule.apply(this.world)
    }

    this.world.flush()
    this.renderer.render()
    this.stats.record(this.tickCount, this.collectCounts())
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

  onStats(listener: (snapshot: StatsSnapshot) => void): () => void {
    return this.stats.subscribe(listener)
  }

  private collectCounts(): Record<string, number> {
    const counts: Record<string, number> = {}

    for (const agent of this.world.agentsSnapshot) {
      counts[agent.kind] = (counts[agent.kind] ?? 0) + 1
    }

    return counts
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

  set stopCondition(condition: StopCondition) {
    this._stopCondition = condition
  }
}
