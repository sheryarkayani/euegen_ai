import { Bell, Search, ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import useAuthStore from '../../store/useAuthStore'
import Badge from '../ui/Badge'

const TIER_BADGES = {
  free: 'gray',
  starter: 'amber',
  growth: 'gold',
  scale: 'rose',
  enterprise: 'green',
}

export default function TopBar({ title, subtitle }) {
  const user = useAuthStore(s => s.user)
  const signOut = useAuthStore(s => s.signOut)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#C5A059]/20 bg-white/80 backdrop-blur-md z-40">
      <div>
        {title && <h1 className="font-display text-lg font-bold text-[#1C1917] tracking-wide">{title}</h1>}
        {subtitle && <p className="text-xs text-[#57534E] mt-0.5 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="w-8 h-8 rounded-lg bg-[#FCFAF7] hover:bg-[#F6F4EE] flex items-center justify-center text-[#57534E] hover:text-[#AA7C11] transition-all border border-[#C5A059]/15 hover:border-[#C5A059]/35">
          <Search size={14} />
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg bg-[#FCFAF7] hover:bg-[#F6F4EE] flex items-center justify-center text-[#57534E] hover:text-[#AA7C11] transition-all border border-[#C5A059]/15 hover:border-[#C5A059]/35">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-md shadow-rose-500/50" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FCFAF7] hover:bg-[#F6F4EE] transition-all border border-[#C5A059]/20 hover:border-[#C5A059]/40"
          >
            <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-extrabold text-white uppercase">
                {user?.fullName?.[0] || 'U'}
              </span>
            </div>
            <span className="text-sm text-[#292524] font-semibold">{user?.fullName?.split(' ')[0] || 'Demo'}</span>
            <Badge variant={TIER_BADGES[user?.tier] || 'gray'} size="xs">
              {user?.tier || 'free'}
            </Badge>
            <ChevronDown size={12} className="text-[#78716C]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl border border-[#C5A059]/25 shadow-xl py-1 z-50 bg-white">
              <div className="px-3 py-2 border-b border-[#C5A059]/10">
                <p className="text-xs font-semibold text-[#1C1917]">{user?.fullName}</p>
                <p className="text-[10px] text-[#57534E] mt-0.5 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => { signOut(); setMenuOpen(false) }}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-[#57534E] hover:text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
              >
                <LogOut size={12} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
