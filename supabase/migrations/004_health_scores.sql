CREATE TABLE IF NOT EXISTS health_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  practice_id UUID REFERENCES practices(id) ON DELETE SET NULL,
  intake_data JSONB,
  scores JSONB,
  overall_score INTEGER,
  red_flags JSONB DEFAULT '[]',
  action_plan JSONB DEFAULT '[]',
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE health_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own health scores" ON health_scores
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_health_scores_user_id ON health_scores(user_id);
