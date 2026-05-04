import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, DollarSign, Activity, Target, Users,
  MessageCircle, ArrowRight, AlertTriangle, CheckCircle, Clock, Zap
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import useAuthStore from '../store/useAuthStore'
import { dummyPractice } from '../data/dummyPractice'
import { monthlyRevenue } from '../data/dummyKPIs'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const KPI_CARDS = [
  {
    label: 'Monthly Revenue',
    value: '$180,000',
    change: '+4.7%',
    positive: true,
    icon: DollarSign,
    color: '#d4a853',
    spark: monthlyRevenue.map(d => ({ v: d.revenue })),
  },
  {
    label: 'Health Score',
    value: '63/100',
    change: 'Needs Attention',
    positive: false,
    icon: Activity,
    color: '#f59e0b',
    spark: [{ v: 58 }, { v: 60 }, { v: 61 }, { v: 62 }, { v: 63 }, { v: 63 }],
  },
  {
    label: 'Conversion Rate',
    value: '52%',
    change: '-3% vs last month',
    positive: false,
    icon: Target,
    color: '#e8748a',
    spark: [{ v: 55 }, { v: 57 }, { v: 54 }, { v: 56 }, { v: 53 }, { v: 52 }],
  },
  {
    label: 'Rebooking Rate',
    value: '61%',
    change: '+2% vs last month',
    positive: true,
    icon: Users,
    color: '#3b82f6',
    spark: [{ v: 57 }, { v: 58 }, { v: 59 }, { v: 59 }, { v: 60 }, { v: 61 }],
  },
]

const QUICK_ACTIONS = [
  { label: 'Ask Gina a Question', path: '/ask', icon: MessageCircle, color: '#d4a853', desc: 'Get instant expert guidance' },
  { label: 'Run Health Diagnostic', path: '/health-score', icon: Activity, color: '#e8748a', desc: 'Assess your practice in 5 min' },
  { label: 'Generate Sales Script', path: '/sales/script', icon: Target, color: '#3b82f6', desc: 'Custom consultation script' },
  { label: 'View Financial KPIs', path: '/financial', icon: DollarSign, color: '#10b981', desc: 'Your performance metrics' },
]

const ACTIVITY_FEED = [
  { type: 'alert', icon: AlertTriangle, color: '#ef4444', text: 'Payroll ratio at 45.5% — 7.5 points above benchmark', time: 'Now', badge: 'Critical' },
  { type: 'insight', icon: Zap, color: '#d4a853', text: 'April revenue hit $180K — new practice high', time: '2h ago', badge: 'New Record' },
  { type: 'check', icon: CheckCircle, color: '#10b981', text: 'Membership program reached 147 active members', time: '1d ago', badge: 'Milestone' },
  { type: 'alert', icon: AlertTriangle, color: '#f59e0b', text: 'Conversion rate dropped to 52% — below 55% target', time: '2d ago', badge: 'Warning' },
  { type: 'check', icon: CheckCircle, color: '#3b82f6', text: 'Rebooking rate improved 2 points to 61%', time: '3d ago', badge: 'Improving' },
  { type: 'clock', icon: Clock, color: '#9b94a8', text: 'Health Score diagnostic last run 7 days ago', time: '7d ago', badge: 'Reminder' },
]

const RED_FLAGS = [
  { text: 'Payroll 45.5% — $13.5K/mo excess above benchmark', severity: 'critical' },
  { text: 'Conversion at 52% — losing $73K/yr vs 70% benchmark', severity: 'warning' },
  { text: 'Rebooking 61% — $23.8K/mo in unrealized revisits', severity: 'warning' },
]

function SparkLine({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        <Tooltip
          contentStyle={{ display: 'none' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const practice = useAuthStore(s => s.practice) || dummyPractice
  const user = useAuthStore(s => s.user)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            {greeting}, {user?.fullName?.split(' ')[0] || 'Dr. Sarah'} 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {practice.fullName} · Last updated just now
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="amber">Health Score: 63</Badge>
          <Button
            variant="primary"
            size="sm"
            icon={<Activity size={14} />}
            onClick={() => navigate('/health-score')}
          >
            Run Diagnostic
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="kpi-card rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}18` }}>
                  <Icon size={16} style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {kpi.change}
                </div>
              </div>
              <div className="mb-1">
                <p className="font-display text-xl font-bold text-white">{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
              </div>
              <SparkLine data={kpi.spark} color={kpi.color} />
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-white">Quick Actions</h3>
              <Zap size={16} className="text-gold-500" />
            </div>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((action, i) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5 text-left group"
                    style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.color}15` }}>
                        <Icon size={15} style={{ color: action.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-200">{action.label}</p>
                        <p className="text-xs text-gray-600">{action.desc}</p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-gray-600 group-hover:text-gold-500 transition-colors" />
                  </motion.button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-white">Practice Pulse</h3>
              <Badge variant="amber" size="xs">Live</Badge>
            </div>
            <div className="space-y-3">
              {ACTIVITY_FEED.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                      <Icon size={13} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 leading-relaxed">{item.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-600">{item.time}</span>
                        <Badge variant={item.type === 'alert' ? 'red' : item.type === 'check' ? 'green' : 'gray'} size="xs">
                          {item.badge}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Red Flags + Practice Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white">Active Red Flags</h3>
            <AlertTriangle size={16} className="text-red-400" />
          </div>
          <div className="space-y-3">
            {RED_FLAGS.map((flag, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{
                background: flag.severity === 'critical' ? 'rgba(239,68,68,0.06)' : 'rgba(245,158,11,0.06)',
                border: `1px solid ${flag.severity === 'critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`,
              }}>
                <AlertTriangle size={14} className={flag.severity === 'critical' ? 'text-red-400 mt-0.5' : 'text-amber-400 mt-0.5'} />
                <p className="text-sm text-gray-300">{flag.text}</p>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-4 w-full justify-center" onClick={() => navigate('/health-score')}>
            View Full Diagnostic
          </Button>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white">Practice Snapshot</h3>
            <Badge variant="gold" size="xs">Growth Tier</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Revenue/Month', value: '$180,000', note: 'New high' },
              { label: 'Payroll Ratio', value: '45.5%', note: '⚠ Red flag', warn: true },
              { label: 'Rent Ratio', value: '8.9%', note: '✓ Healthy' },
              { label: 'Marketing Spend', value: '$8,000', note: '4.4% of revenue' },
              { label: 'Active Members', value: '147', note: 'Membership program' },
              { label: 'Google Rating', value: '4.7 ★', note: '214 reviews' },
              { label: 'Avg Rev/Visit', value: '$385', note: 'Good range' },
              { label: 'Providers', value: '4', note: '1 NP, 1 PA, 2 RN' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-lg font-semibold" style={{ color: item.warn ? '#f59e0b' : '#f0ece4' }}>
                  {item.value}
                </p>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className={`text-xs mt-0.5 ${item.warn ? 'text-amber-500' : 'text-green-500'}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
