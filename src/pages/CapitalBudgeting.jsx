import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Building, Percent, Activity } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

export default function CapitalBudgeting() {
  // SBA Loan Modeler State
  const [loanAmount, setLoanAmount] = useState(350000)
  const [interestRate, setInterestRate] = useState(9.5)
  const [loanTerm, setLoanTerm] = useState(10)
  const [practiceEbitda, setPracticeEbitda] = useState(12000) // Monthly EBITDA

  // Tenant Improvement State
  const [sqFt, setSqFt] = useState(2200)
  const [costPerSqFt, setCostPerSqFt] = useState(160)
  const [equipmentCapex, setEquipmentCapex] = useState(85000)
  const [workingCapital, setWorkingCapital] = useState(50000)

  // Stabilization Ramp-up State
  const [rampSpeed, setRampSpeed] = useState('6') // Months to stabilize

  // SBA Amortization calculations
  const monthlyRate = (interestRate / 100) / 12
  const totalMonths = loanTerm * 12
  const monthlyPayment = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : loanAmount / totalMonths

  const totalPayments = monthlyPayment * totalMonths
  const totalInterest = totalPayments - loanAmount
  const dscr = monthlyPayment > 0 ? (practiceEbitda / monthlyPayment).toFixed(2) : 0
  const isDscrSafe = Number(dscr) >= 1.25

  // TI Cost calculations
  const totalBuildout = sqFt * costPerSqFt
  const totalRequiredCapital = totalBuildout + equipmentCapex + workingCapital
  
  // Ramp calculations
  const monthlyRent = sqFt * 3.5 // Est. $42/sqft annual rent -> $3.50/sqft monthly rent
  const monthlyFixedOps = 8000 + monthlyRent // Rent + utilities + base opex
  const totalBurnToStabilize = monthlyFixedOps * (Number(rampSpeed) / 2) // Est. half opex burn during ramp

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Overview Card */}
      <Card className="primary-gradient text-white border-0 overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-12 -translate-y-6">
          <Building size={320} />
        </div>
        <div className="flex items-start justify-between relative z-10">
          <div>
            <Badge variant="indigo" className="mb-2 bg-white/20 text-white border-0 font-semibold">Version 2.0 Feature</Badge>
            <h3 className="font-display text-2xl font-bold">Capital Budgeting & Expansion Studio</h3>
            <p className="text-white/80 text-sm mt-1 max-w-xl">
              Model your med-spa's physical expansion, calculate debt tolerance parameters, and build a pre-opening working capital reserve runway before signing any lease or capex agreements.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl">🏦</div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SBA Loan Modeler */}
        <Card className="border border-indigo-500/10">
          <CardHeader title="SBA 7(a) Debt Modeler" icon={Calculator} subtitle="Check leverage capacity and safety boundaries" />
          
          <div className="space-y-5 mt-4">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                <span>Loan Principal Amount</span>
                <span className="text-indigo-600 font-bold">${loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={loanAmount}
                onChange={e => setLoanAmount(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>$50K</span>
                <span>$500K</span>
                <span>$1M</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                  <span>Interest Rate (APR)</span>
                  <span className="text-indigo-600 font-bold">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                  <span>Loan Term (Years)</span>
                  <span className="text-indigo-600 font-bold">{loanTerm} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="1"
                  value={loanTerm}
                  onChange={e => setLoanTerm(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                <span>Target Practice Monthly EBITDA (Post-Opening)</span>
                <span className="text-indigo-600 font-bold">${practiceEbitda.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="30000"
                step="500"
                value={practiceEbitda}
                onChange={e => setPracticeEbitda(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
              />
            </div>

            {/* Calculations Summary */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
              <div className="p-2.5 rounded-xl bg-gray-50 text-center border border-gray-100">
                <p className="text-xs text-gray-400 font-medium">Monthly P&I</p>
                <p className="text-base font-bold text-navy-950 mt-0.5">${Math.round(monthlyPayment).toLocaleString()}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 text-center border border-gray-100">
                <p className="text-xs text-gray-400 font-medium">Interest Paid</p>
                <p className="text-base font-bold text-navy-950 mt-0.5">${Math.round(totalInterest).toLocaleString()}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 text-center border border-gray-100">
                <p className="text-xs text-gray-400 font-medium">DSCR Margin</p>
                <p className={`text-base font-bold mt-0.5 ${isDscrSafe ? 'text-green-500' : 'text-amber-500'}`}>{dscr}x</p>
              </div>
            </div>

            {/* DSCR Alert Banner */}
            <div className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors duration-200 ${
              isDscrSafe 
                ? 'bg-green-50/50 border-green-500/20 text-green-700' 
                : 'bg-amber-50/50 border-amber-500/20 text-amber-700'
            }`}>
              {isDscrSafe ? (
                <>
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Leverage Within Safety Limits</p>
                    <p className="text-[11px] opacity-80 mt-0.5">Your DSCR is above the SBA 7(a) benchmark threshold of 1.25x. This debt burden is healthy for your target EBITDA cash flow.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">High Debt Burden Warning</p>
                    <p className="text-[11px] opacity-80 mt-0.5">Your DSCR is below the standard SBA safety threshold of 1.25x. Consider lowering the principal, extending the term, or increasing your targeted operational EBITDA.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Tenant Improvement Capex Modeler */}
        <Card className="border border-indigo-500/10">
          <CardHeader title="Buildout & TI Calculator" icon={Building} subtitle="Leasehold improvements and launch capital structure" />
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">Sq. Footage of Practice</label>
                <div className="relative">
                  <input
                    type="number"
                    value={sqFt}
                    onChange={e => setSqFt(Number(e.target.value))}
                    className="form-input w-full py-2 px-3 rounded-xl text-sm pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">sqft</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">Construction Cost / Sqft</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    value={costPerSqFt}
                    onChange={e => setCostPerSqFt(Number(e.target.value))}
                    className="form-input w-full py-2 pl-7 pr-3 rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">Aesthetics Device Deposits</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    value={equipmentCapex}
                    onChange={e => setEquipmentCapex(Number(e.target.value))}
                    className="form-input w-full py-2 pl-7 pr-3 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">Working Capital Buffer</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    value={workingCapital}
                    onChange={e => setWorkingCapital(Number(e.target.value))}
                    className="form-input w-full py-2 pl-7 pr-3 rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Output */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Estimated Leasehold Improvement (TI):</span>
                <span className="text-navy-950 font-bold">${totalBuildout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Monthly Practice Rent (@ $42/sqft/yr):</span>
                <span className="text-navy-950 font-bold">${Math.round(monthlyRent).toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Estimated Pre-Opening Fixed Opex:</span>
                <span className="text-navy-950 font-bold">${Math.round(monthlyFixedOps).toLocaleString()}/mo</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm">
                <span className="text-navy-950 font-semibold">Total Capital Requirement:</span>
                <span className="text-indigo-600 font-display font-bold text-lg">${totalRequiredCapital.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stabilization Cash Runway Projections */}
      <Card className="border border-indigo-500/10">
        <CardHeader title="Stabilization & Runway Projections" icon={Activity} subtitle="Plan your cash reserve burn based on ramp speeds" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1.5 block">Ramp Time to Break-Even</label>
              <div className="flex gap-2">
                {['3', '6', '12'].map(m => (
                  <button
                    key={m}
                    onClick={() => setRampSpeed(m)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      rampSpeed === m 
                        ? 'btn-primary text-white border-indigo-600' 
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-medium">Expected Ramp Cash Burn:</span>
                <span className="text-indigo-600 font-semibold">${Math.round(totalBurnToStabilize).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-medium">Remaining Buffer Cash:</span>
                <span className={`font-semibold ${workingCapital - totalBurnToStabilize > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${Math.round(workingCapital - totalBurnToStabilize).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col justify-end">
            <p className="text-xs text-gray-500 font-semibold mb-3">Simulation of Cash Reserve Drain vs Recovery</p>
            <div className="flex items-end gap-3 h-32 w-full pt-4 px-2 border-b border-l border-gray-200">
              {Array.from({ length: 6 }).map((_, idx) => {
                // simple curve modeling cash drop then recover
                const rampFactor = Number(rampSpeed)
                let factor = 1.0
                if (idx === 0) factor = 1.0
                else if (idx === 1) factor = 0.7
                else if (idx === 2) factor = rampFactor >= 12 ? 0.45 : 0.55
                else if (idx === 3) factor = rampFactor >= 12 ? 0.35 : 0.65
                else if (idx === 4) factor = rampFactor >= 12 ? 0.40 : 0.90
                else factor = 1.2

                const barHeight = Math.max(10, Math.min(100, factor * 70))
                const currentCashValue = Math.round(workingCapital * factor)

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-navy-950 text-white text-[9px] py-1 px-1.5 rounded-lg pointer-events-none whitespace-nowrap shadow-md">
                      ${currentCashValue.toLocaleString()}
                    </div>
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        factor < 0.6 ? 'bg-amber-400' : 'bg-indigo-500'
                      }`}
                      style={{ height: `${barHeight}px` }}
                    />
                    <span className="text-[10px] text-gray-500 font-medium">M{idx + 1}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-1">
              <span>Month 1 (Opening)</span>
              <span>Month 3 (Deep Burn)</span>
              <span>Month 6 (Stabilized Peak)</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
