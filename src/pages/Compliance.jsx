import { useState } from 'react'
import { Scale, FileText, Shield, CheckCircle, Circle, AlertTriangle, ExternalLink } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const STATE_REQUIREMENTS = [
  { state: 'Texas', mdRequired: 'Yes (active licensure)', nurseInjector: 'Allowed with MD delegation', ownership: 'MD must have ownership stake', notes: 'Relatively permissive compared to other states', link: 'https://www.tmb.state.tx.us', color: '#10b981' },
  { state: 'California', mdRequired: 'Yes', nurseInjector: 'NP: independent; RN: supervision required', ownership: 'Physician-owned or MSO structure required', notes: 'Corporate Practice of Medicine strictly enforced', link: 'https://www.mbc.ca.gov', color: '#f59e0b' },
  { state: 'Florida', mdRequired: 'Yes', nurseInjector: 'NP: independent with 3yr exp; RN: supervision', ownership: 'MD can delegate to NP/PA', notes: 'Recent regulatory changes — verify current status', link: 'https://flhealthsource.gov', color: '#f59e0b' },
  { state: 'New York', mdRequired: 'Yes (active)', nurseInjector: 'NP: independent; RN: direct MD supervision', ownership: 'CPOM strictly enforced', notes: 'One of the most restrictive states', link: 'https://www.health.ny.gov', color: '#ef4444' },
  { state: 'Colorado', mdRequired: 'Yes', nurseInjector: 'NP: independent; RN: collaborative agreement', ownership: 'No CPOM restrictions', notes: 'Business-friendly med spa state', link: 'https://www.colorado.gov/dora', color: '#10b981' },
  { state: 'Georgia', mdRequired: 'Yes', nurseInjector: 'NP: requires MD supervision', ownership: 'MD ownership required', notes: 'Nurse injector rules more restrictive than TX', link: 'https://medicalboard.georgia.gov', color: '#f59e0b' },
]

const FORM_TEMPLATES = [
  {
    name: 'Botox / Neuromodulator Consent',
    category: 'Injectable Consent',
    sections: ['Patient information', 'Treatment description', 'Expected results + limitations', 'Risks and complications', 'Post-care instructions', 'Consent signature + date'],
    content: `BOTOX / NEUROMODULATOR INFORMED CONSENT

Practice: Lumina Aesthetics | Austin, TX
Provider: ___________________________
Patient Name: ___________________________
Date: ___________________________

DESCRIPTION OF TREATMENT:
Botulinum toxin type A (Botox, Dysport, or Xeomin) is a prescription medication injected into facial muscles to temporarily reduce the appearance of lines and wrinkles. The effects are temporary and typically last 3–4 months.

EXPECTED RESULTS:
Results vary by patient, anatomy, and injection technique. Full effect is visible at 7–14 days. Touch-ups may be required. Results are not guaranteed.

RISKS AND POTENTIAL COMPLICATIONS:
- Bruising, redness, swelling at injection sites (common, temporary)
- Headache (rare, temporary)
- Asymmetry or uneven results (treatable with touch-up)
- Eyelid or brow drooping (rare, temporary, typically resolves in 2–6 weeks)
- Spread of toxin effect beyond injection site (rare)
- Allergic reaction (rare but seek immediate care if symptoms develop)

POST-TREATMENT INSTRUCTIONS:
- No exercise for 24 hours post-injection
- No lying flat for 4 hours post-injection
- No rubbing or massaging treated areas for 24 hours
- Avoid facials, saunas, or significant heat for 48 hours
- Report any concerning symptoms immediately to the practice

By signing below, I acknowledge that I have read and understood this consent form, had the opportunity to ask questions, and voluntarily consent to this treatment.

Patient Signature: ___________________________ Date: ___________
Provider Signature: ___________________________ Date: ___________`,
  },
  {
    name: 'Dermal Filler Consent',
    category: 'Injectable Consent',
    sections: ['Treatment description', 'Product(s) to be used', 'Risks', 'Vascular occlusion protocol', 'Consent'],
    content: `DERMAL FILLER INFORMED CONSENT

[Standard form structure — See full template in your forms library]

Key addition vs Botox consent:
⚠️ VASCULAR OCCLUSION RISK: Dermal fillers carry a rare but serious risk of vascular occlusion (blockage of blood vessel). Your provider is trained in recognition and emergency protocol. If you experience vision changes, significant pain, or skin color change, call the practice immediately or go to the nearest emergency room.

Hyaluronidase (an enzyme that dissolves HA filler) is maintained on-site for emergency use.`,
  },
  {
    name: 'General Medical History Intake',
    category: 'Intake Form',
    sections: ['Personal info', 'Medical history', 'Medications', 'Allergies', 'Aesthetic goals', 'HIPAA acknowledgement'],
    content: `PATIENT INTAKE FORM

Lumina Aesthetics | Austin, TX

PERSONAL INFORMATION
Name: ___________________________
Date of Birth: ___________________________
Email: ___________________________
Phone: ___________________________
Emergency Contact: ___________________________

MEDICAL HISTORY
Please check all that apply:
□ Bleeding disorders or take blood thinners
□ Active cold sores / history of herpes simplex
□ Autoimmune conditions
□ History of keloid scarring
□ Pacemaker or metal implants
□ Pregnant or breastfeeding
□ History of fillers, Botox, or facial surgery
□ Allergy to lidocaine or topical anesthetics

CURRENT MEDICATIONS (list all including supplements):
___________________________

AESTHETIC GOALS FOR TODAY'S VISIT:
□ Reduce wrinkles/lines
□ Restore volume
□ Improve skin texture
□ Body contouring
□ Other: ___________________________

By signing below, I confirm this information is accurate and I have disclosed all relevant medical history.

Signature: ___________________________ Date: ___________`,
  },
  {
    name: 'Photo Consent',
    category: 'Privacy / Photography',
    sections: ['Scope of consent', 'Usage permissions', 'Patient rights'],
    content: `PHOTOGRAPHY / VIDEO CONSENT

I, _____________________________, consent to photographs and/or video being taken of me before, during, and after my treatment at Lumina Aesthetics.

I understand these images may be used for:
□ My personal medical record only
□ Educational purposes within the practice (de-identified)
□ Marketing and promotional materials (social media, website, advertising)

I retain the right to revoke this consent at any time for future use. Images already published cannot be retracted.

Patient Signature: ___________________________ Date: ___________`,
  },
]

const OSHA_CHECKLIST = [
  { category: 'Bloodborne Pathogen Program', items: [
    { text: 'Written Exposure Control Plan (updated annually)', done: true },
    { text: 'Annual BBP training for all employees (documented)', done: true },
    { text: 'Hepatitis B vaccination offered to all clinical staff', done: false },
    { text: 'Post-exposure evaluation procedure in place', done: true },
    { text: 'Sharps disposal containers in all treatment rooms', done: true },
    { text: 'Signed sharps disposal contract with licensed vendor', done: false },
  ]},
  { category: 'Personal Protective Equipment', items: [
    { text: 'Gloves available in all clinical areas', done: true },
    { text: 'Eye protection available for aerosol-generating procedures', done: true },
    { text: 'Masks/respirators for aerosol procedures (laser, etc.)', done: false },
    { text: 'Gowns/aprons for procedures with splash potential', done: true },
  ]},
  { category: 'Chemical Safety', items: [
    { text: 'Safety Data Sheets (SDS) for all chemicals on-site', done: false },
    { text: 'Chemical inventory updated annually', done: true },
    { text: 'Proper labeling on all chemical containers', done: true },
    { text: 'Employee training on hazardous chemicals', done: false },
  ]},
  { category: 'Emergency Preparedness', items: [
    { text: 'Anaphylaxis kit (epinephrine) on-site', done: true },
    { text: 'Hyaluronidase available for filler emergency', done: true },
    { text: 'Emergency protocols posted in treatment areas', done: true },
    { text: 'Fire extinguisher inspected within last 12 months', done: true },
    { text: 'AED on-site and staff trained', done: false },
  ]},
]

export default function Compliance({ tab }) {
  const [activeTab, setActiveTab] = useState(tab || 'licensing')
  const [expandedForm, setExpandedForm] = useState(null)
  const [checkedItems, setCheckedItems] = useState({})

  const tabs = [
    { key: 'licensing', label: 'State Licensing' },
    { key: 'forms', label: 'Form Templates' },
    { key: 'osha', label: 'OSHA Checklist' },
  ]

  const toggleItem = (key) => setCheckedItems(c => ({ ...c, [key]: !c[key] }))

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="p-3 rounded-xl flex gap-2 items-start" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-400">
          <strong className="text-amber-400">Educational purposes only.</strong> Always verify requirements with your state medical board and consult a licensed healthcare attorney before making compliance decisions. Laws change frequently.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', width: 'fit-content' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? 'btn-primary text-navy-950' : 'text-gray-400 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'licensing' && (
        <div className="space-y-4">
          <Card>
            <CardHeader title="State-by-State Med Spa Requirements" icon={Scale} subtitle="Key regulatory requirements by state" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/6">
                    <th className="text-left py-3">State</th>
                    <th className="text-left py-3">MD Required?</th>
                    <th className="text-left py-3">Nurse Injectors</th>
                    <th className="text-left py-3">Ownership</th>
                    <th className="text-left py-3">Board</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4">
                  {STATE_REQUIREMENTS.map((s, i) => (
                    <tr key={i}>
                      <td className="py-3">
                        <span className="font-medium text-white">{s.state}</span>
                        <span className="block text-xs text-gray-600 mt-0.5">{s.notes}</span>
                      </td>
                      <td className="py-3 text-gray-300">{s.mdRequired}</td>
                      <td className="py-3 text-gray-300">{s.nurseInjector}</td>
                      <td className="py-3 text-gray-300 text-xs">{s.ownership}</td>
                      <td className="py-3">
                        <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                          Board <ExternalLink size={10} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'forms' && (
        <div className="space-y-4">
          {FORM_TEMPLATES.map((form, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpandedForm(expandedForm === i ? null : i)}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center">
                    <FileText size={14} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{form.name}</p>
                    <Badge variant="gold" size="xs">{form.category}</Badge>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {form.sections.map(s => <span key={s} className="text-xs text-gray-600">· {s}</span>)}
                    </div>
                  </div>
                </div>
                <Badge variant={expandedForm === i ? 'gold' : 'gray'} size="xs">{expandedForm === i ? 'Collapse' : 'View'}</Badge>
              </div>
              {expandedForm === i && (
                <div className="mt-4 border-t border-white/5 pt-4">
                  <pre className="whitespace-pre-wrap text-xs text-gray-400 leading-relaxed font-body p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {form.content}
                  </pre>
                  <p className="text-xs text-gray-600 mt-2">* Customize with your practice details, state-specific language, and have reviewed by a healthcare attorney before use.</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'osha' && (
        <div className="space-y-4">
          {OSHA_CHECKLIST.map((section, si) => {
            const sectionDone = section.items.filter(item => checkedItems[`${si}-${section.items.indexOf(item)}`] || item.done).length
            return (
              <Card key={si}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gold-500" />
                    <h3 className="font-semibold text-white text-sm">{section.category}</h3>
                  </div>
                  <Badge variant={sectionDone === section.items.length ? 'green' : 'amber'} size="xs">
                    {sectionDone}/{section.items.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, ii) => {
                    const key = `${si}-${ii}`
                    const isDone = checkedItems[key] !== undefined ? checkedItems[key] : item.done
                    return (
                      <div key={ii} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/3 cursor-pointer" onClick={() => toggleItem(key)}>
                        {isDone ? <CheckCircle size={16} className="text-green-400 flex-shrink-0" /> : <Circle size={16} className="text-gray-600 flex-shrink-0" />}
                        <p className={`text-sm ${isDone ? 'line-through text-gray-600' : 'text-gray-300'}`}>{item.text}</p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
