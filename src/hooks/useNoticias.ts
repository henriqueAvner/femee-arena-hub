import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Noticia } from '@/lib/types';

export function useNoticias(limit?: number) {
  return useQuery({
    queryKey: ['noticias', { limit }],
    queryFn: async () => {
      let query = supabase
        .from('noticias')
        .select('*')
        .eq('ativo', true)
        .order('publicado_em', { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data as Noticia[];
    },
  });
}

export function useNoticiaDestaque() {
  return useQuery({
    queryKey: ['noticia-destaque'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('ativo', true)
        .eq('destaque', true)
        .order('publicado_em', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as Noticia | null;
    },
  });
}

export function useNoticiaBySlug(slug: string) {
  return useQuery({
    queryKey: ['noticia', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('slug', slug)
        .eq('ativo', true)
        .maybeSingle();
      if (error) throw error;
      return data as Noticia | null;
    },
    enabled: !!slug,
  });
}
