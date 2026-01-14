import Agent from "@/core/Agent"
import type World from "@/core/World"

type TreeState = "tree" | "burning" | "burned"

export default class Tree extends Agent {
  private state: TreeState
  private burnTime = 0
  private readonly maxBurnTime = 120
  private readonly fireRadius = 18
  private readonly spreadChance = 0.05

  constructor(x: number, y: number, state: TreeState = "tree") {
    super(x, y, 4)
    this.state = state
    this.syncColor()
  }

  getState(): TreeState {
    return this.state
  }

  setState(state: TreeState) {
    this.state = state
    this.syncColor()
  }

  protected decide(world: World) {
    if (this.state !== "burning") return

    this.burnTime++

    for (const other of world.getEntitiesOfType(Tree)) {
      if (other === this || other.state !== "tree") continue

      const distance = this.distanceTo(other)

      if (distance <= this.fireRadius && Math.random() < this.spreadChance) {
        other.setState("burning")
      }
    }

    if (this.burnTime >= this.maxBurnTime) {
      this.setState("burned")
    }
  }

  protected act(_world: World) {}

  private syncColor() {
    if (this.state === "tree") this.color = "#22c55e"
    if (this.state === "burning") this.color = "#f97316"
    if (this.state === "burned") this.color = "#475569"
  }
}
