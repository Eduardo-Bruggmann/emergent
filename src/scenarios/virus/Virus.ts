import Agent from "@/core/Agent"
import type World from "@/core/World"

type VirusState = "healthy" | "infected" | "recovered"

export default class Virus extends Agent {
  private state: VirusState
  private vx: number
  private vy: number
  private infectedTime = 0
  private readonly recoveryTime = 300
  private readonly infectionRadius = 10

  constructor(x: number, y: number, state: VirusState = "healthy") {
    super(x, y, 5)

    this.state = state
    this.vx = Math.random() * 2 - 1
    this.vy = Math.random() * 2 - 1
    this.syncColor()
  }

  getState(): VirusState {
    return this.state
  }

  setState(state: VirusState) {
    this.state = state
    this.syncColor()
  }

  protected decide(world: World) {
    if (this.state !== "infected") return

    this.infectedTime++

    for (const other of world.getEntitiesOfType(Virus)) {
      if (other === this || other.state !== "healthy") continue

      if (
        this.distanceTo(other) < this.infectionRadius &&
        Math.random() < 0.2
      ) {
        other.setState("infected")
      }
    }

    if (this.infectedTime >= this.recoveryTime) {
      this.setState("recovered")
    }
  }

  protected act(_world: World) {
    this.translate(this.vx, this.vy)
  }

  private syncColor() {
    if (this.state === "healthy") this.color = "#22c55e"
    if (this.state === "infected") this.color = "#fbbf24"
    if (this.state === "recovered") this.color = "#38bdf8"
  }
}
