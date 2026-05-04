import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Download, AlertTriangle, CheckCircle, Zap, Info } from 'lucide-react'
import toast from 'react-hot-toast'
import useHealthScoreStore from '../store/useHealthScoreStore'
import ScoreRing from '../components/ui/ScoreRing'
import BenchmarkBar from '../components/ui/BenchmarkBar'
import Button from '../components/ui/Button'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { dummyHealthScoreReport } from '../data/dummyHealthScore'
import { BENCHMARKS } from '../data/benchmarks'

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

const STEPS = [
  { label: 'Business Basics', fields: ['businessName', 'state', 'yearsInBusiness', 'numLocations', 'numProviders'] },
  { label: 'Financial Data', fields: ['monthlyRevenue', 'totalPayroll', 'monthlyRent', 'marketingSpend', 'supplyCost'] },
  { label: 'Operational Metrics', fields: ['conversionRate', 'rebookingRate', 'utilizationRate', 'avgTicket', 'hasMembership', 'hasFollowUp'] },
  { label: 'Growth & Staffing', fields: ['emrSystem', 'ownershipStructure', 'topChallenge'] },
]

function ProgressBar({ current, total }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current ? 'gold-gradient text-navy-950' :
              i === current ? 'border-2 border-gold-500 text-gold-500' :
              'bg-gray-100 text-gray-600'
            }`}>
              {i < current ? <CheckCircle size={14} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 w-8 md:w-16 lg:w-24" style={{
                background: i < current ? 'linear-gradient(90deg,#d4a853,#e8b55a)' : 'rgba(34,29,53,0.1)',
              }} />
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-400">Step {current + 1} of {total}: <span className="text-navy-950">{STEPS[current]?.label}</span></p>
    </div>
  )
}

function Step1({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Practice Name</label>
          <input
            className="form-input w-full px-4 py-3 rounded-xl text-sm"
            value={data.businessName || 'Lumina Aesthetics'}
            onChange={e => onChange('businessName', e.target.value)}
            placeholder="Lumina Aesthetics"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">State</label>
          <input
            className="form-input w-full px-4 py-3 rounded-xl text-sm"
            value={data.state || 'Texas'}
            onChange={e => onChange('state', e.target.value)}
            placeholder="Texas"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Years in Business</label>
          <input
            type="number"
            className="form-input w-full px-4 py-3 rounded-xl text-sm"
            value={data.yearsInBusiness || 3}
            onChange={e => onChange('yearsInBusiness', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Number of Locations</label>
          <input
            type="number"
            className="form-input w-full px-4 py-3 rounded-xl text-sm"
            value={data.numLocations || 1}
            onChange={e => onChange('numLocations', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Number of Providers</label>
          <input
            type="number"
            className="form-input w-full px-4 py-3 rounded-xl text-sm"
            value={data.numProviders || 4}
            onChange={e => onChange('numProviders', Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

function Step2({ data, onChange }) {
  const fields = [
    { key: 'monthlyRevenue', label: 'Monthly Revenue ($)', placeholder: '180000', hint: 'Total revenue before expenses' },
    { key: 'totalPayroll', label: 'Total Monthly Payroll ($)', placeholder: '82000', hint: 'All staff including medical director' },
    { key: 'monthlyRent', label: 'Monthly Rent ($)', placeholder: '16000', hint: 'All locations combined' },
    { key: 'marketingSpend', label: 'Monthly Marketing Spend ($)', placeholder: '8000', hint: 'All advertising and promotion' },
    { key: 'supplyCost', label: 'Monthly Supply Cost ($)', placeholder: '22000', hint: 'Injectables, consumables, products' },
  ]
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl flex gap-2 items-start" style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
        <Info size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-400">All data is confidential and used only to calculate your health score. We recommend using your last full month's actuals.</p>
      </div>
      {fields.map(f => (
        <div key={f.key}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-gray-400">{f.label}</label>
            <span className="text-xs text-gray-600">{f.hint}</span>
          </div>
          <input
            type="number"
            className="form-input w-full px-4 py-3 rounded-xl text-sm"
            value={data[f.key] || ''}
            onChange={e => onChange(f.key, Number(e.target.value))}
            placeholder={f.placeholder}
          />
        </div>
      ))}
    </div>
  )
}

function Step3({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'conversionRate', label: 'Consultation Conversion Rate (%)', placeholder: '52', hint: 'Consults that become paying patients' },
          { key: 'rebookingRate', label: 'Patient Rebooking Rate (%)', placeholder: '61', hint: 'Patients who book a follow-up visit' },
          { key: 'utilizationRate', label: 'Provider Utilization Rate (%)', placeholder: '68', hint: 'Booked hours vs available hours' },
          { key: 'avgTicket', label: 'Average Revenue Per Visit ($)', placeholder: '385', hint: 'Total revenue ÷ total visits' },
        ].map(f => (
          <div key={f.key}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-gray-400">{f.label}</label>
            </div>
            <input
              type="number"
              className="form-input w-full px-4 py-3 rounded-xl text-sm"
              value={data[f.key] || ''}
              onChange={e => onChange(f.key, Number(e.target.value))}
              placeholder={f.placeholder}
            />
            <p className="text-xs text-gray-600 mt-1">{f.hint}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { key: 'hasMembership', label: 'Do you have a membership program?' },
          { key: 'hasFollowUp', label: 'Do you have automated follow-up protocols?' },
        ].map(f => (
          <div key={f.key} className="p-4 rounded-xl" style={{ border: '1px solid rgba(34,29,53,0.1)' }}>
            <p className="text-sm text-gray-300 mb-3">{f.label}</p>
            <div className="flex gap-3">
              {['Yes', 'No'].map(opt => (
                <button
                  key={opt}
                  onClick={() => onChange(f.key, opt === 'Yes')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    (data[f.key] === true && opt === 'Yes') || (data[f.key] === false && opt === 'No')
                      ? 'btn-primary text-navy-950'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Step4({ data, onChange }) {
  const challenges = ['Payroll / Profitability', 'Staff Retention', 'Patient Acquisition', 'Consultation Conversion', 'Service Expansion', 'Opening a Second Location', 'PE / Exit Strategy']
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-gray-400 mb-1.5 block">EMR / Booking System</label>
        <select
          className="form-input w-full px-4 py-3 rounded-xl text-sm"
          value={data.emrSystem || 'Boulevard'}
          onChange={e => onChange('emrSystem', e.target.value)}
        >
          {['Boulevard', 'PatientNow', 'AestheticsPro', 'Jane App', 'Mindbody', 'Vagaro', 'Other'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1.5 block">Ownership Structure</label>
        <select
          className="form-input w-full px-4 py-3 rounded-xl text-sm"
          value={data.ownershipStructure || ''}
          onChange={e => onChange('ownershipStructure', e.target.value)}
        >
          <option value="">Select structure</option>
          {['Solo Ownership (Medical Director Model)', 'Partnership (2–3 owners)', 'Multi-Partner LLC', 'PC (Professional Corporation)', 'MSO Structure'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-2 block">Top Business Challenge Right Now</label>
        <div className="grid grid-cols-1 gap-2">
          {challenges.map(c => (
            <button
              key={c}
              onClick={() => onChange('topChallenge', c)}
              className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                data.topChallenge === c
                  ? 'border-gold-500/50 text-gold-500 bg-gold-500/8'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-100'
              }`}
              style={{ border: `1px solid ${data.topChallenge === c ? 'rgba(212,168,83,0.4)' : 'rgba(34,29,53,0.1)'}` }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScoreReport({ report }) {
  const exportPDF = () => {
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF()
      doc.setFontSize(20)
      doc.text("Gina's AI — Health Score Report", 20, 20)
      doc.setFontSize(14)
      doc.text(`${report.practice}`, 20, 35)
      doc.setFontSize(12)
      doc.text(`Overall Score: ${report.overallScore}/100 — ${report.label}`, 20, 50)
      doc.setFontSize(10)
      doc.text(`Generated: ${new Date(report.generatedAt).toLocaleDateString()}`, 20, 60)
      doc.text('Domain Scores:', 20, 75)
      const domains = Object.entries(report.scores).filter(([k]) => k !== 'overall')
      domains.forEach(([key, val], i) => {
        doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}/100`, 30, 85 + i * 8)
      })
      doc.save(`health-score-${Date.now()}.pdf`)
      toast.success('PDF downloaded!')
    })
  }

  const domainLabels = {
    financial: 'Financial Health',
    operational: 'Operational Health',
    sales: 'Sales Performance',
    staffing: 'Staffing Health',
    growth: 'Growth Trajectory',
  }

  const severityColor = { critical: '#ef4444', warning: '#f59e0b', watch: '#3b82f6' }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-navy-950">{report.practice}</h2>
          <p className="text-gray-400 text-sm mt-1">Health Score Report · {new Date(report.generatedAt).toLocaleDateString()}</p>
        </div>
        <Button variant="ghost" size="sm" icon={<Download size={14} />} onClick={exportPDF}>
          Export PDF
        </Button>
      </div>

      {/* Score rings */}
      <Card className="bg-gradient-to-br from-navy-800/60 to-navy-900/60">
        <div className="flex flex-wrap items-center justify-center gap-8 py-4">
          <ScoreRing score={report.overallScore} size={140} strokeWidth={12} label="Overall Score" sublabel />
          {Object.entries(report.scores)
            .filter(([k]) => k !== 'overall')
            .map(([key, val]) => (
              <ScoreRing key={key} score={val} size={90} strokeWidth={8} label={domainLabels[key]} sublabel />
            ))}
        </div>
      </Card>

      {/* Benchmarks */}
      <Card>
        <CardHeader title="Benchmark Comparison" icon={Zap} />
        <div className="space-y-5">
          <BenchmarkBar label="Payroll Ratio" userValue={45.5} bands={BENCHMARKS.payrollPct.bands} />
          <BenchmarkBar label="Consultation Conversion" userValue={52} bands={BENCHMARKS.conversionRate.bands} />
          <BenchmarkBar label="Rebooking Rate" userValue={61} bands={BENCHMARKS.rebookingRate.bands} />
          <BenchmarkBar label="Revenue Per Visit ($)" userValue={385} unit="" bands={BENCHMARKS.revenuePerVisit.bands} />
          <BenchmarkBar label="Rent Ratio" userValue={8.9} bands={BENCHMARKS.rentPct.bands} />
        </div>
      </Card>

      {/* Gina Says */}
      <Card>
        <CardHeader title="Gina Says" />
        <div className="space-y-4">
          {Object.entries(report.ginaSays).map(([domain, insight]) => (
            <div key={domain} className="p-4 rounded-xl" style={{ background: 'rgba(212,168,83,0.04)', border: '1px solid rgba(212,168,83,0.12)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center">
                  <span className="text-navy-950 font-bold text-xs">G</span>
                </div>
                <span className="text-xs font-medium text-gold-500 capitalize">{domainLabels[domain]}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed italic">"{insight}"</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Red Flags */}
      <Card>
        <CardHeader title="Red Flags & Action Required" icon={AlertTriangle} />
        <div className="space-y-4">
          {report.redFlags.map((flag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl"
              style={{
                background: `${severityColor[flag.severity]}08`,
                border: `1px solid ${severityColor[flag.severity]}25`,
              }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} style={{ color: severityColor[flag.severity], marginTop: 2 }} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-navy-950">{flag.flag}</p>
                    <Badge variant={flag.severity === 'critical' ? 'red' : flag.severity === 'warning' ? 'amber' : 'blue'} size="xs">
                      {flag.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-2">{flag.detail}</p>
                  <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(34,29,53,0.06)' }}>
                    <CheckCircle size={13} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-300">{flag.action}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* 90-Day Action Plan */}
      <Card>
        <CardHeader title="90-Day Action Plan" icon={CheckCircle} />
        <div className="space-y-4">
          {report.actionPlan.map((phase, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(34,29,53,0.05)', border: '1px solid rgba(34,29,53,0.08)' }}>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={phase.priority === 'critical' ? 'red' : phase.priority === 'high' ? 'amber' : 'gold'} size="sm">
                  Week {phase.week}
                </Badge>
                <h4 className="font-semibold text-navy-950 text-sm">{phase.title}</h4>
              </div>
              <ul className="space-y-2">
                {phase.actions.map((action, j) => (
                  <li key={j} className="flex gap-2 text-sm text-gray-400">
                    <span className="text-gold-500 mt-1 flex-shrink-0">·</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default function HealthScore({ showReport }) {
  const { currentStep, intakeData, scores, isCalculating, hasReport, nextStep, prevStep, updateIntake, calculateScores, resetDiagnostic } = useHealthScoreStore()
  const [showingReport, setShowingReport] = useState(showReport || false)

  const handleChange = (field, value) => {
    updateIntake({ [field]: value })
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      nextStep()
    } else {
      // Calculate
      if (DEMO_MODE) {
        setShowingReport(true)
      } else {
        calculateScores()
        setShowingReport(true)
      }
    }
  }

  const report = DEMO_MODE ? dummyHealthScoreReport : (
    scores ? { ...dummyHealthScoreReport, scores, overallScore: scores.overall } : null
  )

  if (showingReport && report) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" icon={<ChevronLeft size={14} />} onClick={() => { setShowingReport(false); resetDiagnostic() }}>
            Run New Diagnostic
          </Button>
        </div>
        <ScoreReport report={report} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!showingReport && (
        <>
          <ProgressBar current={currentStep} total={STEPS.length} />
          <Card className="mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && <Step1 data={intakeData} onChange={handleChange} />}
                {currentStep === 1 && <Step2 data={intakeData} onChange={handleChange} />}
                {currentStep === 2 && <Step3 data={intakeData} onChange={handleChange} />}
                {currentStep === 3 && <Step4 data={intakeData} onChange={handleChange} />}
              </motion.div>
            </AnimatePresence>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              icon={<ChevronLeft size={14} />}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              loading={isCalculating}
              icon={currentStep === STEPS.length - 1 ? <Zap size={14} /> : <ChevronRight size={14} />}
            >
              {currentStep === STEPS.length - 1 ? 'Calculate My Score' : 'Next'}
            </Button>
          </div>

          {/* Quick demo */}
          <p className="text-center text-xs text-gray-700 mt-6">
            Fields are pre-filled with Lumina Aesthetics demo data ·{' '}
            <button className="text-gold-600 hover:text-gold-500" onClick={() => setShowingReport(true)}>
              Skip to report →
            </button>
          </p>
        </>
      )}
    </div>
  )
}
