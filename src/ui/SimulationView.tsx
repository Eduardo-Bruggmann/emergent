import { ChevronLeft, ChevronRight } from "lucide-preact"

import { setupDLAScenario } from "@/scenarios/dla/setup"
import { setupFlockingScenario } from "@/scenarios/flocking/setup"
import { setupForestFireScenario } from "@/scenarios/forest-fire/setup"
import { setupPredatorPreyScenario } from "@/scenarios/predator-prey/setup"
import { setupVirusScenario } from "@/scenarios/virus/setup"

export const SCENARIOS = [
  { label: "DLA", setup: setupDLAScenario },
  { label: "Flocking", setup: setupFlockingScenario },
  { label: "Forest Fire", setup: setupForestFireScenario },
  { label: "Predator-Prey", setup: setupPredatorPreyScenario },
  { label: "Virus Spread", setup: setupVirusScenario },
]

interface SimulationViewProps {
  scenarioIndex: number
  onPrev: () => void
  onNext: () => void
}

export default function SimulationView({
  scenarioIndex,
  onPrev,
  onNext,
}: SimulationViewProps) {
  return (
    <div class="flex items-center gap-3">
      <button
        title="Previous scenario"
        class="bg-slate-800 hover:bg-slate-700 text-xs rounded-md px-2 py-1"
        onClick={onPrev}
      >
        <ChevronLeft size={16} />
      </button>

      <span class="min-w-25 text-center text-sm font-medium text-slate-300">
        {SCENARIOS[scenarioIndex].label}
      </span>

      <button
        class="bg-slate-800 hover:bg-slate-700 text-xs rounded-md px-2 py-1"
        title="Next scenario"
        onClick={onNext}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
