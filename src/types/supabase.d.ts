export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          bg_color: string | null;
          created_at: string | null;
          expiry: string | null;
          id: string;
          name: string | null;
          number: string | null;
          owner: string | null;
          type: string | null;
        };
        Insert: {
          bg_color?: string | null;
          created_at?: string | null;
          expiry?: string | null;
          id?: string;
          name?: string | null;
          number?: string | null;
          owner?: string | null;
          type?: string | null;
        };
        Update: {
          bg_color?: string | null;
          created_at?: string | null;
          expiry?: string | null;
          id?: string;
          name?: string | null;
          number?: string | null;
          owner?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'cards_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      movements: {
        Row: {
          count: number | null;
          created_at: string | null;
          icon_name: string | null;
          id: string;
          movementDate: string | null;
          name: string | null;
          owner: string | null;
        };
        Insert: {
          count?: number | null;
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          movementDate?: string | null;
          name?: string | null;
          owner?: string | null;
        };
        Update: {
          count?: number | null;
          created_at?: string | null;
          icon_name?: string | null;
          id?: string;
          movementDate?: string | null;
          name?: string | null;
          owner?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'movements_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          balance: number | null;
          id: string;
          name: string | null;
          status: Database['public']['Enums']['user_status'] | null;
          username: string | null;
        };
        Insert: {
          balance?: number | null;
          id: string;
          name?: string | null;
          status?: Database['public']['Enums']['user_status'] | null;
          username?: string | null;
        };
        Update: {
          balance?: number | null;
          id?: string;
          name?: string | null;
          status?: Database['public']['Enums']['user_status'] | null;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission'];
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_permission: 'channels.delete' | 'messages.delete';
      app_role: 'admin' | 'moderator';
      user_status: 'ONLINE' | 'OFFLINE';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
