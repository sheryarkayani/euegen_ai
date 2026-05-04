import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, ChevronDown, ChevronRight, MessageCircle, Calculator, Rocket } from 'lucide-react'
import toast from 'react-hot-toast'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

const PHASES = [
  {
    phase: 1,
    title: 'Legal & Business Foundation',
    color: '#d4a853',
    items: [
      { id: 'llc', text: 'Form LLC or PC (consult healthcare attorney for your state)', gina: 'In most states, med spas must be owned by a licensed physician or operate under an MSO structure. Texas, for example, requires the medical director to own the clinical entity. Do NOT skip this step — the wrong entity structure can shut you down. Budget $1,500–$3,000 for proper legal setup. I recommend Dr. Reese Witherspoon Law Group (Austin) or Healthcare Law Council (national).\n\nNext step: Book a 30-min consultation with a healthcare attorney before you sign any leases.' },
      { id: 'ein', text: 'Obtain EIN from IRS (15 minutes at IRS.gov)', gina: 'This is free and takes 15 minutes at irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online. Do it today. You need it for your business bank account, payroll, and vendor accounts.\n\nNext step: Go to IRS.gov right now and apply. Keep your EIN in a secure password manager.' },
      { id: 'bank', text: 'Open dedicated business bank account', gina: 'Never mix personal and business funds. Open a dedicated business checking account at a local bank or credit union — better rates than big banks. You\'ll also want a separate credit card for supply purchases (points add up fast on injectables).\n\nNext step: Call your local bank this week and book a business account opening appointment.' },
      { id: 'malpractice', text: 'Secure malpractice insurance ($1M/$3M minimum)', gina: 'Do not open your doors without this. For a med spa with a nurse injector, you need minimum $1M per occurrence / $3M aggregate. Budget $8,000–$15,000/year. Recommended carriers: CM&F Group, Coverys, OMIC. Your medical director needs separate coverage as well.\n\nNext step: Get quotes from at least 3 carriers before choosing. The cheapest is not always the right choice.' },
      { id: 'meddir', text: 'Execute Medical Director agreement', gina: 'Your medical director agreement should define: oversight frequency (minimum monthly), compensation (typically $2,000–$5,000/month for a single location), liability responsibilities, and termination terms. Get this reviewed by a healthcare attorney — standard contracts from the internet are dangerous here.\n\nNext step: Do not begin operations without a signed, attorney-reviewed MDA.' },
    ],
  },
  {
    phase: 2,
    title: 'Facility & Equipment',
    color: '#e8748a',
    items: [
      { id: 'space', text: 'Sign commercial lease (negotiate 3–5 year term with renewal option)', gina: 'Negotiate hard on your lease. Ask for 2–3 months free rent for buildout. Target spaces between 1,200–2,500 sq ft for a single location. Rent should be <10% of projected revenue at stabilization. If your rent is $8K/month, you need to hit $80K+/month in revenue to be healthy.\n\nNext step: Have a commercial real estate attorney review ANY lease before you sign.' },
      { id: 'buildout', text: 'Complete buildout / tenant improvements', gina: 'Budget $100–$200 per square foot for a proper med spa buildout. Do not cut corners on the treatment rooms — patients notice. You need proper HVAC for laser equipment, a consult room separate from treatment rooms, and a reception area that matches your brand.\n\nNext step: Get 3 quotes from contractors with med spa buildout experience.' },
      { id: 'equipment', text: 'Purchase/finance core equipment (laser, body contouring)', gina: 'For a day-one med spa, I recommend starting with: Botox/filler tray setup, a quality RF microneedling device, and one body contouring platform. Resist the urge to buy everything — you can add equipment as revenue justifies it. InMode and Sciton offer financing; InMode is more flexible for startups.\n\nNext step: Do the ROI math before any equipment purchase: (treatments per month × price per treatment) ÷ monthly payment = payback period. Target <18 months.' },
      { id: 'emr', text: 'Set up EMR system (Boulevard recommended)', gina: 'Boulevard is my top recommendation for growth-oriented practices — excellent patient communication tools, strong reporting, and the best front desk workflow I\'ve seen. PatientNow is better if you need more clinical documentation. Budget $300–$600/month.\n\nNext step: Book demos with Boulevard and one other system before committing.' },
    ],
  },
  {
    phase: 3,
    title: 'Licensing & Compliance',
    color: '#3b82f6',
    items: [
      { id: 'state-lic', text: 'Obtain state business license and medical spa permit', gina: 'Requirements vary dramatically by state. Texas is relatively permissive; California and New York are heavily regulated. Your local health department may require an inspection before opening. This process takes 4–12 weeks in most states — start early.\n\nNext step: Go to your state medical board website today and download the med spa licensing checklist.' },
      { id: 'dea', text: 'Confirm DEA registration for controlled substances (if applicable)', gina: 'If your practice will use any controlled substances (certain topical anesthetics, weight loss medications), your medical director must have an active DEA registration. This is non-negotiable and cannot be delegated to a nurse.\n\nNext step: Confirm with your medical director that their DEA registration is current before you finalize your service menu.' },
      { id: 'osha', text: 'Complete OSHA compliance setup (BBP training, sharps disposal)', gina: 'Med spas are medical facilities and subject to OSHA\'s Bloodborne Pathogen Standard. You need a written exposure control plan, annual BBP training for all staff, a sharps disposal contract, and proper PPE protocols. Budget $200–$500 for a compliance package.\n\nNext step: Purchase an OSHA med spa compliance kit from MedSpa Compliance Solutions or a similar vendor.' },
      { id: 'hipaa', text: 'Implement HIPAA policies and Business Associate Agreements', gina: 'Every vendor who touches your patient data (EMR, email platform, payment processor) needs a signed BAA. Your practice needs a written HIPAA policy, a designated Privacy Officer (can be you), and documented employee training. Non-compliance fines start at $100 per violation.\n\nNext step: Have your attorney draft a HIPAA compliance package or purchase one from a reputable healthcare compliance vendor.' },
    ],
  },
  {
    phase: 4,
    title: 'Hiring & Training',
    color: '#10b981',
    items: [
      { id: 'hire-np', text: 'Hire first injector (NP or PA with aesthetics experience)', gina: 'Your first injector hire is the most important decision you\'ll make. You want 2+ years of aesthetics injecting experience (not just medical experience). Interview them with a patient consultation role-play — see how they close. Compensation: $85K–$110K base + 2–3% commission on revenue generated.\n\nNext step: Post on Indeed, Indeed Medical, and in aesthetics Facebook groups (Nurse Injectors Network is excellent).' },
      { id: 'hire-fd', text: 'Hire front desk coordinator (aesthetics experience a plus)', gina: 'Your front desk coordinator is your revenue driver. They book the appointments, handle objections, and close the rebook. Do not hire someone who just answers phones — hire someone who can sell an upgrade and book a follow-up before the patient walks out.\n\nNext step: In your job posting, require a role-play: "A patient calls asking for Botox pricing and says they\'ll call back. What do you say?" The answer will tell you everything.' },
      { id: 'training', text: 'Complete provider training on all services offered', gina: 'Every provider who injects must be certified on every product and device they use. Allergan, Galderma, and Revance all offer training programs. For devices, require factory training as part of your equipment purchase negotiation.\n\nNext step: Before your first patient, schedule a team "soft launch" day — treat each other for free to work out protocol kinks.' },
    ],
  },
  {
    phase: 5,
    title: 'Marketing & Launch',
    color: '#8b5cf6',
    items: [
      { id: 'brand', text: 'Finalize brand identity (logo, colors, tone of voice)', gina: 'Your brand is not your logo — it\'s the feeling a patient gets the moment they walk in. But yes, get a good logo ($500–$2,000 from a designer who knows the aesthetics space). Colors: avoid the standard pink-and-gold med spa look. Differentiate.\n\nNext step: Define 3 adjectives your brand should make patients feel. Build everything from there.' },
      { id: 'website', text: 'Launch website with online booking and before/after gallery', gina: 'You need a website before you open. Minimum requirements: online booking (connect your EMR), before/after photo gallery (with consent), service menu with pricing, provider bios, and a strong Google Maps listing.\n\nNext step: Do NOT spend $15K on a custom website at launch. Use a Wix or Squarespace med spa template for $20/month — upgrade when revenue supports it.' },
      { id: 'google', text: 'Set up Google Business Profile and run local ads', gina: 'Google Business Profile is free and generates a significant portion of organic discovery for local med spas. Complete every field, add photos weekly, and respond to every review within 24 hours. Then run Google Local Services Ads — they convert at 3–5x the rate of Facebook for med spas.\n\nNext step: Claim and completely fill out your Google Business Profile today. It takes 30 minutes and it\'s free.' },
      { id: 'promo', text: 'Plan grand opening event or VIP preview night', gina: 'Grand opening events generate your first cluster of reviews and create community buzz. Invite your personal network (friends, family, local business owners), offer complimentary consultations, and have a photographer on-site for content. Set a goal of 20 Google reviews from the event.\n\nNext step: Plan your preview event 2 weeks before you open to the public. Start a list of 50 people to personally invite.' },
    ],
  },
]

const STARTUP_COSTS = [
  { category: 'Legal & Licensing', low: 3000, high: 8000 },
  { category: 'Buildout / Tenant Improvements', low: 60000, high: 200000 },
  { category: 'Equipment (starter package)', low: 40000, high: 150000 },
  { category: 'EMR & Technology', low: 3000, high: 8000 },
  { category: 'Initial Inventory (injectables)', low: 10000, high: 25000 },
  { category: 'Furniture & Décor', low: 15000, high: 45000 },
  { category: 'Marketing & Branding', low: 5000, high: 20000 },
  { category: 'Working Capital (3 months)', low: 60000, high: 120000 },
  { category: 'Miscellaneous / Contingency (15%)', low: 29400, high: 86400 },
]

export default function LaunchCenter() {
  const [checked, setChecked] = useState({})
  const [expanded, setExpanded] = useState({ 0: true })
  const [ginaModal, setGinaModal] = useState(null)
  const [showCostCalc, setShowCostCalc] = useState(false)
  const [costMultiplier, setCostMultiplier] = useState(1)

  const toggleCheck = (id) => setChecked(c => ({ ...c, [id]: !c[id] }))
  const toggleExpand = (i) => setExpanded(e => ({ ...e, [i]: !e[i] }))

  const totalChecked = Object.values(checked).filter(Boolean).length
  const totalItems = PHASES.reduce((s, p) => s + p.items.length, 0)
  const progress = Math.round((totalChecked / totalItems) * 100)

  const totalLow = STARTUP_COSTS.reduce((s, c) => s + c.low, 0) * costMultiplier
  const totalHigh = STARTUP_COSTS.reduce((s, c) => s + c.high, 0) * costMultiplier

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="gold">{totalChecked}/{totalItems} complete</Badge>
            <Badge variant={progress >= 80 ? 'green' : progress >= 50 ? 'amber' : 'gray'}>{progress}% done</Badge>
          </div>
          <div className="h-2 w-64 progress-bar rounded-full">
            <div className="h-full progress-fill rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Button variant="ghost" size="sm" icon={<Calculator size={14} />} onClick={() => setShowCostCalc(!showCostCalc)}>
          Startup Cost Estimator
        </Button>
      </div>

      {/* Cost calculator */}
      {showCostCalc && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader title="Startup Cost Estimator" icon={Calculator} subtitle="Budget ranges for a single-location med spa" />
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-2 block">Location size modifier</label>
              <div className="flex gap-2">
                {[{ label: 'Boutique (1,200 sq ft)', val: 0.7 }, { label: 'Standard (1,800 sq ft)', val: 1 }, { label: 'Premium (2,500 sq ft)', val: 1.4 }].map(o => (
                  <button
                    key={o.label}
                    onClick={() => setCostMultiplier(o.val)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${costMultiplier === o.val ? 'btn-primary text-navy-950' : 'bg-white/5 text-gray-400'}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {STARTUP_COSTS.map(c => (
                <div key={c.category} className="flex items-center justify-between py-2 border-b border-white/4">
                  <span className="text-sm text-gray-400">{c.category}</span>
                  <span className="text-sm font-medium text-white">
                    ${Math.round(c.low * costMultiplier).toLocaleString()} – ${Math.round(c.high * costMultiplier).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between py-3 border-t border-gold-500/20 mt-2">
                <span className="font-semibold text-white">Total Estimate</span>
                <span className="font-display font-bold text-gold-500 text-lg">
                  ${Math.round(totalLow).toLocaleString()} – ${Math.round(totalHigh).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">* Ranges reflect market variation across US metro areas. Urban markets (NYC, LA, Miami) run 30–50% higher.</p>
          </Card>
        </motion.div>
      )}

      {/* Phases */}
      <div className="space-y-4">
        {PHASES.map((phase, pi) => {
          const phaseChecked = phase.items.filter(item => checked[item.id]).length
          return (
            <Card key={pi}>
              <button
                onClick={() => toggleExpand(pi)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>
                    {pi + 1}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white text-sm">Phase {phase.phase}: {phase.title}</p>
                    <p className="text-xs text-gray-500">{phaseChecked}/{phase.items.length} complete</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {phaseChecked === phase.items.length && <Badge variant="green" size="xs">Done</Badge>}
                  {expanded[pi] ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />}
                </div>
              </button>

              {expanded[pi] && (
                <div className="mt-4 space-y-2">
                  {phase.items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`checklist-item flex items-start justify-between gap-3 p-3 rounded-xl ${checked[item.id] ? 'checked' : ''}`}
                      style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => toggleCheck(item.id)}
                          className="mt-0.5 flex-shrink-0"
                        >
                          {checked[item.id]
                            ? <CheckCircle size={18} style={{ color: phase.color }} />
                            : <Circle size={18} className="text-gray-600" />
                          }
                        </button>
                        <p className={`text-sm leading-relaxed ${checked[item.id] ? 'line-through text-gray-600' : 'text-gray-300'}`}>
                          {item.text}
                        </p>
                      </div>
                      <button
                        onClick={() => setGinaModal(item)}
                        className="flex items-center gap-1.5 text-xs text-gold-600 hover:text-gold-400 transition-colors flex-shrink-0 mt-0.5"
                      >
                        <MessageCircle size={13} />
                        Ask Gina
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Gina Modal */}
      <Modal isOpen={!!ginaModal} onClose={() => setGinaModal(null)} title="Gina's Guidance" size="md">
        {ginaModal && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-gold-500/8 border border-gold-500/20">
              <p className="text-sm font-medium text-white">{ginaModal.text}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-navy-950 text-xs">G</span>
              </div>
              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {ginaModal.gina}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
