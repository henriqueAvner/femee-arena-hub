import { StatusCampeonato } from '@/types/api.types';

export const campeonatosMock = [
  {
    id: 1,
    titulo: 'Campeonato de Verão 2026',
    descricao: 'Torneio anual de verão',
    dataInicio: '2026-01-10',
    dataFim: '2026-02-10',
    local: 'Arena Central',
    premiacao: 5000,
    numeroVagas: 16,
    numeroInscritos: 10,
    status: StatusCampeonato.EmAndamento,
    nome: 'Campeonato de Verão', // alias
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    dataLimiteInscricao: '2025-12-31',
    maximoTimes: 16, // alias
    quantidadeTimesInscritos: 10, // alias
    jogo: {
      id: 1,
      nome: 'League of Legends',
      slug: 'league-of-legends',
      iconeUrl: '/assets/league-of-legends-icone.png',
      ativo: true,
    },
  },
  {
    id: 3,
    titulo: 'Torneio Primavera 2026',
    descricao: 'Competição amistosa de equipes universitárias',
    dataInicio: '2026-09-05',
    dataFim: '2026-09-20',
    local: 'Ginásio Poliesportivo',
    premiacao: 2000,
    numeroVagas: 8,
    numeroInscritos: 6,
    status: StatusCampeonato.InscricoesAbertas,
    nome: 'Torneio Primavera',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    dataLimiteInscricao: '2026-08-31',
    maximoTimes: 8,
    quantidadeTimesInscritos: 6,
    jogo: {
      id: 3,
      nome: 'Counter-Strike 2',
      slug: 'counter-strike-2',
      iconeUrl: '/assets/cs2-icone.png',
      ativo: true,
    },
  },
  {
    id: 2,
    titulo: 'Copa Inverno 2026',
    descricao: 'Competição regional de inverno',
    dataInicio: '2026-07-01',
    dataFim: '2026-07-30',
    local: 'Estádio Municipal',
    premiacao: 3000,
    numeroVagas: 12,
    numeroInscritos: 5,
    status: StatusCampeonato.Planejado,
    nome: 'Copa Inverno', // alias
    cidade: 'São Paulo',
    estado: 'SP',
    dataLimiteInscricao: '2026-06-20',
    maximoTimes: 12, // alias
    quantidadeTimesInscritos: 5, // alias
    jogo: {
      id: 2,
      nome: 'Valorant',
      slug: 'valorant',
      iconeUrl: '/assets/valorant-icone.png',
      ativo: true,
    },
  },
];