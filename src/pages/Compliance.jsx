import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, FileText, Shield, CheckCircle, AlertTriangle, ArrowRight, DollarSign, Activity, Percent } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const STATE_CPOM_RISK = [
  { state: 'California', risk: 'Strict / High', rules: 'CPOM strictly enforced. MD/Physician must own 51%+ of clinical entity. MSO structure mandatory for non-MDs.', link: 'https://www.mbc.ca.gov', color: '#ef4444' },
  { state: 'New York', risk: 'Strict / High', rules: 'Strict CPOM. All clinical corporate owners must be state-licensed physicians. Management fees must reflect strict FMV.', link: 'https://www.health.ny.gov', color: '#ef4444' },
  { state: 'Texas', risk: 'Moderate', rules: 'CPOM enforced. MD delegation required for RN injectors. MD ownership or medical director contract mandatory.', link: 'https://www.tmb.state.tx.us', color: '#f59e0b' },
  { state: 'Florida', risk: 'Moderate', rules: 'Permissive for advanced NPs, but requires strict physician supervision for RNs and detailed clinical protocols.', link: 'https://flhealthsource.gov', color: '#f59e0b' },
  { state: 'Colorado', risk: 'Relaxed / Low', rules: 'Business-friendly CPOM rules. MD delegation required, but corporate structures allow significant flexibility.', link: 'https://www.colorado.gov/dora', color: '#10b981' },
]

export default function Compliance() {
  const [feeModel, setFeeModel] = useState('cost-plus') // cost-plus vs pct
  const [msoExpenses, setMsoExpenses] = useState(25000)
  const [markupPct, setMarkupPct] = useState(15)
  const [pcRevenue, setPcRevenue] = useState(90000)
  const [pcCommissionPct, setPcCommissionPct] = useState(15)

  // Calculations
  const costPlusFee = msoExpenses * (1 + markupPct / 100)
  const pctFee = pcRevenue * (pcCommissionPct / 100)
  
  const selectedFee = feeModel === 'cost-plus' ? costPlusFee : pctFee
  const pcNetRetained = pcRevenue - selectedFee
  const isFeeSafe = feeModel === 'cost-plus' || (feeModel === 'pct' && pcCommissionPct <= 20)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* CPOM Banner */}
      <div className="p-3.5 rounded-xl flex gap-3 items-start bg-indigo-500/5 border border-indigo-500/20 text-indigo-950">
        <AlertTriangle size={18} className="text-indigo-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-500">
          <strong className="text-indigo-600">Educational CFO Analysis:</strong> Med-spas operating under Corporate Practice of Medicine (CPOM) guidelines must legally partition clinical revenues in a Professional Corporation (PC) and charge Fair Market Value (FMV) management fees via an MSO to protect owners from regulatory fines. Consult a healthcare attorney to draft formal agreements.
        </p>
      </div>

      {/* Main Flow Model */}
      <Card className="border border-indigo-500/10">
        <CardHeader title="PC-MSO Fund Flow Ledger" icon={Shield} subtitle="Simulate compliant transaction flow from Patient payments to MSO Profits" />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center mt-6">
          {/* Clinical Entity PC */}
          <div className="lg:col-span-2 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-center relative">
            <Badge variant="indigo" className="absolute -top-2.5 left-1/2 -translate-x-1/2">1. Clinical Entity (PC)</Badge>
            <p className="text-xs text-gray-500 mt-2">Receives all patient revenue and pays direct clinical opex (Injector salaries, consumables).</p>
            <div className="my-4">
              <span className="text-[10px] text-gray-400 block font-semibold">Total PC Revenue</span>
              <span className="text-lg font-bold text-navy-950">${pcRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-100 text-xs">
              <span className="text-gray-500">PC Retention Balance:</span>
              <span className="text-green-500 font-bold">${Math.round(pcNetRetained).toLocaleString()}</span>
            </div>
          </div>

          {/* Transfer Arrow */}
          <div className="flex flex-col items-center justify-center py-2 lg:py-0">
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="hidden lg:block text-indigo-600">
              <ArrowRight size={28} />
            </motion.div>
            <span className="text-[10px] font-bold text-indigo-600 mt-1 text-center bg-indigo-500/5 px-2 py-1 rounded-lg border border-indigo-500/10 whitespace-nowrap">
              Management Fee Transfer
            </span>
            <span className="text-xs font-bold text-navy-950 mt-1">${Math.round(selectedFee).toLocaleString()}</span>
          </div>

          {/* Management Entity MSO */}
          <div className="lg:col-span-2 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-center relative">
            <Badge variant="green" className="absolute -top-2.5 left-1/2 -translate-x-1/2">2. Management Entity (MSO)</Badge>
            <p className="text-xs text-gray-500 mt-2">Handles administrative expenses (marketing, payroll software, office lease, accounting).</p>
            <div className="my-4">
              <span className="text-[10px] text-gray-400 block font-semibold">Total Administrative Fees</span>
              <span className="text-lg font-bold text-indigo-600">${Math.round(selectedFee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-100 text-xs">
              <span className="text-gray-500">MSO Admin Opex:</span>
              <span className="text-red-500 font-semibold">${msoExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fair Market Value Fee Modeler */}
        <Card className="border border-indigo-500/10">
          <CardHeader title="FMV Fee Estimator" icon={Scale} subtitle="Compare legal fee calculation structures for med-spas" />
          
          <div className="space-y-4 mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => setFeeModel('cost-plus')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  feeModel === 'cost-plus'
                    ? 'border-indigo-600 bg-indigo-500/5 text-indigo-600 font-bold'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Cost-Plus Model
              </button>
              <button
                onClick={() => setFeeModel('pct')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  feeModel === 'pct'
                    ? 'border-indigo-600 bg-indigo-500/5 text-indigo-600 font-bold'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Percentage Model
              </button>
            </div>

            {feeModel === 'cost-plus' ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                    <span>Target MSO Administrative Expenses</span>
                    <span className="text-indigo-600 font-bold">${msoExpenses.toLocaleString()}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="60000"
                    step="1000"
                    value={msoExpenses}
                    onChange={e => setMsoExpenses(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                    <span>MSO Profit Markup Percentage</span>
                    <span className="text-indigo-600 font-bold">{markupPct}% Markup</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={markupPct}
                    onChange={e => setMarkupPct(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                    <span>Clinical Gross collections (PC)</span>
                    <span className="text-indigo-600 font-bold">${pcRevenue.toLocaleString()}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="30000"
                    max="200000"
                    step="5000"
                    value={pcRevenue}
                    onChange={e => setPcRevenue(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                    <span>Management Fee Percentage</span>
                    <span className="text-indigo-600 font-bold">{pcCommissionPct}% of collections</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={pcCommissionPct}
                    onChange={e => setPcCommissionPct(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                  />
                </div>
              </div>
            )}

            {/* Compliance Safety indicator */}
            <div className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors duration-200 ${
              isFeeSafe 
                ? 'bg-green-50/50 border-green-500/20 text-green-700' 
                : 'bg-amber-50/50 border-amber-500/20 text-amber-700'
            }`}>
              {isFeeSafe ? (
                <>
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Compliant Management Fee Structure</p>
                    <p className="text-[11px] opacity-80 mt-0.5">This management fee model satisfies corporate compliance audits. Markups or percentages are within acceptable Fair Market Value (FMV) ranges.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Regulatory Scrub Risk</p>
                    <p className="text-[11px] opacity-80 mt-0.5">Management fees above 20% of gross clinical collections are heavily scrutinized as illegal fee-splitting under state CPOM boards. Consider returning to a cost-plus markup model.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* State CPOM Regulatory Matrix */}
        <Card className="border border-indigo-500/10">
          <CardHeader title="State CPOM Risk Index" icon={Activity} subtitle="Review local regulatory enforcement levels" />
          
          <div className="space-y-3 mt-4">
            {STATE_CPOM_RISK.map((s, i) => (
              <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-navy-950">{s.state}</span>
                    <Badge variant={s.risk === 'Strict / High' ? 'red' : s.risk === 'Moderate' ? 'amber' : 'green'} size="xs">
                      {s.risk} Risk
                    </Badge>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 leading-normal">{s.rules}</p>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-indigo-600 font-semibold hover:underline flex-shrink-0">
                  Board Link
                </a>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
