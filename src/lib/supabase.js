import { createClient } from '@supabase/supabase-js'
import { isAppDemoMode } from './runtimeConfig'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

if (!isAppDemoMode && supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('[project]')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase, isAppDemoMode as isDemoMode }
export default supabase
