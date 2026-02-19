import api from './api';
import type { TimeResponse } from '@/types/api.types';

// ============================================
// Tipos do backend para ranking
// ============================================

interface BackendRankingItem {
  teamName: string;
  teamId?: number;
  slug?: string;
  score: number;
  wins?: number;
  losses?: number;
  draws?: number;
  logoUrl?: string;
}

/**
 * Mapeia item de ranking do backend para TimeResponse do frontend
 */
function mapRankingToTime(item: BackendRankingItem, index: number): TimeResponse {
  return {
    id: item.teamId ?? index + 1,
    nome: item.teamName,
    slug: item.slug ?? item.teamName.toLowerCase().replace(/\s+/g, '-'),
    logoUrl: item.logoUrl,
    vitorias: item.wins ?? 0,
    derrotas: item.losses ?? 0,
    empates: item.draws ?? 0,
    pontos: item.score,
    posicaoRanking: index + 1,
    dataCriacao: '',
  };
}

export const rankingService = {
  /**
   * Obtém o ranking geral
   * Endpoint: GET /ranking
   */
  async getGeral(top?: number): Promise<TimeResponse[]> {
    const response = await api.get<BackendRankingItem[]>('/ranking', {
      params: top ? { top } : undefined,
    });
    return response.data.map(mapRankingToTime);
  },

  /**
   * Obtém ranking de um campeonato específico
   * Endpoint: GET /ranking/campeonato/{campeonatoId}
   */
  async getByCampeonato(campeonatoId: number): Promise<TimeResponse[]> {
    const response = await api.get<BackendRankingItem[]>(`/ranking/campeonato/${campeonatoId}`);
    return response.data.map(mapRankingToTime);
  },
};

export default rankingService;
