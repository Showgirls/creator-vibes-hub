
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/env';

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Type definitions for database schema
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          created_at: string;
          last_login: string;
          last_activity?: string;
          is_premium: boolean;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          created_at?: string;
          last_login?: string;
          last_activity?: string;
          is_premium?: boolean;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          created_at?: string;
          last_login?: string;
          last_activity?: string;
          is_premium?: boolean;
        };
      };
      referral_stats: {
        Row: {
          id: string;
          username: string;
          members: number;
          earnings: number;
        };
        Insert: {
          id?: string;
          username: string;
          members?: number;
          earnings?: number;
        };
        Update: {
          id?: string;
          username?: string;
          members?: number;
          earnings?: number;
        };
      };
    };
  };
};
