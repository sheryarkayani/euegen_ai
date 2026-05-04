# Technical Implementation — Gina's AI Platform
## Med Spa Matchmaker Intelligence Platform — Prototype

**Version:** 1.0 (Demo Build)
**Stack:** Vite + React + Supabase + OpenRouter
**Date:** May 2026

---

## 1. Tech Stack Overview

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend framework | Vite + React 18 | Fast HMR, modern bundling, component model |
| Styling | Tailwind CSS v3 + custom CSS vars | Utility-first, rapid prototyping, consistent tokens |
| State management | Zustand | Lightweight, no boilerplate, perfect for this scope |
| Backend / DB | Supabase | Auth, Postgres, realtime, storage — all-in-one |
| AI / LLM | OpenRouter API | Model-agnostic routing; use Claude Sonnet, GPT-4o, or Llama as fallback |
| PDF generation | react-pdf / jsPDF | Health Score report export |
| Charts | Recharts | Financial KPI dashboard visualizations |
| Routing | React Router v6 | SPA navigation with nested routes |
| Icons | Lucide React | Consistent, clean icon set |
| Notifications | react-hot-toast | Non-intrusive feedback |
| Animations | Framer Motion | Page transitions, sidebar, modal animations |

---

## 2. Project Structure

```
gina-ai/
├── public/
│   └── gina-avatar.png
├── src/
│   ├── App.jsx                    # Root router + auth guard
│   ├── main.jsx
│   ├── index.css                  # Global CSS variables + base styles
│   │
│   ├── lib/
│   │   ├── supabase.js            # Supabase client init
│   │   ├── openrouter.js          # OpenRouter API wrapper
│   │   └── prompts/               # System prompts per module
│   │       ├── askGina.js
│   │       ├── healthScore.js
│   │       ├── salesTraining.js
│   │       ├── marketing.js
│   │       ├── hiring.js
│   │       └── compliance.js
│   │
│   ├── store/
│   │   ├── useAuthStore.js        # User session + practice profile
│   │   ├── useChatStore.js        # Ask Gina conversation history
│   │   └── useHealthScoreStore.js # Diagnostic state
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx        # Primary nav with all modules
│   │   │   ├── TopBar.jsx         # User info, notifications, quick actions
│   │   │   └── AppLayout.jsx      # Shell wrapper
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ScoreRing.jsx      # Animated score circle
│   │   │   ├── BenchmarkBar.jsx   # Visual benchmark comparison
│   │   │   └── GinaTyping.jsx     # Animated typing indicator
│   │   └── shared/
│   │       ├── BookGinaCard.jsx   # CTA to book 1:1 with Gina
│   │       └── UpgradeWall.jsx    # Paywall overlay
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx          # Home overview + quick actions
│   │   ├── AskGina.jsx            # Module 1 — Chatbot
│   │   ├── HealthScore.jsx        # Module 2 — Diagnostic
│   │   │   ├── IntakeForm.jsx
│   │   │   └── ScoreReport.jsx
│   │   ├── LaunchCenter.jsx       # Module 3
│   │   ├── FinancialKPI.jsx       # Module 4
│   │   ├── SalesTraining.jsx      # Module 5
│   │   │   ├── ScriptGenerator.jsx
│   │   │   ├── ArtOfConsult.jsx
│   │   │   └── MysteryShop.jsx
│   │   ├── Hiring.jsx             # Module 6
│   │   ├── MarketingStudio.jsx    # Module 7
│   │   ├── VendorAdvisor.jsx      # Module 8
│   │   ├── Compliance.jsx         # Module 9
│   │   ├── PEIntelligence.jsx     # Module 10
│   │   ├── EventPlanner.jsx       # Module 11
│   │   ├── EmployeeLifecycle.jsx  # Module 12
│   │   ├── Settings.jsx
│   │   └── Auth.jsx
│   │
│   └── data/
│       ├── dummyPractice.js       # Seeded practice profile
│       ├── dummyHealthScore.js    # Pre-calculated score report
│       ├── dummyKPIs.js           # Chart data
│       └── benchmarks.js         # Industry benchmarks constants
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_users.sql
│   │   ├── 002_practices.sql
│   │   ├── 003_conversations.sql
│   │   ├── 004_health_scores.sql
│   │   └── 005_generated_content.sql
│   └── seed.sql                   # Demo data
│
├── .env.local
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 3. Supabase Schema

### `profiles` table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  practice_name TEXT,
  state TEXT,
  years_in_business INTEGER,
  tier TEXT DEFAULT 'free', -- free | starter | growth | scale | enterprise
  questions_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `practices` table
```sql
CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT,
  state TEXT,
  num_locations INTEGER,
  num_providers INTEGER,
  monthly_revenue_range TEXT,
  services JSONB,
  ownership_structure TEXT,
  emr_system TEXT,
  has_membership BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `conversations` table
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT,
  messages JSONB DEFAULT '[]',
  module TEXT DEFAULT 'ask_gina',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `health_scores` table
```sql
CREATE TABLE health_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  practice_id UUID REFERENCES practices(id),
  intake_data JSONB,
  scores JSONB,         -- { financial, operational, sales, staffing, growth }
  overall_score INTEGER,
  red_flags JSONB,
  action_plan JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `generated_content` table
```sql
CREATE TABLE generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  module TEXT,          -- 'sales_script' | 'job_description' | 'social_calendar' etc.
  input_params JSONB,
  content TEXT,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. OpenRouter Integration

### API Wrapper (`src/lib/openrouter.js`)
```javascript
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1';

export async function streamCompletion({ systemPrompt, messages, onChunk, model = 'anthropic/claude-sonnet-4-5' }) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ginasai.com',
      'X-Title': "Gina's AI — Med Spa Matchmaker"
    },
    body: JSON.stringify({
      model,
      stream: true,
      max_tokens: 1500,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ]
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
    for (const line of lines) {
      const data = line.slice(6);
      if (data === '[DONE]') return;
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onChunk(content);
      } catch {}
    }
  }
}

export async function generateContent({ systemPrompt, userPrompt, model = 'anthropic/claude-sonnet-4-5' }) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ginasai.com',
      'X-Title': "Gina's AI"
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}
```

### Model Selection Strategy
| Use Case | Model | Reason |
|----------|-------|--------|
| Ask Gina chat | `anthropic/claude-sonnet-4-5` | Best voice matching, nuanced |
| Health Score analysis | `anthropic/claude-sonnet-4-5` | Complex multi-factor reasoning |
| Script generation | `anthropic/claude-haiku-4-5` | Fast, cost-effective for templates |
| Marketing content | `openai/gpt-4o` | Creative variation quality |
| Compliance questions | `anthropic/claude-sonnet-4-5` | Accuracy-critical |

---

## 5. System Prompts Architecture

### Master Voice Prompt (injected into every module)
```
You are Gina's AI — the digital intelligence layer of Gina Graziano, founder of 
The Med Spa Matchmaker. You speak exactly like Gina: direct, warm, practical, 
and data-first. You never hedge when the answer is clear. You name red flags 
without softening them. You always end with an actionable next step.

You have 20 years of experience in medical aesthetics including:
- New Beauty Magazine editorial
- InMode medical laser sales  
- Galderma injectable sales
- 100+ med spa consulting engagements across the US

Industry benchmarks you reference as fact:
- Payroll-to-revenue: 30–38% healthy, >42% red flag
- EBITDA margin: 20–25% average, 40% high performer
- Consultation conversion: 70–80% excellent, <40% struggling
- Patient rebooking: 75–80% high performer
- Rent as % of revenue: <10% healthy
- Revenue per visit: $350–500 good, $500+ excellent

When a question requires 1:1 consulting (multi-location, PE transaction, 
legal entity formation), always surface: "This is exactly the kind of situation 
I'd want to sit down with you on — [Book a call with Gina]"

Response format rules:
- Under 150 words: no headers needed
- Over 300 words: start with 3-bullet summary
- Always end with: "Next step:" followed by one concrete action
- Never use generic disclaimers as a substitute for real guidance
```

---

## 6. Module-Specific Routes

| Route | Module | Auth Required | Tier |
|-------|--------|---------------|------|
| `/` | Dashboard | Yes | All |
| `/ask` | Ask Gina | No (limited) | Free: 5q/mo |
| `/health-score` | Health Score Intake | Yes | Free |
| `/health-score/report` | Score Report | Yes | Starter+ |
| `/financial` | KPI Dashboard | Yes | Growth+ |
| `/launch` | Launch Center | Yes | Starter+ |
| `/sales` | Sales Training | Yes | Growth+ |
| `/sales/script` | Script Generator | Yes | Growth+ |
| `/sales/consult` | Art of Consult | Yes | Growth+ |
| `/sales/mystery-shop` | Mystery Shop | Yes | Scale+ |
| `/hiring` | Hiring Suite | Yes | Growth+ |
| `/marketing` | Marketing Studio | Yes | Growth+ |
| `/vendors` | Vendor Advisor | Yes | Starter+ |
| `/compliance` | Compliance | Yes | Growth+ |
| `/pe-intel` | PE Intelligence | Yes | Scale+ |
| `/events` | Event Planner | Yes | Growth+ |
| `/employees` | Employee Lifecycle | Yes | Growth+ |
| `/settings` | Settings | Yes | All |

---

## 7. Demo Data Strategy (Prototype)

For the demo, a fully seeded practice profile is loaded on first render:

**Demo Practice: "Lumina Aesthetics — Austin, TX"**
- 3 years in business, 1 location, 4 providers (1 NP, 1 PA, 2 RNs)
- Revenue: $180K/month
- Payroll: $82,000/month (45.5% — RED FLAG)
- Rent: $16,000/month (8.9% — healthy)
- Marketing: $8,000/month (4.4% — slightly low)
- Consultation conversion: 52% (below benchmark)
- Rebooking rate: 61% (below benchmark)
- Health Score: 63/100 — "Needs Attention"

All AI responses for the first click on any "Generate" or "Analyze" button use pre-written dummy responses that look exactly like real AI output — instant, no API latency for demo purposes.

---

## 8. Environment Variables

```
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=[anon_key]
VITE_OPENROUTER_API_KEY=[key]
VITE_DEMO_MODE=true   # Bypasses real AI calls, uses dummy responses
```

---

## 9. Sidebar Navigation Structure

```
GINA'S AI
─────────────────
🏠  Dashboard
💬  Ask Gina             ← Module 1
📊  Health Score         ← Module 2
    └ Run Diagnostic
    └ My Reports
🚀  Launch Center        ← Module 3
💰  Financial & KPIs     ← Module 4
    └ KPI Dashboard
    └ P&L Analyzer
    └ Revenue Calculator
🎯  Sales Training       ← Module 5
    └ Script Generator
    └ Art of a Consult
    └ Mystery Shopper
    └ Email Templates
👥  Hiring Suite         ← Module 6
    └ Job Descriptions
    └ Portfolio Analyzer
    └ Comp Benchmarks
    └ Onboarding Kits
🎨  Marketing Studio     ← Module 7
    └ Brand Builder
    └ Social Calendar
    └ Email Campaigns
    └ Google Optimizer
🔧  Vendor Advisor       ← Module 8
    └ Equipment ROI
    └ Vendor Compare
⚖️  Compliance           ← Module 9
    └ State Licensing
    └ Form Templates
    └ OSHA Checklist
📈  PE Intelligence      ← Module 10
    └ PE Readiness
    └ EBITDA Builder
🎪  Event Planner        ← Module 11
👤  Employee Lifecycle   ← Module 12
─────────────────
⚙️  Settings
📞  Book with Gina       ← CTA (always visible)
```

---

## 10. Scoring Algorithm — Health Score

```javascript
function calculateHealthScore(intake) {
  const scores = {};
  
  // Financial Health (0–100)
  const payrollPct = (intake.totalPayroll / intake.monthlyRevenue) * 100;
  const rentPct = (intake.monthlyRent / intake.monthlyRevenue) * 100;
  const ebitdaEstimate = 100 - payrollPct - rentPct - 
    (intake.marketingSpend / intake.monthlyRevenue * 100) - 
    (intake.supplyCost / intake.monthlyRevenue * 100);
  
  scores.financial = Math.max(0, Math.min(100,
    (payrollPct < 38 ? 30 : payrollPct < 42 ? 20 : 5) +
    (rentPct < 10 ? 20 : rentPct < 15 ? 12 : 5) +
    (ebitdaEstimate > 25 ? 30 : ebitdaEstimate > 15 ? 20 : 10) +
    20 // base
  ));
  
  // Operational Health (0–100)
  scores.operational = Math.max(0, Math.min(100,
    (intake.conversionRate > 70 ? 30 : intake.conversionRate > 50 ? 20 : 8) +
    (intake.rebookingRate > 75 ? 25 : intake.rebookingRate > 60 ? 15 : 5) +
    (intake.utilizationRate > 75 ? 25 : intake.utilizationRate > 60 ? 15 : 5) +
    (intake.hasMembership ? 10 : 0) +
    (intake.hasFollowUp ? 10 : 0)
  ));
  
  // Sales Health, Staffing Health, Growth Health...
  // [Similar weighted scoring logic]
  
  scores.overall = Math.round(
    scores.financial * 0.30 +
    scores.operational * 0.30 +
    scores.sales * 0.20 +
    scores.staffing * 0.10 +
    scores.growth * 0.10
  );
  
  return scores;
}
```

---

## 11. Key UI Components

### ScoreRing
Animated SVG circle showing score 0–100 with color:
- 0–40: `#ef4444` (red)
- 41–65: `#f59e0b` (amber)
- 66–80: `#3b82f6` (blue)
- 81–100: `#10b981` (green)

### BenchmarkBar
Horizontal bar showing user's metric vs industry bands (Poor / Average / Good / Excellent) with user's position marked.

### GinaTyping
Three-dot animated indicator shown while AI generates — with Gina's avatar and "Gina is thinking..."

### BookGinaCard
Fixed bottom-left CTA card: "Complex situation? Talk to Gina directly." with phone + calendar booking link.

---

## 12. Deployment

**Recommended:** Vercel (frontend) + Supabase (backend)

```bash
# Install
npm create vite@latest gina-ai -- --template react
cd gina-ai
npm install

# Key deps
npm install @supabase/supabase-js zustand react-router-dom
npm install recharts framer-motion lucide-react
npm install react-hot-toast react-pdf jspdf
npm install tailwindcss @tailwindcss/typography autoprefixer

# Dev
npm run dev

# Build
npm run build

# Deploy
vercel --prod
```

---

## 13. Phase 1 Build Priorities (Demo → MVP)

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| P0 | Ask Gina chatbot (streaming) | 2d | Highest |
| P0 | Health Score intake + report | 3d | Highest |
| P0 | Dashboard with KPI cards | 1d | High |
| P1 | Sales Script Generator | 2d | High |
| P1 | Financial KPI charts | 2d | High |
| P1 | Auth + Supabase setup | 1d | High |
| P2 | Marketing Studio | 3d | Medium |
| P2 | Hiring Suite | 2d | Medium |
| P3 | All remaining modules | 5d+ | Grows with users |

**Demo build estimate:** 3–4 days to production-quality prototype with dummy data.

---

*End of Technical Implementation Document — v1.0*
*Prepared for: Gina Graziano / The Med Spa Matchmaker*
