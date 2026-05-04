import { motion } from 'framer-motion'
import { Phone, Calendar, X } from 'lucide-react'
import { useState } from 'react'

export default function BookGinaCard() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-40 w-72 glass-card rounded-2xl border border-gold-500/30 shadow-2xl overflow-hidden"
    >
      {/* Gold top bar */}
      <div className="h-1 gold-gradient w-full" />

      <div className="p-4">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
        >
          <X size={12} />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 shadow-lg glow-gold">
            <span className="font-display font-bold text-sm text-navy-950">G</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Complex situation?</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
              Some things need a real conversation. Talk to Gina directly.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href="tel:+15551234567"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg py-2 transition-colors"
          >
            <Phone size={12} />
            Call Gina
          </a>
          <a
            href="https://calendly.com/ginaai/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium btn-primary rounded-lg py-2"
          >
            <Calendar size={12} />
            Book a Call
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function BookGinaInline() {
  return (
    <div className="glass-card rounded-xl p-4 border border-gold-500/25 mt-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
          <span className="font-display font-bold text-sm text-navy-950">G</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">This is a great use case for a 1:1 with Gina</p>
          <p className="text-xs text-gray-500 mt-0.5">Complex situations deserve a real conversation.</p>
        </div>
        <a
          href="https://calendly.com/ginaai/consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs px-3 py-2 rounded-lg flex-shrink-0 text-navy-950"
        >
          Book a Call
        </a>
      </div>
    </div>
  )
}
