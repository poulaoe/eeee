-- Corrige la policy INSERT trop permissive sur public.leaderboard
-- Problème: anon_insert_leaderboard utilisait WITH CHECK (true)
-- Effet: tout payload était accepté pour le rôle anon.

BEGIN;

ALTER TABLE IF EXISTS public.leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS anon_insert_leaderboard ON public.leaderboard;

CREATE POLICY anon_insert_leaderboard
ON public.leaderboard
FOR INSERT
TO anon
WITH CHECK (
  -- Champs texte obligatoires, non vides et bornés
  COALESCE(NULLIF(BTRIM(subject), ''), '') <> ''
  AND LENGTH(subject) <= 120
  AND COALESCE(NULLIF(BTRIM("user"), ''), '') <> ''
  AND LENGTH("user") <= 120

  -- Date valide et raisonnable
  AND "date" IS NOT NULL
  AND "date" >= TIMESTAMPTZ '2020-01-01 00:00:00+00'
  AND "date" <= (NOW() + INTERVAL '1 day')

  -- Bornes numériques cohérentes avec l'application
  AND score IS NOT NULL
  AND max IS NOT NULL
  AND pct IS NOT NULL
  AND max >= 0
  AND score >= 0
  AND score <= max
  AND pct >= 0
  AND pct <= 100
);

COMMIT;
