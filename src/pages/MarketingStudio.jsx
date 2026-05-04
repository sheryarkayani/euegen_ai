import { useState } from 'react'
import { Sparkles, Calendar, Mail, Palette, Copy, Check } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import GinaTyping from '../components/ui/GinaTyping'
import { simulateTyping } from '../lib/openrouter'

const DEMO_SOCIAL_CALENDAR = `# 30-Day Social Media Calendar
## Lumina Aesthetics | Austin, TX | June 2026

---

**WEEK 1**

**Day 1 (Mon) — Instagram Reel**
Content: "The 5 questions you SHOULD be asking at your Botox consultation"
Caption: "Before you book anywhere, you need to ask these 5 questions. A great injector will have great answers. 👇 Save this for your next consultation. #BotoxAustin #MedSpaAustin #AskYourProvider"
Visual: Provider on camera, talking directly, professional but warm
Time: 9:00am

**Day 2 (Tue) — Story**
Content: Poll — "Have you ever felt rushed during a consultation?"
Caption: Quick yes/no poll. Follow with "Us either. We give every patient 30+ minutes, no exceptions."
Time: 12:00pm

**Day 3 (Wed) — Educational Carousel**
Content: "Botox vs. Dysport: what's actually the difference?"
Caption: "We get this question every week. Here's the real answer — not the marketing answer. (Swipe for breakdown) #BotoxVsDysport #InjectableEducation"
Visual: Clean comparison slides, text-heavy, white background
Time: 10:00am

**Day 4 (Thu) — Team/Culture**
Content: "Behind the scenes: how we prepare for a full injection day"
Caption: "Clean room, calibrated product, and 15 minutes of team huddle before we see a single patient. This is why we have 214 five-star reviews. #BehindTheScenes #LuminaTeam"
Visual: Genuine behind-the-scenes photos — not staged
Time: 11:00am

**Day 5 (Fri) — Transformation**
Content: Natural results before/after (consent required)
Caption: "This is 3 weeks post-treatment. No filters. No editing. Just really good filler placement. 💛 (Results vary. Book a consult to discuss your goals.)"
Visual: Natural light before/after with proper framing
Time: 10:00am

**Day 6 (Sat) — Story**
Content: "Ask me anything about injectables"
Caption: Open Q&A box — answer the top 5 in Stories
Time: 11:00am

---

**WEEK 2**

**Day 8 (Mon) — Instagram Reel**
Content: "The #1 reason Botox doesn't last as long as it should"
Caption: "It's not your metabolism. It's this. (Most injectors won't tell you this.) #BotoxLongevity #BotoxTips"
Visual: Provider explaining over a clean background, captions on screen
Time: 9:00am

**Day 9 (Tue) — Promotional**
Content: June Member Appreciation Week
Caption: "Our 147 members get first access to June appointments — plus a complimentary lip gloss with any treatment this week. Not a member? DM us about our Essentials plan starting at $149/month. #LuminaMembership"
Time: 10:00am

**Day 10 (Wed) — Educational**
Content: "What is preventative Botox and who should consider it?"
Caption: "Starting Botox at 25 is actually brilliant strategy — here's why. (Not a scare tactic, just anatomy.) #PreventativeBotox #MedSpaAustin"
Time: 10:00am

**Day 11 (Thu) — Team Feature**
Content: Provider spotlight — Ashley Kim, RN
Caption: "Meet Ashley — she's been with us 2 years and injects 10 patients a day without ever making anyone feel rushed. We're lucky to have her. 🙏 #TeamLumina"
Visual: Candid shot of Ashley in the treatment room
Time: 11:00am

**Day 12 (Fri) — Transformation**
Content: Lip filler before/after
Caption: "Subtle. Natural. Exactly what she asked for. This is 1 syringe of Restylane Kysse for definition and hydration — no duck lips, ever. (Consent on file) #LipFiller #NaturalLips"
Time: 10:00am

**Day 13 (Sat) — Story**
Content: "Swipe up to book your June consult — 8 spots left this month"
Caption: Urgency + booking link
Time: 10:00am

---

**WEEK 3**

**Day 15 (Mon) — Reel**
Content: "The consultation process at Lumina — what to actually expect"
Caption: "Walk-through of a real consultation (with a team member as patient). No fluff. No upselling. Just real talk about your face. #ConsultationProcess #NoPressuretoBuy"
Visual: Walk-through video of consultation room
Time: 9:00am

**Day 16 (Tue) — Educational**
Content: "Is your injector using the right dilution for Botox?"
Caption: "Dilution affects results more than people realize. Here's what you should know. (And what to ask.) #BotoxDilution #SmartPatients"
Time: 10:00am

**Day 17 (Wed) — UGC/Testimonial**
Content: Screenshot of Google review (with permission noted)
Caption: "This is why we do what we do. Thank you, Lauren. 💛 Reviews like this are the best part of this job. If you've visited us, we'd be so grateful for your feedback. Link in bio."
Time: 10:00am

**Day 18 (Thu) — Culture**
Content: "Our no-sell policy — why we actually mean it"
Caption: "We don't work on commission. Your provider will never recommend something you don't need. Period. This is why our rebooking rate is what it is. #TransparentPricing #NoPressureMedSpa"
Time: 11:00am

**Day 19 (Fri) — Transformation**
Content: Under-eye filler / filler correction
Caption: "Before: hollow under-eyes + shadows making her look tired. After: 1 syringe Restylane under-eye, no bruising, immediate result. (She came in for Botox and almost didn't mention her under-eyes 😅)"
Time: 10:00am

---

**WEEK 4**

**Day 22 (Mon) — Reel**
Content: "Why we recommend this specific skincare routine post-filler"
Caption: "The 72 hours after filler matters. Here's what we tell every patient. #PostFillerCare #SkincareTips"
Time: 9:00am

**Day 23 (Tue) — Promotional**
Content: July booking now open
Caption: "July is officially open 🗓️ — a few appointments added for existing patients. Link in bio to check availability. #AustinMedSpa"
Time: 10:00am

**Day 24 (Wed) — Educational**
Content: "Combination treatments that actually make sense"
Caption: "Botox + filler isn't always the right combo. Sometimes it's Botox + a peel. Here's how we think about it. #CombinationTreatments"
Time: 10:00am

**Day 25 (Thu) — Team**
Content: Office culture moment — team lunch, birthday, etc.
Caption: "We're a small team. We take care of each other the same way we take care of patients. #SmallTeamBigHeart #TeamCulture"
Time: 11:00am

**Day 26 (Fri) — Transformation**
Content: Full face refresh before/after
Caption: "This patient has been with us for 2 years. What you're seeing is consistent maintenance — not a dramatic overhaul. Slow and steady wins in aesthetics. #NaturalLook #AestheticsResults"
Time: 10:00am

**Day 28–30 — Weekend/Final Days**
Story: Patient review reposts, quick Q&A, "Favorite products we use in practice"

---

*Social calendar generated by Gina's AI — The Med Spa Matchmaker*`

export default function MarketingStudio({ tab }) {
  const tabs = [
    { key: 'social', label: 'Social Calendar', icon: Calendar },
    { key: 'brand', label: 'Brand Builder', icon: Palette },
    { key: 'email', label: 'Email Campaigns', icon: Mail },
  ]
  const [activeTab, setActiveTab] = useState(tab || 'social')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [brandForm, setBrandForm] = useState({ name: 'Lumina Aesthetics', city: 'Austin', services: 'Botox, fillers, laser', differentiator: 'No-pressure environment, medical expertise' })
  const [emailType, setEmailType] = useState('Re-engagement')

  const generateSocial = () => {
    setLoading(true)
    setOutput('')
    simulateTyping(DEMO_SOCIAL_CALENDAR, c => setOutput(p => p + c), () => setLoading(false), 6)
  }

  const BRAND_OUTPUT = `# Brand Identity Report — Lumina Aesthetics

## Brand Positioning Statement
Lumina Aesthetics is Austin's no-pressure medical aesthetics practice — where clinical excellence meets genuine care.

## Target Patient Avatar
**Name:** Megan, 34
**Occupation:** Marketing director, tech company
**Income:** $120K+
**Motivation:** Wants to look as confident as she feels — not "done"
**Fear:** Looking unnatural, being oversold
**How she finds you:** Google search, Instagram, friend referral
**Decision trigger:** Reviews, transparency, provider credentials

## Brand Voice
**Words that define Lumina:** Expert · Honest · Warm
- Expert means: We cite clinical evidence, we show credentials, we correct misinformation
- Honest means: We say "that won't work for you" when it's true, we publish prices, we don't do fake urgency
- Warm means: Every patient is a person, not a chart. We remember them.

## Core Value Proposition
Lumina Aesthetics delivers the same-day results you'd expect at a luxury practice — with a clinical team that actually explains what they're doing and a culture where you'll never feel sold to.

## Brand Story (About Us Page)
Lumina Aesthetics was founded because we kept seeing the same problem in the Austin market: beautiful spaces with pushy sales cultures, or great clinical skills wrapped in an impersonal experience. 

We built something different. Our team of four providers has collectively trained under the top aesthetic educators in the country — and we use that expertise to serve patients who want to look like themselves, only better.

We don't offer a menu of treatments. We offer a treatment plan built around your actual face and your actual goals.

Three years in. 214 five-star reviews. We're just getting started.

## Tagline Options
1. "Results that look like you" ← Recommended
2. "Aesthetics with integrity"
3. "Expert care. No pressure."
4. "Look the way you feel"
5. "Where clinical meets personal"

## Key Differentiators
1. **No commission structure** — providers recommend what you need, not what pays most
2. **30-minute consultation minimum** — every patient gets real time with their provider
3. **Transparent pricing** — full service menu with prices on the website
4. **4.7 Google rating, 214 reviews** — let the patients speak for themselves`

  const EMAIL_OUTPUT = `**Subject:** It's been a while, [First Name] — your Botox is ready for a refresh
**Preview text:** 10 seconds to rebook. We'll take it from there.

---

Hi [First Name],

I noticed it's been about [X weeks] since your last visit — which means your Botox is probably right at the edge of wearing off.

I know how busy Austin gets. But catching it now, before the lines start to re-establish, means less product, better results, and a faster appointment.

We're offering a complimentary touch-up consultation this month for patients who haven't been in over 90 days. No pressure — just a chance to check in and make sure we're taking care of you.

**[Book Your Refresh Consultation →]**

As always, if anything about your last visit wasn't right, please tell me. I read every reply personally.

Talk soon,
Dr. Sarah Chen
Lumina Aesthetics — (512) 555-0192

P.S. Your treatment notes are still in your chart. We pick right up where we left off.

---

*A/B Test Option B:*
**Subject:** [First Name], when was the last time you really took care of your skin?
**Preview text:** We've been thinking about you.`

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', width: 'fit-content' }}>
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? 'btn-primary text-navy-950' : 'text-gray-400 hover:text-white'}`}>
              <Icon size={14} />{t.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'social' && (
        <div className="space-y-4">
          <Card>
            <CardHeader title="30-Day Social Media Calendar" subtitle="AI generates a full month of content strategy" icon={Calendar} />
            <p className="text-sm text-gray-400 mb-4">Pre-configured for Lumina Aesthetics in Austin, TX. Adjust for your practice in settings.</p>
            <Button variant="primary" icon={<Sparkles size={14} />} loading={loading} onClick={generateSocial}>
              Generate 30-Day Calendar
            </Button>
          </Card>
          {output && (
            <Card>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-display font-semibold text-white">Your Calendar</h3>
                <Button variant="ghost" size="sm" icon={copied ? <Check size={13} /> : <Copy size={13} />}
                  onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-body max-h-[600px] overflow-y-auto">{output}</pre>
            </Card>
          )}
          {loading && !output && <div className="flex justify-center py-8"><GinaTyping message="Building your social calendar..." /></div>}
        </div>
      )}

      {activeTab === 'brand' && (
        <div className="space-y-4">
          <Card>
            <CardHeader title="Brand Builder" subtitle="Define your practice identity and voice" icon={Palette} />
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { key: 'name', label: 'Practice Name' },
                { key: 'city', label: 'City' },
                { key: 'services', label: 'Core Services' },
                { key: 'differentiator', label: 'What makes you different?' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
                  <input className="form-input w-full px-3 py-2.5 rounded-xl text-sm" value={brandForm[f.key]}
                    onChange={e => setBrandForm(b => ({ ...b, [f.key]: e.target.value }))} />
                </div>
              ))}
            </div>
            <Button variant="primary" icon={<Sparkles size={14} />} loading={loading}
              onClick={() => { setLoading(true); setOutput(''); simulateTyping(BRAND_OUTPUT, c => setOutput(p => p + c), () => setLoading(false), 12) }}>
              Build Brand Identity
            </Button>
          </Card>
          {output && (
            <Card>
              <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-body">{output}</pre>
            </Card>
          )}
          {loading && !output && <div className="flex justify-center py-8"><GinaTyping message="Building your brand..." /></div>}
        </div>
      )}

      {activeTab === 'email' && (
        <div className="space-y-4">
          <Card>
            <CardHeader title="Email Campaign Generator" subtitle="High-converting patient emails, ready to send" icon={Mail} />
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-2 block">Campaign Type</label>
              <div className="flex flex-wrap gap-2">
                {['Re-engagement', 'New Patient Welcome', 'Promotional', 'Post-Treatment', 'Membership Offer'].map(t => (
                  <button key={t} onClick={() => setEmailType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${emailType === t ? 'btn-primary text-navy-950' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="primary" icon={<Sparkles size={14} />} loading={loading}
              onClick={() => { setLoading(true); setOutput(''); simulateTyping(EMAIL_OUTPUT, c => setOutput(p => p + c), () => setLoading(false), 12) }}>
              Generate Email
            </Button>
          </Card>
          {output && (
            <Card>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-display font-semibold text-white">{emailType} Email</h3>
                <Button variant="ghost" size="sm" icon={copied ? <Check size={13} /> : <Copy size={13} />}
                  onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-body">{output}</pre>
            </Card>
          )}
          {loading && !output && <div className="flex justify-center py-8"><GinaTyping message="Writing your email..." /></div>}
        </div>
      )}
    </div>
  )
}
