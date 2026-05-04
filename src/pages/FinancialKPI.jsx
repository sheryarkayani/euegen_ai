import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, PieChart, Pie, Cell
} from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, Calculator } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import BenchmarkBar from '../components/ui/BenchmarkBar'
import { monthlyRevenue, serviceBreakdown, patientFlow, payrollTrend, kpiSummary } from '../data/dummyKPIs'
import { BENCHMARKS } from '../data/benchmarks'

const CHART_COLORS = { gold: '#d4a853', rose: '#e8748a', blue: '#3b82f6', green: '#10b981', amber: '#f59e0b' }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl p-3 border border-gray-200 text-sm">
      <p className="text-gray-400 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-gray-300">{p.name}:</span>
          <span className="text-navy-950 font-medium">
            {typeof p.value === 'number' && p.value > 1000
              ? `$${p.value.toLocaleString()}`
              : `${p.value}${p.name?.includes('%') ? '%' : ''}`}
          </span>
        </div>
      ))}
    </div>
  )
}

function EBITDACalculator() {
  const [vals, setVals] = useState({
    revenue: 180000, payroll: 82000, rent: 16000, marketing: 8000, supplies: 22000, other: 8000,
  })
  const total = Object.entries(vals).filter(([k]) => k !== 'revenue').reduce((s, [, v]) => s + v, 0)
  const ebitda = vals.revenue - total
  const margin = ((ebitda / vals.revenue) * 100).toFixed(1)

  return (
    <Card>
      <CardHeader title="EBITDA Calculator" icon={Calculator} subtitle="Estimate your practice profitability" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { key: 'revenue', label: 'Monthly Revenue', color: '#10b981' },
          { key: 'payroll', label: 'Payroll', color: '#ef4444' },
          { key: 'rent', label: 'Rent', color: '#f59e0b' },
          { key: 'marketing', label: 'Marketing', color: '#3b82f6' },
          { key: 'supplies', label: 'Supplies', color: '#8b5cf6' },
          { key: 'other', label: 'Other Expenses', color: '#9b94a8' },
        ].map(f => (
          <div key={f.key}>
            <label className="text-xs text-gray-400 mb-1 block" style={{ color: f.color + '99' }}>{f.label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                type="number"
                className="form-input w-full pl-7 pr-3 py-2.5 rounded-xl text-sm"
                value={vals[f.key]}
                onChange={e => setVals(v => ({ ...v, [f.key]: Number(e.target.value) }))}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl" style={{
        background: ebitda > 0 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
        border: `1px solid ${ebitda > 0 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
      }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Estimated EBITDA</p>
            <p className="text-2xl font-display font-bold" style={{ color: ebitda > 0 ? '#10b981' : '#ef4444' }}>
              ${ebitda.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Margin</p>
            <p className="text-2xl font-display font-bold" style={{ color: ebitda > 0 ? '#10b981' : '#ef4444' }}>
              {margin}%
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Benchmark: 20–25% average</span>
            <span style={{ color: Number(margin) >= 20 ? '#10b981' : '#f59e0b' }}>
              {Number(margin) >= 25 ? 'High Performer' : Number(margin) >= 20 ? 'On Target' : Number(margin) >= 10 ? 'Below Average' : 'Needs Attention'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function FinancialKPI({ tab }) {
  const [activeTab, setActiveTab] = useState(tab || 'dashboard')
  const tabs = [
    { key: 'dashboard', label: 'KPI Dashboard' },
    { key: 'pl', label: 'P&L Analyzer' },
    { key: 'calculator', label: 'Revenue Calculator' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(34,29,53,0.06)', width: 'fit-content' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.key ? 'btn-primary text-navy-950' : 'text-gray-400 hover:text-navy-950'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <>
          {/* KPI summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Monthly Revenue', value: '$180,000', change: '+4.7%', pos: true, icon: DollarSign, color: '#d4a853' },
              { label: 'EBITDA Margin', value: '15.6%', change: 'Below 20% target', pos: false, icon: TrendingUp, color: '#e8748a' },
              { label: 'Payroll Ratio', value: '45.5%', change: '⚠ Red Flag >42%', pos: false, icon: TrendingDown, color: '#ef4444' },
              { label: 'Revenue/Visit', value: '$385', change: 'Good range', pos: true, icon: TrendingUp, color: '#10b981' },
            ].map((k, i) => {
              const Icon = k.icon
              return (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="kpi-card rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.color}18` }}>
                      <Icon size={16} style={{ color: k.color }} />
                    </div>
                    <Badge variant={k.pos ? 'green' : 'red'} size="xs">{k.change}</Badge>
                  </div>
                  <p className="font-display text-xl font-bold text-navy-950">{k.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Revenue chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="Monthly Revenue Trend" subtitle="vs. target" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyRevenue} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.08)" />
                  <XAxis dataKey="month" tick={{ fill: '#9b94a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9b94a8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name="Revenue" fill="#d4a853" radius={[4,4,0,0]} />
                  <Bar dataKey="target" name="Target" fill="rgba(34,29,53,0.08)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardHeader title="Patient Volume" subtitle="New vs. returning" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={patientFlow} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.08)" />
                  <XAxis dataKey="month" tick={{ fill: '#9b94a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9b94a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="new" name="New Patients" fill="#e8748a" radius={[4,4,0,0]} />
                  <Bar dataKey="returning" name="Returning" fill="#3b82f6" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Payroll trend + service breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="Payroll Ratio Trend" subtitle="Target: <38%" />
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={payrollTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.08)" />
                  <XAxis dataKey="month" tick={{ fill: '#9b94a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9b94a8', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={38} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Healthy', fill: '#10b981', fontSize: 10 }} />
                  <ReferenceLine y={42} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Red Flag', fill: '#ef4444', fontSize: 10 }} />
                  <Line type="monotone" dataKey="pct" name="Payroll %" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardHeader title="Service Revenue Breakdown" subtitle="April 2026" />
              <div className="space-y-3">
                {serviceBreakdown.map(s => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{s.name}</span>
                      <span className="text-navy-950 font-medium">${s.revenue.toLocaleString()} ({s.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full gold-gradient"
                        style={{ width: `${s.pct}%`, opacity: 0.7 + (s.pct / 100) * 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Benchmarks */}
          <Card>
            <CardHeader title="Industry Benchmark Comparison" subtitle="Lumina Aesthetics vs. top performers" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenchmarkBar label="Payroll Ratio" userValue={45.5} bands={BENCHMARKS.payrollPct.bands} />
              <BenchmarkBar label="EBITDA Margin" userValue={15.6} bands={BENCHMARKS.ebitdaMargin.bands} />
              <BenchmarkBar label="Rent Ratio" userValue={8.9} bands={BENCHMARKS.rentPct.bands} />
              <BenchmarkBar label="Marketing Spend %" userValue={4.4} bands={BENCHMARKS.marketingPct.bands} />
            </div>
          </Card>
        </>
      )}

      {activeTab === 'pl' && (
        <Card>
          <CardHeader title="P&L Overview — April 2026" subtitle="Lumina Aesthetics" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-gray-200">
                  <th className="text-left py-3">Category</th>
                  <th className="text-right py-3">Amount</th>
                  <th className="text-right py-3">% of Revenue</th>
                  <th className="text-right py-3">Benchmark</th>
                  <th className="text-right py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { cat: 'Total Revenue', val: 180000, pct: 100, bench: '—', status: '✓' },
                  { cat: 'Payroll', val: -82000, pct: 45.5, bench: '30–38%', status: '⚠', warn: true },
                  { cat: 'Rent', val: -16000, pct: 8.9, bench: '<10%', status: '✓' },
                  { cat: 'Marketing', val: -8000, pct: 4.4, bench: '3–7%', status: '✓' },
                  { cat: 'Supplies & Injectables', val: -22000, pct: 12.2, bench: '10–15%', status: '✓' },
                  { cat: 'Other Expenses', val: -8000, pct: 4.4, bench: '—', status: '—' },
                  { cat: 'EBITDA (est.)', val: 44000, pct: 24.4, bench: '20–25%', status: '✓', highlight: true },
                ].map((row, i) => (
                  <tr key={i} className={row.highlight ? 'font-semibold' : ''}>
                    <td className="py-3 text-gray-300">{row.cat}</td>
                    <td className={`py-3 text-right font-medium ${row.val < 0 ? 'text-red-400' : row.highlight ? 'text-gold-500' : 'text-navy-950'}`}>
                      {row.val < 0 ? '-' : ''}${Math.abs(row.val).toLocaleString()}
                    </td>
                    <td className={`py-3 text-right ${row.warn ? 'text-amber-400 font-semibold' : 'text-gray-400'}`}>{row.pct}%</td>
                    <td className="py-3 text-right text-gray-600 text-xs">{row.bench}</td>
                    <td className="py-3 text-right">
                      <Badge variant={row.status === '✓' ? 'green' : row.status === '⚠' ? 'amber' : 'gray'} size="xs">{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'calculator' && (
        <div className="max-w-2xl">
          <EBITDACalculator />
        </div>
      )}
    </div>
  )
}
