import { motion } from 'framer-motion'

export default function GinaTyping({ message = "Gina is thinking..." }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-3 py-3 px-4 chat-message-gina rounded-xl max-w-xs"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 shadow-lg">
        <span className="text-xs font-bold text-navy-950 font-display">G</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">{message}</span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold-500"
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
