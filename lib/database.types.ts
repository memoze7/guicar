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
      account: {
        Row: {
          created_at: string
          date_of_birth: string | null
          first_name: string
          id: string
          last_name: string
          second_last_name: string | null
          second_name: string | null
          update_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          first_name: string
          id?: string
          last_name: string
          second_last_name?: string | null
          second_name?: string | null
          update_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          id?: string
          last_name?: string
          second_last_name?: string | null
          second_name?: string | null
          update_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'account_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      account_guide: {
        Row: {
          created_at: string
          date_of_birth: string | null
          first_name: string
          id: string
          last_name: string
          second_last_name: string | null
          second_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          first_name: string
          id?: string
          last_name: string
          second_last_name?: string | null
          second_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          id?: string
          last_name?: string
          second_last_name?: string | null
          second_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'account_guide_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      profile: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
