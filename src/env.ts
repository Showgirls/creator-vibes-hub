
// This file centralizes environment variable access for the application

// Default values for development environment
// In production, these should be set as environment variables
const DEFAULT_SUPABASE_URL = 'https://your-project-id.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'your-anon-key';

// Get actual environment variables or use defaults
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

// Environment check
export const isDevelopment = import.meta.env.DEV === true;
export const isProduction = import.meta.env.PROD === true;

// Log environment status in development mode only
if (isDevelopment) {
  console.log('Running in development mode');
  console.log('Using Supabase URL:', SUPABASE_URL);
  
  if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn('VITE_SUPABASE_URL not set. Using default value. This will not work for production.');
    console.warn('Please create a .env file with your Supabase credentials or set them in your environment.');
  }
}
