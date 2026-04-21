export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      campeonato_times: {
        Row: {
          campeonato_id: string
          created_at: string
          derrotas: number
          empates: number
          id: string
          pontos: number
          posicao: number | null
          time_id: string
          vitorias: number
        }
        Insert: {
          campeonato_id: string
          created_at?: string
          derrotas?: number
          empates?: number
          id?: string
          pontos?: number
          posicao?: number | null
          time_id: string
          vitorias?: number
        }
        Update: {
          campeonato_id?: string
          created_at?: string
          derrotas?: number
          empates?: number
          id?: string
          pontos?: number
          posicao?: number | null
          time_id?: string
          vitorias?: number
        }
        Relationships: [
          {
            foreignKeyName: "campeonato_times_campeonato_id_fkey"
            columns: ["campeonato_id"]
            isOneToOne: false
            referencedRelation: "campeonatos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campeonato_times_time_id_fkey"
            columns: ["time_id"]
            isOneToOne: false
            referencedRelation: "ranking_times"
            referencedColumns: ["time_id"]
          },
          {
            foreignKeyName: "campeonato_times_time_id_fkey"
            columns: ["time_id"]
            isOneToOne: false
            referencedRelation: "times"
            referencedColumns: ["id"]
          },
        ]
      }
      campeonatos: {
        Row: {
          ativo: boolean
          created_at: string
          data_fim: string | null
          data_inicio: string | null
          descricao: string | null
          id: string
          imagem: string | null
          local: string | null
          nome: string
          regulamento_link: string | null
          slug: string
          status: Database["public"]["Enums"]["campeonato_status"]
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: string
          imagem?: string | null
          local?: string | null
          nome: string
          regulamento_link?: string | null
          slug: string
          status?: Database["public"]["Enums"]["campeonato_status"]
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: string
          imagem?: string | null
          local?: string | null
          nome?: string
          regulamento_link?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["campeonato_status"]
          updated_at?: string
        }
        Relationships: []
      }
      jogadores: {
        Row: {
          ativo: boolean
          created_at: string
          foto: string | null
          id: string
          nickname: string
          nome: string
          posicao: string | null
          time_id: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          foto?: string | null
          id?: string
          nickname: string
          nome: string
          posicao?: string | null
          time_id?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          foto?: string | null
          id?: string
          nickname?: string
          nome?: string
          posicao?: string | null
          time_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jogadores_time_id_fkey"
            columns: ["time_id"]
            isOneToOne: false
            referencedRelation: "ranking_times"
            referencedColumns: ["time_id"]
          },
          {
            foreignKeyName: "jogadores_time_id_fkey"
            columns: ["time_id"]
            isOneToOne: false
            referencedRelation: "times"
            referencedColumns: ["id"]
          },
        ]
      }
      noticias: {
        Row: {
          ativo: boolean
          conteudo: string
          created_at: string
          destaque: boolean
          id: string
          imagem_capa: string | null
          publicado_em: string
          resumo: string | null
          slug: string
          titulo: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          conteudo: string
          created_at?: string
          destaque?: boolean
          id?: string
          imagem_capa?: string | null
          publicado_em?: string
          resumo?: string | null
          slug: string
          titulo: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          conteudo?: string
          created_at?: string
          destaque?: boolean
          id?: string
          imagem_capa?: string | null
          publicado_em?: string
          resumo?: string | null
          slug?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      times: {
        Row: {
          ativo: boolean
          cidade: string | null
          created_at: string
          descricao: string | null
          id: string
          logo: string | null
          nome: string
          sigla: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          cidade?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          logo?: string | null
          nome: string
          sigla?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          cidade?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          logo?: string | null
          nome?: string
          sigla?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      ranking_times: {
        Row: {
          campeonatos_disputados: number | null
          cidade: string | null
          derrotas: number | null
          empates: number | null
          logo: string | null
          nome: string | null
          pontos: number | null
          sigla: string | null
          slug: string | null
          time_id: string | null
          vitorias: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      campeonato_status: "futuro" | "em_andamento" | "encerrado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      campeonato_status: ["futuro", "em_andamento", "encerrado"],
    },
  },
} as const
