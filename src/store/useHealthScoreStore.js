import { create } from 'zustand'

function calculateHealthScore(intake) {
  const payrollPct = (intake.totalPayroll / intake.monthlyRevenue) * 100
  const rentPct = (intake.monthlyRent / intake.monthlyRevenue) * 100
  const marketingPct = (intake.marketingSpend / intake.monthlyRevenue) * 100
  const supplyPct = (intake.supplyCost / intake.monthlyRevenue) * 100
  const ebitdaEstimate = 100 - payrollPct - rentPct - marketingPct - supplyPct

  const financial = Math.max(0, Math.min(100,
    (payrollPct < 38 ? 30 : payrollPct < 42 ? 20 : 5) +
    (rentPct < 10 ? 20 : rentPct < 15 ? 12 : 5) +
    (ebitdaEstimate > 25 ? 30 : ebitdaEstimate > 15 ? 20 : 10) +
    20
  ))

  const operational = Math.max(0, Math.min(100,
    (intake.conversionRate > 70 ? 30 : intake.conversionRate > 50 ? 20 : 8) +
    (intake.rebookingRate > 75 ? 25 : intake.rebookingRate > 60 ? 15 : 5) +
    (intake.utilizationRate > 75 ? 25 : intake.utilizationRate > 60 ? 15 : 5) +
    (intake.hasMembership ? 10 : 0) +
    (intake.hasFollowUp ? 10 : 0)
  ))

  const sales = Math.max(0, Math.min(100,
    (intake.conversionRate > 70 ? 35 : intake.conversionRate > 55 ? 25 : 12) +
    (intake.avgTicket > 500 ? 30 : intake.avgTicket > 350 ? 22 : 12) +
    (intake.hasMembership ? 20 : 0) +
    13
  ))

  const staffing = Math.max(0, Math.min(100,
    (intake.numProviders >= 3 ? 30 : intake.numProviders >= 2 ? 22 : 12) +
    (intake.payrollPct < 38 ? 30 : intake.payrollPct < 45 ? 20 : 8) +
    40
  ))

  const growth = Math.max(0, Math.min(100,
    (intake.yearsInBusiness >= 3 ? 30 : intake.yearsInBusiness >= 1 ? 20 : 10) +
    (intake.monthlyRevenue > 200000 ? 30 : intake.monthlyRevenue > 100000 ? 20 : 10) +
    (intake.hasMembership ? 20 : 0) +
    20
  ))

  const overall = Math.round(
    financial * 0.30 +
    operational * 0.30 +
    sales * 0.20 +
    staffing * 0.10 +
    growth * 0.10
  )

  return { financial, operational, sales, staffing, growth, overall }
}

const useHealthScoreStore = create((set, get) => ({
  currentStep: 0,
  intakeData: {},
  scores: null,
  report: null,
  isCalculating: false,
  hasReport: false,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),

  updateIntake: (data) => set((s) => ({ intakeData: { ...s.intakeData, ...data } })),

  calculateScores: () => {
    set({ isCalculating: true })
    const { intakeData } = get()
    setTimeout(() => {
      const scores = calculateHealthScore(intakeData)
      set({ scores, isCalculating: false, hasReport: true })
    }, 2000)
  },

  resetDiagnostic: () => set({
    currentStep: 0,
    intakeData: {},
    scores: null,
    report: null,
    hasReport: false,
  }),
}))

export default useHealthScoreStore
