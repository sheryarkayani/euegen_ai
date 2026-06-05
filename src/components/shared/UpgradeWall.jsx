import { motion } from 'framer-motion'
import { Lock, Zap, Star, Crown } from 'lucide-react'
import Button from '../ui/Button'

const TIER_ICONS = {
  starter: Star,
  growth: Zap,
  scale: Crown,
  enterprise: Crown,
}

const TIER_COLORS = {
  starter: '#6366f1',
  growth: '#8b5cf6',
  scale: '#ef4444',
  enterprise: '#10b981',
}

const TIER_FEATURES = {
  starter: ['Health Score Reports', 'Launch Center', 'Vendor Advisor'],
  growth: ['Financial KPI Dashboard', 'Sales Training', 'Hiring Suite', 'Marketing Studio', 'Compliance Center'],
  scale: ['Mystery Shopper AI', 'PE Intelligence', 'Priority Support'],
  enterprise: ['White-label', 'Custom AI Training', 'Dedicated Consultant'],
}

export default function UpgradeWall({ requiredTier = 'growth', feature = 'this feature' }) {
  const Icon = TIER_ICONS[requiredTier] || Lock
  const color = TIER_COLORS[requiredTier] || '#6366f1'
  const features = TIER_FEATURES[requiredTier] || []

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-8 max-w-md w-full text-center border"
        style={{ borderColor: `${color}30` }}
      >
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={28} style={{ color }} />
        </div>

        <h2 className="font-display text-2xl font-bold text-navy-950 mb-2">
          Upgrade to {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {feature} is available on the <strong style={{ color }}>{requiredTier}</strong> plan and above.
          Unlock the full power of Eugene's CFO intelligence platform.
        </p>

        {features.length > 0 && (
          <div className="text-left mb-6 space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">What you unlock:</p>
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                </div>
                {f}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button variant="primary" className="w-full justify-center">
            Upgrade Now — Starting at $297/mo
          </Button>
          <Button variant="ghost" className="w-full justify-center">
            View All Plans
          </Button>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          30-day money-back guarantee · Cancel anytime
        </p>
      </motion.div>
    </div>
  )
}
