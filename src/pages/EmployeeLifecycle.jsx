import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCheck, Star, TrendingUp, Clock, Award } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { dummyPractice } from '../data/dummyPractice'

const ONBOARDING_STAGES = ['Offer Accepted', 'Day 1 Complete', 'Week 1 Training', 'Month 1 Review', 'Fully Independent']

const EMPLOYEE_DETAILS = {
  'SC': {
    performance: { conversion: 68, rebooking: 74, revenue: 72000, satisfaction: 4.9 },
    milestones: [4, 5],
    tenure: 36,
    notes: 'Medical Director. Excellent clinical outcomes. Needs delegation training for management tasks.',
    skills: ['Neuromodulators', 'Dermal Fillers', 'Sculptra', 'RF Devices', 'Laser Consults'],
  },
  'MR': {
    performance: { conversion: 58, rebooking: 63, revenue: 54000, satisfaction: 4.6 },
    milestones: [4, 5],
    tenure: 18,
    notes: 'Strong clinical skills. Conversion rate below team average — needs sales script training.',
    skills: ['Neuromodulators', 'Dermal Fillers', 'Body Contouring'],
  },
  'AK': {
    performance: { conversion: 55, rebooking: 61, revenue: 32000, satisfaction: 4.7 },
    milestones: [3, 5],
    tenure: 12,
    notes: 'On track. Month 12 review due next week. Recommend advanced filler training.',
    skills: ['Neuromodulators', 'Basic Fillers'],
  },
  'JW': {
    performance: { conversion: 48, rebooking: 55, revenue: 22000, satisfaction: 4.4 },
    milestones: [2, 5],
    tenure: 4,
    notes: 'New hire — 4 months in. Still in development phase. Conversion is below target — schedule coaching session.',
    skills: ['Neuromodulators'],
  },
}

const RETENTION_TIPS = [
  { icon: '💰', title: 'Transparent Compensation Structure', tip: 'Providers stay longer when they understand exactly how their commission works and can track it themselves. Consider monthly productivity reports sent directly to each provider.' },
  { icon: '📚', title: 'Invest in Education', tip: 'Budget $2,500/year per provider for CE, conferences, and advanced training. Providers who grow technically stay. Budget this before they ask.' },
  { icon: '🏆', title: 'Public Recognition', tip: 'Monthly "Provider Spotlight" in team meetings, social media patient shout-outs for specific providers, and quarterly performance recognition go a long way with clinicians.' },
  { icon: '🗓️', title: 'Flexible Scheduling', tip: 'Aesthetics burnout is real. Providers working 5 days/week in a clinical setting will leave in 18 months. Structure 4-day workweeks into your staffing model from day one.' },
  { icon: '📈', title: 'Career Path Clarity', tip: 'Have an honest conversation at every 90-day review: "Here\'s what senior provider status looks like. Here\'s what lead provider looks like. Here\'s how to get there." Ambiguity causes attrition.' },
  { icon: '🤝', title: 'Culture Investment', tip: 'Team meals (quarterly), group CE events, and a morning huddle that\'s actually about the team — not just schedule management — builds retention that no salary can buy.' },
]

export default function EmployeeLifecycle() {
  const [activeEmployee, setActiveEmployee] = useState(null)
  const practice = dummyPractice

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Employee Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {practice.providers.map((provider) => {
          const details = EMPLOYEE_DETAILS[provider.initials]
          const stage = details?.milestones?.[0] || 4
          const isActive = activeEmployee?.initials === provider.initials

          return (
            <motion.div
              key={provider.initials}
              whileHover={{ y: -2 }}
              onClick={() => setActiveEmployee(isActive ? null : { ...provider, ...details })}
              className="glass-card rounded-xl p-4 cursor-pointer transition-all"
              style={{ border: `1px solid ${isActive ? `${provider.color}50` : 'rgba(255,255,255,0.07)'}` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: provider.color + '30', border: `2px solid ${provider.color}` }}>
                  {provider.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white truncate">{provider.name.split(' ')[1] || provider.name.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500 truncate">{provider.role.split('/')[0]}</p>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Conversion</span>
                  <span style={{ color: (details?.performance.conversion || 0) >= 65 ? '#10b981' : '#f59e0b' }}>{details?.performance.conversion || 0}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Rebooking</span>
                  <span style={{ color: (details?.performance.rebooking || 0) >= 70 ? '#10b981' : '#f59e0b' }}>{details?.performance.rebooking || 0}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Monthly Rev</span>
                  <span className="text-gold-500">${((details?.performance.revenue || 0) / 1000).toFixed(0)}K</span>
                </div>
              </div>

              {/* Onboarding progress */}
              <div className="space-y-1">
                <p className="text-xs text-gray-600">{ONBOARDING_STAGES[stage - 1]}</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex-1 h-1 rounded-full" style={{ backgroundColor: i <= stage ? provider.color : 'rgba(255,255,255,0.08)' }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Employee Detail */}
      {activeEmployee && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ borderColor: `${activeEmployee.color}30` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: activeEmployee.color + '25', border: `2px solid ${activeEmployee.color}` }}>
                  {activeEmployee.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{activeEmployee.name}</h3>
                  <p className="text-sm text-gray-400">{activeEmployee.role} · {activeEmployee.tenure} months tenure</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star size={14} className="text-gold-500" />
                <span className="text-white font-medium">{activeEmployee.performance.satisfaction}</span>
                <span className="text-xs text-gray-500">patient rating</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Conversion Rate', value: `${activeEmployee.performance.conversion}%`, target: '65%', met: activeEmployee.performance.conversion >= 65 },
                { label: 'Rebooking Rate', value: `${activeEmployee.performance.rebooking}%`, target: '70%', met: activeEmployee.performance.rebooking >= 70 },
                { label: 'Monthly Revenue', value: `$${(activeEmployee.performance.revenue / 1000).toFixed(0)}K`, target: '$45K', met: activeEmployee.performance.revenue >= 45000 },
              ].map(m => (
                <div key={m.label} className="p-3 rounded-xl text-center" style={{ background: m.met ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)' }}>
                  <p className="text-lg font-display font-bold" style={{ color: m.met ? '#10b981' : '#f59e0b' }}>{m.value}</p>
                  <p className="text-xs text-gray-500">{m.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: m.met ? '#10b981' : '#f59e0b' }}>Target: {m.target}</p>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {activeEmployee.skills.map(s => <Badge key={s} variant="gold" size="xs">{s}</Badge>)}
              </div>
            </div>

            <div className="p-3 rounded-xl" style={{ background: 'rgba(212,168,83,0.05)', border: '1px solid rgba(212,168,83,0.12)' }}>
              <p className="text-xs text-gray-400"><span className="text-gold-500 font-medium">Manager notes: </span>{activeEmployee.notes}</p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Retention Tips */}
      <Card>
        <CardHeader title="Retention Playbook" icon={Award} subtitle="Gina's top strategies for keeping great providers" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RETENTION_TIPS.map((tip, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{tip.icon}</span>
                <p className="font-medium text-white text-sm">{tip.title}</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
