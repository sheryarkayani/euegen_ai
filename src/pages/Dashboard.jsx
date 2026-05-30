import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, DollarSign, Activity, Target, Users,
  MessageCircle, ArrowRight, AlertTriangle, CheckCircle, Clock, Zap,
  Building, HelpCircle, BarChart3, Database, ShieldAlert, Sparkles
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import useAuthStore from '../store/useAuthStore'
import { dummyPractice } from '../data/dummyPractice'
import { monthlyRevenue } from '../data/dummyKPIs'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const KPI_CARDS = [
  {
    label: 'Monthly Revenue',
    value: '$180,000',
    change: '+4.7%',
    positive: true,
    icon: DollarSign,
    color: '#C5A059', // Champagne Gold
    spark: monthlyRevenue.map(d => ({ v: d.revenue })),
  },
  {
    label: 'CFO Health Score',
    value: '63/100',
    change: 'Needs Attention',
    positive: false,
    icon: Activity,
    color: '#D97706', // Muted Amber
    spark: [{ v: 58 }, { v: 60 }, { v: 61 }, { v: 62 }, { v: 63 }, { v: 63 }],
  },
  {
    label: 'Conversion Rate',
    value: '52%',
    change: '-3% vs last month',
    positive: false,
    icon: Target,
    color: '#e8748a', // Soft rose highlight
    spark: [{ v: 55 }, { v: 57 }, { v: 54 }, { v: 56 }, { v: 53 }, { v: 52 }],
  },
  {
    label: 'Rebooking Rate',
    value: '61%',
    change: '+2% vs last month',
    positive: true,
    icon: Users,
    color: '#3b82f6', // Ice blue
    spark: [{ v: 57 }, { v: 58 }, { v: 59 }, { v: 59 }, { v: 60 }, { v: 61 }],
  },
]

const QUICK_ACTIONS = [
  { label: 'Ask Katrina AI', path: '/ask', icon: MessageCircle, color: '#C5A059', desc: 'Get instant CFO advisory' },
  { label: 'Capital Budgeting', path: '/capital-budgeting', icon: Building, color: '#059669', desc: 'SBA loan & buildout modeling' },
  { label: 'Compensation Designer', path: '/compensation-designer', icon: DollarSign, color: '#AA7C11', desc: 'Audit direct labor profitability' },
  { label: 'PC-MSO Compliance', path: '/compliance', icon: Activity, color: '#e8748a', desc: 'Simulate legal fee flow ledgers' },
]

const ACTIVITY_FEED = [
  { type: 'alert', icon: AlertTriangle, color: '#ef4444', text: 'Payroll ratio at 45.5% — 7.5 points above benchmark', time: 'Now', badge: 'Critical' },
  { type: 'insight', icon: Zap, color: '#C5A059', text: 'April revenue hit $180K — new practice high', time: '2h ago', badge: 'New Record' },
  { type: 'check', icon: CheckCircle, color: '#059669', text: 'Membership program reached 147 active members', time: '1d ago', badge: 'Milestone' },
  { type: 'alert', icon: AlertTriangle, color: '#D97706', text: 'Conversion rate dropped to 52% — below 55% target', time: '2d ago', badge: 'Warning' },
]

const RED_FLAGS = [
  { text: 'Payroll 45.5% — $13.5K/mo excess above benchmark', severity: 'critical' },
  { text: 'Conversion at 52% — losing $73K/yr vs 70% benchmark', severity: 'warning' },
  { text: 'Rebooking 61% — $23.8K/mo in unrealized revisits', severity: 'warning' },
]

function SparkLine({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        <Tooltip contentStyle={{ display: 'none' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const practice = useAuthStore(s => s.practice) || dummyPractice
  const user = useAuthStore(s => s.user)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  // Interactive CFO Methodology State
  const [activePillar, setActivePillar] = useState('plan')

  // Pillar 1: Plan State
  const [expansionRooms, setExpansionRooms] = useState(3)
  // Pillar 3: Budget State
  const [supplyPct, setSupplyPct] = useState(24)
  // Pillar 6: Grow State
  const [projectedGrowPct, setProjectedGrowPct] = useState(25)

  // Calculations for interactive widgets
  const estimatedCapex = expansionRooms * 45000 + 35000 // Devices + leasehold TI per room
  const budgetSupplyDiff = (supplyPct - 22).toFixed(0) // Goal supply cost is 22%
  const projected3yrEbitda = Math.round(180000 * 12 * 0.22 * (1 + projectedGrowPct / 100)) // Est. EBITDA in 3yr

  const pillars = [
    { id: 'plan', label: '1. Plan', subtitle: 'Carry out your business vision' },
    { id: 'understand', label: '2. Understand', subtitle: 'Unlock practice EMR data' },
    { id: 'budget', label: '3. Budget', subtitle: 'Create spending accountability' },
    { id: 'measure', label: '4. Measure', subtitle: 'Audit KPIs and benchmarks' },
    { id: 'manage', label: '5. Manage', subtitle: 'Track flow of funds' },
    { id: 'grow', label: '6. Grow', subtitle: 'Forecast profit capacity' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-[#1C1917] tracking-wide">
            {greeting}, {user?.fullName?.split(' ')[0] || 'Dr. Sarah'} 👋
          </h1>
          <p className="text-[#57534E] mt-1 text-xs font-semibold tracking-wider uppercase">
            {practice.fullName} · MAVEN STRATEGIC CFO SUITE
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="amber">Health Score: 63</Badge>
          <Button
            variant="primary"
            size="sm"
            icon={<Activity size={14} />}
            onClick={() => navigate('/health-score')}
          >
            Run Diagnostic
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="kpi-card rounded-xl p-4 glass-card border border-[#C5A059]/15 shadow-sm relative overflow-hidden group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ backgroundColor: `${kpi.color}08`, border: `1px solid ${kpi.color}20` }}>
                  <Icon size={16} style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${kpi.positive ? 'text-green-600' : 'text-amber-600'}`}>
                  {kpi.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {kpi.change}
                </div>
              </div>
              <div className="mb-2">
                <p className="font-display text-2xl font-bold text-[#1C1917] tracking-wide">{kpi.value}</p>
                <p className="text-xs text-[#57534E] font-medium tracking-wide mt-0.5">{kpi.label}</p>
              </div>
              <SparkLine data={kpi.spark} color={kpi.color} />
            </motion.div>
          )
        })}
      </div>

      {/* Maven CFO Methodology 6-Pillars Interactive Studio */}
      <Card className="border border-[#C5A059]/15 relative overflow-hidden glass-card">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C5A059]/15">
          <div>
            <h3 className="font-display font-bold text-[#1C1917] text-lg flex items-center gap-2 tracking-wide">
              <Sparkles size={16} className="text-[#C5A059] animate-pulse" />
              Maven CFO Methodology Studio
            </h3>
            <p className="text-xs text-[#57534E] mt-0.5">Explore the exact strategic process we use to guide med-spas to financial success</p>
          </div>
          <Badge variant="gold" size="xs">CFO Framework</Badge>
        </div>

        {/* Tab Header Selector */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 bg-[#F6F4EE]/60 p-1.5 rounded-xl mb-5 border border-[#C5A059]/10">
          {pillars.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all duration-200 ${
                activePillar === p.id 
                  ? 'bg-[#C5A059] text-white shadow-md shadow-[#C5A059]/25' 
                  : 'text-[#57534E] hover:text-[#AA7C11] hover:bg-[#C5A059]/5'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[170px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              {activePillar === 'plan' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-sm font-bold text-[#AA7C11] tracking-wide">1. Plan — Set Strategic Business Vision</h4>
                    <p className="text-xs text-[#292524] leading-relaxed font-medium">
                      Med-spa expansion shouldn't rely on gut feelings. We forecast lease requirements, provider onboarding curves, and capex budgets up-front to ensure profitability on day one.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <Button variant="outline" size="xs" onClick={() => navigate('/capital-budgeting')}>
                        Go to Capital Budgeting Studio
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F6F4EE]/35 border border-[#C5A059]/15 space-y-3 shadow-inner">
                    <div className="flex justify-between text-xs font-semibold text-[#292524]">
                      <span>Target Treatment Rooms:</span>
                      <span className="text-[#AA7C11] font-bold">{expansionRooms} Rooms</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={expansionRooms}
                      onChange={e => setExpansionRooms(Number(e.target.value))}
                      className="w-full accent-[#C5A059] cursor-pointer h-1.5 bg-[#E8E5DF] rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-xs pt-2 border-t border-[#C5A059]/15 font-semibold text-[#57534E]">
                      <span>Estimated Capex Requirement:</span>
                      <span className="text-[#1C1917] font-bold">${estimatedCapex.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {activePillar === 'understand' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-sm font-bold text-[#AA7C11] tracking-wide">2. Understand — Dynamic EMR Data Integration</h4>
                    <p className="text-xs text-[#292524] leading-relaxed font-medium">
                      We securely integrate with **30+ aesthetic EMR platforms** (Boulevard, Zenoti, Mindbody, PatientNow) to unlock direct provider hour margins, retail conversion ratios, and real-time treatment ticket values.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['Boulevard', 'Zenoti', 'Mindbody', 'PatientNow', 'AestheticNow'].map(emr => (
                        <span key={emr} className="text-[10px] font-bold text-[#AA7C11] bg-[#C5A059]/8 px-2.5 py-1 rounded border border-[#C5A059]/20">
                          {emr} Connected
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F6F4EE]/35 border border-[#C5A059]/15 flex flex-col justify-center items-center text-center shadow-inner">
                    <Database size={24} className="text-[#C5A059] mb-1.5" />
                    <p className="text-xs font-bold text-[#1C1917] tracking-wide">EMR Diagnostic Health</p>
                    <p className="text-[10px] text-[#57534E] mt-0.5">Automated sync: 100% complete</p>
                    <Badge variant="gold" size="xs" className="mt-2">✓ Verified Live Feed</Badge>
                  </div>
                </div>
              )}

              {activePillar === 'budget' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-sm font-bold text-[#AA7C11] tracking-wide">3. Budget — Spending Accountability Control</h4>
                    <p className="text-xs text-[#292524] leading-relaxed font-medium">
                      Every dollar out must be accounted for. We build tight operational spend-ratio safety boundaries. If supplies exceed 22% or rent climbs past 8%, your EBITDA targets immediately trigger CFO warnings.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <Button variant="outline" size="xs" onClick={() => navigate('/compensation-designer')}>
                        Manage Provider Labor Budget
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F6F4EE]/35 border border-[#C5A059]/15 space-y-3 shadow-inner">
                    <div className="flex justify-between text-xs font-semibold text-[#292524]">
                      <span>Aesthetic Supply Cost:</span>
                      <span className="text-[#AA7C11] font-bold">{supplyPct}% of Rev</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="35"
                      value={supplyPct}
                      onChange={e => setSupplyPct(Number(e.target.value))}
                      className="w-full accent-[#C5A059] cursor-pointer h-1.5 bg-[#E8E5DF] rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-xs pt-2 border-t border-[#C5A059]/15 font-semibold text-[#57534E]">
                      <span>Over-Budget Leakage:</span>
                      <span className={`font-bold ${budgetSupplyDiff > 0 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}>
                        {budgetSupplyDiff > 0 ? `+$${(180000 * (budgetSupplyDiff / 100)).toLocaleString()}/mo` : '✓ In Budget'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activePillar === 'measure' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-sm font-bold text-[#AA7C11] tracking-wide">4. Measure — National KPI Benchmarks Comparison</h4>
                    <p className="text-xs text-[#292524] leading-relaxed font-medium">
                      Compare your clinic's performance against thousands of med-spas nationally. We measure labor caps, treatment ticket size, customer acquisition cost, and rebooking frequencies.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F6F4EE]/35 border border-[#C5A059]/15 space-y-2.5 text-xs shadow-inner">
                    <div className="flex justify-between border-b border-[#C5A059]/5 pb-1.5 font-semibold text-[#57534E]">
                      <span>Labor Benchmark:</span>
                      <span className="text-[#1C1917] font-bold">&lt;38%</span>
                    </div>
                    <div className="flex justify-between border-b border-[#C5A059]/5 pb-1.5 font-semibold text-[#57534E]">
                      <span>Rent Benchmark:</span>
                      <span className="text-[#1C1917] font-bold">&lt;8%</span>
                    </div>
                    <div className="flex justify-between font-semibold text-[#57534E]">
                      <span>EBITDA Target:</span>
                      <span className="text-[#AA7C11] font-bold">&gt;20%</span>
                    </div>
                  </div>
                </div>
              )}

              {activePillar === 'manage' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-sm font-bold text-[#AA7C11] tracking-wide">5. Manage — Fund Flow Separation (PC-MSO Ledger)</h4>
                    <p className="text-xs text-[#292524] leading-relaxed font-medium">
                      Protect your license. We plan the legally compliant fund flow between your Professional Corporation (PC) and Management Services Organization (MSO) using fair market value (FMV) management fee agreements.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <Button variant="outline" size="xs" onClick={() => navigate('/compliance')}>
                        Go to Compliance Ledger
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F6F4EE]/35 border border-[#C5A059]/15 flex flex-col justify-center items-center text-center shadow-inner">
                    <ShieldAlert size={24} className="text-green-600 mb-1.5" />
                    <p className="text-xs font-bold text-[#1C1917] tracking-wide">Corporate Structure Safe</p>
                    <p className="text-[10px] text-[#57534E] mt-0.5">PC-MSO Agreements Mapped</p>
                  </div>
                </div>
              )}

              {activePillar === 'grow' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-sm font-bold text-[#AA7C11] tracking-wide">6. Grow — 3-Year EBITDA Profit Forecasting</h4>
                    <p className="text-xs text-[#292524] leading-relaxed font-medium">
                      Simulate the ultimate potential of your business. Add direct injectors, adjust marketing multipliers, and project the long-term EBITDA valuation for private equity exits or loan recapitalizations.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F6F4EE]/35 border border-[#C5A059]/15 space-y-3 shadow-inner">
                    <div className="flex justify-between text-xs font-semibold text-[#292524]">
                      <span>Projected 3-Yr Growth:</span>
                      <span className="text-[#AA7C11] font-bold">+{projectedGrowPct}% Growth</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={projectedGrowPct}
                      onChange={e => setProjectedGrowPct(Number(e.target.value))}
                      className="w-full accent-[#C5A059] cursor-pointer h-1.5 bg-[#E8E5DF] rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-xs pt-2 border-t border-[#C5A059]/15 font-semibold text-[#57534E]">
                      <span>Est. Annual EBITDA:</span>
                      <span className="text-green-600 font-bold">${projected3yrEbitda.toLocaleString()}/yr</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <div className="flex items-center justify-between mb-4 border-b border-[#C5A059]/10 pb-2">
              <h3 className="font-display font-bold text-[#1C1917] text-base tracking-wide">Strategic CFO Planners</h3>
              <Zap size={15} className="text-[#C5A059] animate-pulse" />
            </div>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((action, i) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-left group bg-white border border-[#C5A059]/15 hover:border-[#C5A059]/35 hover:shadow-md hover:shadow-[#C5A059]/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.color}08`, border: `1px solid ${action.color}15` }}>
                        <Icon size={14} style={{ color: action.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917] tracking-wide">{action.label}</p>
                        <p className="text-[10px] text-[#57534E] mt-0.5 font-medium">{action.desc}</p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-[#78716C] group-hover:text-[#AA7C11] transition-colors" />
                  </motion.button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <div className="flex items-center justify-between mb-4 border-b border-[#C5A059]/10 pb-2">
              <h3 className="font-display font-bold text-[#1C1917] text-base tracking-wide">Practice Pulse</h3>
              <Badge variant="gold" size="xs">Live Sync</Badge>
            </div>
            <div className="space-y-2.5">
              {ACTIVITY_FEED.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#F6F4EE]/35 border border-[#C5A059]/10 hover:border-[#C5A059]/20 hover:bg-white transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}08`, border: `1px solid ${item.color}15` }}>
                      <Icon size={13} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#292524] font-semibold leading-relaxed">{item.text}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-[#78716C] font-medium">{item.time}</span>
                        <Badge variant={item.type === 'alert' ? 'red' : item.type === 'check' ? 'green' : 'gray'} size="xs">
                          {item.badge}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Red Flags + Practice Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <div className="flex items-center justify-between mb-4 border-b border-[#C5A059]/10 pb-2">
            <h3 className="font-display font-bold text-[#1C1917] text-base tracking-wide">Active Red Flags</h3>
            <AlertTriangle size={15} className="text-red-500 animate-bounce" />
          </div>
          <div className="space-y-2.5">
            {RED_FLAGS.map((flag, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                flag.severity === 'critical' 
                  ? 'bg-red-50 border border-red-200/50 text-red-700' 
                  : 'bg-amber-50 border border-amber-200/50 text-amber-700'
              }`}>
                <AlertTriangle size={14} className={flag.severity === 'critical' ? 'text-red-500 mt-0.5 flex-shrink-0' : 'text-amber-600 mt-0.5 flex-shrink-0'} />
                <p className="text-xs font-semibold leading-relaxed">{flag.text}</p>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-4 w-full justify-center" onClick={() => navigate('/health-score')}>
            View Full CFO Diagnostic
          </Button>
        </Card>

        <Card className="glass-card">
          <div className="flex items-center justify-between mb-4 border-b border-[#C5A059]/10 pb-2">
            <h3 className="font-display font-bold text-[#1C1917] text-base tracking-wide">Practice Snapshot</h3>
            <Badge variant="gold" size="xs">Growth Tier</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Revenue/Month', value: '$180,000', note: 'New high' },
              { label: 'Payroll Ratio', value: '45.5%', note: '⚠ Red flag', warn: true },
              { label: 'Rent Ratio', value: '8.9%', note: '✓ Healthy' },
              { label: 'Marketing Spend', value: '$8,000', note: '4.4% of revenue' },
              { label: 'Active Members', value: '147', note: 'Membership program' },
              { label: 'Google Rating', value: '4.7 ★', note: '214 reviews' },
              { label: 'Avg Rev/Visit', value: '$385', note: 'Good range' },
              { label: 'Providers', value: '4', note: '1 NP, 1 PA, 2 RN' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#F6F4EE]/35 border border-[#C5A059]/10 shadow-inner">
                <p className="text-base font-extrabold tracking-wide" style={{ color: item.warn ? 'var(--error)' : 'var(--primary-hover)' }}>
                  {item.value}
                </p>
                <p className="text-[10px] text-[#78716C] font-bold tracking-wider mt-0.5 uppercase">{item.label}</p>
                <p className={`text-[10px] mt-1 font-semibold ${item.warn ? 'text-amber-600 animate-pulse' : 'text-green-600'}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
