import Agent from "../../engine/Agent.js"

export default class Tree extends Agent {
  constructor(x, y, state = "tree") {
    super(x, y)

    this.radius = 4
    this.state = state

    this.burnTime = 0
    this.maxBurnTime = 120
    this.fireRadius = 18
    this.spreadChance = 0.05
  }

  update(world) {
    if (this.state === "burning") {
      this.burnTime++

      for (const other of world.getEntities()) {
        if (other === this || other.state !== "tree") continue

        const dx = other.x - this.x
        const dy = other.y - this.y
        const dist = Math.hypot(dx, dy)

        if (dist <= this.fireRadius && Math.random() < this.spreadChance) {
          other.state = "burning"
        }
      }

      if (this.burnTime >= this.maxBurnTime) {
        this.state = "burned"
      }
    }
  }
}
