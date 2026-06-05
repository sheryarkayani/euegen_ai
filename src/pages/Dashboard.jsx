import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, DollarSign, Activity, Target, Users,
  MessageCircle, ArrowRight, AlertTriangle, CheckCircle, Clock, Zap,
  Building, HelpCircle, BarChart3, Database, ShieldAlert, Sparkles,
  Layers, Lock, Sparkle
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import useAuthStore from '../store/useAuthStore'
import { dummyPractice } from '../data/dummyPractice'
import { monthlyRevenue } from '../data/dummyKPIs'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const QUICK_ACTIONS = [
  { label: 'Ask Eugene AI', path: '/ask', icon: MessageCircle, color: '#5850EC', desc: 'Get instant CFO advisory' },
  { label: 'PC-MSO Compliance', path: '/compliance', icon: Activity, color: '#EC4899', desc: 'Simulate legal fee flow ledgers' },
]

const ACTIVITY_FEED = [
  { type: 'alert', icon: AlertTriangle, color: '#DC2626', text: 'Payroll ratio at 45.5% — 7.5 points above benchmark', time: 'Now', badge: 'Critical' },
  { type: 'insight', icon: Zap, color: '#5850EC', text: 'April revenue hit $180K — new practice high', time: '2h ago', badge: 'New Record' },
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
    <ResponsiveContainer width="100%" height={36}>
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
    { id: 'plan', label: '1. Plan', color: '#FDF2EC' }, // Peach
    { id: 'understand', label: '2. Understand', color: '#EDF5FD' }, // Sky
    { id: 'budget', label: '3. Budget', color: '#EDFBF7' }, // Mint
    { id: 'measure', label: '4. Measure', color: '#F4F0FD' }, // Lavender
    { id: 'manage', label: '5. Manage', color: '#FDF0F3' }, // Rose
    { id: 'grow', label: '6. Grow', color: '#FFF2CC' }, // Bold Yellow
  ]

  const kpis = [
    { label: 'Monthly Revenue', value: '$180,000', change: '+4.7%', positive: true, icon: DollarSign, color: '#5850EC', bg: '#F4F0FD', spark: monthlyRevenue.map(d => ({ v: d.revenue })) },
    { label: 'CFO Health Score', value: '63/100', change: 'Needs Attention', positive: false, icon: Activity, color: '#D97706', bg: '#FDF2EC', spark: [{ v: 58 }, { v: 60 }, { v: 61 }, { v: 62 }, { v: 63 }, { v: 63 }] },
    { label: 'Conversion Rate', value: '52%', change: '-3% vs last month', positive: false, icon: Target, color: '#EC4899', bg: '#FDF0F3', spark: [{ v: 55 }, { v: 57 }, { v: 54 }, { v: 56 }, { v: 53 }, { v: 52 }] },
    { label: 'Rebooking Rate', value: '61%', change: '+2% vs last month', positive: true, icon: Users, color: '#0066CC', bg: '#EDF5FD', spark: [{ v: 57 }, { v: 58 }, { v: 59 }, { v: 59 }, { v: 60 }, { v: 61 }] },
  ]

  return (
    <div className="space-y-10 pb-16">
      {/* Notion Signature Centered Hero Band */}
      <div className="relative bg-[#0E1B3D] text-white py-16 px-6 -mx-6 rounded-b-[24px] overflow-hidden shadow-inner text-center">
        {/* Sticky note dots + mesh wire decorative elements */}
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-[#EC4899] opacity-80" />
        <div className="absolute top-28 right-16 w-3 h-3 rounded-full bg-[#F59E0B] opacity-80" />
        <div className="absolute bottom-12 left-24 w-5 h-5 rounded-full bg-[#10B981] opacity-70" />
        <div className="absolute bottom-20 right-32 w-4 h-4 rounded-full bg-[#5850EC] opacity-80" />
        
        {/* Abstract structural grid line overlays */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="max-w-3xl mx-auto space-y-5 relative z-10">
          <Badge variant="purple" className="px-3 py-1 text-xs">Eugene CFO Suite</Badge>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-display">
            Meet the executive desk.
          </h1>
          
          <p className="text-base md:text-lg text-slate-200 max-w-xl mx-auto font-normal leading-relaxed">
            Every business metrics studio, compliance ledger, and capital budget tool you need. Engineered specifically for growth-focused medical aesthetics practices.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button 
              onClick={() => navigate('/ask')}
              className="btn-primary px-6 py-3 font-semibold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <MessageCircle size={15} />
              Ask Eugene Free
            </button>
            
            <button 
              onClick={() => navigate('/health-score')}
              className="btn-secondary-on-dark px-6 py-3 font-semibold text-sm transition-all"
            >
              Request a Diagnostic
            </button>
          </div>
        </div>

        {/* Real Notion workspace UI mockup card (broken out of the hero band) */}
        <div className="max-w-6xl mx-auto mt-12 px-4 relative z-20">
          <div className="workspace-mockup-card p-5 bg-white text-left text-neutral-800">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-xs text-[#6B7280] font-semibold ml-2">Eugene AI Workspace / Practice Health Suite</span>
              </div>
              <Badge variant="gold">EMR Verified Live Sync</Badge>
            </div>

            {/* KPI Cards Grid inside the Mockup Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi) => {
                const Icon = kpi.icon
                return (
                  <div key={kpi.label} className="p-4 border border-[#E5E7EB] rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.bg }}>
                        <Icon size={16} style={{ color: kpi.color }} />
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-bold ${kpi.positive ? 'text-green-600' : 'text-amber-600'}`}>
                        {kpi.change}
                      </div>
                    </div>
                    <div className="mb-1">
                      <p className="text-lg font-bold text-[#111111]">{kpi.value}</p>
                      <p className="text-[11px] text-[#6B7280] font-semibold tracking-wide uppercase">{kpi.label}</p>
                    </div>
                    <SparkLine data={kpi.spark} color={kpi.color} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Alternating Colorful Feature Card Sequence - 6-Pillar methodology */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#111111] font-display flex items-center justify-center md:justify-start gap-2">
              <Layers size={22} className="text-[#5850EC]" />
              Eugene Consulting Methodology Studio
            </h2>
            <p className="text-sm text-[#4B5563] mt-1">Explore our structured tactical playbook for aesthetic business scale.</p>
          </div>

          {/* Pill-tab top navigation switcher */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {pillars.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-150 ${
                  activePillar === p.id 
                    ? 'bg-[#111111] text-white border-[#111111] shadow-sm' 
                    : 'text-[#6B7280] border-[#E5E7EB] hover:bg-[#F4F4F6] bg-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Dynamic feature card displaying corresponding database pastel-tint */}
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                {activePillar === 'plan' && (
                  <div className="card-feature p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#FDF2EC] text-[#222222]">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag-orange">Phase 1</span>
                        <h3 className="text-lg font-bold text-[#111111]">1. Plan — Set Strategic Business Vision</h3>
                      </div>
                      <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                        Med-spa expansion shouldn't rely on gut feelings. We forecast lease requirements, provider onboarding curves, and capex budgets up-front to ensure profitability on day one.
                      </p>
                    </div>
                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-lg space-y-3 shadow-sm">
                      <div className="flex justify-between text-xs font-bold text-[#222222]">
                        <span>Target Treatment Rooms:</span>
                        <span className="text-[#F97316]">{expansionRooms} Rooms</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={expansionRooms}
                        onChange={e => setExpansionRooms(Number(e.target.value))}
                        className="w-full accent-[#F97316] cursor-pointer h-1.5 bg-[#E5E7EB] rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[11px] pt-2 border-t border-[#E5E7EB] font-bold text-[#6B7280]">
                        <span>Estimated Capex Required:</span>
                        <span className="text-[#111111]">${estimatedCapex.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePillar === 'understand' && (
                  <div className="card-feature p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#EDF5FD] text-[#222222]">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag-purple bg-[#EDF5FD] text-[#0066CC]">Phase 2</span>
                        <h3 className="text-lg font-bold text-[#111111]">2. Understand — Dynamic EMR Data Integration</h3>
                      </div>
                      <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                        We securely integrate with **30+ aesthetic EMR platforms** (Boulevard, Zenoti, Mindbody, PatientNow) to unlock direct provider hour margins, retail conversion ratios, and real-time treatment ticket values.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {['Boulevard', 'Zenoti', 'Mindbody', 'PatientNow', 'AestheticNow'].map(emr => (
                          <span key={emr} className="text-[10px] font-bold text-[#0066CC] bg-[#EDF5FD] px-2.5 py-1 rounded border border-[#0066CC]/20">
                            {emr} Connected
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-lg flex flex-col justify-center items-center text-center shadow-sm">
                      <Database size={24} className="text-[#0066CC] mb-1.5 animate-pulse" />
                      <p className="text-xs font-bold text-[#111111]">EMR Diagnostic Health</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">Automated sync: 100% complete</p>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full mt-2">✓ Verified Live Feed</span>
                    </div>
                  </div>
                )}

                {activePillar === 'budget' && (
                  <div className="card-feature p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#EDFBF7] text-[#222222]">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag-green">Phase 3</span>
                        <h3 className="text-lg font-bold text-[#111111]">3. Budget — Spending Accountability Control</h3>
                      </div>
                      <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                        Every dollar out must be accounted for. We build tight operational spend-ratio safety boundaries. If supplies exceed 22% or rent climbs past 8%, your EBITDA targets immediately trigger CFO warnings.
                      </p>
                    </div>
                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-lg space-y-3 shadow-sm">
                      <div className="flex justify-between text-xs font-bold text-[#222222]">
                        <span>Aesthetic Supply Cost:</span>
                        <span className="text-emerald-600">{supplyPct}% of Rev</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="35"
                        value={supplyPct}
                        onChange={e => setSupplyPct(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[#E5E7EB] rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-xs pt-2 border-t border-[#E5E7EB] font-bold text-[#6B7280]">
                        <span>Over-Budget Leakage:</span>
                        <span className={`font-bold ${budgetSupplyDiff > 0 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
                          {budgetSupplyDiff > 0 ? `+$${(180000 * (budgetSupplyDiff / 100)).toLocaleString()}/mo` : '✓ In Budget'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activePillar === 'measure' && (
                  <div className="card-feature p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#F4F0FD] text-[#222222]">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag-purple">Phase 4</span>
                        <h3 className="text-lg font-bold text-[#111111]">4. Measure — National KPI Benchmarks Comparison</h3>
                      </div>
                      <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                        Compare your clinic's performance against thousands of med-spas nationally. We measure labor caps, treatment ticket size, customer acquisition cost, and rebooking frequencies.
                      </p>
                    </div>
                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-lg space-y-2.5 text-xs shadow-sm">
                      <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5 font-bold text-[#4B5563]">
                        <span>Labor Benchmark:</span>
                        <span className="text-[#111111]">&lt;38%</span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5 font-bold text-[#4B5563]">
                        <span>Rent Benchmark:</span>
                        <span className="text-[#111111]">&lt;8%</span>
                      </div>
                      <div className="flex justify-between font-bold text-[#4B5563]">
                        <span>EBITDA Target:</span>
                        <span className="text-[#5850EC]">&gt;20%</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePillar === 'manage' && (
                  <div className="card-feature p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#FDF0F3] text-[#222222]">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag-pink">Phase 5</span>
                        <h3 className="text-lg font-bold text-[#111111]">5. Manage — Fund Flow Separation (PC-MSO Ledger)</h3>
                      </div>
                      <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                        Protect your license. We plan the legally compliant fund flow between your Professional Corporation (PC) and Management Services Organization (MSO) using fair market value (FMV) management fee agreements.
                      </p>
                      <button 
                        onClick={() => navigate('/compliance')}
                        className="btn-primary mt-2 text-xs font-semibold"
                      >
                        Go to Compliance Ledger
                        <ArrowRight size={13} />
                      </button>
                    </div>
                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-lg flex flex-col justify-center items-center text-center shadow-sm">
                      <ShieldAlert size={24} className="text-[#059669] mb-1.5" />
                      <p className="text-xs font-bold text-[#111111]">PC-MSO Compliant</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">Corporate Structure Mapped</p>
                    </div>
                  </div>
                )}

                {activePillar === 'grow' && (
                  <div className="card-feature p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#FFF2CC] text-[#222222]">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag-yellow bg-[#FFF2CC] text-[#78350F]">Phase 6</span>
                        <h3 className="text-lg font-bold text-[#111111]">6. Grow — 3-Year EBITDA Profit Forecasting</h3>
                      </div>
                      <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed font-medium">
                        Simulate the ultimate potential of your business. Add direct injectors, adjust marketing multipliers, and project the long-term EBITDA valuation for private equity exits or loan recapitalizations.
                      </p>
                    </div>
                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-lg space-y-3 shadow-sm">
                      <div className="flex justify-between text-xs font-bold text-[#222222]">
                        <span>Projected 3-Yr Growth:</span>
                        <span className="text-[#78350F]">+{projectedGrowPct}% Growth</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={projectedGrowPct}
                        onChange={e => setProjectedGrowPct(Number(e.target.value))}
                        className="w-full accent-[#78350F] cursor-pointer h-1.5 bg-[#E5E7EB] rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-xs pt-2 border-t border-[#E5E7EB] font-bold text-[#57534E]">
                        <span>Est. Annual EBITDA:</span>
                        <span className="text-green-600">${projected3yrEbitda.toLocaleString()}/yr</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="card-base p-5">
              <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-3">
                <h3 className="font-display font-bold text-[#111111] text-[15px] tracking-wide">Strategic CFO Planners</h3>
                <Zap size={15} className="text-[#5850EC] animate-pulse" />
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
                      className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-[#E5E7EB] bg-[#F9F9FB] hover:bg-white hover:border-[#9CA3AF] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.color}10` }}>
                          <Icon size={14} style={{ color: action.color }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#111111] tracking-wide">{action.label}</p>
                          <p className="text-[10px] text-[#6B7280] mt-0.5 font-medium">{action.desc}</p>
                        </div>
                      </div>
                      <ArrowRight size={13} className="text-[#6B7280]" />
                    </motion.button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <Card className="card-base p-5">
              <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-3">
                <h3 className="font-display font-bold text-[#111111] text-[15px] tracking-wide">Practice Pulse</h3>
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
                      className="flex items-start gap-3 p-3 rounded-lg bg-[#F9F9FB] border border-[#E5E7EB] hover:bg-white hover:border-[#9CA3AF] transition-all duration-150"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}10` }}>
                        <Icon size={13} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#222222] font-semibold leading-relaxed">{item.text}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-[#6B7280] font-medium">{item.time}</span>
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
          {/* Active Red Flags styled as Notion Bold Yellow emphasis feature banner */}
          <Card className="card-feature-yellow-bold bg-[#FFF2CC] p-6 rounded-lg text-[#222222] relative overflow-hidden border border-[#E5C158]/35">
            <div className="flex items-center justify-between mb-4 border-b border-[#E5C158]/20 pb-2">
              <h3 className="font-display font-extrabold text-[#78350F] text-base tracking-wide flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#D97706]" />
                Active Red Flags
              </h3>
              <span className="text-[10px] font-extrabold text-[#78350F] tracking-widest uppercase">Action Required</span>
            </div>
            
            <div className="space-y-3">
              {RED_FLAGS.map((flag, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-[#E5C158]/30">
                  <AlertTriangle size={14} className="text-[#D97706] mt-0.5 flex-shrink-0" />
                  <p className="text-xs font-semibold text-[#1C1917] leading-relaxed">{flag.text}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/health-score')}
              className="mt-5 w-full bg-[#78350F] text-white font-bold py-2 px-4 rounded-md text-xs hover:bg-[#5C290D] transition-colors"
            >
              View Full CFO Diagnostic
            </button>
          </Card>

          {/* Practice Snapshot styled as Database Properties Pastel Grid */}
          <Card className="card-base p-6 bg-white">
            <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-3">
              <h3 className="font-display font-bold text-[#111111] text-[15px] tracking-wide">Practice Snapshot</h3>
              <Badge variant="gold" size="xs">Growth Tier</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Revenue/Month', value: '$180,000', note: 'New high', bg: '#F4F0FD', color: '#5850EC' }, // Lavender
                { label: 'Payroll Ratio', value: '45.5%', note: '⚠ Red flag', warn: true, bg: '#FDF0F3', color: '#EC4899' }, // Rose
                { label: 'Rent Ratio', value: '8.9%', note: '✓ Healthy', bg: '#EDFBF7', color: '#059669' }, // Mint
                { label: 'Marketing Spend', value: '$8,000', note: '4.4% of revenue', bg: '#EDF5FD', color: '#0066CC' }, // Sky
                { label: 'Active Members', value: '147', note: 'Membership program', bg: '#FDF2EC', color: '#F97316' }, // Peach
                { label: 'Google Rating', value: '4.7 ★', note: '214 reviews', bg: '#FDF9ED', color: '#D97706' }, // Soft yellow
                { label: 'Avg Rev/Visit', value: '$385', note: 'Good range', bg: '#F3F4F6', color: '#4B5563' }, // Gray
                { label: 'Providers', value: '4', note: '1 NP, 1 PA, 2 RN', bg: '#F4F0FD', color: '#5850EC' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg border border-[#E5E7EB] shadow-sm relative overflow-hidden" style={{ backgroundColor: item.bg }}>
                  <p className="text-base font-extrabold tracking-wide" style={{ color: item.color }}>
                    {item.value}
                  </p>
                  <p className="text-[9px] text-[#6B7280] font-bold tracking-wider mt-0.5 uppercase">{item.label}</p>
                  <p className={`text-[10px] mt-1 font-semibold ${item.warn ? 'text-rose-600 animate-pulse' : 'text-slate-600'}`}>{item.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
