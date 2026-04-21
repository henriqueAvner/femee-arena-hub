import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Campeonato, Jogador, Time } from '@/lib/types';

export function useTimes() {
  return useQuery({
    queryKey: ['times'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('times')
        .select('*')
        .eq('ativo', true)
        .order('nome');
      if (error) throw error;
      return data as Time[];
    },
  });
}

export function useTimeBySlug(slug: string) {
  return useQuery({
    queryKey: ['time', slug],
    queryFn: async () => {
      const { data: time, error } = await supabase
        .from('times')
        .select('*')
        .eq('slug', slug)
        .eq('ativo', true)
        .maybeSingle();
      if (error) throw error;
      if (!time) return null;

      const [{ data: jogadores }, { data: rels }] = await Promise.all([
        supabase
          .from('jogadores')
          .select('*')
          .eq('time_id', time.id)
          .eq('ativo', true)
          .order('nickname'),
        supabase
          .from('campeonato_times')
          .select('campeonatos(*)')
          .eq('time_id', time.id),
      ]);

      const campeonatos = (rels ?? [])
        .map((r: { campeonatos: Campeonato | null }) => r.campeonatos)
        .filter((c): c is Campeonato => !!c && c.ativo);

      return {
        ...(time as Time),
        jogadores: (jogadores ?? []) as Jogador[],
        campeonatos,
      };
    },
    enabled: !!slug,
  });
}
