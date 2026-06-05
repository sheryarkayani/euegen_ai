import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, MessageCircle, Activity, Rocket, DollarSign, Target,
  Users, Palette, Wrench, Scale, TrendingUp, Briefcase, Coins,
  Settings, Phone, ChevronDown, ChevronRight, Lock
} from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import { hasAccess } from '../../data/benchmarks'

const NAV_ITEMS = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    tier: 'free',
  },
  {
    path: '/ask',
    label: 'Ask Eugene',
    icon: MessageCircle,
    tier: 'free',
  },
  {
    path: '/health-score',
    label: 'Health Score',
    icon: Activity,
    tier: 'free',
    children: [
      { path: '/health-score', label: 'Run Diagnostic', tier: 'free' },
      { path: '/health-score/report', label: 'My Reports', tier: 'starter' },
    ],
  },
  {
    path: '/launch',
    label: 'Launch Center',
    icon: Rocket,
    tier: 'starter',
  },
  {
    path: '/financial',
    label: 'Financial & KPIs',
    icon: DollarSign,
    tier: 'growth',
    children: [
      { path: '/financial', label: 'KPI Dashboard', tier: 'growth' },
      { path: '/financial/pl', label: 'P&L Analyzer', tier: 'growth' },
      { path: '/financial/calculator', label: 'Revenue Calculator', tier: 'growth' },
    ],
  },
  {
    path: '/sales',
    label: 'Sales Training',
    icon: Target,
    tier: 'growth',
    children: [
      { path: '/sales/script', label: 'Script Generator', tier: 'growth' },
      { path: '/sales/consult', label: 'Art of a Consult', tier: 'growth' },
      { path: '/sales/mystery-shop', label: 'Mystery Shopper', tier: 'scale' },
      { path: '/sales/email-templates', label: 'Email Templates', tier: 'growth' },
    ],
  },
  {
    path: '/hiring',
    label: 'Hiring Suite',
    icon: Users,
    tier: 'growth',
    children: [
      { path: '/hiring', label: 'Job Descriptions', tier: 'growth' },
      { path: '/hiring/comp', label: 'Comp Benchmarks', tier: 'growth' },
      { path: '/hiring/onboarding', label: 'Onboarding Kits', tier: 'growth' },
    ],
  },
  {
    path: '/marketing',
    label: 'Marketing Studio',
    icon: Palette,
    tier: 'growth',
    children: [
      { path: '/marketing/brand', label: 'Brand Builder', tier: 'growth' },
      { path: '/marketing/social', label: 'Social Calendar', tier: 'growth' },
      { path: '/marketing/email', label: 'Email Campaigns', tier: 'growth' },
    ],
  },
  {
    path: '/vendors',
    label: 'Vendor Advisor',
    icon: Wrench,
    tier: 'starter',
    children: [
      { path: '/vendors', label: 'Equipment ROI', tier: 'starter' },
      { path: '/vendors/compare', label: 'Vendor Compare', tier: 'starter' },
    ],
  },
  {
    path: '/compliance',
    label: 'Compliance',
    icon: Scale,
    tier: 'growth',
    children: [
      { path: '/compliance', label: 'State Licensing', tier: 'growth' },
      { path: '/compliance/forms', label: 'Form Templates', tier: 'growth' },
      { path: '/compliance/osha', label: 'OSHA Checklist', tier: 'growth' },
    ],
  },
  {
    path: '/pe-intel',
    label: 'PE Intelligence',
    icon: TrendingUp,
    tier: 'scale',
    children: [
      { path: '/pe-intel', label: 'PE Readiness', tier: 'scale' },
      { path: '/pe-intel/ebitda', label: 'EBITDA Builder', tier: 'scale' },
    ],
  },
]

function NavItem({ item, userTier }) {
  const location = useLocation()
  const [expanded, setExpanded] = useState(
    item.children?.some(c => location.pathname === c.path || location.pathname.startsWith(c.path))
  )
  const locked = !hasAccess(userTier, item.tier)
  const Icon = item.icon

  const isActive = item.children
    ? item.children.some(c => location.pathname === c.path)
    : location.pathname === item.path

  if (item.children) {
    return (
      <div className="w-full">
        <button
          onClick={() => !locked && setExpanded(!expanded)}
          className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left transition-all ${
            isActive 
              ? 'bg-[#F4F4F6] text-[#111111] font-semibold' 
              : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F4F4F6]/60'
          } ${locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center gap-3">
            <Icon size={16} className={isActive ? 'text-[#111111]' : 'text-[#6B7280]'} />
            <span className="text-[14px] font-medium tracking-wide">{item.label}</span>
          </div>
          <div className="flex items-center gap-1">
            {locked && <Lock size={9} className="text-[#6B7280]" />}
            {!locked && (expanded ? <ChevronDown size={12} className="text-[#6B7280]" /> : <ChevronRight size={12} className="text-[#6B7280]" />)}
          </div>
        </button>

        <AnimatePresence>
          {expanded && !locked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pl-6 py-1 space-y-0.5 border-l border-[#E5E7EB] ml-5 mt-0.5">
                {item.children.map((child) => {
                  const childLocked = !hasAccess(userTier, child.tier)
                  return (
                    <NavLink
                      key={child.path}
                      to={childLocked ? '#' : child.path}
                      onClick={e => childLocked && e.preventDefault()}
                      className={({ isActive: ia }) =>
                        `flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-[13px] transition-all ${
                          ia && !childLocked
                            ? 'text-[#5850EC] bg-[#5850EC]/5 font-bold'
                            : childLocked
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F4F4F6]/50'
                        }`
                      }
                    >
                      <span className="tracking-wide">{child.label}</span>
                      {childLocked && <Lock size={8} className="text-slate-400" />}
                    </NavLink>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (locked) {
    return (
      <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg opacity-40 cursor-not-allowed">
        <div className="flex items-center gap-3 text-slate-400">
          <Icon size={16} />
          <span className="text-[14px] font-medium tracking-wide">{item.label}</span>
        </div>
        <Lock size={9} className="text-slate-400" />
      </div>
    )
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      className={({ isActive: ia }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] transition-all ${
          ia ? 'bg-[#F4F4F6] text-[#111111] font-semibold' : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F4F4F6]/60'
        }`
      }
    >
      {({ isActive: ia }) => (
        <>
          <Icon size={16} className={ia ? 'text-[#111111]' : 'text-[#6B7280]'} />
          <span className="tracking-wide">{item.label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const user = useAuthStore(s => s.user)
  const practice = useAuthStore(s => s.practice)
  const userTier = user?.tier || 'free'

  return (
    <div className="fixed left-0 top-0 h-full w-60 flex flex-col bg-[#F9F9FB] border-r border-[#E5E7EB] z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#E5E7EB] bg-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#111111] flex items-center justify-center shadow-sm relative overflow-hidden">
            <span className="font-display font-extrabold text-white text-lg">E</span>
          </div>
          <div>
            <p className="font-display font-extrabold text-[#111111] text-[15px] leading-tight tracking-wide">Eugene AI</p>
            <p className="text-[9px] text-[#5850EC] font-bold tracking-widest leading-tight mt-0.5 uppercase">STRATEGIC CFO</p>
          </div>
        </div>
      </div>

      {/* Practice context */}
      {practice && (
        <div className="px-4 py-3 mx-3 mt-3 rounded-lg bg-white border border-[#E5E7EB] shadow-sm">
          <p className="text-xs font-semibold text-[#222222] truncate">{practice.name}</p>
          <p className="text-[10px] text-[#6B7280] truncate mt-0.5">{practice.city}, {practice.state}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} userTier={userTier} />
        ))}

        <div className="my-3 border-t border-[#E5E7EB]" />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] transition-all ${
              isActive ? 'bg-[#F4F4F6] text-[#111111] font-semibold' : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F4F4F6]/60'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Settings size={16} className={isActive ? 'text-[#111111]' : 'text-[#6B7280]'} />
              <span className="tracking-wide">Settings</span>
            </>
          )}
        </NavLink>
      </nav>

      {/* Book with Eugene CTA */}
      <div className="p-3 border-t border-[#E5E7EB] bg-white">
        <a
          href="https://www.eugenekconsulting.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-3 py-3 rounded-lg border border-[#E5E7EB] transition-all duration-200 hover:bg-[#F9F9FB] shadow-sm bg-white"
        >
          <div className="w-8 h-8 rounded-lg bg-[#5850EC]/10 flex items-center justify-center flex-shrink-0">
            <Phone size={14} className="text-[#5850EC]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#111111]">Book with Eugene</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">1:1 Strategy Session</p>
          </div>
        </a>
      </div>
    </div>
  )
}
