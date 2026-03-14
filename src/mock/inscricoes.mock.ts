import type { InscricaoCampeonatoResponse } from '@/types/api.types';
import { StatusInscricao } from '@/types/api.types';

export const inscricoesMock: InscricaoCampeonatoResponse[] = [
  {
    id: 1,
    campeonatoId: 1,
    campeonatoTitulo: 'Campeonato de Verão 2026',
    timeId: 1,
    timeNome: 'Team Phoenix',
    status: StatusInscricao.Pendente,
    dataInscricao: '2026-02-01',
  },
  {
    id: 2,
    campeonatoId: 1,
    campeonatoTitulo: 'Campeonato de Verão 2026',
    timeId: 2,
    timeNome: 'Dragons E-Sports',
    status: StatusInscricao.Aprovada,
    dataInscricao: '2026-02-02',
    dataAprovacao: '2026-02-03',
  },
  {
    id: 3,
    campeonatoId: 2,
    campeonatoTitulo: 'Copa Inverno 2026',
    timeId: 3,
    timeNome: 'Midnight Wolves',
    status: StatusInscricao.Rejeitada,
    dataInscricao: '2026-02-20',
    dataAprovacao: '2026-02-21',
  },
];
