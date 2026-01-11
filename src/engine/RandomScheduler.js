import Scheduler from "./Scheduler.js"

export default class RandomScheduler extends Scheduler {
  schedule(entities) {
    return [...entities].sort(() => Math.random() - 0.5)
  }
}
