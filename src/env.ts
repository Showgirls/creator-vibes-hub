
// This file centralizes environment variable access for the application
// Replace with your actual Supabase project URL and anon key when connecting to Supabase

// Default to empty strings for type safety
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Environment check
export const isDevelopment = import.meta.env.DEV === true;
export const isProduction = import.meta.env.PROD === true;
