export const monthlyRevenue = [
  { month: 'Nov', revenue: 142000, target: 150000 },
  { month: 'Dec', revenue: 168000, target: 155000 },
  { month: 'Jan', revenue: 151000, target: 160000 },
  { month: 'Feb', revenue: 165000, target: 162000 },
  { month: 'Mar', revenue: 172000, target: 165000 },
  { month: 'Apr', revenue: 180000, target: 168000 },
]

export const serviceBreakdown = [
  { name: 'Botox/Dysport', revenue: 68400, pct: 38, visits: 178 },
  { name: 'Dermal Fillers', revenue: 45000, pct: 25, visits: 52 },
  { name: 'Laser Treatments', revenue: 27000, pct: 15, visits: 36 },
  { name: 'Body Contouring', revenue: 21600, pct: 12, visits: 18 },
  { name: 'Memberships', revenue: 11760, pct: 6.5, visits: null },
  { name: 'Other', revenue: 6240, pct: 3.5, visits: 22 },
]

export const patientFlow = [
  { month: 'Nov', new: 38, returning: 94 },
  { month: 'Dec', new: 44, returning: 102 },
  { month: 'Jan', new: 35, returning: 98 },
  { month: 'Feb', new: 42, returning: 107 },
  { month: 'Mar', new: 46, returning: 109 },
  { month: 'Apr', new: 48, returning: 112 },
]

export const payrollTrend = [
  { month: 'Nov', payroll: 76000, revenue: 142000, pct: 53.5 },
  { month: 'Dec', payroll: 78000, revenue: 168000, pct: 46.4 },
  { month: 'Jan', payroll: 79000, revenue: 151000, pct: 52.3 },
  { month: 'Feb', payroll: 80000, revenue: 165000, pct: 48.5 },
  { month: 'Mar', payroll: 81000, revenue: 172000, pct: 47.1 },
  { month: 'Apr', payroll: 82000, revenue: 180000, pct: 45.5 },
]

export const kpiSummary = {
  monthlyRevenue: 180000,
  revenueChange: 4.7,
  payrollPct: 45.5,
  payrollChange: -1.6,
  conversionRate: 52,
  conversionChange: -3,
  rebookingRate: 61,
  rebookingChange: 2,
  avgRevenuePerVisit: 385,
  membershipMembers: 147,
  membershipRevenue: 11760,
  ebitdaEstimate: 28.1,
  ebitdaMargin: 15.6,
  totalPatients: 160,
  newPatients: 48,
  returningPatients: 112,
  utilization: 68,
}
