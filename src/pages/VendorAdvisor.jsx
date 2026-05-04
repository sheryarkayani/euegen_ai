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
    ginaNote: 'InMode is my go-to recommendation for practices that want to grow their RF microneedling revenue. Morpheus8 is the brand patients ask for by name. The financing is real and the rep support is generally good. Watch for: lock-in on consumables.',
    color: '#d4a853',
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
    ginaNote: 'Galderma is essential. The Restylane collection gives you the most flexibility in the filler space. Sculptra is an underutilized opportunity — practices that build a Sculptra following see excellent rebooking. ASPIRE rewards are real money back.',
    color: '#e8748a',
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
    ginaNote: 'You need an Allergan account. Patients ask for Botox by name, even when they mean any neuromodulator. Juvederm is the Restylane competitor — carry both and let the patient\'s anatomy guide your choice.',
    color: '#3b82f6',
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
    ginaNote: 'Sciton is the premium choice for serious laser programs. The Halo + BBL combination is arguably the most revenue-generating duo in aesthetics laser. The catch: it costs $150K+. Only consider if you can commit to 15+ laser treatments per month.',
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
    ginaNote: 'GentleMax Pro for hair removal is a proven workhorse — if you do high volume hair removal, the ROI is solid. However, for the prestige RF microneedling and fractional laser market, InMode and Sciton have captured more mindshare.',
    color: '#8b5cf6',
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
  const annualROI = monthlyProfit > 0 ? (((monthlyProfit * 12) - vals.deviceCost) / vals.deviceCost * 100).toFixed(0) : 0

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
            <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
            <div className="relative">
              {f.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{f.prefix}</span>}
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
          <div key={item.label} className="p-3 rounded-xl text-center" style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
            <p className="text-lg font-display font-bold" style={{ color: item.color }}>{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
      {typeof paybackMonths === 'number' && (
        <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
          <p className="text-xs text-gray-400">
            <span className="text-gold-500 font-medium">Gina's take: </span>
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
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', width: 'fit-content' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? 'btn-primary text-navy-950' : 'text-gray-400 hover:text-white'}`}>
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
                      <h3 className="font-semibold text-white">{vendor.name}</h3>
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
                  <p>{vendor.priceRange}</p>
                  <p className="text-gray-600">ROI: {vendor.roiTimeframe}</p>
                </div>
              </div>

              {expanded === i && (
                <div className="mt-4 space-y-4 border-t border-white/5 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-400 font-medium mb-2 flex items-center gap-1"><CheckCircle size={12} /> Pros</p>
                      <ul className="space-y-1">
                        {vendor.pros.map(p => <li key={p} className="text-xs text-gray-400 flex gap-2"><span className="text-green-500">+</span>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-red-400 font-medium mb-2 flex items-center gap-1"><TrendingUp size={12} /> Watch for</p>
                      <ul className="space-y-1">
                        {vendor.cons.map(c => <li key={c} className="text-xs text-gray-400 flex gap-2"><span className="text-red-500">—</span>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-navy-950 font-bold text-xs">G</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{vendor.ginaNote}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>Avg revenue/tx: <span className="text-gold-500 font-medium">{vendor.avgRevenuePerTx}</span></span>
                    <span>·</span>
                    <span>Typical ROI: <span className="text-white">{vendor.roiTimeframe}</span></span>
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
