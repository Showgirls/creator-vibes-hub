
import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
