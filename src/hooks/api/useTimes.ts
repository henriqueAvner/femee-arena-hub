import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { timesService, rankingService } from '@/services';
import type { 
  TimeResponse, 
  CreateTimeRequest, 
  UpdateTimeRequest,
  PaginationParams 
} from '@/types/api.types';

// ============================================
// QUERY KEYS
// ============================================

export const timesKeys = {
  all: ['times'] as const,
  lists: () => [...timesKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...timesKeys.lists(), params] as const,
  ranking: (top?: number) => ['ranking', top] as const,
  rankingByCampeonato: (campeonatoId: number) => ['ranking', 'campeonato', campeonatoId] as const,
  details: () => [...timesKeys.all, 'detail'] as const,
  detail: (id: number) => [...timesKeys.details(), id] as const,
  slug: (slug: string) => [...timesKeys.all, 'slug', slug] as const,
};

// ============================================
// QUERIES
// ============================================

/**
 * Hook para buscar todos os times
 */
export function useTimes(params?: PaginationParams) {
  return useQuery({
    queryKey: timesKeys.list(params),
    queryFn: () => timesService.getAll(params),
  });
}

/**
 * Hook para buscar time por ID
 */
export function useTime(id: number) {
  return useQuery({
    queryKey: timesKeys.detail(id),
    queryFn: () => timesService.getById(id),
    enabled: !!id && id > 0,
  });
}

/**
 * Hook para buscar time por slug
 */
export function useTimeBySlug(slug: string) {
  return useQuery({
    queryKey: timesKeys.slug(slug),
    queryFn: () => timesService.getBySlug(slug),
    enabled: !!slug && slug.length > 0,
  });
}

/**
 * Hook para buscar ranking geral de times
 * Usa endpoint dedicado: GET /ranking
 */
export function useTimesRanking(top?: number) {
  return useQuery({
    queryKey: timesKeys.ranking(top),
    queryFn: () => rankingService.getGeral(top),
  });
}

/**
 * Hook para buscar ranking de um campeonato específico
 * Usa endpoint: GET /ranking/campeonato/{campeonatoId}
 */
export function useRankingByCampeonato(campeonatoId: number) {
  return useQuery({
    queryKey: timesKeys.rankingByCampeonato(campeonatoId),
    queryFn: () => rankingService.getByCampeonato(campeonatoId),
    enabled: !!campeonatoId && campeonatoId > 0,
  });
}

// ============================================
// MUTATIONS
// ============================================

/**
 * Hook para criar time
 */
export function useCreateTime() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTimeRequest) => timesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: timesKeys.ranking() });
    },
  });
}

/**
 * Hook para atualizar time
 */
export function useUpdateTime() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTimeRequest }) =>
      timesService.update(id, data),
    onSuccess: (updatedTime) => {
      queryClient.setQueryData(timesKeys.detail(updatedTime.id), updatedTime);
      queryClient.setQueryData(timesKeys.slug(updatedTime.slug), updatedTime);
      queryClient.invalidateQueries({ queryKey: timesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: timesKeys.ranking() });
    },
  });
}

/**
 * Hook para deletar time
 */
export function useDeleteTime() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => timesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timesKeys.all });
    },
  });
}
