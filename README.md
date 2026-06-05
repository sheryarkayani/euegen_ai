# Eugene AI — Med Spa CFO Intelligence Platform

Eugene AI is a high-end, digital Fractional CFO advisory and operational intelligence platform custom-built for medical aesthetics practices (med spas). The platform empowers practice owners and directors to optimize their EBITDA margins, track and audit financial KPIs, run operational diagnostics, structure compliant MSO entities, design provider compensation plans, and prepare for high-value private equity exits.

Guided by the strategic frameworks of **Eugene Kurkov** (founder of Eugene Consulting), the platform transforms complex medical aesthetics financials into direct, actionable growth steps.

---

## 🚀 Key Modules & Features

### 1. Ask Eugene — 24/7 AI CFO Advisor
A dedicated, context-aware chatbot serving as a virtual Fractional CFO. Practice owners can ask complex operational, financial, and compliance questions in real-time.
*   **KPI Diagnostics**: Instantly analyze payroll metrics, rent limits, and operating expenses.
*   **Strategic Escalation**: Automatically prompts direct booking links for complex scenarios like multi-site restructuring or M&A advisor engagement.

### 2. Practice Health Score Diagnostic
A robust diagnostic engine that assesses a practice across **5 core pillars** of performance:
*   **Financial Health**: Audits payroll ratio, rent ratio, and EBITDA margins.
*   **Operational Efficiency**: Tracks consultation conversion rates, patient rebooking, and room utilization.
*   **Sales Performance**: Gauges average ticket size, treatment packages, and retail attachments.
*   **Staffing & Compensation**: Examines retention, provider utilization, and commission tier safety.
*   **Growth & Marketing**: Measures lead volume, CAC-to-LTV ratios, and digital reputation.
*   **Action Plan**: Generates an interactive, step-by-step PDF report outlining critical red flags (e.g., payroll ratio above 42%) and remediation schedules.

### 3. Financial & KPI Analyzer
An interactive financial control center that tracks past performance and projects future growth:
*   **KPI Dashboard**: Live monitoring of gross revenue, payroll ratio, rent ratio, marketing spend, and average treatment tickets compared directly against industry benchmarks.
*   **Interactive P&L**: A detailed profit-and-loss sheet showcasing EBITDA growth curves.
*   **Revenue Projection Modeler**: Simulate how adjusting pricing, booking volumes, and rebooking percentages impacts monthly and annual EBITDA.

### 4. Launch Center (Pre-Opening Studio)
A comprehensive pre-opening framework designed to guide startup med spas from concept to grand opening:
*   **5-Phase Roadmap**: Step-by-step checklists covering Legal/Business Foundations, Facility/Equipment buildouts, Licensing/Compliance (OSHA, HIPAA), Hiring/Training, and Marketing launches.
*   **Startup Cost Estimator**: Interactive budgeting calculator supporting Boutique, Standard, and Premium location size modifiers to forecast initial capital requirements.

### 5. Sales Training Suite
A set of tools engineered to maximize consultation conversion rates and average ticket values:
*   **AI Script Generator**: Instantly builds role-play dialogue for front-desk scripts, consultation closes, objection handling, and treatment upgrades.
*   **Art of a Consult Program**: Step-by-step video training guide and frameworks for running high-converting patient consults.
*   **Mystery Shopper Audits**: Grade and review incoming phone calls or patient interactions to identify leaks in the sales funnel.

### 6. Hiring Suite & Compensation Designer
Attract top aesthetic talent and build highly profitable team structures:
*   **Job Description Generator**: Generates compliance-aware, premium job descriptions for NPs, PAs, RNs, and Practice Managers.
*   **Compensation Benchmarking**: View real-time US national ranges for base salary, commissions, and bonuses across all aesthetic roles.
*   **Onboarding Kit Builder**: Instantly formats a structured 90-day onboarding program with daily and weekly clinical milestones.
*   **Provider Profitability Ledger**: Interactive playground modeling Straight Commission, Base + Commission, or Base vs. Commission structures. It audits individual injector productivity to ensure practice-wide payroll remains below the safety ceiling.

### 7. Marketing Studio
Track marketing efficiency and automate client acquisition funnels:
*   **Marketing ROI & CAC Modeler**: Inputs ad spend, lead volume, and funnel conversions to output Cost Per Lead (CPL), Customer Acquisition Cost (CAC), and LTV-to-CAC ratios.
*   **Brand Builder**: Formulates brand positioning statements, voice guidelines, and taglines.
*   **Social & Email campaigns**: Automatically generates 30-day social media calendars and high-converting patient email templates.

### 8. Vendor Advisor & Equipment ROI
A data-backed comparison guide to shield practices from high-pressure sales reps:
*   **Vendor Compare**: In-depth analysis of industry-leading suppliers (InMode, Galderma, Allergan, Sciton, Candela) with pros, cons, and direct CFO recommendations.
*   **Equipment ROI Calculator**: Model equipment payback timeframes by assessing monthly financing payments, consumable tip costs, and treatment pricing.

### 9. Compliance Ledger
Legally partition clinical revenues and protect your business from regulatory audits:
*   **PC-MSO Fund Flow Modeler**: Simulates the compliant flow of funds from patient collections in a Professional Corporation (PC) to management fees in a Management Services Organization (MSO).
*   **FMV Fee Estimator**: Ensures MSO management fees are structured within Fair Market Value parameters, warning against regulatory risks if fee percentages cross threshold limits.
*   **State CPOM Risk Index**: High-level regulatory risk matrix outlining Corporate Practice of Medicine rules across California, New York, Texas, Florida, and Colorado.

### 10. Private Equity Intelligence
Prep your practice for institutional capital acquisition:
*   **PE Readiness Scorecard**: Automatically evaluates practice operational standards, revenue diversification, system integrations, and books audit status against typical private equity criteria.
*   **EBITDA Multiple Valuation Modeler**: Estimates practice valuation based on EBITDA multipliers and normalized adjustments (add-backs).

---

## 📈 Strategic Frameworks & Industry Benchmarks

Eugene AI measures practice success against strict, proven industry standards:

| Metric | Target (Excellent) | Risk Threshold (Red Flag) |
| :--- | :--- | :--- |
| **Payroll-to-Revenue Ratio** | 30% – 38% | > 42% |
| **EBITDA Margin** | 20% – 25% (40% for elite) | < 15% |
| **Consultation Conversion** | 70% – 80% | < 40% |
| **Patient Rebooking Rate** | 75% – 80% | < 60% |
| **Rent-to-Revenue Ratio** | < 10% | > 12% |
| **Average Revenue per Visit** | $500+ | < $350 |

---

## 🛠 Tech Stack & Architecture

The application is built using a modern, fast, and scalable single-page application (SPA) architecture:

*   **Frontend Framework**: React 18 & Vite (for lightning-fast Hot Module Replacement)
*   **State Management**: Zustand (lightweight, reactive global store)
*   **Styling & UI**: Vanilla CSS & Custom CSS variables alongside Tailwind CSS (premium layout components)
*   **Icons & Animations**: Lucide React & Framer Motion (for fluid micro-interactions and transitions)
*   **Visualizations**: Recharts (dynamic, interactive SVG KPI graphs)
*   **Backend & DB**: Supabase (PostgreSQL Database, User Authentication, Realtime Synchronization)
*   **AI Integration**: OpenRouter API (Routes natural language queries directly to advanced Claude 3.5 Sonnet and GPT-4o models)

---

## 📦 Getting Started

### Prerequisites
*   Node.js (v18.x or higher)
*   npm (v9.x or higher)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/eugene-consulting/katrina-ai.git
    cd katrina-ai
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your local environment file. Create a `.env.local` file in the root directory:
    ```env
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    VITE_OPENROUTER_API_KEY=your-openrouter-api-key
    VITE_DEMO_MODE=false
    ```
4.  Run the local development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and navigate to `http://localhost:5173`.
