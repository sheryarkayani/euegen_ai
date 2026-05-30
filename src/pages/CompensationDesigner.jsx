import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, Calculator, AlertTriangle, CheckCircle, Percent, TrendingUp, Sparkles } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const DEFAULT_PROVIDERS = [
  { initials: 'SC', name: 'Dr. Sarah Carter', role: 'Medical Director', revenue: 72000, hours: 140, base: 8000, rate: 15 },
  { initials: 'MR', name: 'Monica Ross, RN', role: 'Nurse Injector', revenue: 54000, hours: 120, base: 4500, rate: 12 },
  { initials: 'AK', name: 'Ashley King, LE', role: 'Aesthetician', revenue: 32000, hours: 100, base: 3000, rate: 10 },
  { initials: 'JW', name: 'Jenny Ward, RN', role: 'Nurse Injector (Junior)', revenue: 22000, hours: 80, base: 3500, rate: 8 },
]

export default function CompensationDesigner() {
  const [compModel, setCompModel] = useState('B') // A: Commission, B: Base + Comm, C: Whichever is Higher
  const [basePay, setBasePay] = useState(4000)
  const [commissionRate, setCommissionRate] = useState(15)
  const [treatmentPrice, setTreatmentPrice] = useState(1000)
  const [consumableCost, setConsumableCost] = useState(150)
  const [providers, setProviders] = useState(DEFAULT_PROVIDERS)

  // Treatment profit calculations
  const calculateCommissionPerTx = () => {
    if (compModel === 'A') return treatmentPrice * (commissionRate / 100)
    if (compModel === 'B') return treatmentPrice * ((commissionRate * 0.7) / 100) // Lower comm when base is guaranteed
    return treatmentPrice * (commissionRate / 100) // Whichever is higher
  }

  const commissionPerTx = calculateCommissionPerTx()
  const directProfit = treatmentPrice - consumableCost - commissionPerTx
  const grossMarginPercent = ((directProfit / treatmentPrice) * 100).toFixed(0)

  // Ledger calculation based on selected compensation rules
  const ledgerData = providers.map(p => {
    let payroll = 0
    if (compModel === 'A') {
      payroll = p.revenue * (commissionRate / 100)
    } else if (compModel === 'B') {
      payroll = basePay + (p.revenue * (commissionRate / 100))
    } else {
      const commValue = p.revenue * ((commissionRate * 1.3) / 100)
      payroll = Math.max(basePay, commValue)
    }

    const margin = p.revenue - payroll
    const profitPerHour = p.hours > 0 ? (margin / p.hours).toFixed(0) : 0
    return { ...p, payroll, margin, profitPerHour }
  })

  const totalRevenue = ledgerData.reduce((s, v) => s + v.revenue, 0)
  const totalPayroll = ledgerData.reduce((s, v) => s + v.payroll, 0)
  const totalMargin = totalRevenue - totalPayroll
  const payrollRatio = totalRevenue > 0 ? ((totalPayroll / totalRevenue) * 100).toFixed(1) : 0
  const isPayrollHealthy = Number(payrollRatio) <= 38.0

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Introduction */}
      <Card className="primary-gradient text-white border-0 overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-12 -translate-y-6">
          <Users size={320} />
        </div>
        <div className="flex items-start justify-between relative z-10">
          <div>
            <Badge variant="indigo" className="mb-2 bg-white/20 text-white border-0 font-semibold">Compensation Suite</Badge>
            <h3 className="font-display text-2xl font-bold">Provider Compensation Designer</h3>
            <p className="text-white/80 text-sm mt-1 max-w-xl">
              Model provider commission rates, audit direct treatment margins, and align practice-wide compensation incentives without breaking the **CFO under 38% Payroll Ceiling**.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl">💸</div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Rules Modeler */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border border-indigo-500/10">
            <CardHeader title="Compensation Model" icon={Calculator} subtitle="Design the active commission framework" />
            
            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                {[
                  { key: 'A', label: 'Straight Commission', desc: '100% volume based, zero base risk' },
                  { key: 'B', label: 'Base Salary + Commission', desc: 'Guaranteed base floor + volume incentive' },
                  { key: 'C', label: 'Base vs Commission', desc: 'Whichever is greater (CFO Favorite)' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setCompModel(item.key)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      compModel === item.key
                        ? 'border-indigo-600 bg-indigo-500/5 shadow-sm'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <p className={`text-xs font-bold ${compModel === item.key ? 'text-indigo-600' : 'text-navy-950'}`}>{item.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>

              {compModel !== 'A' && (
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                    <span>Base Salary Floor</span>
                    <span className="text-indigo-600 font-bold">${basePay.toLocaleString()}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="8000"
                    step="250"
                    value={basePay}
                    onChange={e => setBasePay(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                  <span>Commission Rate</span>
                  <span className="text-indigo-600 font-bold">{commissionRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="1"
                  value={commissionRate}
                  onChange={e => setCommissionRate(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                />
              </div>
            </div>
          </Card>

          {/* Treatment Margin Preview */}
          <Card className="border border-indigo-500/10">
            <CardHeader title="Direct Margin Audit" icon={Percent} subtitle="Calculate target margins per treatment" />
            
            <div className="space-y-4 mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-500 font-semibold mb-1 block">Treatment Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
                    <input
                      type="number"
                      value={treatmentPrice}
                      onChange={e => setTreatmentPrice(Number(e.target.value))}
                      className="form-input w-full py-1.5 pl-6 pr-2 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-semibold mb-1 block">Consumable Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
                    <input
                      type="number"
                      value={consumableCost}
                      onChange={e => setConsumableCost(Number(e.target.value))}
                      className="form-input w-full py-1.5 pl-6 pr-2 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 space-y-2 border border-gray-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Provider Commission:</span>
                  <span className="text-navy-950 font-bold">${Math.round(commissionPerTx).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Practice Net Direct Profit:</span>
                  <span className="text-navy-950 font-bold">${Math.round(directProfit).toLocaleString()}</span>
                </div>
                <div className="pt-1.5 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-navy-950 font-semibold">Treatment Gross Margin:</span>
                  <span className={`font-bold ${Number(grossMarginPercent) >= 60 ? 'text-green-500' : 'text-amber-500'}`}>{grossMarginPercent}%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Ledger & Audit Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-indigo-500/10">
            <CardHeader title="Provider Profitability Ledger" icon={Sparkles} subtitle="Detailed direct performance audit per provider" />
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-200">
                    <th className="text-left py-2">Provider</th>
                    <th className="text-right py-2">Revenue Generated</th>
                    <th className="text-right py-2">Calculated Payroll</th>
                    <th className="text-right py-2">Practice Net Margin</th>
                    <th className="text-right py-2">Net Profit / Hr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ledgerData.map((p, i) => (
                    <tr key={i}>
                      <td className="py-3 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
                          {p.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-navy-950">{p.name}</p>
                          <p className="text-[9px] text-gray-500">{p.role}</p>
                        </div>
                      </td>
                      <td className="py-3 text-right text-navy-950 font-medium">${p.revenue.toLocaleString()}</td>
                      <td className="py-3 text-right text-indigo-600 font-semibold">${Math.round(p.payroll).toLocaleString()}</td>
                      <td className="py-3 text-right text-green-500 font-semibold">${Math.round(p.margin).toLocaleString()}</td>
                      <td className="py-3 text-right text-navy-950 font-bold">${p.profitPerHour}/hr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Golden Payroll Audit Summary */}
          <Card className="border border-indigo-500/10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-semibold text-navy-950 text-sm">Practice-Wide Labor Budget Audit</h4>
                <p className="text-xs text-gray-600">Total metrics matched against Fractional CFO targets</p>
              </div>
              <Badge variant={isPayrollHealthy ? 'green' : 'amber'}>{payrollRatio}% Payroll Ratio</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gray-50 text-center border border-gray-100">
                <p className="text-[10px] text-gray-500 font-medium">Total Monthly Revenue</p>
                <p className="text-lg font-bold text-navy-950 mt-0.5">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 text-center border border-gray-100">
                <p className="text-[10px] text-gray-500 font-medium">Total Provider Payroll</p>
                <p className="text-lg font-bold text-indigo-600 mt-0.5">${Math.round(totalPayroll).toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 text-center border border-gray-100">
                <p className="text-[10px] text-gray-500 font-medium">Net Practice Contribution</p>
                <p className="text-lg font-bold text-green-500 mt-0.5">${Math.round(totalMargin).toLocaleString()}</p>
              </div>
            </div>

            {/* CFO Recommendations Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-200 ${
              isPayrollHealthy
                ? 'bg-green-50/50 border-green-500/20 text-green-700'
                : 'bg-amber-50/50 border-amber-500/20 text-amber-700'
            }`}>
              {isPayrollHealthy ? (
                <>
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Labor Costs Optimized</p>
                    <p className="text-[11px] opacity-80 mt-0.5">Your practice-wide payroll ratio ({payrollRatio}%) satisfies the golden CFO threshold of &lt;38%. Direct labor margins are aligned to protect EBITDA profitability.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Excess Labor Opex Warning</p>
                    <p className="text-[11px] opacity-80 mt-0.5">Your practice payroll ratio ({payrollRatio}%) is above the safe threshold of 38%. Consider switching low-productivity providers to the **Base vs Commission** model to ensure payroll scales naturally with revenue.</p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
