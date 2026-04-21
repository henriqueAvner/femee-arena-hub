import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Campeonato, CampeonatoStatus, Time } from '@/lib/types';

export function useCampeonatos(status?: CampeonatoStatus) {
  return useQuery({
    queryKey: ['campeonatos', { status }],
    queryFn: async () => {
      let query = supabase
        .from('campeonatos')
        .select('*')
        .eq('ativo', true)
        .order('data_inicio', { ascending: false, nullsFirst: false });
      if (status) query = query.eq('status', status);
      const { data, error } = await query;
      if (error) throw error;
      return data as Campeonato[];
    },
  });
}

export function useCampeonatoBySlug(slug: string) {
  return useQuery({
    queryKey: ['campeonato', slug],
    queryFn: async () => {
      const { data: camp, error } = await supabase
        .from('campeonatos')
        .select('*')
        .eq('slug', slug)
        .eq('ativo', true)
        .maybeSingle();
      if (error) throw error;
      if (!camp) return null;

      const { data: rels, error: relErr } = await supabase
        .from('campeonato_times')
        .select('time_id, times(*)')
        .eq('campeonato_id', camp.id);
      if (relErr) throw relErr;

      const times = (rels ?? [])
        .map((r: { times: Time | null }) => r.times)
        .filter((t): t is Time => !!t && t.ativo);

      return { ...(camp as Campeonato), times };
    },
    enabled: !!slug,
  });
}
