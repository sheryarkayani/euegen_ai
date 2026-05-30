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
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E7EB] bg-white z-40">
      <div>
        {title && <h1 className="font-display text-base font-bold text-[#111111] tracking-wide">{title}</h1>}
        {subtitle && <p className="text-xs text-[#6B7280] mt-0.5 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search Pill */}
        <div className="relative w-48 md:w-64">
          <input
            type="text"
            placeholder="Search docs, assets, EMR..."
            className="w-full bg-[#F4F4F6] text-[#222222] placeholder-[#6B7280] text-xs rounded-md h-9 border border-[#E5E7EB] pl-8 pr-3 focus:outline-none focus:border-[#5850EC] focus:bg-white transition-all"
          />
          <Search size={13} className="absolute left-2.5 top-3 text-[#6B7280]" />
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-md hover:bg-[#F4F4F6] flex items-center justify-center text-[#4B5563] hover:text-[#111111] transition-all">
          <Bell size={15} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-[#F4F4F6] transition-all border border-[#E5E7EB]"
          >
            <div className="w-6 h-6 rounded-md bg-[#5850EC] flex items-center justify-center">
              <span className="text-[10px] font-extrabold text-white uppercase">
                {user?.fullName?.[0] || 'U'}
              </span>
            </div>
            <span className="text-xs text-[#222222] font-semibold hidden md:inline">{user?.fullName?.split(' ')[0] || 'Demo'}</span>
            <Badge variant={TIER_BADGES[user?.tier] || 'gray'} size="xs">
              {user?.tier || 'free'}
            </Badge>
            <ChevronDown size={12} className="text-[#6B7280]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-[#E5E7EB] shadow-lg py-1 z-50">
              <div className="px-3 py-2 border-b border-[#E5E7EB]">
                <p className="text-xs font-semibold text-[#111111]">{user?.fullName}</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => { signOut(); setMenuOpen(false) }}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-[#4B5563] hover:text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
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
