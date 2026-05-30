import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, AreaChart, Area
} from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, Calculator, Scale, Layers, Briefcase } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import BenchmarkBar from '../components/ui/BenchmarkBar'
import { monthlyRevenue, serviceBreakdown, patientFlow, payrollTrend, kpiSummary } from '../data/dummyKPIs'
import { BENCHMARKS } from '../data/benchmarks'

const CHART_COLORS = { indigo: '#6366F1', purple: '#8B5CF6', green: '#10B981', red: '#EF4444', amber: '#F59E0B', gray: '#9C9C9C' }

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
          { key: 'revenue', label: 'Monthly Revenue', color: '#6366F1' },
          { key: 'payroll', label: 'Payroll', color: '#ef4444' },
          { key: 'rent', label: 'Rent', color: '#f59e0b' },
          { key: 'marketing', label: 'Marketing', color: '#10b981' },
          { key: 'supplies', label: 'Supplies', color: '#8b5cf6' },
          { key: 'other', label: 'Other Expenses', color: '#9b94a8' },
        ].map(f => (
          <div key={f.key}>
            <label className="text-xs text-gray-500 mb-1 block font-medium">{f.label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
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
        background: ebitda > 0 ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)',
        border: `1px solid ${ebitda > 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}`,
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
            <span style={{ color: Number(margin) >= 20 ? '#10b981' : '#f59e0b' }} className="font-semibold">
              {Number(margin) >= 25 ? 'High Performer' : Number(margin) >= 20 ? 'On Target' : Number(margin) >= 10 ? 'Below Average' : 'Needs Attention'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

function CashFlowForecaster() {
  const [startingCash, setStartingCash] = useState(120000)
  const [growthRate, setGrowthRate] = useState(4.5)
  const [monthlyRevenue, setMonthlyRevenue] = useState(180000)
  const [fixedExpenses, setFixedExpenses] = useState(135000)

  // Generate 6 month forecast
  const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6']
  let currentCash = startingCash
  const forecastData = months.map((m, idx) => {
    const rev = monthlyRevenue * Math.pow(1 + growthRate / 100, idx)
    const netCashFlow = rev - fixedExpenses
    const opening = currentCash
    currentCash += netCashFlow
    return {
      month: m,
      Revenue: Math.round(rev),
      Expenses: fixedExpenses,
      NetCashFlow: Math.round(netCashFlow),
      EndingBalance: Math.round(currentCash),
    }
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <Card>
          <CardHeader title="Forecaster Controls" subtitle="Adjust baseline projections" />
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Starting Cash Reserves</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={startingCash}
                  onChange={e => setStartingCash(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Starting Monthly Revenue</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={monthlyRevenue}
                  onChange={e => setMonthlyRevenue(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Monthly Operational Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={fixedExpenses}
                  onChange={e => setFixedExpenses(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Expected Monthly Growth Rate (%)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  className="form-input w-full pr-7 py-2"
                  value={growthRate}
                  onChange={e => setGrowthRate(Number(e.target.value))}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader title="6-Month Projected Cash Balance" subtitle="Forward-looking liquidity trends" />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
              <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="EndingBalance" name="Cash Balance" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCash)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Monthly Cash Inflow vs Outflow" subtitle="Operating surplus margin" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
              <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="Revenue" name="Inflow (Revenue)" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" name="Outflow (Expenses)" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

function ProviderCompModeler() {
  const [providerType, setProviderType] = useState('NP/PA Injector')
  const [monthlyBillings, setMonthlyBillings] = useState(45000)
  const [baseSalary, setBaseSalary] = useState(8500) // Monthly base
  const [commRate, setCommRate] = useState(15) // % of billings above base
  const [productivityThreshold, setProductivityThreshold] = useState(25000)

  // calculations
  const grossCommission = monthlyBillings > productivityThreshold
    ? ((monthlyBillings - productivityThreshold) * commRate) / 100
    : 0
  const totalPayrollCost = baseSalary + grossCommission
  const consumableCost = monthlyBillings * 0.12 // Aesthetic consumable products (botox, syringes) avg 12-15%
  const providerGrossContribution = monthlyBillings - consumableCost
  const providerNetMargin = providerGrossContribution - totalPayrollCost
  const marginPercentage = ((providerNetMargin / monthlyBillings) * 100).toFixed(1)
  const roiMultiple = (monthlyBillings / totalPayrollCost).toFixed(1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <Card>
          <CardHeader title="Comp Settings" subtitle="Model base + tiered thresholds" />
          <div className="space-y-3.5">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Provider Class</label>
              <select
                className="form-input w-full"
                value={providerType}
                onChange={e => setProviderType(e.target.value)}
              >
                {['NP/PA Injector', 'RN Injector', 'Aesthetician', 'Surgeon'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Monthly Gross Billings</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={monthlyBillings}
                  onChange={e => setMonthlyBillings(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Monthly Base Salary / Draw</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={baseSalary}
                  onChange={e => setBaseSalary(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Productivity Threshold</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={productivityThreshold}
                  onChange={e => setProductivityThreshold(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Commission Rate (%)</label>
              <div className="relative">
                <input
                  type="number"
                  className="form-input w-full pr-7 py-2"
                  value={commRate}
                  onChange={e => setCommRate(Number(e.target.value))}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4 bg-white">
            <p className="text-xs text-gray-500 font-medium">Gross Provider Pay</p>
            <p className="text-2xl font-display font-bold text-navy-950 mt-1">
              ${Math.round(totalPayrollCost).toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Base ${baseSalary.toLocaleString()} + Comm ${grossCommission.toLocaleString()}
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 bg-white">
            <p className="text-xs text-gray-500 font-medium">Practice Net Margin</p>
            <p className="text-2xl font-display font-bold text-green-500 mt-1">
              ${Math.round(providerNetMargin).toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Margin percentage: {marginPercentage}%
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 bg-white">
            <p className="text-xs text-gray-500 font-medium">Provider ROI Multiple</p>
            <p className="text-2xl font-display font-bold text-indigo-600 mt-1">
              {roiMultiple}x
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Target benchmark: 4.0x–5.0x
            </p>
          </div>
        </div>

        <Card>
          <CardHeader title="Provider Direct Labor Economics" subtitle="Consumable margin vs labor allocation" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              layout="vertical"
              data={[
                { name: 'Gross Billings', val: monthlyBillings, fill: '#6366F1' },
                { name: 'Consumable Cost (12%)', val: consumableCost, fill: '#F59E0B' },
                { name: 'Provider Labor Cost', val: totalPayrollCost, fill: '#EF4444' },
                { name: 'Net Profit contribution', val: providerNetMargin, fill: '#10B981' },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
              <XAxis type="number" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
              <Tooltip formatter={v => [`$${v.toLocaleString()}`, '']} />
              <Bar dataKey="val" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

function PEValuationEstimator() {
  const [annualEbitda, setAnnualEbitda] = useState(550000)
  const [multiple, setMultiple] = useState(6.5)
  const [debtAmount, setDebtAmount] = useState(250000)
  const [workingCapitalReq, setWorkingCapitalReq] = useState(75000)

  // Deal economics calculations
  const valuation = annualEbitda * multiple
  const advisoryFees = valuation * 0.035 // 3.5% transaction advisory and legal fees
  const netProceeds = valuation - debtAmount - workingCapitalReq - advisoryFees

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <Card>
          <CardHeader title="PE Model Settings" subtitle="Build transaction proceeds model" />
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Practice Annual EBITDA</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={annualEbitda}
                  onChange={e => setAnnualEbitda(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">EBITDA Multiple Selection</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  className="form-input w-full pr-7 py-2"
                  value={multiple}
                  onChange={e => setMultiple(Number(e.target.value))}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">x</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Outstanding Practice Debt / Liens</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={debtAmount}
                  onChange={e => setDebtAmount(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">Working Capital Target (Peg)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  className="form-input w-full pl-7 pr-3 py-2"
                  value={workingCapitalReq}
                  onChange={e => setWorkingCapitalReq(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4 bg-white">
            <p className="text-xs text-gray-500 font-medium">Enterprise Value (EV)</p>
            <p className="text-2xl font-display font-bold text-navy-950 mt-1">
              ${Math.round(valuation).toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Based on {multiple}x multiplier
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 bg-white">
            <p className="text-xs text-gray-500 font-medium">Estimated Transaction Fees</p>
            <p className="text-2xl font-display font-bold text-amber-500 mt-1">
              ${Math.round(advisoryFees).toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Advisory, MSO audits, legal (3.5%)
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 bg-white">
            <p className="text-xs text-gray-500 font-medium">Seller Cash Proceeds</p>
            <p className="text-2xl font-display font-bold text-green-500 mt-1">
              ${Math.round(netProceeds).toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Net cash paid at transaction close
            </p>
          </div>
        </div>

        <Card>
          <CardHeader title="Acquisition Deal Waterfall Analysis" subtitle="Breakdown of value distribution" />
          <div className="space-y-4">
            {[
              { label: 'Practice Enterprise Value (EV)', value: valuation, pct: 100, color: '#6366F1' },
              { label: 'Debt Payoff', value: -debtAmount, pct: -(debtAmount / valuation * 100), color: '#EF4444' },
              { label: 'Net Working Capital Peg Holdback', value: -workingCapitalReq, pct: -(workingCapitalReq / valuation * 100), color: '#F59E0B' },
              { label: 'Legal & Transaction advisory fees', value: -advisoryFees, pct: -3.5, color: '#8B5CF6' },
              { label: 'Net Liquidity Proceeds to Seller', value: netProceeds, pct: (netProceeds / valuation * 100), color: '#10B981', bold: true },
            ].map((row, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <div className="flex justify-between text-sm">
                  <span className={`text-xs ${row.bold ? 'font-bold text-navy-950' : 'text-gray-500 font-medium'}`}>{row.label}</span>
                  <span className={`text-xs font-bold ${row.value < 0 ? 'text-red-500' : 'text-navy-950'}`}>
                    {row.value < 0 ? '-' : ''}${Math.abs(Math.round(row.value)).toLocaleString()} ({Math.abs(row.pct).toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.max(1, Math.min(100, Math.abs(row.pct)))}%`,
                      backgroundColor: row.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function FinancialKPI({ tab }) {
  const [activeTab, setActiveTab] = useState(tab || 'dashboard')
  const tabs = [
    { key: 'dashboard', label: 'KPI Dashboard' },
    { key: 'pl', label: 'P&L Analyzer' },
    { key: 'ebitda', label: 'EBITDA Calculator' },
    { key: 'cash-flow', label: 'Cash Flow Forecaster' },
    { key: 'provider-roi', label: 'Provider Comp ROI' },
    { key: 'pe-value', label: 'PE Valuation Model' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100 overflow-x-auto" style={{ width: 'fit-content' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === t.key ? 'btn-primary text-white shadow-md' : 'text-gray-500 hover:text-navy-950'
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
              { label: 'Monthly Revenue', value: '$180,000', change: '+4.7%', pos: true, icon: DollarSign, color: '#6366F1' },
              { label: 'EBITDA Margin', value: '15.6%', change: 'Below 20% target', pos: false, icon: TrendingUp, color: '#F59E0B' },
              { label: 'Payroll Ratio', value: '45.5%', change: '⚠ Red Flag >42%', pos: false, icon: TrendingDown, color: '#EF4444' },
              { label: 'Revenue/Visit', value: '$385', change: 'Good range', pos: true, icon: TrendingUp, color: '#10B981' },
            ].map((k, i) => {
              const Icon = k.icon
              return (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="kpi-card rounded-xl p-4 bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.color}12` }}>
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
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name="Revenue" fill="#6366F1" radius={[4,4,0,0]} />
                  <Bar dataKey="target" name="Target" fill="rgba(99,102,241,0.08)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardHeader title="Patient Volume" subtitle="New vs. returning" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={patientFlow} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="new" name="New Patients" fill="#8B5CF6" radius={[4,4,0,0]} />
                  <Bar dataKey="returning" name="Returning" fill="#6366F1" radius={[4,4,0,0]} />
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
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,29,53,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9C9C9C', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={38} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Healthy Target', fill: '#10b981', fontSize: 10, position: 'top' }} />
                  <ReferenceLine y={42} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Critical Red Flag', fill: '#ef4444', fontSize: 10, position: 'top' }} />
                  <Line type="monotone" dataKey="pct" name="Payroll %" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardHeader title="Service Revenue Breakdown" subtitle="April 2026" />
              <div className="space-y-3">
                {serviceBreakdown.map(s => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400 font-medium">{s.name}</span>
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
                  <tr key={i} className={row.highlight ? 'font-semibold bg-gray-50/40' : ''}>
                    <td className="py-3 text-gray-500 font-medium">{row.cat}</td>
                    <td className={`py-3 text-right font-bold ${row.val < 0 ? 'text-red-500' : row.highlight ? 'text-indigo-600' : 'text-navy-950'}`}>
                      {row.val < 0 ? '-' : ''}${Math.abs(row.val).toLocaleString()}
                    </td>
                    <td className={`py-3 text-right ${row.warn ? 'text-red-500 font-bold' : 'text-gray-400 font-medium'}`}>{row.pct}%</td>
                    <td className="py-3 text-right text-gray-400 text-xs font-medium">{row.bench}</td>
                    <td className="py-3 text-right">
                      <Badge variant={row.status === '✓' ? 'green' : row.status === '⚠' ? 'red' : 'gray'} size="xs">{row.status === '✓' ? 'Healthy' : 'Red Flag'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'ebitda' && (
        <div className="max-w-2xl mx-auto">
          <EBITDACalculator />
        </div>
      )}

      {activeTab === 'cash-flow' && (
        <div className="w-full">
          <CashFlowForecaster />
        </div>
      )}

      {activeTab === 'provider-roi' && (
        <div className="w-full">
          <ProviderCompModeler />
        </div>
      )}

      {activeTab === 'pe-value' && (
        <div className="w-full">
          <PEValuationEstimator />
        </div>
      )}
    </div>
  )
}
