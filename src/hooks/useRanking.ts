import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface RankingTime {
  time_id: string;
  nome: string;
  sigla: string | null;
  logo: string | null;
  cidade: string | null;
  slug: string;
  pontos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  campeonatos_disputados: number;
}

export function useRanking() {
  return useQuery({
    queryKey: ['ranking-times'],
    queryFn: async () => {
      // View `ranking_times` is not in generated types yet — cast through unknown
      const { data, error } = await (supabase as unknown as {
        from: (t: string) => {
          select: (q: string) => Promise<{ data: RankingTime[] | null; error: Error | null }>;
        };
      })
        .from('ranking_times')
        .select('*');
      if (error) throw error;
      return (data ?? []) as RankingTime[];
    },
  });
}
