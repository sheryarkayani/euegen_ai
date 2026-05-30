import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Key, Star, Zap, Crown, Building } from 'lucide-react'
import toast from 'react-hot-toast'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import useAuthStore from '../store/useAuthStore'
import { dummyPractice } from '../data/dummyPractice'

const TIERS = [
  {
    key: 'free',
    label: 'Free',
    price: '$0',
    icon: Star,
    color: '#9b94a8',
    features: ['Ask Katrina (5 questions/month)', 'Health Score Intake', 'Dashboard', 'Settings'],
  },
  {
    key: 'starter',
    label: 'Starter',
    price: '$97/mo',
    icon: Star,
    color: '#6366f1',
    features: ['Ask Katrina (25 questions/month)', 'Health Score Reports', 'Launch Center', 'Vendor Advisor'],
  },
  {
    key: 'growth',
    label: 'Growth',
    price: '$297/mo',
    icon: Zap,
    color: '#8b5cf6',
    features: ['Unlimited Ask Katrina', 'All Starter features', 'Financial KPI Dashboard', 'Sales Training', 'Hiring Suite', 'Marketing Studio', 'Compliance Center', 'Event Planner', 'Employee Lifecycle'],
    popular: true,
  },
  {
    key: 'scale',
    label: 'Scale',
    price: '$597/mo',
    icon: Crown,
    color: '#ef4444',
    features: ['All Growth features', 'Mystery Shopper AI', 'PE Intelligence', 'Priority Support', 'Monthly 1:1 with Katrina'],
  },
]

export default function Settings() {
  const user = useAuthStore(s => s.user)
  const practice = useAuthStore(s => s.practice) || dummyPractice
  const [practiceForm, setPracticeForm] = useState({
    name: practice.name,
    city: practice.city,
    state: practice.state,
    yearsInBusiness: practice.yearsInBusiness,
    numProviders: practice.numProviders,
    emrSystem: practice.emrSystem,
    ownershipStructure: practice.ownershipStructure,
  })
  const [apiKeys, setApiKeys] = useState({
    openrouter: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  })
  const [activeSection, setActiveSection] = useState('practice')

  const savePractice = () => {
    toast.success('Practice profile updated!')
  }

  const sections = [
    { key: 'practice', label: 'Practice Profile', icon: Building },
    { key: 'subscription', label: 'Subscription', icon: Zap },
    { key: 'api', label: 'API Keys', icon: Key },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100" style={{ width: 'fit-content' }}>
        {sections.map(s => {
          const Icon = s.icon
          return (
            <button key={s.key} onClick={() => setActiveSection(s.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === s.key ? 'btn-primary text-white shadow-sm' : 'text-gray-500 hover:text-navy-950'}`}>
              <Icon size={14} />{s.label}
            </button>
          )
        })}
      </div>

      {activeSection === 'practice' && (
        <Card>
          <CardHeader title="Practice Profile" icon={Building} subtitle="Your practice information used across all modules" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {[
              { key: 'name', label: 'Practice Name' },
              { key: 'city', label: 'City' },
              { key: 'state', label: 'State' },
              { key: 'yearsInBusiness', label: 'Years in Business', type: 'number' },
              { key: 'numProviders', label: 'Number of Providers', type: 'number' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
                <input
                  type={f.type || 'text'}
                  className="form-input w-full px-4 py-2.5 rounded-xl text-sm"
                  value={practiceForm[f.key]}
                  onChange={e => setPracticeForm(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">EMR System</label>
              <select className="form-input w-full px-4 py-2.5 rounded-xl text-sm" value={practiceForm.emrSystem}
                onChange={e => setPracticeForm(p => ({ ...p, emrSystem: e.target.value }))}>
                {['Boulevard', 'PatientNow', 'AestheticsPro', 'Jane App', 'Mindbody', 'Vagaro', 'Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Ownership Structure</label>
              <select className="form-input w-full px-4 py-2.5 rounded-xl text-sm" value={practiceForm.ownershipStructure}
                onChange={e => setPracticeForm(p => ({ ...p, ownershipStructure: e.target.value }))}>
                {['Solo Ownership (Medical Director Model)', 'Partnership (2–3 owners)', 'Multi-Partner LLC', 'PC (Professional Corporation)', 'MSO Structure'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-1.5">Account Email</p>
              <p className="text-sm text-gray-700">{user?.email}</p>
            </div>
            <Button variant="primary" icon={<Save size={14} />} onClick={savePractice}>
              Save Changes
            </Button>
          </div>
        </Card>
      )}

      {activeSection === 'subscription' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TIERS.map(tier => {
              const Icon = tier.icon
              const isCurrent = user?.tier === tier.key
              return (
                <motion.div
                  key={tier.key}
                  whileHover={{ y: -2 }}
                  className="glass-card rounded-xl p-5 relative overflow-hidden"
                  style={{ border: `1px solid ${isCurrent ? tier.color + '50' : 'rgba(34,29,53,0.1)'}` }}
                >
                  {tier.popular && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="rose" size="xs">Most Popular</Badge>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="green" size="xs">Current Plan</Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tier.color}15` }}>
                      <Icon size={18} style={{ color: tier.color }} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-navy-950">{tier.label}</p>
                      <p className="text-sm font-semibold" style={{ color: tier.color }}>{tier.price}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {tier.features.map(f => (
                      <li key={f} className="flex gap-2 text-xs text-gray-400">
                        <span style={{ color: tier.color }}>·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && (
                    <Button
                      variant={tier.popular ? 'primary' : 'ghost'}
                      size="sm"
                      className="w-full justify-center"
                    >
                      {TIERS.indexOf(tier) > TIERS.findIndex(t => t.key === user?.tier) ? 'Upgrade' : 'Downgrade'}
                    </Button>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {activeSection === 'api' && (
        <Card>
          <CardHeader title="API Configuration" icon={Key} subtitle="Connect your API keys for live AI features" />
          <div className="space-y-4">
            {[
              { key: 'openrouter', label: 'OpenRouter API Key', placeholder: 'sk-or-...', hint: 'Get your key at openrouter.ai — required for live AI responses' },
              { key: 'supabaseUrl', label: 'Supabase Project URL', placeholder: 'https://[project].supabase.co', hint: 'Your Supabase project URL' },
              { key: 'supabaseKey', label: 'Supabase Anon Key', placeholder: 'eyJ...', hint: 'Your project anon/public key' },
            ].map(f => (
              <div key={f.key}>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs text-gray-400">{f.label}</label>
                  <span className="text-xs text-gray-600">{f.hint}</span>
                </div>
                <input
                  type="password"
                  className="form-input w-full px-4 py-2.5 rounded-xl text-sm font-mono"
                  value={apiKeys[f.key]}
                  onChange={e => setApiKeys(k => ({ ...k, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
            <div className="p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p className="text-xs text-gray-500 font-body">
                <span className="text-indigo-600 font-semibold">Note: </span>
                API keys are stored in your .env.local file. Never commit .env.local to version control. In production, use environment variables through your hosting platform.
              </p>
            </div>
            <Button variant="primary" icon={<Save size={14} />} onClick={() => toast.success('API keys saved to .env.local!')}>
              Save API Keys
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
