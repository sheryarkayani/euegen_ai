export const BENCHMARKS = {
  payrollPct: {
    label: 'Payroll as % of Revenue',
    poor: { max: 100, label: 'Critical', color: '#ef4444' },
    bands: [
      { min: 0, max: 30, label: 'Excellent', color: '#10b981' },
      { min: 30, max: 38, label: 'Good', color: '#3b82f6' },
      { min: 38, max: 42, label: 'Average', color: '#f59e0b' },
      { min: 42, max: 100, label: 'Red Flag', color: '#ef4444' },
    ],
    healthy: '30–38%',
    redFlag: '>42%',
  },
  ebitdaMargin: {
    label: 'EBITDA Margin',
    bands: [
      { min: 0, max: 10, label: 'Poor', color: '#ef4444' },
      { min: 10, max: 20, label: 'Average', color: '#f59e0b' },
      { min: 20, max: 30, label: 'Good', color: '#3b82f6' },
      { min: 30, max: 100, label: 'Excellent', color: '#10b981' },
    ],
    healthy: '20–25%',
    excellent: '40%+',
  },
  conversionRate: {
    label: 'Consultation Conversion',
    bands: [
      { min: 0, max: 40, label: 'Struggling', color: '#ef4444' },
      { min: 40, max: 55, label: 'Below Average', color: '#f59e0b' },
      { min: 55, max: 70, label: 'Average', color: '#3b82f6' },
      { min: 70, max: 100, label: 'Excellent', color: '#10b981' },
    ],
    excellent: '70–80%',
    struggling: '<40%',
  },
  rebookingRate: {
    label: 'Patient Rebooking Rate',
    bands: [
      { min: 0, max: 50, label: 'Poor', color: '#ef4444' },
      { min: 50, max: 65, label: 'Average', color: '#f59e0b' },
      { min: 65, max: 75, label: 'Good', color: '#3b82f6' },
      { min: 75, max: 100, label: 'Excellent', color: '#10b981' },
    ],
    highPerformer: '75–80%',
  },
  rentPct: {
    label: 'Rent as % of Revenue',
    bands: [
      { min: 0, max: 10, label: 'Healthy', color: '#10b981' },
      { min: 10, max: 15, label: 'Watch', color: '#f59e0b' },
      { min: 15, max: 100, label: 'High', color: '#ef4444' },
    ],
    healthy: '<10%',
  },
  revenuePerVisit: {
    label: 'Revenue Per Visit',
    bands: [
      { min: 0, max: 250, label: 'Poor', color: '#ef4444' },
      { min: 250, max: 350, label: 'Average', color: '#f59e0b' },
      { min: 350, max: 500, label: 'Good', color: '#3b82f6' },
      { min: 500, max: 9999, label: 'Excellent', color: '#10b981' },
    ],
    good: '$350–500',
    excellent: '$500+',
  },
  marketingPct: {
    label: 'Marketing Spend as % of Revenue',
    bands: [
      { min: 0, max: 3, label: 'Too Low', color: '#f59e0b' },
      { min: 3, max: 7, label: 'Healthy', color: '#10b981' },
      { min: 7, max: 12, label: 'High', color: '#3b82f6' },
      { min: 12, max: 100, label: 'Excessive', color: '#ef4444' },
    ],
    healthy: '3–7%',
  },
}

export const SCORE_COLORS = {
  red: { min: 0, max: 40, color: '#ef4444', label: 'Critical', bg: 'rgba(239,68,68,0.1)' },
  amber: { min: 41, max: 65, color: '#f59e0b', label: 'Needs Attention', bg: 'rgba(245,158,11,0.1)' },
  blue: { min: 66, max: 80, color: '#3b82f6', label: 'Good', bg: 'rgba(59,130,246,0.1)' },
  green: { min: 81, max: 100, color: '#10b981', label: 'Excellent', bg: 'rgba(16,185,129,0.1)' },
}

export function getScoreColor(score) {
  if (score <= 40) return SCORE_COLORS.red
  if (score <= 65) return SCORE_COLORS.amber
  if (score <= 80) return SCORE_COLORS.blue
  return SCORE_COLORS.green
}

export const TIER_ORDER = ['free', 'starter', 'growth', 'scale', 'enterprise']

export function hasAccess(userTier, requiredTier) {
  if (!requiredTier || requiredTier === 'free') return true
  return TIER_ORDER.indexOf(userTier) >= TIER_ORDER.indexOf(requiredTier)
}
