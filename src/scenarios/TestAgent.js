import Agent from "../engine/Agent.js"

export default class TestAgent extends Agent {
  decide(world) {
    // TODO
  }

  act(world) {
    this.x += 1
  }
}
