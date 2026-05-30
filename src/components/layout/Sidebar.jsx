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
    label: 'Ask Katrina',
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
  {
    path: '/capital-budgeting',
    label: 'Capital Budgeting',
    icon: Briefcase,
    tier: 'growth',
  },
  {
    path: '/compensation-designer',
    label: 'Compensation Designer',
    icon: Coins,
    tier: 'growth',
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
          className={`sidebar-item w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
            isActive ? 'active text-[#AA7C11] bg-[#C5A059]/8 font-semibold border-l-3 border-[#C5A059]' : 'text-[#57534E] hover:text-[#AA7C11] hover:bg-[#C5A059]/4'
          } ${locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center gap-3">
            <Icon size={15} className={isActive ? 'text-[#C5A059]' : 'text-[#78716C]'} />
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </div>
          <div className="flex items-center gap-1">
            {locked && <Lock size={9} className="text-[#78716C]" />}
            {!locked && (expanded ? <ChevronDown size={11} className="text-[#78716C]" /> : <ChevronRight size={11} className="text-[#78716C]" />)}
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
              <div className="pl-6 py-1 space-y-0.5 border-l border-[#C5A059]/20 ml-5 mt-0.5">
                {item.children.map((child) => {
                  const childLocked = !hasAccess(userTier, child.tier)
                  return (
                    <NavLink
                      key={child.path}
                      to={childLocked ? '#' : child.path}
                      onClick={e => childLocked && e.preventDefault()}
                      className={({ isActive: ia }) =>
                        `flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                          ia && !childLocked
                            ? 'text-[#AA7C11] bg-[#C5A059]/10 font-bold'
                            : childLocked
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-[#57534E] hover:text-[#AA7C11] hover:bg-[#C5A059]/5'
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
      <div className="sidebar-item flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg opacity-40 cursor-not-allowed">
        <div className="flex items-center gap-3 text-slate-400">
          <Icon size={15} />
          <span className="text-sm font-medium tracking-wide">{item.label}</span>
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
        `sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
          ia ? 'active text-[#AA7C11] bg-[#C5A059]/8 font-semibold border-l-3 border-[#C5A059]' : 'text-[#57534E] hover:text-[#AA7C11] hover:bg-[#C5A059]/4'
        }`
      }
    >
      {({ isActive: ia }) => (
        <>
          <Icon size={15} className={ia ? 'text-[#C5A059]' : 'text-[#78716C]'} />
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
    <div className="fixed left-0 top-0 h-full w-60 flex flex-col bg-[#F6F4EE] border-r border-[#C5A059]/20 shadow-sm z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#C5A059]/20 bg-[#FAF8F5]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center shadow-md relative overflow-hidden group">
            {/* Reflective light sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="font-display font-extrabold text-white text-lg">K</span>
          </div>
          <div>
            <p className="font-display font-extrabold text-[#1C1917] text-sm leading-tight tracking-wider uppercase">Katrina AI</p>
            <p className="text-[9px] text-[#AA7C11] font-bold tracking-widest leading-tight">STRATEGIC CFO</p>
          </div>
        </div>
      </div>

      {/* Practice context */}
      {practice && (
        <div className="px-4 py-3 mx-3 mt-3 rounded-lg bg-[#C5A059]/5 border border-[#C5A059]/15 shadow-inner">
          <p className="text-xs font-semibold text-[#AA7C11] truncate">{practice.name}</p>
          <p className="text-[10px] text-[#78716C] truncate mt-0.5">{practice.city}, {practice.state}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} userTier={userTier} />
        ))}

        <div className="my-3 divider" />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              isActive ? 'active text-[#AA7C11] bg-[#C5A059]/8 font-semibold border-l-3 border-[#C5A059]' : 'text-[#57534E] hover:text-[#AA7C11] hover:bg-[#C5A059]/4'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Settings size={15} className={isActive ? 'text-[#C5A059]' : 'text-[#78716C]'} />
              <span className="tracking-wide">Settings</span>
            </>
          )}
        </NavLink>
      </nav>

      {/* Book with Katrina CTA */}
      <div className="p-3 border-t border-[#C5A059]/20 bg-[#FAF8F5]">
        <a
          href="https://www.mavenfp.com/contact-us"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 border border-[#C5A059]/35 group relative overflow-hidden shadow-sm bg-white"
          style={{
            background: 'linear-gradient(135deg, rgba(197,160,89,0.12), rgba(197,160,89,0.04))',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 shadow-md glow-gold">
            <Phone size={13} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#AA7C11]">Book with Katrina</p>
            <p className="text-[10px] text-[#78716C] mt-0.5">1:1 Strategy Session</p>
          </div>
        </a>
      </div>
    </div>
  )
}
