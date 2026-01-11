import World from "./World"

export default class Simulation {
  constructor() {
    this.isRunning = false
    this.tickCount = 0
    this.world = new World(800, 600)
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
    console.log(`Tick ${this.tickCount}`)

    if (this.tickCount >= 100) {
      this.stop()
    }
  }
}
