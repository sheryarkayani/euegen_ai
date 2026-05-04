import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, BookOpen, Target, Mail, Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import GinaTyping from '../components/ui/GinaTyping'
import { simulateTyping } from '../lib/openrouter'
import { isAppDemoMode as DEMO_MODE } from '../lib/runtimeConfig'

const DEMO_SCRIPT = `# Consultation Script — Botox + Filler Consultation
## Lumina Aesthetics | Dr. Sarah Chen

---

### OPENING (0:00–1:00)
*Walk in with energy, make eye contact, extend hand*

"Hi [Name], I'm Sarah — so glad you're here today. Before we get started, I just want to say — the fact that you took time out of your day to invest in yourself says a lot. I love that.

Tell me, is this your first time doing a consultation like this, or have you had treatments before?"

*[Listen, validate, build rapport — 60 seconds max]*

---

### DISCOVERY QUESTIONS (1:00–4:00)
1. **"What brought you in today specifically — what was the moment you said, 'okay, I'm going to do something about this'?"**
   *(Looking for emotional driver, not just the treatment)*

2. **"When you look in the mirror, what's the one thing you wish looked different?"**
   *(Identify primary concern — this becomes your anchor)*

3. **"Have you ever done injectables before? What was your experience like?"**
   *(Calibrate expectations, identify fears)*

4. **"What's your timeline — is there a special event coming up, or are you more in 'I want to start now' mode?"**
   *(Creates urgency if there's an event)*

---

### CLINICAL ASSESSMENT (4:00–7:00)
*Move to the treatment chair, adjust lighting, use a handheld mirror*

**Say:** "I'm going to take a look at your face and tell you exactly what I see — and then we'll talk about what I'd recommend. Fair?"

*[Narrate what you're seeing — out loud. This builds trust and shows expertise.]*

"So what I'm seeing here is movement in the glabella — those 11s between your brows — and you've got some early forehead lines that are starting to etch in. Your nasolabial folds have some early volume loss here, and your lips have a little deflation compared to where they were probably 5–7 years ago. Nothing dramatic — but I can see what you're seeing."

---

### TREATMENT RECOMMENDATION (7:00–10:00)
**Lead with the solution. Name the price.**

"Based on what I'm seeing, here's what I'd recommend for today:

**Starter Plan — $1,100**
- 25 units Botox: glabella and forehead — $275
- 1 syringe Restylane Lyft: nasolabial folds — $750
- 0.5 syringe lip filler: definition and subtle volume — $450
- Loyalty credit: -$375 (new patient offer)

**Total: $1,100**

This is going to take about 45 minutes, you'll see the Botox kick in over 7–10 days, and the filler is immediate. Most patients love their results at 2 weeks."

*[Pause. Let it land. Don't apologize for the price.]*

---

### OBJECTION HANDLING

**"I need to think about it."**
"Totally fair — what specifically do you want to think through? Is it the price, the procedure itself, or something else? Because I want to make sure you leave with everything you need to make a confident decision."

**"It's too expensive."**
"I hear you. Can I ask — what were you expecting to spend? *(Listen)* Okay. Here's what I can do — let's start with just the Botox today at $275, and schedule the filler for next month. That way you can see how you respond, and we build from there. Does that work?"

**"Let me check with my partner."**
"Of course — I do want to mention our new patient offer expires at the end of this week, so if you can make a decision by Thursday, I can hold that pricing for you. If not, no pressure — we'll take care of you either way."

---

### THE CLOSE
*Never say "let me know what you want to do." Always name the next step.*

"Okay, so how would you like to proceed — should I get you set up for today, or would you prefer we start with just the Botox and schedule the filler next time?"

*[Wait for response. The first person to speak loses.]*

---

### REBOOK BEFORE THEY LEAVE
"Your Botox will last 3–4 months, so I'd love to get your next appointment on the books now. I have October 14th or October 21st at 11am — which works better for you?"

---

*Script developed by Gina's AI — The Med Spa Matchmaker Intelligence Platform*`

const CONSULT_LESSONS = [
  {
    num: 1,
    title: 'The Opening: First 60 Seconds',
    color: '#d4a853',
    icon: '🚀',
    content: `The opening sets the emotional tone for the entire consultation. Most providers waste it with clinical intake questions.

**What top performers do:**
They walk in like they're greeting a friend who just asked for help. Warm, confident, present.

**The three things to accomplish in 60 seconds:**
1. Build rapport (find one genuine personal connection)
2. Establish credibility (brief mention of your background — don't oversell)
3. Set the frame ("I'm going to take a good look, and then I'll tell you exactly what I see and what I'd recommend")

**What to avoid:**
- Don't start with paperwork or insurance
- Don't ask "what are you here for?" — it puts them in charge of a conversation they aren't qualified to lead
- Don't sit behind a desk — it creates physical and psychological distance

**Gina's rule:** If you're not smiling when you walk in, you've already lost 30% of the sale.`,
  },
  {
    num: 2,
    title: 'Discovery Questions That Actually Work',
    color: '#e8748a',
    icon: '🔍',
    content: `Discovery is not a checklist. It's a conversation designed to understand the emotional driver behind the patient's visit.

**The emotional driver principle:**
Patients don't buy Botox. They buy the feeling of looking rested. They buy confidence. They buy the version of themselves they remember from 10 years ago.

**The 4 questions that unlock the sale:**
1. "What brought you in today specifically?"
2. "When you look in the mirror, what's the one thing you wish looked different?"
3. "What's holding you back from doing this sooner?" (Reveals objections early)
4. "What would it mean to you to have this addressed?"

**What you're listening for:**
- The specific concern (their anchor)
- The emotional reason behind it
- Any fears or past bad experiences
- Their timeline (urgency)
- Their budget expectations (read between the lines)

**Pro tip:** Take notes. Patients notice when you remember what they said. It builds extraordinary trust.`,
  },
  {
    num: 3,
    title: 'The Clinical Assessment Narration',
    color: '#3b82f6',
    icon: '🔬',
    content: `This is where you establish yourself as the expert. Most providers go silent during the assessment — this is a major missed opportunity.

**Narrate what you see:**
Don't just look at the patient. Tell them what you see, out loud. This does two things:
1. Shows your expertise in real-time
2. Builds agreement on the problems before you present solutions

**Example narration:**
"So what I'm seeing here is some dynamic movement in the forehead — these lines only appear with expression right now, which means we catch them before they etch in permanently. Your brows have some early descent here — I can show you exactly what I mean. And in the mid-face, you've had some volume migration that's created this shadow under the eye. Each of these is addressable."

**The key:** Never say "problem." Say "area we can improve." Never say "you've lost volume." Say "there's an opportunity here."

**Validate, then recommend:**
"I can see exactly what you're seeing. Here's what I'd do about it."`,
  },
  {
    num: 4,
    title: 'Recommending and Presenting Price',
    color: '#10b981',
    icon: '💰',
    content: `Most providers lose the sale right here. They either don't make a recommendation or they apologize for the price.

**The prescription model:**
You wouldn't ask a patient what antibiotic they want. Recommend the treatment plan. Lead with it.

"Based on what I'm seeing, here's what I'd recommend..."

**The tiered offer:**
Always present 3 options:
- Starter: addresses the primary concern
- Full plan: addresses everything you discussed
- Maintenance: for established patients

This is called anchoring. When patients see the full plan, the starter looks reasonable.

**Presenting price:**
State it clearly. Don't mumble. Don't add "I know it's a lot" or "if that works for your budget."

"That's $1,100 for everything, and that includes our new patient loyalty credit."

Then pause. Don't speak first. The first person to talk after stating a price is negotiating against themselves.

**Gina's benchmark:** If >30% of patients say yes to your first offer without any objection, you're probably underpriced.`,
  },
  {
    num: 5,
    title: 'Handling Objections Like a Pro',
    color: '#8b5cf6',
    icon: '🛡️',
    content: `Objections are not rejections. They are requests for more information or reassurance.

**The three objections you'll hear 90% of the time:**

1. **"I need to think about it."**
Never say "okay, let me know!" That's the kiss of death.
Instead: "Of course. What specifically do you want to think through? I want to make sure you leave with everything you need to make a decision."

2. **"It's too expensive."**
Never discount immediately. Instead, ask: "What were you expecting to spend?"
Then either: validate that their number is doable with a modified plan, OR explain the value breakdown.

3. **"Let me check with my husband/wife/partner."**
"Absolutely. Are they supportive of you doing this? *(Yes)* Perfect. Is there any reason you couldn't make a decision by Friday? I ask because our new patient pricing is available through end of week."

**The universal objection response:**
1. Acknowledge ("I totally understand")
2. Clarify ("What specifically is making you hesitate?")
3. Address (based on what they say)
4. Trial close ("Does that address your concern?")`,
  },
  {
    num: 6,
    title: 'The Close and the Rebook',
    color: '#f59e0b',
    icon: '✅',
    content: `The close is not a dramatic moment. It's a natural transition from recommendation to next steps.

**Never use these phrases:**
- "Let me know what you want to do"
- "Think about it and call us"
- "It's totally up to you"

These give the patient an exit. Don't give them an exit.

**The assumptive close:**
"Okay, so how would you like to proceed — should we do the full plan today, or would you prefer to start with just the Botox?"

Notice: the options are "full plan" or "partial plan" — not "yes or no."

**If they say yes — the rebook:**
Before they leave the treatment room, say:
"Your Botox lasts 3–4 months — I want to get your next appointment on the books right now so you don't lose your timing. I have November 12th or November 19th. Which works better?"

**The magic of naming two dates:**
People don't say "neither." They pick one. This is the most powerful rebooking tool in the industry.

**Gina's stat:** Practices that rebook before the patient leaves see 75%+ rebooking rates. Practices that let patients "call later" see 40–55%.`,
  },
]

const EMAIL_TEMPLATES = [
  {
    name: 'New Patient Welcome',
    tag: 'Onboarding',
    subject: 'Welcome to Lumina Aesthetics, [First Name] — here\'s what to expect',
    body: `Hi [First Name],

We're so glad you chose Lumina Aesthetics for your care. We don't take that lightly — there are a lot of options in Austin, and we're honored you're giving us the chance to take care of you.

Here's what happens next:

**Before your appointment:**
- Your intake forms are attached — please complete them at least 24 hours before your visit
- Arrive 10 minutes early so we have time to review your goals together
- Come with a clean face (no makeup for injectable appointments)
- Avoid alcohol and blood thinners (aspirin, ibuprofen) for 48 hours prior

**What to expect:**
Your consultation with Dr. Chen will take about 30–45 minutes. She'll examine your concerns, explain exactly what she recommends, and answer every question you have — before we ever pick up a needle.

There's no pressure and no rush. This is your time.

See you soon,

Dr. Sarah Chen & The Lumina Team
📞 (512) 555-0192 | luminaaesthetics.com

P.S. If you need to reschedule, please let us know at least 48 hours in advance — your spot is held for you specifically.`,
  },
  {
    name: 'Re-engagement (90+ days)',
    tag: 'Retention',
    subject: 'It\'s been a while, [First Name] — your Botox is ready for a refresh',
    body: `Hi [First Name],

Quick reminder that it's been about [X weeks] since your last visit — which means your Botox is probably starting to wear off right about now.

I know how life gets busy. But this is actually the perfect window to come in before the lines start to re-establish. Catching it now means less product, better results, and a faster appointment.

**We're offering a complimentary touch-up consultation this month for patients who haven't been in 90+ days.** It's our way of saying we miss you — and making sure you're taken care of.

[Book Your Refresh →]

As always, if there's anything about your last experience I can make better — please tell me directly. I read every reply.

Dr. Sarah Chen
Lumina Aesthetics

P.S. Your treatment notes are already in your chart — we pick right up where we left off.`,
  },
  {
    name: 'Summer Promotion',
    tag: 'Promotional',
    subject: 'Summer is coming — is your skin ready? (offer inside)',
    body: `Hi [First Name],

Summer in Austin is no joke — and your skin knows it.

This month, we're offering:
**The Summer Glow Package — $899** *(regular $1,150)*
- Botox (20 units) — forehead + crow's feet
- 1 HydraFacial (Elite with lymphatic drainage)
- Complimentary ZO Skin Health SPF 50

The offer is only available to our current patients — it won't be advertised publicly.

[Claim Your Package →]

Available through June 30th. Appointments filling up quickly.

See you soon,
The Lumina Team

*Reply to this email with questions — we check them all day.*`,
  },
  {
    name: 'Post-Treatment Follow-Up',
    tag: 'Retention',
    subject: 'How are you feeling after your treatment, [First Name]?',
    body: `Hi [First Name],

It's been 48 hours since your appointment with us — I wanted to check in personally.

**Normal after injectables:**
- Mild tenderness or bruising at injection sites (usually gone in 2–3 days)
- Slight swelling (especially with filler — peaks at 48–72 hours, then resolves)
- Botox takes 7–10 days to reach full effect — resist the urge to judge it too early

**Call us right away if you experience:**
- Asymmetry that seems significant at 2 weeks
- Any vision changes after periorbital injections
- Unusual swelling or discoloration

**Questions?** Reply directly to this email or text us at (512) 555-0192. We respond within the hour during business hours.

Your follow-up appointment is scheduled for [Date]. We can't wait to see your results.

Dr. Sarah Chen`,
  },
]

function ScriptGenerator() {
  const [form, setForm] = useState({ treatment: 'Botox + Filler', concern: 'Anti-aging', patientType: 'First-time' })
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setLoading(true)
    setOutput('')
    if (DEMO_MODE) {
      simulateTyping(DEMO_SCRIPT, (c) => setOutput(p => p + c), () => setLoading(false), 8)
      return
    }
    // Real API call would go here
    toast.error('Add OpenRouter API key for live generation')
    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('Script copied!')
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="Script Generator" subtitle="AI generates a full consultation script for your specific scenario" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Treatment Type</label>
            <select className="form-input w-full px-3 py-2.5 rounded-xl text-sm"
              value={form.treatment} onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}>
              {['Botox + Filler', 'Botox Only', 'Full Syringe Filler', 'Laser Treatment', 'Body Contouring', 'Membership Upsell'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Primary Concern</label>
            <select className="form-input w-full px-3 py-2.5 rounded-xl text-sm"
              value={form.concern} onChange={e => setForm(f => ({ ...f, concern: e.target.value }))}>
              {['Anti-aging', 'Volume loss', 'Skin texture', 'Body contouring', 'Rejuvenation', 'Preventative'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Patient Type</label>
            <select className="form-input w-full px-3 py-2.5 rounded-xl text-sm"
              value={form.patientType} onChange={e => setForm(f => ({ ...f, patientType: e.target.value }))}>
              {['First-time', 'Returning', 'Hesitant', 'Price-conscious', 'VIP'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <Button variant="primary" icon={<Sparkles size={14} />} loading={loading} onClick={generate}>
          Generate Script
        </Button>
      </Card>

      {output && (
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-navy-950">Your Script</h3>
            <Button variant="ghost" size="sm" icon={copied ? <Check size={13} /> : <Copy size={13} />} onClick={copy}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="prose prose-sm prose-stone max-w-none text-gray-800">
            <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-body bg-transparent border-0 p-0">{output}</pre>
          </div>
        </Card>
      )}

      {loading && !output && (
        <div className="flex justify-center py-8">
          <GinaTyping message="Gina is writing your script..." />
        </div>
      )}
    </div>
  )
}

function ArtOfConsult() {
  const [activeLesson, setActiveLesson] = useState(null)
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONSULT_LESSONS.map(lesson => (
          <motion.div
            key={lesson.num}
            whileHover={{ y: -2 }}
            onClick={() => setActiveLesson(activeLesson?.num === lesson.num ? null : lesson)}
            className="glass-card rounded-xl p-4 cursor-pointer transition-all"
            style={{ border: activeLesson?.num === lesson.num ? `1px solid ${lesson.color}50` : '1px solid rgba(34,29,53,0.1)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{lesson.icon}</span>
              <div>
                <Badge variant="gold" size="xs">Lesson {lesson.num}</Badge>
                <p className="text-sm font-semibold text-navy-950 mt-1">{lesson.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Click to expand →</p>
          </motion.div>
        ))}
      </div>

      {activeLesson && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ borderColor: `${activeLesson.color}30` }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{activeLesson.icon}</span>
              <div>
                <Badge variant="gold" size="sm">Lesson {activeLesson.num}</Badge>
                <h3 className="font-display text-lg font-bold text-navy-950 mt-1">{activeLesson.title}</h3>
              </div>
            </div>
            <div className="prose prose-sm prose-stone max-w-none text-gray-800">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-body bg-transparent border-0 p-0">
                {activeLesson.content}
              </pre>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

function MysteryShop() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamMsg, setStreamMsg] = useState('')
  const [sessionEnded, setSessionEnded] = useState(false)

  const JAMIE_RESPONSES = [
    "Hi, I'm calling about Botox pricing. I saw you guys on Google but I also got a quote from Pure Aesthetics down the street for $10 a unit. Can you match that?",
    "Yeah but like... how long does it last? I had a friend who did Botox and it wore off in like 6 weeks. Is that gonna happen to me too?",
    "I'm a little nervous about needles honestly. Like, is it going to hurt a lot? And what if I don't like how it looks?",
    "Okay so let's say I come in for a consult — is that free? I don't want to feel pressured to buy something.",
    "My partner thinks I'm being vain doing this. I kind of feel like maybe I should just think about it more...",
    "**[END SESSION FEEDBACK]**\n\nScore: 7.2/10\n\nStrengths:\n- Good empathy on price objection (nice work not immediately discounting)\n- Clear explanation of longevity expectations\n\nAreas to improve:\n- On the needle anxiety objection, you should have offered a topical numbing option immediately — this closes fear loops fast\n- When the partner objection came up, you could have said: 'Most partners are really supportive once they see how natural the results look — do you think seeing some before/afters might help?'\n- Your close was too open-ended. End with specific dates: 'I have Tuesday at 2pm or Thursday at 11am — which works better?'\n\nNext step: Practice the price objection script 3x before your next consult.",
  ]
  const [jamieLine, setJamieLine] = useState(0)

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(m => [...m, userMsg])
    setInput('')

    if (input.toLowerCase().includes('end session') || jamieLine >= JAMIE_RESPONSES.length - 1) {
      setSessionEnded(true)
      const lastLine = JAMIE_RESPONSES[JAMIE_RESPONSES.length - 1]
      setStreaming(true)
      simulateTyping(lastLine, c => setStreamMsg(p => p + c), () => {
        setMessages(m => [...m, { role: 'jamie', content: lastLine }])
        setStreamMsg('')
        setStreaming(false)
      })
      return
    }

    setStreaming(true)
    const response = JAMIE_RESPONSES[jamieLine]
    setJamieLine(j => j + 1)
    setTimeout(() => {
      simulateTyping(response, c => setStreamMsg(p => p + c), () => {
        setMessages(m => [...m, { role: 'jamie', content: response }])
        setStreamMsg('')
        setStreaming(false)
      })
    }, 600)
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl" style={{ background: 'rgba(232,116,138,0.1)', border: '1px solid rgba(232,116,138,0.2)' }}>
          🎭
        </div>
        <h3 className="font-display text-xl font-bold text-navy-950 mb-2">Mystery Shopper Training</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Practice handling difficult patient scenarios with AI playing a skeptical, price-sensitive patient named "Jamie." Get scored at the end.
        </p>
        <Button variant="primary" icon={<Target size={14} />} onClick={() => {
          setStreaming(true)
          const opener = JAMIE_RESPONSES[0]
          setJamieLine(1)
          simulateTyping(opener, c => setStreamMsg(p => p + c), () => {
            setMessages([{ role: 'jamie', content: opener }])
            setStreamMsg('')
            setStreaming(false)
          })
        }}>
          Start Session
        </Button>
        <p className="text-xs text-gray-700 mt-3">Type "end session" to receive feedback</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-med/20 border border-rose-med/30 flex items-center justify-center text-sm">🎭</div>
          <div>
            <p className="text-sm font-medium text-navy-950">Jamie (AI Mystery Shopper)</p>
            <p className="text-xs text-gray-500">Skeptical first-timer · Price sensitive · Partner hesitant</p>
          </div>
        </div>
        <Badge variant="rose">Live Session</Badge>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto p-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${m.role === 'jamie' ? 'bg-rose-med/20' : 'bg-gray-200'}`}>
              {m.role === 'jamie' ? '🎭' : '💼'}
            </div>
            <div className={`max-w-lg rounded-2xl px-4 py-3 text-sm ${m.role === 'jamie' ? 'chat-message-gina' : 'chat-message-user'}`}>
              <pre className="whitespace-pre-wrap font-body text-gray-800">{m.content}</pre>
            </div>
          </div>
        ))}
        {streaming && streamMsg && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-rose-med/20 flex items-center justify-center text-sm">🎭</div>
            <div className="max-w-lg rounded-2xl px-4 py-3 text-sm chat-message-gina">
              <pre className="whitespace-pre-wrap font-body text-gray-800">{streamMsg}</pre>
            </div>
          </div>
        )}
        {streaming && !streamMsg && <div className="flex gap-3"><div className="w-7 h-7 rounded-full bg-rose-med/20 flex items-center justify-center text-sm">🎭</div><GinaTyping message="Jamie is typing..." /></div>}
      </div>

      {!sessionEnded && (
        <div className="flex gap-2">
          <input
            className="form-input flex-1 px-4 py-2.5 rounded-xl text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Respond as the provider... (type 'end session' for feedback)"
            disabled={streaming}
          />
          <button onClick={sendMessage} disabled={streaming} className="w-10 h-10 btn-primary rounded-xl flex items-center justify-center">
            <Send size={14} className="text-navy-950" />
          </button>
        </div>
      )}
    </div>
  )
}

function EmailTemplates() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const template = EMAIL_TEMPLATES[active]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        {EMAIL_TEMPLATES.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-full text-left p-3 rounded-xl transition-all text-sm ${
              active === i ? 'border-gold-500/40 bg-gold-500/6' : 'border-gray-200 hover:bg-gray-50'
            }`}
            style={{ border: `1px solid ${active === i ? 'rgba(212,168,83,0.4)' : 'rgba(34,29,53,0.08)'}` }}
          >
            <p className="font-medium text-navy-950">{t.name}</p>
            <Badge variant="gray" size="xs">{t.tag}</Badge>
          </button>
        ))}
      </div>
      <div className="lg:col-span-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Subject line:</p>
              <p className="font-medium text-navy-950">{template.subject}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={copied ? <Check size={13} /> : <Copy size={13} />}
              onClick={() => {
                navigator.clipboard.writeText(template.body)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'rgba(34,29,53,0.05)', border: '1px solid rgba(34,29,53,0.08)' }}>
            <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-body">{template.body}</pre>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function SalesTraining({ tab }) {
  const tabs = [
    { key: 'script', label: 'Script Generator', icon: Sparkles },
    { key: 'consult', label: 'Art of a Consult', icon: BookOpen },
    { key: 'mystery', label: 'Mystery Shopper', icon: Target },
    { key: 'email', label: 'Email Templates', icon: Mail },
  ]
  const [activeTab, setActiveTab] = useState(tab || 'script')

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: 'rgba(34,29,53,0.06)', width: 'fit-content' }}>
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === t.key ? 'btn-primary text-navy-950' : 'text-gray-400 hover:text-navy-950'
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'script' && <ScriptGenerator />}
      {activeTab === 'consult' && <ArtOfConsult />}
      {activeTab === 'mystery' && <Card><MysteryShop /></Card>}
      {activeTab === 'email' && <EmailTemplates />}
    </div>
  )
}
