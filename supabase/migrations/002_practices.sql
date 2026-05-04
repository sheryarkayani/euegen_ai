CREATE TABLE IF NOT EXISTS practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT,
  state TEXT,
  num_locations INTEGER DEFAULT 1,
  num_providers INTEGER DEFAULT 1,
  monthly_revenue_range TEXT,
  services JSONB DEFAULT '[]',
  ownership_structure TEXT,
  emr_system TEXT,
  has_membership BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE practices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own practices" ON practices
  FOR ALL USING (auth.uid() = user_id);
