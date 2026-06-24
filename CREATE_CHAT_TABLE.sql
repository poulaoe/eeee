-- Créer la table chat dans Supabase
CREATE TABLE IF NOT EXISTS chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "user" VARCHAR(120) NOT NULL,
  subject VARCHAR(120) NOT NULL DEFAULT 'General',
  message TEXT NOT NULL,
  unread_count INT DEFAULT 0
);

-- Créer des index pour les performances
CREATE INDEX IF NOT EXISTS idx_chat_created_at ON chat(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_user ON chat("user");
CREATE INDEX IF NOT EXISTS idx_chat_subject ON chat(subject);

-- Activer Row Level Security (optionnel pour sécurité)
ALTER TABLE chat ENABLE ROW LEVEL SECURITY;

-- Policy: Tout le monde peut lire
CREATE POLICY "Enable read access for all users" ON chat
  FOR SELECT USING (true);

-- Policy: Tout le monde peut insérer
CREATE POLICY "Enable insert for all users" ON chat
  FOR INSERT WITH CHECK (true);
