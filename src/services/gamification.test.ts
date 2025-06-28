import { calculateStreak, getUnlockedBadges } from './gamification';
import { Database } from './supabase';

type Story = Database['public']['Tables']['folklore_stories']['Row'];
type Progress = Database['public']['Tables']['user_progress']['Row'] & { status: 'in_progress' | 'completed' | 'not_started' };

describe('gamification', () => {
  describe('calculateStreak', () => {
    it('should return 0 for empty progress', () => {
      const progress: Progress[] = [];
      const streak = calculateStreak(progress);
      expect(streak).toBe(0);
    });

    it('should return 0 for no completed stories', () => {
      const progress: Progress[] = [
        {
          id: '1',
          user_id: 'user1',
          story_id: 'story1',
          status: 'in_progress',
          completed_at: null,
          wisdom_unlocked: false,
          notes: null,
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: '2',
          user_id: 'user1',
          story_id: 'story2',
          status: 'not_started',
          completed_at: null,
          wisdom_unlocked: false,
          notes: null,
          updated_at: null,
        },
      ];
      const streak = calculateStreak(progress);
      expect(streak).toBe(0);
    });

    it('should return 1 for one completed story today', () => {
      const today = new Date().toISOString().split('T')[0];
      const progress: Progress[] = [
        {
          id: '1',
          user_id: 'user1',
          story_id: 'story1',
          status: 'completed',
          completed_at: `${today}T00:00:00Z`,
          wisdom_unlocked: true,
          notes: null,
          updated_at: `${today}T00:00:00Z`,
        },
      ];
      const streak = calculateStreak(progress);
      expect(streak).toBe(1);
    });

    it('should return 3 for three consecutive completed stories', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const progress: Progress[] = [
        {
          id: '1',
          user_id: 'user1',
          story_id: 'story1',
          status: 'completed',
          completed_at: today.toISOString(),
          wisdom_unlocked: true,
          notes: null,
          updated_at: today.toISOString(),
        },
        {
          id: '2',
          user_id: 'user1',
          story_id: 'story2',
          status: 'completed',
          completed_at: yesterday.toISOString(),
          wisdom_unlocked: true,
          notes: null,
          updated_at: yesterday.toISOString(),
        },
        {
          id: '3',
          user_id: 'user1',
          story_id: 'story3',
          status: 'completed',
          completed_at: twoDaysAgo.toISOString(),
          wisdom_unlocked: true,
          notes: null,
          updated_at: twoDaysAgo.toISOString(),
        },
      ];
      const streak = calculateStreak(progress);
      expect(streak).toBe(3);
    });

    it('should return 1 for non-consecutive completed stories', () => {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const progress: Progress[] = [
        {
          id: '1',
          user_id: 'user1',
          story_id: 'story1',
          status: 'completed',
          completed_at: today.toISOString(),
          wisdom_unlocked: true,
          notes: null,
          updated_at: today.toISOString(),
        },
        {
          id: '2',
          user_id: 'user1',
          story_id: 'story2',
          status: 'completed',
          completed_at: threeDaysAgo.toISOString(),
          wisdom_unlocked: true,
          notes: null,
          updated_at: threeDaysAgo.toISOString(),
        },
      ];
      const streak = calculateStreak(progress);
      expect(streak).toBe(1);
    });
  });

  describe('badges', () => {
    const mockStories: Story[] = [
      {
        id: 'story1',
        title: 'Test Story 1',
        content: 'Test Content 1',
        culture: 'Asian',
        time_period: 'Ancient',
        wisdom_lesson: 'Test Wisdom 1',
        difficulty_level: 1,
        xp_reward: 50,
        summary: 'Test Summary 1',
        category: 'Mythology',
        origin_culture: 'Asian',
        is_published: true,
        created_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 'story2',
        title: 'Test Story 2',
        content: 'Test Content 2',
        culture: 'European',
        time_period: 'Medieval',
        wisdom_lesson: 'Test Wisdom 2',
        difficulty_level: 3,
        xp_reward: 100,
        summary: 'Test Summary 2',
        category: 'Legend',
        origin_culture: 'European',
        is_published: true,
        created_at: '2024-01-01T00:00:00Z',
      },
    ];

    describe('First Steps Badge', () => {
      it('should be unlocked when user completes their first story', () => {
        const mockProgress: Progress[] = [
          {
            id: '1',
            user_id: 'user1',
            story_id: 'story1',
            status: 'completed',
            completed_at: '2024-01-01T00:00:00Z',
            wisdom_unlocked: true,
            notes: null,
            updated_at: '2024-01-01T00:00:00Z',
          },
        ];
        const unlockedBadges = getUnlockedBadges(mockProgress, mockStories);
        const firstStepsBadge = unlockedBadges.find(b => b.id === 'read_1');
        expect(firstStepsBadge?.unlocked).toBe(true);
      });

      it('should not be unlocked when user has no completed stories', () => {
        const mockProgress: Progress[] = [
          {
            id: '1',
            user_id: 'user1',
            story_id: 'story1',
            status: 'in_progress',
            completed_at: null,
            wisdom_unlocked: false,
            notes: null,
            updated_at: '2024-01-01T00:00:00Z',
          },
        ];
        const unlockedBadges = getUnlockedBadges(mockProgress, mockStories);
        const firstStepsBadge = unlockedBadges.find(b => b.id === 'read_1');
        expect(firstStepsBadge?.unlocked).toBe(false);
      });
    });

    describe('Story Explorer Badge', () => {
      it('should be unlocked when user completes 5 stories', () => {
        const mockProgress: Progress[] = Array.from({ length: 5 }, (_, i) => ({
          id: `progress${i + 1}`,
          user_id: 'user1',
          story_id: `story${i + 1}`,
          status: 'completed' as const,
          completed_at: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
          wisdom_unlocked: true,
          notes: null,
          updated_at: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
        }));
        const unlockedBadges = getUnlockedBadges(mockProgress, mockStories);
        const storyExplorerBadge = unlockedBadges.find(b => b.id === 'read_5');
        expect(storyExplorerBadge?.unlocked).toBe(true);
      });

      it('should not be unlocked when user has less than 5 completed stories', () => {
        const mockProgress: Progress[] = Array.from({ length: 3 }, (_, i) => ({
          id: `progress${i + 1}`,
          user_id: 'user1',
          story_id: `story${i + 1}`,
          status: 'completed' as const,
          completed_at: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
          wisdom_unlocked: true,
          notes: null,
          updated_at: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
        }));
        const unlockedBadges = getUnlockedBadges(mockProgress, mockStories);
        const storyExplorerBadge = unlockedBadges.find(b => b.id === 'read_5');
        expect(storyExplorerBadge?.unlocked).toBe(false);
      });
    });

    describe('Habit Builder Badge', () => {
      it('should be unlocked when user has a 7-day streak', () => {
        const today = new Date();
        const streakProgress: Progress[] = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          return {
            id: `progress${i + 1}`,
            user_id: 'user1',
            story_id: `story${i + 1}`,
            status: 'completed' as const,
            completed_at: date.toISOString(),
            wisdom_unlocked: true,
            notes: null,
            updated_at: date.toISOString(),
          };
        });
        const unlockedBadges = getUnlockedBadges(streakProgress, mockStories);
        const habitBuilderBadge = unlockedBadges.find(b => b.id === 'streak_7');
        expect(habitBuilderBadge?.unlocked).toBe(true);
      });

      it('should not be unlocked when user has less than 7-day streak', () => {
        const today = new Date();
        const streakProgress: Progress[] = Array.from({ length: 5 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          return {
            id: `progress${i + 1}`,
            user_id: 'user1',
            story_id: `story${i + 1}`,
            status: 'completed' as const,
            completed_at: date.toISOString(),
            wisdom_unlocked: true,
            notes: null,
            updated_at: date.toISOString(),
          };
        });
        const unlockedBadges = getUnlockedBadges(streakProgress, mockStories);
        const habitBuilderBadge = unlockedBadges.find(b => b.id === 'streak_7');
        expect(habitBuilderBadge?.unlocked).toBe(false);
      });
    });
  });

  describe('getUnlockedBadges', () => {
    it('should return unlocked badges', () => {
      const mockProgress: Progress[] = [
        {
          id: '1',
          user_id: 'user1',
          story_id: 'story1',
          status: 'completed',
          completed_at: '2024-01-01T00:00:00Z',
          wisdom_unlocked: true,
          notes: null,
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];
      const mockStories: Story[] = [
        {
          id: 'story1',
          title: 'Test Story',
          content: 'Test Content',
          culture: 'Asian',
          time_period: 'Ancient',
          wisdom_lesson: 'Test Wisdom',
          difficulty_level: 1,
          xp_reward: 50,
          summary: 'Test Summary',
          category: 'Mythology',
          origin_culture: 'Asian',
          is_published: true,
          created_at: '2024-01-01T00:00:00Z',
        },
      ];
      const unlockedBadges = getUnlockedBadges(mockProgress, mockStories);
      expect(unlockedBadges).toHaveLength(14); // Total number of badges
      const firstStepsBadge = unlockedBadges.find(b => b.id === 'read_1');
      expect(firstStepsBadge?.unlocked).toBe(true);
    });
  });
}); 