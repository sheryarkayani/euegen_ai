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
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gray-1005 backdrop-blur-md">
      <div>
        {title && <h1 className="font-display text-lg font-semibold text-navy-950">{title}</h1>}
        {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-navy-950 transition-colors">
          <Search size={15} />
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-navy-950 transition-colors">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-med" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
          >
            <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-xs font-bold text-navy-950">
                {user?.fullName?.[0] || 'U'}
              </span>
            </div>
            <span className="text-sm text-navy-950 font-medium">{user?.fullName?.split(' ')[0] || 'Demo'}</span>
            <Badge variant={TIER_BADGES[user?.tier] || 'gray'} size="xs">
              {user?.tier || 'free'}
            </Badge>
            <ChevronDown size={12} className="text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl border border-gray-200 shadow-xl py-1 z-50">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-medium text-navy-950">{user?.fullName}</p>
                <p className="text-xs text-gray-600 mt-0.5">{user?.email}</p>
              </div>
              <button
                onClick={() => { signOut(); setMenuOpen(false) }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
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
