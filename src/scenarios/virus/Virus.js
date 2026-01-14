import Agent from "../../engine/Agent.js"

export default class Virus extends Agent {
  constructor(x, y, state = "healthy") {
    super(x, y)

    this.radius = 5

    this.state = state
    this.vx = Math.random() * 2 - 1
    this.vy = Math.random() * 2 - 1

    this.infectedTime = 0
    this.recoveryTime = 300
    this.infectionRadius = 10
  }

  update(world) {
    this.move()
    this.handleInfection(world)
  }

  move() {
    this.x += this.vx
    this.y += this.vy
  }

  handleInfection(world) {
    if (this.state === "infected") {
      this.infectedTime++

      for (const other of world.getEntities()) {
        if (other === this || other.state !== "healthy") continue

        const dx = other.x - this.x
        const dy = other.y - this.y
        const dist = Math.hypot(dx, dy)

        if (dist < this.infectionRadius) {
          if (Math.random() < 0.2) {
            other.state = "infected"
          }
        }
      }

      if (this.infectedTime >= this.recoveryTime) {
        this.state = "recovered"
      }
    }
  }
}
