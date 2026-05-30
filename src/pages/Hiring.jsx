import { useState } from 'react'
import { Sparkles, Copy, Check, Users, DollarSign } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import KatrinaTyping from '../components/ui/KatrinaTyping'
import { simulateTyping } from '../lib/openrouter'

import { isAppDemoMode as DEMO_MODE } from '../lib/runtimeConfig'

const DEMO_JOB_DESC = `# Nurse Practitioner — Medical Aesthetics
## Lumina Aesthetics | Austin, TX | Full-Time

---

**Compensation:** $95,000–$120,000 base + 2% commission on self-generated revenue
**Schedule:** 4 days/week (flexible) | No weekends required
**Reports to:** Dr. Sarah Chen, Medical Director

---

### About Lumina Aesthetics
Lumina Aesthetics is a boutique medical aesthetics practice in the heart of Austin, Texas. We've been serving the Austin community for 3 years, growing to become one of the top-rated med spas in Central Austin (4.7 stars, 214+ reviews).

We're a team of four providers who genuinely enjoy working together. We have strong systems, a loyal patient base, and a culture that takes clinical outcomes and patient experience equally seriously. We're growing, and we need a great injector to grow with us.

---

### What You'll Do
- Perform Botox, Dysport, and dermal filler treatments (Juvederm, Restylane, Sculptra collections)
- Conduct thorough patient consultations using our structured consultation protocol
- Develop and recommend individualized treatment plans
- Collaborate on complex cases with our Medical Director
- Maintain accurate, detailed records in Boulevard (EMR)
- Participate in weekly team training and calibration sessions
- Build long-term patient relationships — we expect 70%+ rebooking on your panel

---

### Qualifications

**Required:**
- Active NP license in Texas (or eligible for endorsement)
- Minimum 18 months of injectable experience (must be able to demonstrate portfolio)
- Clean disciplinary record with Texas Board of Nursing
- Comfort with high-volume consult days (12–16 patients)

**Preferred:**
- Additional training in Sculptra, Kybella, or biostimulators
- Experience with any laser or energy-based device
- Completed advanced cadaver or hands-on masterclass training
- Existing patient following (not required but a plus)

---

### What We Offer
- Competitive base salary ($95K–$120K depending on experience)
- 2% commission on all revenue you generate above base productivity target
- Health insurance (70% employer contribution)
- $2,500 annual CE and conference allowance
- Complimentary treatments (family and friends at cost)
- Direct mentorship from Dr. Sarah Chen
- A team that actually respects your time

**We do not:** demand you sell, hustle, or upsell patients inappropriately. We believe in doing the right treatment for the right patient, every time.

---

### How to Apply
Send your resume, a brief note about your aesthetics background, and 3 before/after photos (with patient consent documented) to:
careers@luminaaesthetics.com

Subject line: "NP Application — [Your Name]"

We review applications weekly and respond to every submission within 5 business days.

---

*Lumina Aesthetics is an equal opportunity employer committed to building a diverse and inclusive team.*`

const COMP_DATA = [
  { role: 'NP (Nurse Practitioner)', base: '$85K–$130K', commission: '1.5–3%', bonus: 'Annual productivity bonus', note: 'Most in-demand role in market' },
  { role: 'PA (Physician Assistant)', base: '$90K–$135K', commission: '1.5–3%', bonus: 'Sign-on up to $10K', note: 'High demand, harder to find' },
  { role: 'RN Injector', base: '$65K–$95K', commission: '1–2%', bonus: 'Monthly productivity bonus', note: 'Require medical director supervision' },
  { role: 'Aesthetician (LE)', base: '$45K–$65K', commission: '5–8% retail', bonus: 'Quarterly incentive', note: 'Highly variable by volume' },
  { role: 'Front Desk Lead', base: '$42K–$55K', commission: 'None', bonus: 'Rebooking + upsell bonus', note: 'Should not be an afterthought hire' },
  { role: 'Practice Manager', base: '$65K–$90K', commission: 'None', bonus: 'P&L performance bonus', note: 'Critical for multi-provider practices' },
  { role: 'Medical Director (supervision only)', base: '$2K–$6K/mo', commission: 'None', bonus: 'Equity in some cases', note: 'Per-location fee for oversight' },
]

const ONBOARDING_DEMO = `# 90-Day Onboarding Plan — Nurse Practitioner
## Lumina Aesthetics | New Hire Track

---

## Day 1 — First Day Checklist

**Morning (9am–12pm): Office orientation**
- [ ] Meet the full team, tour the facility
- [ ] Review practice handbook + sign acknowledgement
- [ ] Systems access: Boulevard (EMR), Slack, shared Google Drive
- [ ] Complete all state and federal hiring paperwork (I-9, W-4, direct deposit)
- [ ] Photograph for team bio page and patient-facing materials

**Afternoon (1pm–5pm): Systems training**
- [ ] Boulevard: patient charting, treatment notes, before/after photos
- [ ] Photo documentation protocol (lighting, angles, consent)
- [ ] Scheduling system: how consultations vs. treatments are blocked
- [ ] Payment processing and treatment invoicing
- [ ] Shadow Dr. Chen for 3 patient appointments (observation only)

---

## Week 1 — Clinical Orientation

**Day 2–3: Product and protocol review**
- [ ] Review all injectable product protocols (Allergan, Galderma, Revance)
- [ ] Reconstitution protocols for Botox and Dysport
- [ ] Injection mapping review with Medical Director (anatomy refresher)
- [ ] Complication protocols: bruising, vascular occlusion, filler migration
- [ ] Aspiration policy and emergency kit location

**Day 4–5: Consultation training**
- [ ] Review our 6-step consultation script
- [ ] Shadow 5 full consultations (including the close)
- [ ] Role-play 1 consultation with Dr. Chen as patient
- [ ] Learn before/after documentation standards

---

## Month 1 Milestones
- Complete 25+ supervised injectable treatments
- Independently complete 10 full consultations (with chart review by Medical Director)
- Achieve 55%+ consultation conversion (monitored weekly)
- Complete Allergan/Galderma onboarding training modules
- 30-day check-in with Dr. Chen: feedback, goals, any concerns

---

## Month 2 Milestones
- Full independent injection panel (with available consultation escalation)
- Conversion target: 60%+ 
- Rebooking target: 65%+
- Complete any additional device training (RF microneedling, laser intro)
- Begin building your personal patient following

---

## Month 3 Milestones
- Full independent practice with monthly Medical Director review
- Conversion target: 65%+
- Rebooking target: 70%+
- 90-day performance review: compensation, goals, career path discussion
- Submit 30-day patient outcome review for quality assurance

---

## Key Performance Benchmarks (Post-Onboarding)
| Metric | Minimum | Target | Top Performer |
|--------|---------|--------|---------------|
| Consultation Conversion | 55% | 65% | 75%+ |
| Rebooking Rate | 60% | 70% | 80%+ |
| Revenue Generated/Month | $30K | $45K | $60K+ |
| Patient Satisfaction | 4.5+ | 4.7+ | 4.9+ |

---

*Onboarding plan generated by Katrina's AI — Fractional CFO & Scaling Advisory*`

function JobDescriptionGenerator() {
  const [form, setForm] = useState({ role: 'Nurse Practitioner', exp: '2+ years', schedule: 'Full-time', location: 'Austin, TX' })
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setLoading(true)
    setOutput('')
    simulateTyping(DEMO_JOB_DESC, c => setOutput(p => p + c), () => setLoading(false), 8)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Job Description Generator" subtitle="AI creates role-specific, compliance-aware job descriptions" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Role</label>
            <select className="form-input w-full px-3 py-2.5 rounded-xl text-sm" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
              {['Nurse Practitioner', 'Physician Assistant', 'RN Injector', 'Aesthetician', 'Front Desk Lead', 'Practice Manager', 'Medical Director'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Experience Required</label>
            <select className="form-input w-full px-3 py-2.5 rounded-xl text-sm" value={form.exp} onChange={e => setForm(f => ({ ...f, exp: e.target.value }))}>
              {['Entry-level', '1+ years', '2+ years', '3+ years', '5+ years'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Schedule</label>
            <select className="form-input w-full px-3 py-2.5 rounded-xl text-sm" value={form.schedule} onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))}>
              {['Full-time', 'Part-time', 'Contract / 1099', 'PRN'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Location</label>
            <input className="form-input w-full px-3 py-2.5 rounded-xl text-sm" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          </div>
        </div>
        <Button variant="primary" icon={<Sparkles size={14} />} loading={loading} onClick={generate}>
          Generate Job Description
        </Button>
      </Card>

      {output && (
        <Card>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display font-semibold text-navy-950">Job Description</h3>
            <Button variant="ghost" size="sm" icon={copied ? <Check size={13} /> : <Copy size={13} />}
              onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-body max-h-[500px] overflow-y-auto">{output}</pre>
        </Card>
      )}
      {loading && !output && <div className="flex justify-center py-8"><KatrinaTyping message="Writing your job description..." /></div>}
    </div>
  )
}

function CompBenchmarks() {
  return (
    <Card>
      <CardHeader title="Compensation Benchmarks" subtitle="US market data · Updated Q1 2026" icon={DollarSign} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-200">
              <th className="text-left py-3">Role</th>
              <th className="text-right py-3">Base Salary</th>
              <th className="text-right py-3">Commission</th>
              <th className="text-right py-3">Bonus</th>
              <th className="text-left py-3 pl-4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {COMP_DATA.map((row, i) => (
              <tr key={i}>
                <td className="py-3 font-semibold text-navy-950">{row.role}</td>
                <td className="py-3 text-right text-indigo-600 font-bold">{row.base}</td>
                <td className="py-3 text-right text-gray-500 font-medium">{row.commission}</td>
                <td className="py-3 text-right text-gray-400 text-xs font-medium">{row.bonus}</td>
                <td className="py-3 pl-4 text-gray-500 text-xs">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p className="text-xs text-gray-500"><span className="text-indigo-600 font-semibold">Katrina's CFO note:</span> These are US national ranges. Austin, TX, and other high-cost metros run 10–20% above base. Don't try to underpay injectors — the market has shifted. A good NP knows what they're worth.</p>
      </div>
    </Card>
  )
}

function OnboardingKitGenerator() {
  const [role, setRole] = useState('Nurse Practitioner')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = () => {
    setLoading(true)
    setOutput('')
    simulateTyping(ONBOARDING_DEMO, c => setOutput(p => p + c), () => setLoading(false), 8)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Onboarding Kit Generator" subtitle="Complete 90-day onboarding plan for any role" />
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Role to Onboard</label>
            <select className="form-input w-full px-3 py-2.5 rounded-xl text-sm" value={role} onChange={e => setRole(e.target.value)}>
              {['Nurse Practitioner', 'Physician Assistant', 'RN Injector', 'Aesthetician', 'Front Desk Lead', 'Practice Manager'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <Button variant="primary" icon={<Sparkles size={14} />} loading={loading} onClick={generate}>
            Generate Kit
          </Button>
        </div>
      </Card>
      {output && (
        <Card>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-body max-h-[500px] overflow-y-auto">{output}</pre>
        </Card>
      )}
      {loading && !output && <div className="flex justify-center py-8"><KatrinaTyping message="Building your onboarding kit..." /></div>}
    </div>
  )
}

export default function Hiring({ tab }) {
  const [activeTab, setActiveTab] = useState(tab || 'jd')
  const tabs = [
    { key: 'jd', label: 'Job Descriptions', icon: Users },
    { key: 'comp', label: 'Comp Benchmarks', icon: DollarSign },
    { key: 'onboarding', label: 'Onboarding Kits', icon: Sparkles },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100 overflow-x-auto" style={{ width: 'fit-content' }}>
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === t.key ? 'btn-primary text-white shadow-sm' : 'text-gray-500 hover:text-navy-950'}`}>
              <Icon size={14} />{t.label}
            </button>
          )
        })}
      </div>
      {activeTab === 'jd' && <JobDescriptionGenerator />}
      {activeTab === 'comp' && <CompBenchmarks />}
      {activeTab === 'onboarding' && <OnboardingKitGenerator />}
    </div>
  )
}
