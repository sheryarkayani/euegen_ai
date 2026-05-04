import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, MessageCircle, Activity, Rocket, DollarSign, Target,
  Users, Palette, Wrench, Scale, TrendingUp, PartyPopper, UserCheck,
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
    label: 'Ask Gina',
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
    path: '/events',
    label: 'Event Planner',
    icon: PartyPopper,
    tier: 'growth',
  },
  {
    path: '/employees',
    label: 'Employee Lifecycle',
    icon: UserCheck,
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
      <div>
        <button
          onClick={() => !locked && setExpanded(!expanded)}
          className={`sidebar-item w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left ${
            isActive ? 'active' : 'text-gray-600'
          } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center gap-3">
            <Icon size={16} className={isActive ? 'text-gold-500' : ''} />
            <span className="text-sm">{item.label}</span>
          </div>
          <div className="flex items-center gap-1">
            {locked && <Lock size={10} className="text-gray-600" />}
            {!locked && (expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
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
              <div className="pl-7 py-1 space-y-0.5">
                {item.children.map((child) => {
                  const childLocked = !hasAccess(userTier, child.tier)
                  return (
                    <NavLink
                      key={child.path}
                      to={childLocked ? '#' : child.path}
                      onClick={e => childLocked && e.preventDefault()}
                      className={({ isActive: ia }) =>
                        `flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                          ia && !childLocked
                            ? 'text-gold-500 bg-gold-500/8'
                            : childLocked
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:text-navy-950 hover:bg-gray-100'
                        }`
                      }
                    >
                      <span>{child.label}</span>
                      {childLocked && <Lock size={9} className="text-gray-700" />}
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
      <div className="sidebar-item flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg opacity-50 cursor-not-allowed">
        <div className="flex items-center gap-3 text-gray-500">
          <Icon size={16} />
          <span className="text-sm">{item.label}</span>
        </div>
        <Lock size={10} className="text-gray-600" />
      </div>
    )
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      className={({ isActive: ia }) =>
        `sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
          ia ? 'active text-gold-600' : 'text-gray-600'
        }`
      }
    >
      <Icon size={16} />
      <span>{item.label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  const user = useAuthStore(s => s.user)
  const practice = useAuthStore(s => s.practice)
  const userTier = user?.tier || 'free'

  return (
    <div className="fixed left-0 top-0 h-full w-60 flex flex-col bg-white border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shadow-lg glow-gold">
            <span className="font-display font-bold text-navy-950 text-base">G</span>
          </div>
          <div>
            <p className="font-display font-bold text-navy-950 text-sm leading-tight">Gina's AI</p>
            <p className="text-xs text-gray-500 leading-tight">Med Spa Intelligence</p>
          </div>
        </div>
      </div>

      {/* Practice context */}
      {practice && (
        <div className="px-4 py-3 mx-3 mt-3 rounded-lg bg-gold-500/10 border border-gold-500/20">
          <p className="text-xs font-medium text-gold-700 truncate">{practice.name}</p>
          <p className="text-xs text-gray-600 truncate">{practice.city}, {practice.state}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} userTier={userTier} />
        ))}

        <div className="my-2 divider" />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
              isActive ? 'active text-gold-600' : 'text-gray-600'
            }`
          }
        >
          <Settings size={16} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Book with Gina CTA */}
      <div className="p-3 border-t border-gray-200">
        <a
          href="https://calendly.com/ginaai/consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200 group"
          style={{
            background: 'linear-gradient(135deg, rgba(212,168,83,0.12), rgba(232,116,138,0.08))',
            border: '1px solid rgba(212,168,83,0.2)',
          }}
        >
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
            <Phone size={14} className="text-navy-950" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gold-700">Book with Gina</p>
            <p className="text-xs text-gray-600">1:1 Strategy Session</p>
          </div>
        </a>
      </div>
    </div>
  )
}
