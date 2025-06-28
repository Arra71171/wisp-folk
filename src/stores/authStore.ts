import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Database } from '../services/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,
  profile: null,

  signIn: async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  signUp: async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) return { error: error.message };

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            xp_points: 0,
            current_level: 1,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },

  updateProfile: async (updates) => {
    try {
      const { user } = get();
      if (!user) return { error: 'No user logged in' };

      const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);

      if (error) return { error: error.message };

      set((state) => ({ profile: state.profile ? { ...state.profile, ...updates } : null }));

      return {};
    } catch (error) {
      return { error: 'Failed to update profile' };
    }
  },

  initialize: async () => {
    console.log('authStore: initialize function started.');
    try {
      // Check for an existing session on startup
      const { data: { session } } = await supabase.auth.getSession();
      console.log('authStore: Initial session fetched.', session ? `User: ${session.user.id}` : 'No session.');
      set({ session, user: session?.user ?? null });

      if (session?.user) {
        console.log('authStore: Initial session exists. Fetching user profile...');
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') { // Ignore "no rows" error
          console.error('authStore: Error fetching initial profile:', error);
        } else if (!profile) {
          // No profile row exists, create one
          console.log('authStore: No profile found. Creating default profile row...');
          const { error: insertErr } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              email: session.user.email!,
              xp_points: 0,
              current_level: 1,
            });
          if (insertErr) {
            console.error('authStore: Failed to create default profile:', insertErr);
          }
        } else {
          console.log('authStore: Initial profile fetched successfully.');
          set({ profile });
        }
      }

      // Set up the listener for future auth state changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log(`authStore: onAuthStateChange event received: ${event}`);
        set({ session, user: session?.user ?? null });

        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
            console.log('authStore: Auth state changed. Fetching user profile...');
            const { data: profile, error } = await supabase
               .from('profiles')
               .select('*')
               .eq('id', session.user.id)
               .maybeSingle();
            
            if (error && error.code !== 'PGRST116') {
               console.error('authStore: Error fetching profile on auth change:', error);
             } else if (!profile) {
               console.log('authStore: No profile found on auth change. Inserting...');
               const { error: insertErr } = await supabase
                 .from('profiles')
                 .insert({
                   id: session.user.id,
                   email: session.user.email!,
                   xp_points: 0,
                   current_level: 1,
                 });
               if (insertErr) {
                 console.error('authStore: Failed to insert profile on auth change:', insertErr);
               }
             } else {
              console.log('authStore: Profile fetched successfully on auth change.');
              set({ profile });
            }
        }

        if (event === 'SIGNED_OUT') {
          set({ profile: null });
        }
      });
      
      console.log('authStore: Auth listener set up. Initialization complete.');

    } catch (error) {
      console.error('authStore: CRITICAL ERROR in initialize function:', error);
    } finally {
      // Mark as initialized to hide splash screen, regardless of outcome.
      console.log('authStore: Setting initialized = true.');
      set({ initialized: true, loading: false });
    }
  },
}));
