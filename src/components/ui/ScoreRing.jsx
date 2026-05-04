import { useEffect, useState } from 'react'
import { getScoreColor } from '../../data/benchmarks'

export default function ScoreRing({ score, size = 120, strokeWidth = 10, label, sublabel }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const { color, label: colorLabel } = getScoreColor(score)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    let start = 0
    const duration = 1500
    const startTime = performance.now()

    function animate(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setAnimatedScore(Math.round(eased * score))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [score])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(34,29,53,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-navy-950" style={{ fontSize: size * 0.22 }}>
            {animatedScore}
          </span>
          <span className="text-gray-500" style={{ fontSize: size * 0.09 }}>/ 100</span>
        </div>
      </div>
      {label && <p className="text-sm font-medium text-navy-950">{label}</p>}
      {sublabel && (
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
          {colorLabel}
        </span>
      )}
    </div>
  )
}
