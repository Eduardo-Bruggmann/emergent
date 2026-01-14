import { useEffect, useRef, useState } from "preact/hooks"
import Controls from "./Controls"
import Simulation from "@/core/Simulation"
import { setupPredatorPreyScenario } from "@/scenarios/predator-prey/setup"

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const simulationRef = useRef<Simulation | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    simulationRef.current = new Simulation(
      canvasRef.current,
      setupPredatorPreyScenario
    )
    setReady(true)

    return () => simulationRef.current?.stop()
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
            class="w-full h-auto block bg-slate-950 rounded"
          />
        </div>
      </div>
    </div>
  )
}
