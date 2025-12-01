import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  course_id: string;
  price_paid: number;
  subscribed_at: string;
  courses?: Course;
}
