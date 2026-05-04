import { useState } from 'react'
import { CheckCircle, Circle, Calculator, PartyPopper } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const EVENT_TYPES = ['Grand Opening', 'VIP Patient Appreciation', 'New Service Launch', 'Holiday Party', 'Educational Workshop', 'Community Partner Event']

const CHECKLIST_ITEMS = [
  { category: 'Planning (6–8 weeks out)', items: [
    'Define event goal (# attendees, revenue target, PR value)',
    'Set date, time, and venue (in-practice or off-site)',
    'Set budget (see calculator below)',
    'Create guest list — personal invites perform 3x better than email blast',
    'Book any vendors (photographer, caterer, entertainment)',
    'Plan event flow and schedule (arrival, activities, demos, soft sell)',
  ]},
  { category: 'Marketing (4 weeks out)', items: [
    'Design invitation (digital + physical for VIP guests)',
    'Send personal text/call invites to top 50 patients',
    'Create event on Instagram with countdown',
    'Email campaign to full patient list (3 touchpoints)',
    'Prep before/after display for demonstrations',
    'Create event-exclusive offer (limited availability creates urgency)',
  ]},
  { category: 'Staffing & Training (2 weeks out)', items: [
    'Assign roles: greeter, demo provider, closer, photographer',
    'Brief all staff on event flow and talking points',
    'Prepare booking system for on-the-spot scheduling',
    'Set revenue goal per provider for the event',
    'Prep all demo supplies and treatment materials',
  ]},
  { category: 'Event Day', items: [
    'Arrive 90 minutes early to set up',
    'Check-in sheet at entrance (capture name + email of every guest)',
    'Brief team 30 min before guests arrive',
    'Document everything: photos, video, testimonials',
    'Have iPads / phones ready for booking on the spot',
    'Assign one person to manage walk-in booking queue',
  ]},
  { category: 'Post-Event (48 hours)', items: [
    'Send thank-you text/email within 24 hours to all attendees',
    'Follow up with anyone who didn\'t book but expressed interest',
    'Post event recap content on Instagram within 48 hours',
    'Request Google reviews from attendees who had positive interactions',
    'Calculate revenue generated: bookings made + deposits taken',
    'Debrief with team: what worked, what to change',
  ]},
]

const VENDOR_CONTACTS = [
  { name: 'Allergan/AbbVie Rep', type: 'Injectable', contact: 'Contact your local rep', note: 'May provide product for demos + promotional materials' },
  { name: 'Galderma Rep', type: 'Injectable', contact: 'Contact your local rep', note: 'ASPIRE event support and sampling' },
  { name: 'Local Florist', type: 'Décor', contact: 'Austin: Petal Floral Design', note: 'Budget $300–$600 for arrangements' },
  { name: 'Event Photographer', type: 'Photography', contact: 'Book 4+ weeks out', note: 'Content investment with lasting ROI' },
  { name: 'Catering/Charcuterie', type: 'Food', contact: 'Austin: Bountiful Board Co.', note: 'Budget $15–$25/person' },
]

export default function EventPlanner() {
  const [eventType, setEventType] = useState('VIP Patient Appreciation')
  const [checked, setChecked] = useState({})
  const [budget, setBudget] = useState({ venue: 0, catering: 600, decor: 400, photography: 500, printing: 200, giveaways: 300, other: 200 })

  const toggleItem = (key) => setChecked(c => ({ ...c, [key]: !c[key] }))
  const totalBudget = Object.values(budget).reduce((s, v) => s + v, 0)
  const totalItems = CHECKLIST_ITEMS.reduce((s, c) => s + c.items.length, 0)
  const doneItems = Object.values(checked).filter(Boolean).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header card */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-2xl">🎉</div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-white">Event Planner</h3>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex-1 max-w-xs">
                <select className="form-input w-full px-3 py-2 rounded-lg text-sm" value={eventType} onChange={e => setEventType(e.target.value)}>
                  {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Badge variant={doneItems === totalItems ? 'green' : 'amber'}>{doneItems}/{totalItems} tasks done</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklist */}
        <div className="lg:col-span-2 space-y-4">
          {CHECKLIST_ITEMS.map((section, si) => {
            const secDone = section.items.filter((_, ii) => checked[`${si}-${ii}`]).length
            return (
              <Card key={si}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white text-sm">{section.category}</h4>
                  <Badge variant={secDone === section.items.length ? 'green' : 'gray'} size="xs">{secDone}/{section.items.length}</Badge>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, ii) => {
                    const key = `${si}-${ii}`
                    return (
                      <div key={ii} className="flex items-start gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/3" onClick={() => toggleItem(key)}>
                        {checked[key] ? <CheckCircle size={15} className="text-green-400 mt-0.5 flex-shrink-0" /> : <Circle size={15} className="text-gray-600 mt-0.5 flex-shrink-0" />}
                        <p className={`text-sm ${checked[key] ? 'line-through text-gray-600' : 'text-gray-300'}`}>{item}</p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Budget Calculator */}
          <Card>
            <CardHeader title="Budget Calculator" icon={Calculator} />
            <div className="space-y-3">
              {Object.entries(budget).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-gray-400 capitalize">{key}</label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                    <input
                      type="number"
                      className="form-input w-full pl-6 pr-3 py-2 rounded-lg text-sm"
                      value={val}
                      onChange={e => setBudget(b => ({ ...b, [key]: Number(e.target.value) }))}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-white/8 flex justify-between items-center">
                <span className="text-sm font-medium text-white">Total Budget</span>
                <span className="text-gold-500 font-display font-bold">${totalBudget.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-600">Target: generate 3–5x budget in bookings from event</p>
            </div>
          </Card>

          {/* Vendor Contacts */}
          <Card>
            <CardHeader title="Vendor Contacts" />
            <div className="space-y-3">
              {VENDOR_CONTACTS.map((v, i) => (
                <div key={i} className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs font-medium text-white">{v.name}</p>
                  <Badge variant="gray" size="xs">{v.type}</Badge>
                  <p className="text-xs text-gray-500 mt-1">{v.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
