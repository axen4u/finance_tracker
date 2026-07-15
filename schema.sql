-- Jalankan di Supabase SQL Editor
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  note TEXT,
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE saving_targets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  target_amt INTEGER NOT NULL,
  current_amt INTEGER DEFAULT 0,
  deadline TIMESTAMPTZ
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saving_targets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can CRUD own transactions"
  ON transactions FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "users can CRUD own saving targets"
  ON saving_targets FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);
