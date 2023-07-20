import { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

export const VITE_SUPABASE_URL = 'https://bkhclamdveniritzqjzu.supabase.co';
export const VITE_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJraGNsYW1kdmVuaXJpdHpxanp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MzI1MjEsImV4cCI6MjAwNTEwODUyMX0.T2QT8I3BkIxMmezFjgUZQg17rFQ32niHR9NFUcIZ3uE';

// Path: src\lib\supabase\index.ts
const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
    },
  },
);
export default supabase;
