/* Only scenarios that make sense to show proportional data should have a configured here */
export type PieChartConfig = {
  keys: string[]
  colors: Record<string, string>
}

const predatorPreyConfig: PieChartConfig = {
  keys: ["Preys", "Predators"],
  colors: {
    Preys: "#10b981",
    Predators: "#ef4444",
  },
}

const virusConfig: PieChartConfig = {
  keys: ["Healthy", "Infected", "Recovered"],
  colors: {
    Healthy: "#10b981",
    Infected: "#ef4444",
    Recovered: "#6366f1",
  },
}

const forestFireConfig: PieChartConfig = {
  keys: ["Alive", "Burning", "Burned"],
  colors: {
    Alive: "#10b981",
    Burning: "#f97316",
    Burned: "#64748b",
  },
}

export const CHART_CONFIGS: Record<string, PieChartConfig> = {
  "Predator-Prey": predatorPreyConfig,
  "Virus Spread": virusConfig,
  "Forest Fire": forestFireConfig,
}

export function hasPieChart(scenarioLabel: string): boolean {
  return scenarioLabel in CHART_CONFIGS
}

export function getPieChartConfig(
  scenarioLabel: string,
): PieChartConfig | undefined {
  return CHART_CONFIGS[scenarioLabel]
}
