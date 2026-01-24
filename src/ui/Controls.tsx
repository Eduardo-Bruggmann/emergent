import type Simulation from "@/engine/Simulation"

type ControlAction = "start" | "stop" | "reset"

interface ControlsProps {
  simulation: Simulation | null
  disabled?: boolean
  running: boolean
  onRunningChange: (running: boolean) => void
}

export default function Controls({
  simulation,
  disabled,
  running,
  onRunningChange,
}: ControlsProps) {
  const noSimulation = disabled || !simulation
  const stopped = simulation?.stopCondition?.(simulation) ?? false

  const call = (action: ControlAction) => {
    if (!simulation || noSimulation) return

    const actions: Record<ControlAction, () => void> = {
      start: () => {
        simulation.start()
        onRunningChange(true)
      },
      stop: () => {
        simulation.stop()
        onRunningChange(false)
      },
      reset: () => {
        simulation.reset()
        onRunningChange(false)
      },
    }

    actions[action]()
  }

  const base =
    "px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition disabled:opacity-40 disabled:cursor-default"

  return (
    <div class="flex gap-2">
      <button
        onClick={() => call("start")}
        disabled={noSimulation || running || stopped}
        class={`${base} bg-emerald-600 hover:bg-emerald-500`}
      >
        Start
      </button>

      <button
        onClick={() => call("stop")}
        disabled={noSimulation || !running || stopped}
        class={`${base} bg-rose-600 hover:bg-rose-500`}
      >
        Stop
      </button>

      <button
        onClick={() => call("reset")}
        disabled={noSimulation}
        class={`${base} bg-slate-700 hover:bg-slate-600`}
      >
        Reset
      </button>
    </div>
  )
}
