CREATE TABLE IF NOT EXISTS generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module TEXT,
  input_params JSONB,
  content TEXT,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own generated content" ON generated_content
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_generated_content_user_id ON generated_content(user_id);
CREATE INDEX idx_generated_content_module ON generated_content(module);
