import { motion } from 'framer-motion'
import { Phone, Calendar, X } from 'lucide-react'
import { useState } from 'react'

export default function BookKatrinaCard() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-40 w-72 glass-card rounded-2xl border border-indigo-500/20 shadow-2xl overflow-hidden bg-white"
    >
      {/* Indigo top bar */}
      <div className="h-1 primary-gradient w-full" />

      <div className="p-4">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-navy-950 transition-colors"
        >
          <X size={12} />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center flex-shrink-0 shadow-lg glow-primary">
            <span className="font-display font-bold text-sm text-white">K</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-950 leading-tight">Scale your Med Spa?</p>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              Some growth opportunities require a CFO. Let's look at the numbers.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href="tel:+12147022111"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-navy-950 bg-gray-100 hover:bg-gray-200 rounded-lg py-2 transition-colors"
          >
            <Phone size={12} />
            Call Maven
          </a>
          <a
            href="https://www.mavenfp.com/contact-us"
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

export function BookKatrinaInline() {
  return (
    <div className="glass-card rounded-xl p-4 border border-indigo-500/25 mt-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full primary-gradient flex items-center justify-center flex-shrink-0">
          <span className="font-display font-bold text-sm text-white">K</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-navy-950">This is a great opportunity for a CFO deep-dive with Katrina</p>
          <p className="text-xs text-gray-500 mt-0.5">Complex pricing, due diligence, and compensation deserves a professional review.</p>
        </div>
        <a
          href="https://www.mavenfp.com/contact-us"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs px-3.5 py-2 rounded-lg flex-shrink-0 text-white"
        >
          Book a Call
        </a>
      </div>
    </div>
  )
}
