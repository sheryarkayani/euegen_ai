import { useState } from 'react'
import { Calculator, Star, TrendingUp, CheckCircle } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const VENDORS = [
  {
    name: 'InMode',
    category: 'RF / Body Contouring',
    rating: 4.6,
    priceRange: '$$$–$$$$',
    devices: ['Morpheus8', 'BodyTite', 'FaceTite', 'Evolve', 'Optimas Platform'],
    pros: ['Market leader in RF microneedling', 'Strong clinical data', 'Flexible financing programs', 'Active rep support', 'Good training program'],
    cons: ['Higher price point', 'Proprietary tips (ongoing cost)', 'Sales pressure can be aggressive'],
    roiTimeframe: '12–18 months',
    avgRevenuePerTx: '$800–$2,500',
    katrinaNote: 'InMode\'s Morpheus8 is a clear market-share leader with robust consumer demand. However, ensure your direct consumable tips cost ($80–$120 per treatment) is modeled accurately in your pricing structure to protect direct labor margins.',
    color: '#6366f1',
  },
  {
    name: 'Galderma',
    category: 'Injectables',
    rating: 4.8,
    priceRange: '$$$',
    devices: ['Restylane Collection', 'Sculptra', 'Dysport', 'Azzalure'],
    pros: ['Best filler portfolio depth', 'Restylane brand recognition', 'ASPIRE loyalty rewards', 'Strong training programs', 'Flexible ordering'],
    cons: ['Account minimums required for best pricing', 'Rep availability varies by region', 'Certain SKUs have supply issues'],
    roiTimeframe: 'Immediate',
    avgRevenuePerTx: '$750–$1,800',
    katrinaNote: 'Excellent portfolio depth. Restylane and Sculptra offer outstanding gross margin retention (up to 78%). Focus on leveraging ASPIRE tier rebates aggressively to offset direct supply opex.',
    color: '#8b5cf6',
  },
  {
    name: 'Allergan / AbbVie',
    category: 'Injectables',
    rating: 4.7,
    priceRange: '$$$',
    devices: ['Botox', 'Juvederm Collection', 'Natrelle (breast)', 'SkinMedica'],
    pros: ['Botox is still the gold standard brand', 'Brilliant Distinctions patient loyalty', 'Juvederm ultra brand recognition', 'Strong medical education'],
    cons: ['Higher price on Botox vs Dysport', 'Less flexible account terms for new practices', 'Rep quality varies widely'],
    roiTimeframe: 'Immediate',
    avgRevenuePerTx: '$750–$1,600',
    katrinaNote: 'Allergan accounts are non-negotiable for brand presence. Treat Botox as a customer acquisition leader, but cross-sell premium dermal filler packages to maximize your per-visit EBITDA.',
    color: '#ec4899',
  },
  {
    name: 'Sciton',
    category: 'Laser Platforms',
    rating: 4.5,
    priceRange: '$$$$',
    devices: ['BBL Hero', 'MOXI', 'Halo (hybrid fractional)', 'Joule platform'],
    pros: ['Premium clinical outcomes', 'Multiple modalities on one platform', 'No per-pulse cost (flat ownership)', 'Best-in-class BBL results'],
    cons: ['Highest upfront cost', 'Larger footprint', 'Less flexible financing vs InMode', 'Training investment required'],
    roiTimeframe: '18–24 months',
    avgRevenuePerTx: '$600–$2,000',
    katrinaNote: 'Halo and BBL are absolute workhorses with massive revenue capacity. However, at a $150K+ capex threshold, you need at least 15 treatments per month to meet target debt-service coverage ratio (DSCR) safety limits.',
    color: '#10b981',
  },
  {
    name: 'Syneron-Candela',
    category: 'Laser / Body',
    rating: 4.2,
    priceRange: '$$$',
    devices: ['GentleMax Pro', 'Profound', 'VelaShape', 'Fraxel'],
    pros: ['GentleMax Pro is hair removal workhorse', 'Good ROI on hair removal volume', 'Reasonable pricing vs Sciton', 'Established brand'],
    cons: ['Less buzz than InMode or Sciton in aesthetics', 'Rep support inconsistent', 'Some devices showing age'],
    roiTimeframe: '12–18 months',
    avgRevenuePerTx: '$300–$1,200',
    katrinaNote: 'GentleMax Pro for hair removal is a proven workhorse — if you do high volume hair removal, the ROI is solid. However, for the prestige RF microneedling and fractional laser market, InMode and Sciton have captured more mindshare.',
    color: '#f59e0b',
  },
]

function ROICalculator() {
  const [vals, setVals] = useState({
    deviceCost: 85000,
    monthlyPayment: 2100,
    treatmentsPerMonth: 15,
    pricePerTx: 1200,
    supplyPerTx: 80,
  })

  const monthlyRevenue = vals.treatmentsPerMonth * vals.pricePerTx
  const monthlyCost = vals.monthlyPayment + (vals.treatmentsPerMonth * vals.supplyPerTx)
  const monthlyProfit = monthlyRevenue - monthlyCost
  const paybackMonths = monthlyProfit > 0 ? Math.ceil(vals.deviceCost / monthlyProfit) : '∞'

  return (
    <Card>
      <CardHeader title="Equipment ROI Calculator" icon={Calculator} subtitle="Calculate payback period before any purchase" />
      <div className="grid grid-cols-2 gap-4 mb-5">
        {[
          { key: 'deviceCost', label: 'Device Purchase Price ($)', prefix: '$' },
          { key: 'monthlyPayment', label: 'Monthly Finance Payment ($)', prefix: '$' },
          { key: 'treatmentsPerMonth', label: 'Treatments per Month (target)', prefix: '' },
          { key: 'pricePerTx', label: 'Price Per Treatment ($)', prefix: '$' },
          { key: 'supplyPerTx', label: 'Supply Cost Per Treatment ($)', prefix: '$' },
        ].map(f => (
          <div key={f.key}>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">{f.label}</label>
            <div className="relative">
              {f.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{f.prefix}</span>}
              <input
                type="number"
                className={`form-input w-full py-2.5 rounded-xl text-sm ${f.prefix ? 'pl-7 pr-3' : 'px-3'}`}
                value={vals[f.key]}
                onChange={e => setVals(v => ({ ...v, [f.key]: Number(e.target.value) }))}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Monthly Revenue', value: `$${monthlyRevenue.toLocaleString()}`, color: '#10b981' },
          { label: 'Monthly Profit', value: `$${monthlyProfit.toLocaleString()}`, color: monthlyProfit > 0 ? '#10b981' : '#ef4444' },
          { label: 'Payback Period', value: `${paybackMonths} months`, color: typeof paybackMonths === 'number' && paybackMonths <= 18 ? '#10b981' : '#f59e0b' },
        ].map(item => (
          <div key={item.label} className="p-3 rounded-xl text-center shadow-sm bg-white" style={{ border: `1px solid ${item.color}25` }}>
            <p className="text-lg font-display font-bold" style={{ color: item.color }}>{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
      {typeof paybackMonths === 'number' && (
        <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <p className="text-xs text-gray-700 font-body">
            <span className="text-indigo-600 font-semibold">Katrina's CFO take: </span>
            {paybackMonths <= 12 ? '✓ Excellent ROI — go for it if the market demand exists.' :
             paybackMonths <= 18 ? '✓ Good ROI — standard for aesthetics equipment. Proceed with confidence.' :
             paybackMonths <= 24 ? '⚠ Above-average payback — make sure you have the patient volume before committing.' :
             '🚨 High risk — do not purchase without validated demand and a realistic patient acquisition plan.'}
          </p>
        </div>
      )}
    </Card>
  )
}

export default function VendorAdvisor({ tab }) {
  const tabs = [
    { key: 'roi', label: 'Equipment ROI' },
    { key: 'compare', label: 'Vendor Compare' },
  ]
  const [activeTab, setActiveTab] = useState(tab || 'roi')
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100" style={{ width: 'fit-content' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? 'btn-primary text-white shadow-sm' : 'text-gray-500 hover:text-navy-950'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'roi' && <ROICalculator />}

      {activeTab === 'compare' && (
        <div className="space-y-4">
          {VENDORS.map((vendor, i) => (
            <Card key={vendor.name} hover={false} className="transition-all">
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ background: `${vendor.color}15`, color: vendor.color, border: `1px solid ${vendor.color}30` }}>
                    {vendor.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-navy-950">{vendor.name}</h3>
                      <Badge variant="gray" size="xs">{vendor.category}</Badge>
                      <Badge variant={vendor.rating >= 4.5 ? 'green' : 'amber'} size="xs">★ {vendor.rating}</Badge>
                    </div>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {vendor.devices.slice(0, 3).map(d => (
                        <span key={d} className="text-xs text-gray-500">{d}</span>
                      ))}
                      {vendor.devices.length > 3 && <span className="text-xs text-gray-600">+{vendor.devices.length - 3} more</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p className="font-semibold text-navy-950">{vendor.priceRange}</p>
                  <p className="text-gray-600 mt-0.5">ROI: {vendor.roiTimeframe}</p>
                </div>
              </div>

              {expanded === i && (
                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-400 font-semibold mb-2 flex items-center gap-1"><CheckCircle size={12} /> Pros</p>
                      <ul className="space-y-1">
                        {vendor.pros.map(p => <li key={p} className="text-xs text-gray-500 flex gap-2"><span className="text-green-500 font-bold">+</span>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-red-400 font-semibold mb-2 flex items-center gap-1"><TrendingUp size={12} /> Watch for</p>
                      <ul className="space-y-1">
                        {vendor.cons.map(c => <li key={c} className="text-xs text-gray-500 flex gap-2"><span className="text-red-500 font-bold">—</span>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full primary-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">K</span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-body font-medium">{vendor.katrinaNote}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>Avg revenue/tx: <span className="text-indigo-600 font-semibold">{vendor.avgRevenuePerTx}</span></span>
                    <span>·</span>
                    <span>Typical ROI: <span className="text-navy-950 font-medium">{vendor.roiTimeframe}</span></span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
