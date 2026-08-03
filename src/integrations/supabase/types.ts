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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      analyses: {
        Row: {
          bias: string
          category: string
          cover_image: string | null
          created_at: string
          date: string
          description: string
          featured: boolean
          gallery: Json
          id: string
          invalidation: string
          market: string
          market_structure: string
          outcome: string
          pair: string
          pdf_url: string | null
          published: boolean
          rr: string
          series: Json
          slug: string
          sort_order: number
          subtitle: string
          summary: string
          tags: string[]
          targets: Json
          thesis: Json
          timeframe: string
          title: string
          tradingview_url: string | null
          updated_at: string
        }
        Insert: {
          bias?: string
          category?: string
          cover_image?: string | null
          created_at?: string
          date?: string
          description?: string
          featured?: boolean
          gallery?: Json
          id?: string
          invalidation?: string
          market?: string
          market_structure?: string
          outcome?: string
          pair?: string
          pdf_url?: string | null
          published?: boolean
          rr?: string
          series?: Json
          slug: string
          sort_order?: number
          subtitle?: string
          summary?: string
          tags?: string[]
          targets?: Json
          thesis?: Json
          timeframe?: string
          title: string
          tradingview_url?: string | null
          updated_at?: string
        }
        Update: {
          bias?: string
          category?: string
          cover_image?: string | null
          created_at?: string
          date?: string
          description?: string
          featured?: boolean
          gallery?: Json
          id?: string
          invalidation?: string
          market?: string
          market_structure?: string
          outcome?: string
          pair?: string
          pdf_url?: string | null
          published?: boolean
          rr?: string
          series?: Json
          slug?: string
          sort_order?: number
          subtitle?: string
          summary?: string
          tags?: string[]
          targets?: Json
          thesis?: Json
          timeframe?: string
          title?: string
          tradingview_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          handled: boolean
          id: string
          message: string
          name: string
          organization: string
        }
        Insert: {
          created_at?: string
          email: string
          handled?: boolean
          id?: string
          message: string
          name: string
          organization?: string
        }
        Update: {
          created_at?: string
          email?: string
          handled?: boolean
          id?: string
          message?: string
          name?: string
          organization?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          organisation: string | null
          topic: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          organisation?: string | null
          topic?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          organisation?: string | null
          topic?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          data: Json
          key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          data: Json
          key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          data?: Json
          key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      trading_results: {
        Row: {
          created_at: string
          date: string
          direction: string
          entry: string
          exit: string
          id: string
          instrument: string
          market: string
          notes: string
          percentage: number
          published: boolean
          r_multiple: number
          result: string
          screenshot: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string
          direction?: string
          entry?: string
          exit?: string
          id?: string
          instrument?: string
          market?: string
          notes?: string
          percentage?: number
          published?: boolean
          r_multiple?: number
          result?: string
          screenshot?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          direction?: string
          entry?: string
          exit?: string
          id?: string
          instrument?: string
          market?: string
          notes?: string
          percentage?: number
          published?: boolean
          r_multiple?: number
          result?: string
          screenshot?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weekly_reports: {
        Row: {
          asset: string
          body: string
          cover_image: string | null
          created_at: string
          date: string
          gallery: Json
          id: string
          market: string
          pdf_url: string | null
          published: boolean
          slug: string
          sort_order: number
          summary: string
          tags: string[]
          title: string
          tradingview_url: string | null
          updated_at: string
          week_label: string
        }
        Insert: {
          asset?: string
          body?: string
          cover_image?: string | null
          created_at?: string
          date?: string
          gallery?: Json
          id?: string
          market?: string
          pdf_url?: string | null
          published?: boolean
          slug: string
          sort_order?: number
          summary?: string
          tags?: string[]
          title: string
          tradingview_url?: string | null
          updated_at?: string
          week_label?: string
        }
        Update: {
          asset?: string
          body?: string
          cover_image?: string | null
          created_at?: string
          date?: string
          gallery?: Json
          id?: string
          market?: string
          pdf_url?: string | null
          published?: boolean
          slug?: string
          sort_order?: number
          summary?: string
          tags?: string[]
          title?: string
          tradingview_url?: string | null
          updated_at?: string
          week_label?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
