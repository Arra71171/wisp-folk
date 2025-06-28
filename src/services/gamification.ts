import { Feather } from '@expo/vector-icons';

export const calculateStreak = (progress: Progress[]): number => {
  if (progress.length < 1) {
    return 0;
  }

  // Get unique completion dates (YYYY-MM-DD), sorted descending
  const completedDates = [
    ...new Set(
      progress
        .filter(p => p.status === 'completed' && p.updated_at)
        .map(p => new Date(p.updated_at!).toISOString().split('T')[0])
    ),
  ]
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => b.getTime() - a.getTime());

  if (completedDates.length === 0) {
    return 0;
  }

  const today = new Date(new Date().toISOString().split('T')[0]);
  const mostRecentCompletion = completedDates[0];

  // Check if the most recent completion was today or yesterday
  const diffTime = today.getTime() - mostRecentCompletion.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  if (diffDays > 1) {
    return 0; // Streak is broken if last completion was before yesterday
  }

  let streak = 1;
  for (let i = 0; i < completedDates.length - 1; i++) {
    const current = completedDates[i];
    const previous = completedDates[i + 1];
    const dayDifference = (current.getTime() - previous.getTime()) / (1000 * 3600 * 24);

    if (dayDifference === 1) {
      streak++;
    } else {
      break; // Not consecutive, so streak ends
    }
  }

  return streak;
};
import { Database } from './supabase';

type Story = Database['public']['Tables']['folklore_stories']['Row'];
type Progress = Database['public']['Tables']['user_progress']['Row'] & { status: 'in_progress' | 'completed' | 'not_started' };

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  isUnlocked: (progress: Progress[], stories: Story[]) => boolean;
}

const getCompletedStories = (progress: Progress[], stories: Story[]) => {
  const completedStoryIds = new Set(progress.filter(p => p.status === 'completed').map(p => p.story_id));
  return stories.filter(story => completedStoryIds.has(story.id));
};

export const ALL_BADGES: Badge[] = [
  {
    id: 'read_1',
    name: 'First Steps',
    description: 'Read your first story.',
    icon: 'book-open',
    isUnlocked: (progress) => progress.filter(p => p.status === 'completed').length >= 1,
  },
  {
    id: 'read_5',
    name: 'Story Explorer',
    description: 'Read 5 different stories.',
    icon: 'compass',
    isUnlocked: (progress) => progress.filter(p => p.status === 'completed').length >= 5,
  },
  {
    id: 'read_10',
    name: 'Folklore Fanatic',
    description: 'Read 10 different stories.',
    icon: 'award',
    isUnlocked: (progress) => progress.filter(p => p.status === 'completed').length >= 10,
  },
  {
    id: 'wisdom_1',
    name: 'Sage Apprentice',
    description: 'Unlock your first wisdom.',
    icon: 'unlock',
    isUnlocked: (progress) => progress.filter(p => p.wisdom_unlocked).length >= 1,
  },
  {
    id: 'wisdom_5',
    name: 'Wisdom Seeker',
    description: 'Unlock 5 pieces of wisdom.',
    icon: 'sun',
    isUnlocked: (progress) => progress.filter(p => p.wisdom_unlocked).length >= 5,
  },
  {
    id: 'wisdom_10',
    name: 'Enlightened One',
    description: 'Unlock 10 pieces of wisdom.',
    icon: 'sunrise',
    isUnlocked: (progress) => progress.filter(p => p.wisdom_unlocked).length >= 10,
  },
  // Cultural Explorer Badges
  {
    id: 'culture_asia',
    name: 'Asian Explorer',
    description: 'Read a story from Asia.',
    icon: 'globe',
    isUnlocked: (progress, stories) => {
      const completed = getCompletedStories(progress, stories);
      return completed.some(s => s.origin_culture === 'Asian');
    },
  },
  {
    id: 'culture_europe',
    name: 'European Explorer',
    description: 'Read a story from Europe.',
    icon: 'map',
    isUnlocked: (progress, stories) => {
      const completed = getCompletedStories(progress, stories);
      return completed.some(s => s.origin_culture === 'European');
    },
  },
  {
    id: 'culture_africa',
    name: 'African Explorer',
    description: 'Read a story from Africa.',
    icon: 'shield',
    isUnlocked: (progress, stories) => {
      const completed = getCompletedStories(progress, stories);
      return completed.some(s => s.origin_culture === 'African');
    },
  },
  // Difficulty-based Badges
  {
    id: 'easy_1',
    name: 'Easy Start',
    description: 'Complete an easy story.',
    icon: 'coffee',
    isUnlocked: (progress, stories) => {
        const completed = getCompletedStories(progress, stories);
        return completed.some(s => s.difficulty_level === 1);
    }
  },
  {
    id: 'hard_1',
    name: 'Challenge Accepted',
    description: 'Complete a hard story.',
    icon: 'trending-up',
    isUnlocked: (progress, stories) => {
        const completed = getCompletedStories(progress, stories);
        return completed.some(s => s.difficulty_level === 3);
    }
  },
  // Completionist Badge
  {
    id: 'completionist',
    name: 'Grand Storyteller',
    description: 'Read all available stories.',
    icon: 'award',
    isUnlocked: (progress, stories) => {
      const completedCount = progress.filter(p => p.status === 'completed').length;
      return completedCount > 0 && completedCount === stories.length;
    },
  },
  // Streak-based Badges
  {
    id: 'streak_3',
    name: 'On a Roll',
    description: 'Maintain a 3-day reading streak.',
    icon: 'activity',
    isUnlocked: (progress) => calculateStreak(progress) >= 3,
  },
  {
    id: 'streak_7',
    name: 'Habit Builder',
    description: 'Maintain a 7-day reading streak.',
    icon: 'calendar',
    isUnlocked: (progress) => calculateStreak(progress) >= 7,
  },
];

export const getUnlockedBadges = (progress: Progress[], stories: Story[]) => {
  return ALL_BADGES.map(badge => ({
    ...badge,
    unlocked: badge.isUnlocked(progress, stories),
  }));
};
