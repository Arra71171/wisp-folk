import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Database } from '../services/supabase';
import { useAuthStore } from '../stores/authStore';

// ------------------------------------------------------------------
// 📝 TYPE DEFINITIONS
// ------------------------------------------------------------------

type Progress = Database['public']['Tables']['user_progress']['Row'];

// ------------------------------------------------------------------
// 🎣 REACT QUERY HOOKS
// ------------------------------------------------------------------

/**
 * Fetches all published folklore stories.
 */
export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('folklore_stories')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

/**
 * Fetches the progress for the current user.
 */
export const useUserProgress = () => {
  const { user } = useAuthStore.getState();

  return useQuery({
    queryKey: ['user_progress', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!user, // Only run the query if the user is logged in
  });
};

/**
 * A mutation to update (or create) a user's progress on a story.
 */
export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore.getState();

  return useMutation({
    mutationFn: async ({ storyId, newProgress }: { storyId: string; newProgress: Partial<Progress> }) => {
      if (!user) throw new Error('User not authenticated');

      // Check if progress already exists
      const { data: existingProgress, error: fetchError } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('story_id', storyId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: no rows found
        throw fetchError;
      }

      if (existingProgress) {
        // Update
        const { data, error } = await supabase
          .from('user_progress')
          .update(newProgress)
          .eq('id', existingProgress.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        // Insert
        const { data, error } = await supabase
          .from('user_progress')
          .insert({ ...newProgress, story_id: storyId, user_id: user.id })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch the user's progress query
      queryClient.invalidateQueries({ queryKey: ['user_progress', user?.id] });
    },
    onError: (error) => {
      console.error('Error updating progress:', error.message);
    },
  });
};
