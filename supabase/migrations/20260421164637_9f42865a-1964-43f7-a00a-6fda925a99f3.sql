-- Add pontuação fields to campeonato_times (points earned by team in championship)
ALTER TABLE public.campeonato_times
  ADD COLUMN pontos integer NOT NULL DEFAULT 0,
  ADD COLUMN vitorias integer NOT NULL DEFAULT 0,
  ADD COLUMN empates integer NOT NULL DEFAULT 0,
  ADD COLUMN derrotas integer NOT NULL DEFAULT 0,
  ADD COLUMN posicao integer;

-- Public read access for the new fields is already covered by existing policy on campeonato_times

-- View aggregating team rankings across all championships
CREATE OR REPLACE VIEW public.ranking_times AS
SELECT
  t.id AS time_id,
  t.nome,
  t.sigla,
  t.logo,
  t.cidade,
  t.slug,
  COALESCE(SUM(ct.pontos), 0)::int AS pontos,
  COALESCE(SUM(ct.vitorias), 0)::int AS vitorias,
  COALESCE(SUM(ct.empates), 0)::int AS empates,
  COALESCE(SUM(ct.derrotas), 0)::int AS derrotas,
  COUNT(ct.campeonato_id)::int AS campeonatos_disputados
FROM public.times t
LEFT JOIN public.campeonato_times ct ON ct.time_id = t.id
WHERE t.ativo = true
GROUP BY t.id, t.nome, t.sigla, t.logo, t.cidade, t.slug
ORDER BY pontos DESC, vitorias DESC, t.nome ASC;

GRANT SELECT ON public.ranking_times TO anon, authenticated;