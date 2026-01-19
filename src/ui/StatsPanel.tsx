import type { StatsSnapshot } from "@/engine/StatsCollector"

export type StatsPanelProps = {
  snapshot: StatsSnapshot | null
}

export default function StatsPanel({ snapshot }: StatsPanelProps) {
  return (
    <div class="bg-slate-900 border border-slate-800 rounded-lg p-3">
      <div class="flex items-baseline justify-between text-xs text-slate-400 mb-2">
        <span class="uppercase tracking-wide text-slate-300">Statistics</span>
        {snapshot ? (
          <span>
            tick {snapshot.tick} • total {snapshot.total}
          </span>
        ) : (
          <span>Waiting...</span>
        )}
      </div>

      {!snapshot ? (
        <div class="text-xs text-slate-500">
          Start the simulation to see the numbers in real time.
        </div>
      ) : (
        <div class="flex flex-col gap-1 font-mono text-xs text-slate-200">
          {snapshot.items.map((item) => (
            <div class="flex items-center gap-2" key={item.kind}>
              <span class="w-20 truncate text-slate-300">{item.kind}</span>
              <span class="w-10 text-right text-slate-100">{item.count}</span>
              <span class="flex-1 whitespace-pre text-slate-400">
                {item.sparkline}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
