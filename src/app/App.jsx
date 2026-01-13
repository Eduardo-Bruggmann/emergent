import { useEffect, useRef, useState } from "preact/hooks"
import Controls from "./Controls.jsx"
import Simulation from "../engine/Simulation.js"
import { setupPredatorPreyScenario } from "../scenarios/predator-prey/setup.js"
import { setupFlockingScenario } from "../scenarios/flocking/setup.js"

export default function App() {
  const canvasRef = useRef(null)
  const simulationRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const sim = new Simulation(canvasRef.current)
    // setupPredatorPreyScenario(sim)
    setupFlockingScenario(sim)

    simulationRef.current = new Simulation(
      canvasRef.current,
      setupFlockingScenario
    )
    setReady(true)

    return () => simulationRef.current.stop()
  }, [])

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div class="w-full max-w-4xl flex flex-col gap-4">
        <header class="flex items-center justify-between">
          <div>
            <h1 class="text-lg font-semibold">Emergent</h1>
            <p class="text-xs text-slate-400">Agent-based simulation</p>
          </div>

          <Controls simulation={simulationRef.current} disabled={!ready} />
        </header>

        <div class="border border-slate-800 rounded-lg bg-slate-900 p-2">
          <canvas
            ref={canvasRef}
            width={1000}
            height={520}
            class="w-full h-auto block bg-slate-950 p-2 rounded"
          />
        </div>
      </div>
    </div>
  )
}
