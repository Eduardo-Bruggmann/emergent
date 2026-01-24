import { useEffect, useRef, useState } from "preact/hooks"
import Controls from "./Controls"
import Simulation from "@/engine/Simulation"
import type { StatsSnapshot } from "@/engine/StatsCollector"
import StatsPanel from "./StatsPanel"
import SimulationView, { SCENARIOS } from "./SimulationView"

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const simulationRef = useRef<Simulation | null>(null)
  const [simulation, setSimulation] = useState<Simulation | null>(null)
  const [stats, setStats] = useState<StatsSnapshot | null>(null)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [running, setRunning] = useState(false)

  const loadScenario = (index: number) => {
    if (!canvasRef.current) return

    simulationRef.current?.stop()

    const { setup } = SCENARIOS[index]

    const sim = new Simulation(canvasRef.current, setup)
    simulationRef.current = sim
    setSimulation(sim)
    setStats(null)
    setRunning(false)

    sim.onStats((snapshot) => setStats(snapshot))
  }

  useEffect(() => {
    loadScenario(scenarioIndex)

    return () => {
      simulationRef.current?.stop()
    }
  }, [scenarioIndex])

  const prevScenario = () => {
    setScenarioIndex((i) => (i - 1 + SCENARIOS.length) % SCENARIOS.length)
  }

  const nextScenario = () => {
    setScenarioIndex((i) => (i + 1) % SCENARIOS.length)
  }

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6">
      <div class="mx-auto flex max-w-6xl flex-col gap-3">
        <header class="flex flex-col items-center gap-5 sm:gap-3 sm:flex-row sm:justify-between">
          <div class="text-center sm:text-left">
            <h1 class="text-xl font-semibold mb-0.5">Emergent</h1>
            <p class="text-xs text-slate-400">Agent-based Simulation</p>
          </div>

          <SimulationView
            scenarioIndex={scenarioIndex}
            onPrev={prevScenario}
            onNext={nextScenario}
          />

          <Controls
            simulation={simulationRef.current}
            disabled={!simulation}
            running={running}
            onRunningChange={setRunning}
          />
        </header>

        <div class="flex flex-col lg:flex-row gap-4">
          <section class="flex-1">
            <div class="border border-slate-800 bg-slate-900 rounded-lg p-2">
              <canvas
                ref={canvasRef}
                width={1000}
                height={520}
                class="aspect-video w-full rounded bg-slate-950"
              />
            </div>
          </section>

          <aside class="w-full lg:w-80">
            <div class="h-full border border-slate-800 bg-slate-900 rounded-lg p-3">
              <StatsPanel
                snapshot={stats}
                scenarioLabel={SCENARIOS[scenarioIndex].label}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
