import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore from '../store/useAuthStore'
import Button from '../components/ui/Button'

export default function Auth() {
  const navigate = useNavigate()
  const signIn = useAuthStore(s => s.signIn)
  const signUp = useAuthStore(s => s.signUp)
  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: 'sarah@luminaaesthetics.com',
    password: 'demo1234',
    fullName: '',
    practiceName: '',
  })

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'login') {
        const { error } = await signIn(form.email, form.password)
        if (error) {
          toast.error(error.message || 'Sign in failed')
        } else {
          toast.success('Welcome back!')
          navigate('/')
        }
      } else {
        const { error } = await signUp(form.email, form.password, form.fullName, form.practiceName)
        if (error) {
          toast.error(error.message || 'Sign up failed')
        } else {
          toast.success('Account created! Welcome to Gina\'s AI')
          navigate('/')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f8f6f3]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[#fffefb] via-[#faf7f2] to-[#f5efe6] border-r border-gray-200"
      >
        {/* Background orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #d4a853, transparent)' }}
        />
        <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #e8748a, transparent)' }}
        />

        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg">
              <span className="font-display font-bold text-navy-950 text-lg">G</span>
            </div>
            <div>
              <p className="font-display font-bold text-navy-950">Gina's AI</p>
              <p className="text-xs text-gray-600">Med Spa Intelligence Platform</p>
            </div>
          </div>

          <h1 className="font-display text-4xl font-bold text-navy-950 leading-tight mb-6">
            The intelligence platform built for{' '}
            <span className="text-gold-gradient">med spa owners</span>
          </h1>
          <p className="text-gray-600 leading-relaxed mb-10">
            20 years of aesthetics industry experience, benchmarks from 100+ practices, 
            and Gina's exact frameworks — available 24/7, on demand.
          </p>

          <div className="space-y-4">
            {[
              { icon: '📊', text: 'Diagnose your practice health in minutes' },
              { icon: '💬', text: 'Ask anything, get real answers instantly' },
              { icon: '🎯', text: 'Scripts, templates, and hiring tools built in' },
              { icon: '📈', text: 'Financial benchmarks from top-performing practices' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="glass-card rounded-xl p-4 border border-gold-500/15">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-navy-950 text-xs">G</span>
              </div>
              <div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "Your payroll at 45.5% isn't a staffing problem — it's a productivity tracking problem. 
                  Let's pull the per-provider numbers."
                </p>
                <p className="text-xs text-gold-700 mt-2">— Gina's AI, responding to a real client</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center shadow-lg mx-auto mb-4 glow-gold">
              <Sparkles size={20} className="text-navy-950" />
            </div>
            <h2 className="font-display text-2xl font-bold text-navy-950">
              {mode === 'login' ? 'Welcome back' : 'Get started'}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {mode === 'login'
                ? 'Sign in to your intelligence platform'
                : 'Create your Gina\'s AI account'}
            </p>
          </div>

          {/* Demo mode banner */}
          <div className="mb-6 px-4 py-3 rounded-xl" style={{
            background: 'rgba(212,168,83,0.08)',
            border: '1px solid rgba(212,168,83,0.2)',
          }}>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-gold-500" />
              <p className="text-xs text-gold-400 font-medium">Demo Mode Active</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Credentials are pre-filled. Click sign in to explore with Lumina Aesthetics demo data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={update('fullName')}
                    placeholder="Dr. Sarah Chen"
                    className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Practice Name</label>
                  <input
                    type="text"
                    value={form.practiceName}
                    onChange={update('practiceName')}
                    placeholder="Lumina Aesthetics"
                    className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="you@practice.com"
                className="form-input w-full px-4 py-3 rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="••••••••"
                  className="form-input w-full px-4 py-3 pr-10 rounded-xl text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full justify-center py-3 text-base"
              icon={<ArrowRight size={16} />}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-gray-500 hover:text-gold-500 transition-colors"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>

          <p className="text-xs text-center text-gray-700 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  )
}
