export type CampeonatoStatus = 'futuro' | 'em_andamento' | 'encerrado';

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string | null;
  conteudo: string;
  imagem_capa: string | null;
  slug: string;
  publicado_em: string;
  destaque: boolean;
  ativo: boolean;
}

export interface Campeonato {
  id: string;
  nome: string;
  descricao: string | null;
  status: CampeonatoStatus;
  data_inicio: string | null;
  data_fim: string | null;
  imagem: string | null;
  regulamento_link: string | null;
  local: string | null;
  slug: string;
  ativo: boolean;
}

export interface Time {
  id: string;
  nome: string;
  sigla: string | null;
  logo: string | null;
  descricao: string | null;
  cidade: string | null;
  slug: string;
  ativo: boolean;
}

export interface Jogador {
  id: string;
  nome: string;
  nickname: string;
  foto: string | null;
  posicao: string | null;
  time_id: string | null;
  ativo: boolean;
}

export const STATUS_LABEL: Record<CampeonatoStatus, string> = {
  futuro: 'Próximo',
  em_andamento: 'Em andamento',
  encerrado: 'Encerrado',
};
