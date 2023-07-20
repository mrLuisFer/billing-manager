export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          created_at: string | null
          expiry: string | null
          id: string
          name: string | null
          number: string | null
          owner: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          expiry?: string | null
          id?: string
          name?: string | null
          number?: string | null
          owner?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          expiry?: string | null
          id?: string
          name?: string | null
          number?: string | null
          owner?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      channels: {
        Row: {
          created_by: string
          id: number
          inserted_at: string
          slug: string
        }
        Insert: {
          created_by: string
          id?: number
          inserted_at?: string
          slug: string
        }
        Update: {
          created_by?: string
          id?: number
          inserted_at?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          channel_id: number
          id: number
          inserted_at: string
          message: string | null
          user_id: string
        }
        Insert: {
          channel_id: number
          id?: number
          inserted_at?: string
          message?: string | null
          user_id: string
        }
        Update: {
          channel_id?: number
          id?: number
          inserted_at?: string
          message?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          balance: number | null
          id: string
          name: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          username: string | null
        }
        Insert: {
          balance?: number | null
          id: string
          name?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
        Update: {
          balance?: number | null
          id?: string
          name?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_permission: "channels.delete" | "messages.delete"
      app_role: "admin" | "moderator"
      user_status: "ONLINE" | "OFFLINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
