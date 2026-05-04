import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = false, gold = false, onClick }) {
  const base = 'rounded-xl p-5 glass-card'
  const goldBorder = gold ? 'border-gold-500/30' : ''
  const hoverClass = hover ? 'cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/30 hover:shadow-lg hover:shadow-black/30' : ''

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        onClick={onClick}
        className={`${base} ${goldBorder} ${hoverClass} ${className}`}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${base} ${goldBorder} ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, icon: Icon }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center">
            <Icon size={16} className="text-gold-500" />
          </div>
        )}
        <div>
          <h3 className="font-display font-semibold text-white text-base">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
