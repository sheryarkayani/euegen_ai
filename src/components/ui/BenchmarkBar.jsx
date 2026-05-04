export default function BenchmarkBar({ label, value, unit = '%', bands, userValue }) {
  const displayValue = userValue !== undefined ? userValue : value

  // Find which band the user falls in
  const userBand = bands?.find(b => displayValue >= b.min && displayValue < b.max) || bands?.[bands.length - 1]

  // Calculate position (0–100%)
  const maxVal = bands?.[bands.length - 1]?.max || 100
  const minVal = bands?.[0]?.min || 0
  const position = Math.min(100, Math.max(0, ((displayValue - minVal) / (maxVal - minVal)) * 100))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-navy-950">
            {displayValue}{unit}
          </span>
          {userBand && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{
              backgroundColor: `${userBand.color}20`,
              color: userBand.color,
            }}>
              {userBand.label}
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Gradient bar */}
        <div className="benchmark-bar w-full" />

        {/* Band labels */}
        <div className="flex justify-between mt-1">
          {bands?.map((band, i) => (
            <span key={i} className="text-xs text-gray-600" style={{ color: band.color + '99' }}>
              {band.label}
            </span>
          ))}
        </div>

        {/* User position marker */}
        <div
          className="absolute top-0 w-3 h-3 rounded-full border-2 border-white shadow-lg -mt-1.5"
          style={{
            left: `calc(${position}% - 6px)`,
            backgroundColor: userBand?.color || '#d4a853',
            boxShadow: `0 0 8px ${userBand?.color || '#d4a853'}80`,
          }}
        />
      </div>
    </div>
  )
}
