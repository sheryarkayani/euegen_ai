import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppLayout from './components/layout/AppLayout'
import useAuthStore from './store/useAuthStore'

// Pages
import Dashboard from './pages/Dashboard'
import AskEugene from './pages/AskEugene'
import HealthScore from './pages/HealthScore'
import FinancialKPI from './pages/FinancialKPI'
import LaunchCenter from './pages/LaunchCenter'
import SalesTraining from './pages/SalesTraining'
import Hiring from './pages/Hiring'
import MarketingStudio from './pages/MarketingStudio'
import VendorAdvisor from './pages/VendorAdvisor'
import Compliance from './pages/Compliance'
import PEIntelligence from './pages/PEIntelligence'
import CapitalBudgeting from './pages/CapitalBudgeting'
import CompensationDesigner from './pages/CompensationDesigner'
import Settings from './pages/Settings'
import Auth from './pages/Auth'

function AuthGuard({ children }) {
  const session = useAuthStore(s => s.session)
  if (!session) return <Navigate to="/auth" replace />
  return children
}

const PAGE_TITLES = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back to your intelligence platform' },
  '/ask': { title: 'Ask Eugene', subtitle: 'Your AI Fractional CFO & operational advisor, available 24/7' },
  '/health-score': { title: 'Health Score', subtitle: 'Diagnostic report for your practice' },
  '/financial': { title: 'Financial & KPIs', subtitle: 'Real-time performance metrics' },
  '/launch': { title: 'Launch Center', subtitle: 'Your step-by-step launch roadmap' },
  '/sales': { title: 'Sales Training', subtitle: 'Convert more consultations' },
  '/sales/script': { title: 'Script Generator', subtitle: 'AI-powered consultation scripts' },
  '/sales/consult': { title: 'Art of a Consult', subtitle: 'Master the consultation process' },
  '/sales/mystery-shop': { title: 'Mystery Shopper', subtitle: 'Practice with AI patient scenarios' },
  '/sales/email-templates': { title: 'Email Templates', subtitle: 'Ready-to-send patient communications' },
  '/hiring': { title: 'Hiring Suite', subtitle: 'Build your dream team' },
  '/marketing': { title: 'Marketing Studio', subtitle: 'Grow your patient base' },
  '/vendors': { title: 'Vendor Advisor', subtitle: 'Equipment ROI and vendor intelligence' },
  '/compliance': { title: 'Compliance', subtitle: 'Stay compliant, stay protected' },
  '/pe-intel': { title: 'PE Intelligence', subtitle: 'Private equity readiness assessment' },
  '/capital-budgeting': { title: 'Capital Budgeting', subtitle: 'SBA financing, expansion capex, and leasehold modelers' },
  '/compensation-designer': { title: 'Compensation Designer', subtitle: 'Tiered commission, provider gross margins, and labor cost audits' },
  '/settings': { title: 'Settings', subtitle: 'Manage your account and practice' },
}

function AppRoutes() {
  const location = useLocation()
  const pageInfo = PAGE_TITLES[location.pathname] || { title: 'Eugene\'s AI', subtitle: '' }

  return (
    <Routes location={location}>
      <Route path="/auth" element={<Auth />} />
      <Route
        element={
          <AuthGuard>
            <AppLayout title={pageInfo.title} subtitle={pageInfo.subtitle} />
          </AuthGuard>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/ask" element={<AskEugene />} />
        <Route path="/health-score" element={<HealthScore />} />
        <Route path="/health-score/report" element={<HealthScore showReport />} />
        <Route path="/financial" element={<FinancialKPI />} />
        <Route path="/financial/pl" element={<FinancialKPI tab="pl" />} />
        <Route path="/financial/calculator" element={<FinancialKPI tab="calculator" />} />
        <Route path="/launch" element={<LaunchCenter />} />
        <Route path="/sales" element={<SalesTraining />} />
        <Route path="/sales/script" element={<SalesTraining tab="script" />} />
        <Route path="/sales/consult" element={<SalesTraining tab="consult" />} />
        <Route path="/sales/mystery-shop" element={<SalesTraining tab="mystery" />} />
        <Route path="/sales/email-templates" element={<SalesTraining tab="email" />} />
        <Route path="/hiring" element={<Hiring />} />
        <Route path="/hiring/comp" element={<Hiring tab="comp" />} />
        <Route path="/hiring/onboarding" element={<Hiring tab="onboarding" />} />
        <Route path="/marketing" element={<MarketingStudio />} />
        <Route path="/marketing/brand" element={<MarketingStudio tab="brand" />} />
        <Route path="/marketing/social" element={<MarketingStudio tab="social" />} />
        <Route path="/marketing/email" element={<MarketingStudio tab="email" />} />
        <Route path="/vendors" element={<VendorAdvisor />} />
        <Route path="/vendors/compare" element={<VendorAdvisor tab="compare" />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/compliance/forms" element={<Compliance tab="forms" />} />
        <Route path="/compliance/osha" element={<Compliance tab="osha" />} />
        <Route path="/pe-intel" element={<PEIntelligence />} />
        <Route path="/pe-intel/ebitda" element={<PEIntelligence tab="ebitda" />} />
        <Route path="/capital-budgeting" element={<CapitalBudgeting />} />
        <Route path="/compensation-designer" element={<CompensationDesigner />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <AppRoutes />
    </AnimatePresence>
  )
}
