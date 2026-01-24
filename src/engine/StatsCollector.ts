const LEVELS = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"]

export type StatsSnapshot = {
  tick: number
  total: number
  items: Array<{
    kind: string
    count: number
    sparkline: string
  }>
  extra?: Record<string, number>
}

export type ScenarioStatsProvider = {
  getExtraStats?: () => Record<string, number>
}

type StatsListener = (snapshot: StatsSnapshot) => void

export default class StatsCollector {
  private history: Array<{ tick: number; counts: Record<string, number> }> = []
  private _knownKinds = new Set<string>()
  private readonly listeners = new Set<StatsListener>()
  private _extra?: Record<string, number>

  constructor(
    private readonly historySize = 240,
    private readonly sparklineWidth = 40,
  ) {}

  record(
    tick: number,
    counts: Record<string, number>,
    extra?: Record<string, number>,
  ) {
    for (const kind of Object.keys(counts)) {
      this._knownKinds.add(kind)
    }

    this.history.push({ tick, counts })
    this._extra = extra

    if (this.history.length > this.historySize) {
      this.history.shift()
    }

    const snapshot = this.buildSnapshot()
    this.notify(snapshot)
  }

  reset() {
    this.history = []
    this._knownKinds.clear()
    this._extra = undefined
  }

  subscribe(listener: StatsListener): () => void {
    this.listeners.add(listener)
    const snapshot = this.buildSnapshot()
    if (snapshot) listener(snapshot)

    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify(snapshot: StatsSnapshot | null) {
    if (!snapshot) return
    for (const listener of this.listeners) {
      listener(snapshot)
    }
  }

  private buildSparkline(kind: string): string {
    const series = this.history
      .slice(-this.sparklineWidth)
      .map((entry) => entry.counts[kind] ?? 0)

    if (series.length === 0) return ""

    const max = Math.max(...series, 1)

    return series
      .map((value) => {
        const levelIndex = Math.round((value / max) * (LEVELS.length - 1))
        return LEVELS[levelIndex]
      })
      .join("")
  }

  private buildSnapshot(): StatsSnapshot | null {
    if (this.history.length === 0) return null
    const latest = this.history[this.history.length - 1]

    const kinds = this.knownKinds
    if (kinds.length === 0) return null

    const total = Object.values(latest.counts).reduce(
      (sum, value) => sum + value,
      0,
    )

    const items = kinds.map((kind) => ({
      kind,
      count: latest.counts[kind] ?? 0,
      sparkline: this.buildSparkline(kind),
    }))

    return { tick: latest.tick, total, items, extra: this._extra }
  }

  get snapshot(): StatsSnapshot | null {
    return this.buildSnapshot()
  }

  private get knownKinds(): string[] {
    return [...this._knownKinds].sort()
  }
}
