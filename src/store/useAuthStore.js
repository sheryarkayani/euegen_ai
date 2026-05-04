import { create } from 'zustand'
import { dummyPractice, dummyOwner } from '../data/dummyPractice'

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

const useAuthStore = create((set, get) => ({
  user: isDemoMode ? dummyOwner : null,
  practice: isDemoMode ? dummyPractice : null,
  session: isDemoMode ? { demo: true } : null,
  isLoading: false,

  setUser: (user) => set({ user }),
  setPractice: (practice) => set({ practice }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),

  signIn: async (email, password) => {
    if (isDemoMode) {
      set({ user: dummyOwner, practice: dummyPractice, session: { demo: true } })
      return { error: null }
    }
    // Real Supabase auth
    const { supabase } = await import('../lib/supabase')
    if (!supabase) return { error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error && data.user) {
      set({ user: data.user, session: data.session })
    }
    return { error }
  },

  signUp: async (email, password, fullName, practiceName) => {
    if (isDemoMode) {
      set({ user: dummyOwner, practice: dummyPractice, session: { demo: true } })
      return { error: null }
    }
    const { supabase } = await import('../lib/supabase')
    if (!supabase) return { error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, practice_name: practiceName } }
    })
    return { error, data }
  },

  signOut: async () => {
    if (isDemoMode) {
      // In demo mode, just simulate sign out then back in
      set({ user: null, session: null })
      setTimeout(() => {
        set({ user: dummyOwner, practice: dummyPractice, session: { demo: true } })
      }, 1500)
      return
    }
    const { supabase } = await import('../lib/supabase')
    if (supabase) await supabase.auth.signOut()
    set({ user: null, session: null, practice: null })
  },

  isAuthenticated: () => !!get().session,

  userTier: () => get().user?.tier || 'free',
}))

export default useAuthStore
