import type { StatsSnapshot } from "@/engine/StatsCollector"
import PieChart, { type PieSlice } from "./PieChart"
import { getPieChartConfig } from "./chartConfig"

type StatsChartsProps = {
  snapshot: StatsSnapshot | null
  scenarioLabel: string
}

function extractPieData(
  extra: Record<string, number> | undefined,
  scenarioLabel: string,
): PieSlice[] {
  const config = getPieChartConfig(scenarioLabel)
  if (!config || !extra) return []

  return config.keys.map((key) => {
    const raw = Number(extra[key] ?? 0)
    const value = Number.isFinite(raw) ? raw : 0
    return {
      label: key,
      value,
      color: config.colors[key],
    }
  })
}

export default function StatsCharts({
  snapshot,
  scenarioLabel,
}: StatsChartsProps) {
  // Don't show chart before simulation starts (tick 0 is initial state)
  if (!snapshot?.extra || snapshot.tick < 1) return null

  const config = getPieChartConfig(scenarioLabel)
  if (!config) return null

  const pieData = extractPieData(snapshot.extra, scenarioLabel)

  if (pieData.length === 0) return null

  return (
    <div class="mt-3 pt-3 border-t border-slate-800">
      <PieChart data={pieData} />
    </div>
  )
}
