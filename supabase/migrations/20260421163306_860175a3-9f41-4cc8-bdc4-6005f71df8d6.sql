
-- Status enum para campeonatos
CREATE TYPE public.campeonato_status AS ENUM ('futuro', 'em_andamento', 'encerrado');

-- Função utilitária para timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ============ NOTICIAS ============
CREATE TABLE public.noticias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  resumo TEXT,
  conteudo TEXT NOT NULL,
  imagem_capa TEXT,
  slug TEXT NOT NULL UNIQUE,
  publicado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  destaque BOOLEAN NOT NULL DEFAULT false,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_noticias_publicado_em ON public.noticias (publicado_em DESC);
CREATE INDEX idx_noticias_ativo ON public.noticias (ativo);

ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Notícias ativas são públicas" ON public.noticias
  FOR SELECT USING (ativo = true);

CREATE TRIGGER trg_noticias_updated_at
  BEFORE UPDATE ON public.noticias
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ CAMPEONATOS ============
CREATE TABLE public.campeonatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  status public.campeonato_status NOT NULL DEFAULT 'futuro',
  data_inicio DATE,
  data_fim DATE,
  imagem TEXT,
  regulamento_link TEXT,
  local TEXT,
  slug TEXT NOT NULL UNIQUE,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_campeonatos_status ON public.campeonatos (status);
CREATE INDEX idx_campeonatos_ativo ON public.campeonatos (ativo);

ALTER TABLE public.campeonatos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Campeonatos ativos são públicos" ON public.campeonatos
  FOR SELECT USING (ativo = true);

CREATE TRIGGER trg_campeonatos_updated_at
  BEFORE UPDATE ON public.campeonatos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ TIMES ============
CREATE TABLE public.times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  sigla TEXT,
  logo TEXT,
  descricao TEXT,
  cidade TEXT,
  slug TEXT NOT NULL UNIQUE,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_times_ativo ON public.times (ativo);

ALTER TABLE public.times ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Times ativos são públicos" ON public.times
  FOR SELECT USING (ativo = true);

CREATE TRIGGER trg_times_updated_at
  BEFORE UPDATE ON public.times
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ JOGADORES ============
CREATE TABLE public.jogadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  nickname TEXT NOT NULL,
  foto TEXT,
  posicao TEXT,
  time_id UUID REFERENCES public.times(id) ON DELETE CASCADE,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_jogadores_time ON public.jogadores (time_id);
CREATE INDEX idx_jogadores_ativo ON public.jogadores (ativo);

ALTER TABLE public.jogadores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jogadores ativos são públicos" ON public.jogadores
  FOR SELECT USING (ativo = true);

CREATE TRIGGER trg_jogadores_updated_at
  BEFORE UPDATE ON public.jogadores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ CAMPEONATO_TIMES ============
CREATE TABLE public.campeonato_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campeonato_id UUID NOT NULL REFERENCES public.campeonatos(id) ON DELETE CASCADE,
  time_id UUID NOT NULL REFERENCES public.times(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (campeonato_id, time_id)
);
CREATE INDEX idx_camp_times_camp ON public.campeonato_times (campeonato_id);
CREATE INDEX idx_camp_times_time ON public.campeonato_times (time_id);

ALTER TABLE public.campeonato_times ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Relação campeonato/times é pública" ON public.campeonato_times
  FOR SELECT USING (true);
