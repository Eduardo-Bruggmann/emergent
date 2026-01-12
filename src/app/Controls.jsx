export default function Controls({ simulation, disabled }) {
  const isDisabled = disabled || !simulation

  const call = (action) => {
    if (isDisabled) return
    simulation[action]()
  }

  const base =
    "px-3 py-1.5 rounded-md text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"

  return (
    <div class="flex gap-2">
      <button
        onClick={() => call("start")}
        disabled={isDisabled}
        class={`${base} bg-emerald-600 hover:bg-emerald-500`}
      >
        Start
      </button>

      <button
        onClick={() => call("stop")}
        disabled={isDisabled}
        class={`${base} bg-rose-600 hover:bg-rose-500`}
      >
        Stop
      </button>

      <button
        onClick={() => call("reset")}
        disabled={isDisabled}
        class={`${base} bg-slate-700 hover:bg-slate-600`}
      >
        Reset
      </button>
    </div>
  )
}
