-- Supprime les doublons exacts existants dans public.leaderboard
-- Conserve une seule ligne par combinaison exacte de date/subject/user/score/max/pct

BEGIN;

WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY date, subject, "user", score, max, pct
      ORDER BY id
    ) AS row_num
  FROM public.leaderboard
), duplicates AS (
  SELECT id
  FROM ranked
  WHERE row_num > 1
)
DELETE FROM public.leaderboard
WHERE id IN (SELECT id FROM duplicates);

COMMIT;
