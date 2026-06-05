import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, DollarSign, Activity, Target, Users,
  MessageCircle, ArrowRight, AlertTriangle, CheckCircle, Clock, Zap,
  Building, HelpCircle, BarChart3, Database, ShieldAlert, Sparkles,
  Layers, Lock, Sparkle, Briefcase, Coins, Calculator, Percent
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, AreaChart, Area
} from 'recharts'
import useAuthStore from '../store/useAuthStore'
import { dummyPractice } from '../data/dummyPractice'
import { monthlyRevenue, serviceBreakdown, patientFlow, payrollTrend, kpiSummary } from '../data/dummyKPIs'
import { BENCHMARKS } from '../data/benchmarks'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import BenchmarkBar from '../components/ui/BenchmarkBar'

// Custom tooltip for charts matching aesthetic
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl p-3 border border-gray-200 text-sm bg-white shadow-md">
      <p className="text-gray-400 mb-2 font-medium">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mt-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-gray-500 text-xs">{p.name}:</span>
          <span className="text-navy-950 font-bold text-xs">
            {typeof p.value === 'number' && p.value > 100
              ? `$${p.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : `${p.value}${p.name?.includes('%') ? '%' : ''}`}
          </span>
        </div>
      ))}
    </div>
  )
}

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

function EBITDACalculatorWidget() {
  const [vals, setVals] = useState({
    revenue: 180000, payroll: 82000, rent: 16000, marketing: 8000, supplies: 22000, other: 8000,
  })
  const total = Object.entries(vals).filter(([k]) => k !== 'revenue').reduce((s, [, v]) => s + v, 0)
  const ebitda = vals.revenue - total
  const margin = ((ebitda / vals.revenue) * 100).toFixed(1)

  return (
    <Card className="h-full">
      <CardHeader title="EBITDA Margin Modeler" icon={Calculator} subtitle="Simulate practice margins in real-time" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { key: 'revenue', label: 'Monthly Revenue', color: '#6366F1' },
          { key: 'payroll', label: 'Payroll', color: '#ef4444' },
          { key: 'rent', label: 'Rent', color: '#f59e0b' },
          { key: 'marketing', label: 'Marketing', color: '#10b981' },
          { key: 'supplies', label: 'Supplies', color: '#8b5cf6' },
          { key: 'other', label: 'Other Expenses', color: '#9b94a8' },
        ].map(f => (
          <div key={f.key}>
            <label className="text-[10px] text-gray-400 mb-0.5 block font-bold tracking-wide uppercase">{f.label}</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">$</span>
              <input
                type="number"
                step="1000"
                className="form-input w-full pl-6 pr-2 py-1.5 rounded-lg text-xs font-bold"
                value={vals[f.key]}
                onChange={e => setVals(v => ({ ...v, [f.key]: Number(e.target.value) }))}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">EBITDA Estimate</p>
            <p className="text-xl font-display font-bold" style={{ color: ebitda > 0 ? '#10b981' : '#ef4444' }}>
              ${ebitda.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Margin</p>
            <p className="text-xl font-display font-bold" style={{ color: ebitda > 0 ? '#10b981' : '#ef4444' }}>
              {margin}%
            </p>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-gray-200/60 flex justify-between text-xs text-gray-500">
          <span>Target: 20–25%</span>
          <span style={{ color: Number(margin) >= 20 ? '#10b981' : '#f59e0b' }} className="font-bold">
            {Number(margin) >= 25 ? 'High Performer' : Number(margin) >= 20 ? 'On Target' : 'Below Average'}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const practice = useAuthStore(s => s.practice) || dummyPractice
  const user = useAuthStore(s => s.user)

  const kpis = [
    { label: 'Monthly Revenue', value: '$180,000', change: '+4.7%', positive: true, icon: DollarSign, color: '#6366F1', bg: '#F4F0FD', spark: monthlyRevenue.map(d => ({ v: d.revenue })) },
    { label: 'EBITDA Margin', value: '15.6%', change: 'Below 20% target', positive: false, icon: Activity, color: '#D97706', bg: '#FDF2EC', spark: [{ v: 14.2 }, { v: 14.8 }, { v: 15.1 }, { v: 15.0 }, { v: 15.3 }, { v: 15.6 }] },
    { label: 'Payroll Ratio', value: '45.5%', change: '⚠ Red Flag >42%', positive: false, icon: TrendingDown, color: '#EF4444', bg: '#FDF0F3', spark: payrollTrend.map(d => ({ v: d.pct })) },
    { label: 'Rebooking Rate', value: '61%', change: '+2% vs last month', positive: true, icon: Users, color: '#0066CC', bg: '#EDF5FD', spark: [{ v: 57 }, { v: 58 }, { v: 59 }, { v: 59 }, { v: 60 }, { v: 61 }] },
  ]

  return (
    <div className="space-y-8 pb-16">
      {/* Centered KPI Dashboard Hero Band */}
      <div className="relative bg-[#0E1B3D] text-white py-12 px-6 -mx-6 rounded-b-[24px] overflow-hidden shadow-inner">
        {/* Decorative element orbs */}
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-[#EC4899] opacity-40" />
        <div className="absolute top-24 right-16 w-3 h-3 rounded-full bg-[#F59E0B] opacity-40" />
        <div className="absolute bottom-6 left-24 w-5 h-5 rounded-full bg-[#10B981] opacity-30" />
        
        {/* Abstract structural grid line overlays */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="purple" className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Eugene Practice Intel</Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
              Practice Analytics Workspace
            </h1>
            <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Real-time EMR integrations, EBITDA metrics, payroll trends, and financial benchmarks for <strong className="text-white">{practice.name}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={() => navigate('/ask')}
              className="btn-primary px-5 py-2.5 font-semibold text-xs hover:scale-[1.01] active:scale-[0.99] transition-all bg-[#5850EC] hover:bg-[#4E46E5] text-white rounded-lg flex items-center gap-2"
            >
              <MessageCircle size={14} />
              Consult Eugene AI
            </button>
            <button 
              onClick={() => navigate('/health-score')}
              className="btn-secondary-on-dark px-5 py-2.5 font-semibold text-xs transition-all border border-slate-700 hover:bg-slate-800 text-white rounded-lg flex items-center gap-2"
            >
              <Activity size={14} />
              CFO Diagnostic
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* KPI Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <div key={kpi.label} className="p-4 border border-[#E5E7EB] rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.bg }}>
                    <Icon size={16} style={{ color: kpi.color }} />
                  </div>
                  <Badge variant={kpi.positive ? 'green' : kpi.label === 'Payroll Ratio' ? 'red' : 'gold'} size="xs">
                    {kpi.change}
                  </Badge>
                </div>
                <div className="mb-2">
                  <p className="text-2xl font-bold text-[#111111]">{kpi.value}</p>
                  <p className="text-[10px] text-[#6B7280] font-bold tracking-wider uppercase">{kpi.label}</p>
                </div>
                <SparkLine data={kpi.spark} color={kpi.color} />
              </div>
            )
          })}
        </div>

        {/* Row 1: Core Financial Trends (Revenue and Payroll) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader title="Monthly Revenue Trend" icon={BarChart3} subtitle="Comparing actual revenue vs target milestones" />
            <div className="pt-2">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyRevenue} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="revenue" name="Revenue" fill="#6366F1" radius={[4,4,0,0]} />
                  <Bar dataKey="target" name="Target" fill="rgba(99,102,241,0.08)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Payroll Ratio Trend */}
          <Card>
            <CardHeader title="Payroll Ratio Control Trend" icon={Activity} subtitle="Tracking payroll allocation relative to critical bounds" />
            <div className="pt-2">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={payrollTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <ReferenceLine y={38} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Healthy Target (38%)', fill: '#10b981', fontSize: 9, position: 'top' }} />
                  <ReferenceLine y={42} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Critical Red Flag (42%)', fill: '#ef4444', fontSize: 9, position: 'top' }} />
                  <Line type="monotone" dataKey="pct" name="Payroll %" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Row 2: Patient Retention vs Service Revenues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Flow Chart */}
          <Card>
            <CardHeader title="Patient Volume & Retention" icon={Users} subtitle="Analyzing returning base vs new acquisition channels" />
            <div className="pt-2">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={patientFlow} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="new" name="New Patients" fill="#8B5CF6" radius={[4,4,0,0]} />
                  <Bar dataKey="returning" name="Returning" fill="#6366F1" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Service breakdown */}
          <Card>
            <CardHeader title="Service Revenue Breakdown" icon={Layers} subtitle="Visualizing cosmetic treatment contributions" />
            <div className="space-y-4 pt-2">
              {serviceBreakdown.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500 font-semibold">{s.name}</span>
                    <span className="text-navy-950 font-bold">${s.revenue.toLocaleString()} ({s.pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full primary-gradient"
                      style={{ width: `${s.pct}%`, opacity: 0.7 + (s.pct / 100) * 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 3: Benchmarks & EBITDA Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Industry Benchmark */}
          <Card>
            <CardHeader title="National Benchmark Comparison" icon={ShieldAlert} subtitle="Comparing practice ratios with industry leaders" />
            <div className="space-y-5 pt-2">
              <BenchmarkBar label="Payroll Ratio" userValue={45.5} bands={BENCHMARKS.payrollPct.bands} />
              <BenchmarkBar label="EBITDA Margin" userValue={15.6} bands={BENCHMARKS.ebitdaMargin.bands} />
              <BenchmarkBar label="Rent Ratio" userValue={8.9} bands={BENCHMARKS.rentPct.bands} />
              <BenchmarkBar label="Marketing Spend %" userValue={4.4} bands={BENCHMARKS.marketingPct.bands} />
            </div>
          </Card>

          {/* EBITDA calculator */}
          <EBITDACalculatorWidget />
        </div>
      </div>
    </div>
  )
}
