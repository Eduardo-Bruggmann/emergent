import type { StatsSnapshot } from "@/engine/StatsCollector"
import StatsCharts from "./StatsCharts"

export type StatsPanelProps = {
  snapshot: StatsSnapshot | null
  scenarioLabel: string
}

export default function StatsPanel({
  snapshot,
  scenarioLabel,
}: StatsPanelProps) {
  return (
    <div class="bg-slate-900 border border-slate-800 rounded-lg p-3">
      <div class="flex justify-between items-baseline text-xs text-slate-400 mb-2">
        <span class="uppercase tracking-wide text-slate-300">Statistics</span>
        {snapshot ? (
          <span>
            Tick {snapshot.tick} • Total {snapshot.total}
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
        <>
          {snapshot.extra && (
            <div class="mt-2 pt-2 border-t border-slate-800">
              {Object.entries(snapshot.extra).map(([key, value]) => (
                <div class="flex justify-between text-xs">
                  <span class="text-slate-400">{key}</span>
                  <span class="text-slate-200">{value}</span>
                </div>
              ))}
            </div>
          )}
          <StatsCharts snapshot={snapshot} scenarioLabel={scenarioLabel} />
        </>
      )}
    </div>
  )
}
