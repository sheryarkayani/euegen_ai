export const dummyHealthScoreReport = {
  overallScore: 63,
  label: 'Needs Attention',
  generatedAt: new Date().toISOString(),
  practice: 'Lumina Aesthetics — Austin, TX',

  scores: {
    financial: 48,
    operational: 72,
    sales: 58,
    staffing: 74,
    growth: 62,
  },

  intakeData: {
    monthlyRevenue: 180000,
    totalPayroll: 82000,
    monthlyRent: 16000,
    marketingSpend: 8000,
    supplyCost: 22000,
    conversionRate: 52,
    rebookingRate: 61,
    utilizationRate: 68,
    hasMembership: true,
    hasFollowUp: true,
    numProviders: 4,
    numLocations: 1,
    avgTicket: 385,
    yearsInBusiness: 3,
  },

  redFlags: [
    {
      severity: 'critical',
      category: 'Financial',
      flag: 'Payroll at 45.5% of revenue',
      detail: 'Your payroll-to-revenue ratio is 7.5 points above the red-flag threshold of 38%. At $180K/month revenue, this represents ~$13,500/month in excess labor cost. Benchmark: healthy is 30–38%.',
      action: 'Audit provider productivity individually. Calculate revenue generated per provider per hour. Identify your lowest performer and create a 60-day improvement plan or restructure compensation.',
    },
    {
      severity: 'warning',
      category: 'Sales',
      flag: 'Consultation conversion at 52% — below benchmark',
      detail: 'You are converting only 52 out of 100 consultations. At 160 monthly patients with a $385 avg ticket, closing even 10% more consults adds $6,160/month in revenue — $73,920 annually.',
      action: 'Implement a structured consultation protocol this week. Script the first 5 minutes. The provider who opens the consult with a treatment plan recommendation (not a question) will convert more.',
    },
    {
      severity: 'warning',
      category: 'Operational',
      flag: 'Rebooking rate at 61% — 14 points below top performers',
      detail: 'High-performing med spas achieve 75–80% rebooking. Your 61% means 62 patients per month leave without a future appointment. At avg $385 per visit, that is $23,870/month in unrealized revenue.',
      action: 'Train your front desk to make rebooking the final step of every checkout — not optional. "Your next Botox should be in 3 months — I have October 14th or 21st available." Close before they leave.',
    },
    {
      severity: 'watch',
      category: 'Marketing',
      flag: 'Marketing spend at 4.4% — slightly below growth benchmark',
      detail: 'For a practice at your stage (3 years, single location, growth phase), we typically recommend 5–7% of revenue allocated to marketing. At $180K/month, that means increasing budget by $1,080–$4,600/month.',
      action: 'Before adding budget, audit where your current $8K is going. If Google Ads is working, scale it. If you are paying a flat-fee agency, renegotiate to performance-based.',
    },
  ],

  actionPlan: [
    {
      week: '1–2',
      title: 'Fix Payroll Leakage',
      priority: 'critical',
      actions: [
        'Pull a productivity report for each provider: revenue generated ÷ hours worked',
        'Calculate break-even revenue per provider per shift',
        'Identify any provider generating below $800/hour and schedule a performance meeting',
        'Review commission structure — are you paying commission on top of full salary?',
      ],
    },
    {
      week: '3–4',
      title: 'Overhaul Consultation Process',
      priority: 'high',
      actions: [
        'Create a 5-step consultation script (use Eugene\'s script generator)',
        'Implement a treatment plan form that every provider fills out during consult',
        'Require every consultation to end with a specific recommendation and price — not a "think about it"',
        'Role-play consultations in a team meeting this week',
      ],
    },
    {
      week: '5–6',
      title: 'Rebooking Protocol Launch',
      priority: 'high',
      actions: [
        'Create a rebooking script for your front desk checkout process',
        'Add "Next Appointment" as a required field in your EMR before patient is checked out',
        'Set up automated follow-up text at 48 hours post-visit for any patient without future appt',
        'Track rebooking rate weekly — put it on a whiteboard in the break room',
      ],
    },
    {
      week: '7–12',
      title: 'Revenue Growth Initiatives',
      priority: 'medium',
      actions: [
        'Launch a VIP membership tier above your current membership (target: 30 new members)',
        'Implement package pricing for high-volume services (Botox series, laser series)',
        'Add one new high-margin service — consider RF microneedling or body contouring if not already offered',
        'Set a Q3 revenue target of $200K/month and reverse-engineer the patient volume needed',
      ],
    },
  ],

  ginaSays: {
    financial: "Your payroll number is the elephant in the room. I see this all the time in Austin-area practices — providers were hired aggressively during a growth phase and the compensation structure never caught up. You don't necessarily need to let anyone go, but you need to have honest conversations about productivity. Your front desk is also likely under-leveraged. Consider cross-training for upsell and rebooking.",
    operational: "Your operational foundation is actually solid — you have the EMR, you have a membership, you have the bones of a great practice. The 68% utilization tells me you have room to fill without adding overhead. That's the sweet spot. Focus on filling what you have before adding providers.",
    sales: "52% conversion is fixable in 30 days with the right protocol. Most practices don't have a sales problem — they have a process problem. Your providers are probably giving great clinical care but not closing the appointment. That's a training issue, not a hiring issue.",
    staffing: "Four providers for one location is actually a reasonable ratio. The concern isn't headcount — it's productivity spread. Make sure you're not carrying a provider who is consistently underperforming without accountability. Top providers in Austin are generating $180K+ annually solo. Do the math on each person.",
    growth: "You're three years in and at $180K/month — that's a real practice. The question now is: do you want to optimize this location to $250K+ or start thinking about location two? I'd spend the next 12 months maxing out this location's profitability before expanding. Your margins don't support a second location yet.",
  },
}

export const dummyAskGinaResponses = [
  {
    question: "What should I do about my high payroll costs?",
    answer: `Your payroll at 45.5% of revenue is your most urgent issue — and the good news is it's fixable without necessarily cutting staff.

**Here's what I'd do immediately:**

First, pull a productivity report for every provider. Calculate revenue generated ÷ hours worked. You're looking for anyone consistently below $800/hour in revenue production. That's your diagnostic.

Second, audit your compensation structure. Are you paying a flat salary plus commission? Many practices double-pay without realizing it. Restructure to base + performance bonus tied to revenue generated.

Third, look at your front desk-to-provider ratio. If you have one admin person per provider, that's expensive. One solid front desk can handle 3–4 providers with the right systems.

**The benchmark:** Healthy payroll is 30–38% of revenue. At $180K/month, you should be targeting $54K–$68K in total payroll. You're spending $14K–$28K more than that right now.

**Next step:** This week, run the per-provider productivity report in Boulevard. Come back with the numbers and we can build an accountability plan.`,
  },
  {
    question: "How do I improve my consultation conversion rate?",
    answer: `52% conversion tells me one thing immediately: your providers are giving consultations, not closing treatment plans. These are different skills and most med spa training doesn't cover the second one.

**The five-minute fix that works:**

Open every consultation with a recommendation, not a question. "Based on what I'm seeing, I'd recommend starting with Botox in your upper face and a HA filler in the nasolabial folds. That will give you the most visible improvement for about $1,100." 

That's it. You lead with the solution. You name the price. You watch what happens.

Most providers ask "What brings you in today?" — which puts the patient in charge of a conversation they don't have the expertise to lead.

**The numbers:** If you close 10% more of your current consults, that's roughly 8 additional appointments at $385 average = $3,080/month = $36,960/year. For a script change.

**Benchmark:** Top performers convert 70–80%. You're at 52%. The gap is almost always process, not provider skill.

**Next step:** Use the Script Generator in your Sales Training module. Build your consultation script this week and role-play it in your next team meeting.`,
  },
  {
    question: "Should I open a second location?",
    answer: `Short answer: not yet.

Here's why — and this is the kind of direct answer you need, not the one that validates what you want to hear.

Your current location is generating $180K/month with a 15.6% EBITDA margin. Top performers run 35–40% margins at single locations before they expand. You need to optimize here first.

**What second location actually requires:**
- Minimum 12 months of consistent profitability at current location (you're there)
- $400K–$600K in capital for buildout, equipment, working capital
- A general manager or duplicate medical director who can run independently (do you have that person?)
- Systems that are documented, repeatable, and not dependent on your personal involvement

**The real risk:** Opening location two while payroll is at 45.5% is like adding a second engine to a plane that's already losing altitude. Fix the fuel leak first.

**The marker I'd look for:** When you hit $220K/month at 25%+ EBITDA margin consistently for six months, we have a different conversation.

**Next step:** This is exactly the kind of situation I'd want to sit down with you on — [Book a call with Eugene] to build a real expansion timeline.`,
    escalate: true,
  },
  {
    question: "What's a good membership program structure?",
    answer: `Your 147 members at $1,176/month in membership revenue tells me your membership is probably underpriced or under-sold. Let's fix that.

**The Eugene-Approved Membership Framework:**

**Tier 1 — Essentials ($149/month)**
- 1 syringe of Botox per quarter (saves ~$50)
- 15% off all products
- Priority booking
Target: Your highest-volume Botox patients

**Tier 2 — VIP ($299/month)**
- 1 syringe Botox per quarter
- $200 treatment credit (can roll over 1 month)
- 20% off products
- Complimentary annual skin analysis
Target: Multi-service patients

**Tier 3 — Elite ($499/month)**
- $500 monthly treatment credit
- 25% off products + services
- Annual complimentary hydrafacial or peel
- Skip-the-waitlist booking
Target: Top 10% of spenders

**The math:** If you converted your 147 members to an average tier of $220/month, that's $32,340/month in recurring revenue vs your current $1,176. What are you charging right now?

**Next step:** Audit your current membership tier. If you're under $150, raise it this quarter and grandfather existing members for 90 days.`,
  },
  {
    question: "How should I think about marketing spend?",
    answer: `Your $8K/month in marketing (4.4% of revenue) is slightly below where I'd want it for a growth-stage practice, but the more important question is: what are you getting for that $8K?

**The diagnostic questions:**
1. What is your cost per new patient? ($8K ÷ 48 new patients = $167/new patient. That's actually reasonable.)
2. Where are those 48 new patients coming from? (Google Ads, referral, Instagram, walk-in?)
3. What is your average lifetime value of a new patient? (If it's $2K+, $167 CAC is a steal.)

**The Eugene framework for marketing allocation:**

- **40%** — Google Ads (search intent, high-converting, track ROI directly)
- **25%** — Instagram/Meta (brand awareness, remarketing to website visitors)
- **20%** — Referral program (cheapest new patient you'll ever acquire)
- **15%** — Local partnerships + events

**What I'd cut:** Any flat-fee agency that can't show you cost-per-acquisition. Any "social media management" retainer where they're posting pretty pictures but you can't trace a single new booking to it.

**At your revenue level:** $8K–$12K/month in marketing is reasonable. But optimize what you have before scaling spend.

**Next step:** This week, ask your front desk to add "how did you hear about us?" as a required intake field. You need that data before you can make smart decisions.`,
  },
]
