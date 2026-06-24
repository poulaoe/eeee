-- Bootstrap minimal pour le nouveau projet Supabase
-- Crée les tables utilisées par l'application: leaderboard, feedback, chat

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz NOT NULL DEFAULT now(),
  subject varchar(120) NOT NULL,
  "user" varchar(120) NOT NULL,
  score numeric NOT NULL DEFAULT 0,
  max numeric NOT NULL DEFAULT 0,
  pct numeric NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz NOT NULL DEFAULT now(),
  subject varchar(120) NOT NULL,
  "user" varchar(120) NOT NULL,
  type varchar(50) NOT NULL DEFAULT 'report',
  chapter varchar(120),
  question varchar(500),
  description text,
  message text
);

CREATE TABLE IF NOT EXISTS public.chat (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  "user" varchar(120) NOT NULL,
  subject varchar(120) NOT NULL DEFAULT 'General',
  message text NOT NULL,
  unread_count int NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_date ON public.leaderboard(date DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_date ON public.feedback(date DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON public.feedback(type);
CREATE INDEX IF NOT EXISTS idx_chat_created_at ON public.chat(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_subject ON public.chat(subject);

ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS leaderboard_select_all ON public.leaderboard;
DROP POLICY IF EXISTS leaderboard_insert_anon ON public.leaderboard;
DROP POLICY IF EXISTS feedback_select_all ON public.feedback;
DROP POLICY IF EXISTS feedback_insert_anon ON public.feedback;
DROP POLICY IF EXISTS chat_select_all ON public.chat;
DROP POLICY IF EXISTS chat_insert_anon ON public.chat;

CREATE POLICY leaderboard_select_all ON public.leaderboard
  FOR SELECT TO anon USING (true);

CREATE POLICY leaderboard_insert_anon ON public.leaderboard
  FOR INSERT TO anon
  WITH CHECK (
    COALESCE(NULLIF(BTRIM(subject), ''), '') <> ''
    AND LENGTH(subject) <= 120
    AND COALESCE(NULLIF(BTRIM("user"), ''), '') <> ''
    AND LENGTH("user") <= 120
    AND date IS NOT NULL
    AND score >= 0
    AND max >= 0
    AND score <= max
    AND pct >= 0
    AND pct <= 100
  );

CREATE POLICY feedback_select_all ON public.feedback
  FOR SELECT TO anon USING (true);

CREATE POLICY feedback_insert_anon ON public.feedback
  FOR INSERT TO anon
  WITH CHECK (
    COALESCE(NULLIF(BTRIM(subject), ''), '') <> ''
    AND LENGTH(subject) <= 120
    AND COALESCE(NULLIF(BTRIM("user"), ''), '') <> ''
    AND LENGTH("user") <= 120
    AND COALESCE(NULLIF(BTRIM(type), ''), '') <> ''
    AND LENGTH(type) <= 50
  );

CREATE POLICY chat_select_all ON public.chat
  FOR SELECT TO anon USING (true);

CREATE POLICY chat_insert_anon ON public.chat
  FOR INSERT TO anon
  WITH CHECK (
    COALESCE(NULLIF(BTRIM("user"), ''), '') <> ''
    AND LENGTH("user") <= 120
    AND COALESCE(NULLIF(BTRIM(subject), ''), '') <> ''
    AND LENGTH(subject) <= 120
    AND COALESCE(NULLIF(BTRIM(message), ''), '') <> ''
  );

COMMIT;
