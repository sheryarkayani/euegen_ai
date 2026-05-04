/**
 * Resolves whether the app runs in demo mode (bypass Supabase / use dummy data).
 *
 * - VITE_DEMO_MODE=true  → always demo
 * - VITE_DEMO_MODE=false → never auto-demo (requires valid Supabase)
 * - unset               → demo if Supabase URL/key are missing or still placeholders
 *
 * This lets Vercel preview/production work without setting every env var, while a real
 * Supabase project only needs valid VITE_SUPABASE_* (and optional VITE_DEMO_MODE=false).
 */
export function isDemoModeResolved() {
  const explicit = String(import.meta.env.VITE_DEMO_MODE ?? '').toLowerCase().trim()
  if (explicit === 'false' || explicit === '0' || explicit === 'off' || explicit === 'no') {
    return false
  }
  if (explicit === 'true' || explicit === '1' || explicit === 'on' || explicit === 'yes') {
    return true
  }

  const url = String(import.meta.env.VITE_SUPABASE_URL ?? '').trim()
  const key = String(import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

  const urlMissingOrPlaceholder =
    !url ||
    url.includes('[project]') ||
    /your[_-]?project/i.test(url) ||
    url === 'https://[project].supabase.co'

  const keyMissingOrPlaceholder =
    !key ||
    key.includes('[anon') ||
    /your[_-]?anon/i.test(key) ||
    key === '[anon_key]'

  return urlMissingOrPlaceholder || keyMissingOrPlaceholder
}

/** Resolved once at module load (Vite inlines `import.meta.env` at build time). */
export const isAppDemoMode = isDemoModeResolved()
