import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, onChange, min = 1, compact = false }) {
  const size = compact
    ? 'h-8 w-8'
    : 'h-10 w-10'

  return (
    <div className="inline-flex items-center rounded-full border border-stone-200 bg-white p-1">
      <button
        type="button"
        aria-label="ลดจำนวน"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${size} flex items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        aria-live="polite"
        className={`${compact ? 'w-8 text-sm' : 'w-10'} text-center font-semibold tabular-nums`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="เพิ่มจำนวน"
        onClick={() => onChange(value + 1)}
        className={`${size} flex items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
