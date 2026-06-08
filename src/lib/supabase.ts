import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_path: string;
  image_url: string;
  created_at: string;
}

export interface TiendaProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image_path: string;
  image_url: string;
  created_at: string;
}
