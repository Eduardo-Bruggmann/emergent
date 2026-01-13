let NEXT_ID = 1

export default class Entity {
  constructor(x, y) {
    this.id = NEXT_ID++

    this.x = x
    this.y = y

    this.radius = 10
    this.color = "pink"
  }

  getPosition() {
    return { x: this.x, y: this.y }
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }
}
