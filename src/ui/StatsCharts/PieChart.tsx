export type PieSlice = {
  label: string
  value: number
  color: string
}

type PieChartProps = {
  data: PieSlice[]
  size?: number
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angle: number,
): { x: number; y: number } {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ")
}

export default function PieChart({ data, size = 175 }: PieChartProps) {
  const normalized = data.map((item) => ({
    ...item,
    value: Number.isFinite(item.value) ? item.value : 0,
  }))
  const total = normalized.reduce((sum, item) => sum + item.value, 0)

  const radius = 45
  const center = 50

  const percentageFor = (value: number) =>
    Math.round((total > 0 ? value / total : 0) * 100)

  const drawable = normalized.filter((item) => item.value > 0)
  let currentAngle = -Math.PI / 2
  const slices = drawable.map((item) => {
    const proportion = total > 0 ? item.value / total : 0
    const startAngle = currentAngle
    const endAngle = currentAngle + proportion * 2 * Math.PI

    currentAngle = endAngle

    return {
      ...item,
      path: describeArc(center, center, radius, startAngle, endAngle),
      proportion,
    }
  })

  return (
    <div class="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {total <= 0 ? (
          <circle cx={center} cy={center} r={radius} fill="#1f2937" />
        ) : drawable.length === 1 ? (
          <circle cx={center} cy={center} r={radius} fill={drawable[0].color} />
        ) : (
          slices.map((slice) => (
            <path key={slice.label} d={slice.path} fill={slice.color} />
          ))
        )}
      </svg>

      <div class="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {normalized.map((item) => (
          <div key={item.label} class="flex items-center gap-1 text-xs">
            <span
              class="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span class="text-slate-400">{item.label}</span>
            <span class="text-slate-300">{percentageFor(item.value)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
