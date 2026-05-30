import { useState } from 'react'
import { TrendingUp, Calculator, CheckCircle, Circle, AlertTriangle, Info } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ScoreRing from '../components/ui/ScoreRing'
import { BookKatrinaInline } from '../components/shared/BookKatrinaCard'

const PE_READINESS_CRITERIA = [
  { category: 'Financial Performance', weight: 35, items: [
    { text: 'EBITDA margin >20% (Lumina: ~15.6%)', met: false, impact: 'Critical — most PE groups require minimum 15%, prefer 20%+' },
    { text: 'Revenue >$2M annually (Lumina: $2.16M ✓)', met: true, impact: 'Meets minimum threshold for PE interest' },
    { text: 'Consistent YoY growth (Lumina: ~15% growth)', met: true, impact: 'Strong growth trajectory is highly valued' },
    { text: 'Clean books with 2+ years audited financials', met: false, impact: 'Required for due diligence — start now' },
    { text: 'Revenue diversification (multiple service lines)', met: true, impact: 'Membership + multiple treatments reduces concentration risk' },
  ]},
  { category: 'Operational', weight: 25, items: [
    { text: 'Documented standard operating procedures', met: false, impact: 'Critical — operations must not depend solely on owner' },
    { text: 'EMR system with clean data (Lumina: Boulevard)', met: true, impact: '✓ Good systems tell a clean story' },
    { text: 'Non-compete agreements with key staff', met: false, impact: 'PE groups need assurance key providers will stay' },
    { text: 'Proven middle management (practice manager)', met: false, impact: 'Owner must be replaceable for PE model to work' },
  ]},
  { category: 'Market Position', weight: 20, items: [
    { text: '4.5+ Google rating (Lumina: 4.7 ✓)', met: true, impact: '✓ Strong online reputation' },
    { text: 'Dominant position in local market', met: true, impact: 'Austin market penetration is strong' },
    { text: 'Membership/recurring revenue (Lumina: 147 members)', met: true, impact: 'Recurring revenue increases valuation multiple' },
  ]},
  { category: 'Scalability', weight: 20, items: [
    { text: 'Replicable model (could you open location 2 with current systems?)', met: false, impact: 'PE acquires for platform, not single location' },
    { text: 'Brand identity and value proposition defined', met: true, impact: '✓ Clear brand story' },
    { text: 'Technology infrastructure for multi-location ops', met: false, impact: 'Need centralized reporting, scheduling, billing' },
  ]},
]

function EBITDAMultipleCalc() {
  const [vals, setVals] = useState({ ebitda: 336000, multiple: 6, adjustments: 0 })
  const baseVal = vals.ebitda * vals.multiple
  const adjustedVal = baseVal + vals.adjustments

  return (
    <Card>
      <CardHeader title="EBITDA Multiple Calculator" icon={Calculator} subtitle="Estimate your practice valuation" />
      <div className="space-y-4 mb-5">
        {[
          { key: 'ebitda', label: 'Adjusted EBITDA (Annual)', prefix: '$', hint: 'Current: ~$336K at 15.6% margin on $2.16M revenue' },
          { key: 'multiple', label: 'EBITDA Multiple', prefix: '', hint: 'Med spa range: 4–8x. Above $2M revenue: typically 5–7x' },
          { key: 'adjustments', label: 'Normalized Adjustments ($)', prefix: '$', hint: 'Add-backs: owner salary excess, one-time expenses, etc.' },
        ].map(f => (
          <div key={f.key}>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-gray-400">{f.label}</label>
              <span className="text-xs text-gray-600">{f.hint}</span>
            </div>
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

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.2)' }}>
          <p className="text-xs text-gray-500 mb-1">Base Valuation</p>
          <p className="text-2xl font-display font-bold text-gold-500">${baseVal.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-1">{vals.multiple}x EBITDA</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <p className="text-xs text-gray-500 mb-1">Adjusted Valuation</p>
          <p className="text-2xl font-display font-bold text-green-400">${adjustedVal.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-1">With add-backs</p>
        </div>
      </div>

      <div className="p-3 rounded-xl" style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.12)' }}>
        <p className="text-xs text-gray-400">
          <span className="text-gold-500 font-medium">Current reality check: </span>
          At 15.6% EBITDA margin, Lumina's normalized EBITDA is approximately $336K. At a 6x multiple (appropriate for $2M+ single location), that's a ~$2M valuation. 
          If you improve margins to 25%, EBITDA becomes $540K and valuation jumps to $3.24M at the same multiple. 
          <span className="text-navy-950 font-medium"> This is why I always say: fix margins first, then sell.</span>
        </p>
      </div>

      <BookKatrinaInline />
    </Card>
  )
}

export default function PEIntelligence({ tab }) {
  const [activeTab, setActiveTab] = useState(tab || 'readiness')

  const totalItems = PE_READINESS_CRITERIA.reduce((s, c) => s + c.items.length, 0)
  const metItems = PE_READINESS_CRITERIA.reduce((s, c) => s + c.items.filter(i => i.met).length, 0)
  const peScore = Math.round((metItems / totalItems) * 100)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="p-3 rounded-xl flex gap-2 items-start" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <Info size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-400">PE transactions involve complex legal and financial considerations. This tool is for educational orientation only. Always engage a healthcare M&A attorney and investment banker before entering any PE discussions.</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(34,29,53,0.06)', width: 'fit-content' }}>
        {[{ key: 'readiness', label: 'PE Readiness' }, { key: 'ebitda', label: 'EBITDA Builder' }].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? 'btn-primary text-navy-950' : 'text-gray-400 hover:text-navy-950'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'readiness' && (
        <div className="space-y-6">
          {/* Score */}
          <Card className="text-center py-6">
            <ScoreRing score={peScore} size={120} strokeWidth={10} label="PE Readiness Score" sublabel />
            <p className="text-sm text-gray-400 mt-4 max-w-sm mx-auto">
              {peScore < 50
                ? "Lumina has strong fundamentals but isn't PE-ready yet. Focus on margins and operational documentation for the next 12–18 months."
                : peScore < 70
                ? "Getting closer. The financial profile is solid — the documentation and operational scalability need work."
                : "PE-ready. You have the foundation for an attractive transaction. Time to engage advisors."}
            </p>
          </Card>

          {/* Criteria */}
          {PE_READINESS_CRITERIA.map((section, si) => (
            <Card key={si}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-navy-950">{section.category}</h3>
                <Badge variant="gold" size="xs">{section.weight}% weight</Badge>
              </div>
              <div className="space-y-3">
                {section.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-3">
                    {item.met ? <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" /> : <Circle size={16} className="text-gray-600 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className={`text-sm ${item.met ? 'text-gray-300' : 'text-gray-500'}`}>{item.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: item.met ? '#10b981' : '#f59e0b' }}>{item.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          <BookKatrinaInline />
        </div>
      )}

      {activeTab === 'ebitda' && <EBITDAMultipleCalc />}
    </div>
  )
}
