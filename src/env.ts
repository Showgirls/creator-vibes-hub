
// This file centralizes environment variable access for the application

// Default values for development environment
// In production, these should be set as environment variables
const DEFAULT_SUPABASE_URL = 'https://icoyvvnlhwckwntcqrgy.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljb3l2dm5saHdja3dudGNxcmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMDc2MzUsImV4cCI6MjAzMTg4MzYzNX0.c6rQmcglJa-_xLcvB5lo9_wEO8UXZrKKJ4aAITwI55c';

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
    console.warn('Using default Supabase credentials for development. For production, set your own credentials.');
  }
}
