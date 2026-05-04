import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

let supabase = null

if (!isDemoMode && supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('[project]')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase, isDemoMode }
export default supabase
