import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

// 📊 Database Types (will be auto-generated later)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          heritage_background: string | null;
          xp_points: number;
          current_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          heritage_background?: string | null;
          xp_points?: number;
          current_level?: number;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          heritage_background?: string | null;
          xp_points?: number;
          current_level?: number;
        };
      };
      folklore_stories: {
        Row: {
          id: string;
          title: string;
          content: string;
          culture: string;
          time_period: string;
          wisdom_lesson: string;
          difficulty_level: number;
          xp_reward: number;
          summary: string | null;
          category: string | null;
          origin_culture: string | null;
          is_published: boolean;
          created_at: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          story_id: string;
          completed_at: string | null;
          wisdom_unlocked: boolean;
          notes: string | null;
          updated_at: string | null;
          status?: 'not_started' | 'in_progress' | 'completed';
          progress_percentage?: number;
        };
      };
    };
  };
}

// 🌟 Supabase Configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// 🔐 Create Supabase client with AsyncStorage for persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
