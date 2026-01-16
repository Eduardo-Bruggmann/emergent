import { useEffect, useRef, useState } from "preact/hooks"
import Controls from "./Controls"
import Simulation from "@/engine/Simulation"
import { setupDLAScenario } from "@/scenarios/dla/setup"
// import { setupFlockingScenario } from "@/scenarios/flocking/setup"
// import { setupForestFireScenario } from "@/scenarios/forest-fire/setup"
// import { setupPredatorPreyScenario } from "@/scenarios/predator-prey/setup"
// import { setupVirusScenario } from "@/scenarios/virus/setup"

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const simulationRef = useRef<Simulation | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    simulationRef.current = new Simulation(canvasRef.current, setupDLAScenario)
    setReady(true)

    return () => simulationRef.current?.stop()
  }, [])

  return (
    <div class="flex justify-center items-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div class="flex flex-col w-full max-w-4xl gap-4">
        <header class="flex justify-between items-center">
          <div>
            <h1 class="text-lg font-semibold">Emergent</h1>
            <p class="text-xs text-slate-400">Agent-based simulation</p>
          </div>

          <Controls simulation={simulationRef.current} disabled={!ready} />
        </header>

        <div class="bg-slate-900 border border-slate-800 rounded-lg p-2">
          <canvas
            ref={canvasRef}
            width={1000}
            height={520}
            class="w-full h-auto bg-slate-950 rounded"
          />
        </div>
      </div>
    </div>
  )
}
