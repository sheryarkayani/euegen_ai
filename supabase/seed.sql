-- Seed data for demo practice: Lumina Aesthetics
-- This seed is for reference only — the app uses demo data from dummyPractice.js in DEMO_MODE

-- Demo practice record (would require a real user UUID in production)
-- INSERT INTO practices (id, name, state, num_locations, num_providers, monthly_revenue_range, services, ownership_structure, emr_system, has_membership)
-- VALUES (
--   'demo-practice-001',
--   'Lumina Aesthetics',
--   'Texas',
--   1,
--   4,
--   '$150K–$200K',
--   '["Botox/Dysport", "Dermal Fillers", "Laser Treatments", "Body Contouring", "Membership Program"]',
--   'Solo Ownership (Medical Director Model)',
--   'Boulevard',
--   true
-- );

-- Demo health score snapshot
-- INSERT INTO health_scores (overall_score, scores, red_flags)
-- VALUES (
--   63,
--   '{"financial": 48, "operational": 72, "sales": 58, "staffing": 74, "growth": 62}',
--   '[{"severity": "critical", "flag": "Payroll at 45.5%"}, {"severity": "warning", "flag": "Conversion at 52%"}]'
-- );

SELECT 'Seed file ready. Run migrations first, then populate with real user data.' as status;
