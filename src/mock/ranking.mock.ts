import { timesMock } from './times.mock';
import type { TimeResponse } from '@/types/api.types';

// Para o mock de ranking, usamos os mesmos times do mock de times.
// O ranking é simplesmente a lista ordenada por pontos (maior para menor).
export const rankingMock: TimeResponse[] = [...timesMock]
  .sort((a, b) => (b.pontos ?? 0) - (a.pontos ?? 0))
  .map((time, index) => ({
    ...time,
    posicaoRanking: index + 1,
  }));
