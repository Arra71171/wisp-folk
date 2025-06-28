import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../navigation/types';
import { useAuthStore } from '../../stores/authStore';
import { useStories, useUserProgress } from '../../hooks/useHeritage';
import { Feather } from '@expo/vector-icons';

// Import our new UI components
import Card from '../../components/ui/Card';
import PrimaryButton from '../../components/ui/PrimaryButton';
import SectionContainer from '../../components/ui/SectionContainer';
import Avatar from '../../components/ui/Avatar';
import ProgressBar from '../../components/ui/ProgressBar';
import { TimeTravelPortal } from '../../components/ui/TimeTravelPortal';
import { WisdomQuote } from '../../components/heritage/WisdomQuote';
import { StoryCard } from '../../components/heritage/StoryCard';
import { HomeScreenSkeleton } from '../../components/loading/HomeScreenSkeleton';

export function HomeScreen() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { profile } = useAuthStore();

  // Fetching data using our custom hooks
  const { data: stories, isLoading: storiesLoading, error: storiesError, refetch: refetchStories } = useStories();
  const { data: progress, isLoading: progressLoading, error: progressError, refetch: refetchProgress } = useUserProgress();

  const isLoading = storiesLoading || progressLoading;

  // Find the last story the user was interacting with
  const dailyWisdom = React.useMemo(() => {
    if (!stories || !progress) return null;

    const unlockedWisdoms = stories.filter(story =>
      progress.some(p => p.story_id === story.id && p.wisdom_unlocked)
    );

    if (unlockedWisdoms.length === 0) {
      return {
        quote: 'The journey of a thousand miles begins with a single step.',
        author: 'Lao Tzu',
      };
    }

    const randomIndex = Math.floor(Math.random() * unlockedWisdoms.length);
    const randomStory = unlockedWisdoms[randomIndex];
    return {
      quote: randomStory.wisdom_lesson,
      author: randomStory.title,
    };
  }, [stories, progress]);

  const lastInProgressStory = React.useMemo(() => {
    if (!progress || !stories) return null;

    const sortedProgress = [...progress].sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    const lastProgress = sortedProgress.find(p => p.status === 'in_progress');
    if (!lastProgress) return null;

    return stories.find(s => s.id === lastProgress.story_id);
  }, [progress, stories]);

  // Calculate progress stats
  const progressStats = React.useMemo(() => {
    if (!progress || !stories) return { completed: 0, total: 0, percentage: 0 };
    
    const completed = progress.filter(p => p.status === 'completed').length;
    const total = stories.length;
    const percentage = total > 0 ? completed / total : 0;
    
    return { completed, total, percentage };
  }, [progress, stories]);

  if (isLoading) {
    return <HomeScreenSkeleton />;
  }

  if (storiesError || progressError) {
    const handleRetry = () => {
      if (storiesError) refetchStories();
      if (progressError) refetchProgress();
    };

    return (
      <View className="flex-1 items-center justify-center bg-gradient-to-b from-red-50 to-orange-50 p-8">
        <Card
          title="Connection Error"
          subtitle="We couldn't load your data"
          description="Please check your internet connection and try again."
          ctaLabel="Retry"
          onPress={handleRetry}
        >
          <View className="items-center py-4">
            <Feather name="wifi-off" size={48} color="#dc2626" />
          </View>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6 pt-16">
        {/* --- Header with Avatar --- */}
        <View className="flex-row items-center mb-8">
          <Avatar 
            size={56}
            initials={profile?.full_name?.charAt(0) || 'E'}
          />
          <View className="ml-4 flex-1">
            <Text className="text-lg font-sans text-text-secondary">Welcome back,</Text>
            <Text className="text-2xl font-bold font-sans text-text-primary tracking-tight">
              {profile?.full_name || 'Explorer'}
            </Text>
          </View>
          <TouchableOpacity 
            className="p-3 rounded-full bg-surface"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}
          >
            <Feather name="user" size={20} className="text-primary" />
          </TouchableOpacity>
        </View>

        {/* --- Progress Overview --- */}
        <SectionContainer 
          title="Your Journey Progress"
          subtitle={`${progressStats.completed} of ${progressStats.total} stories completed`}
        >
          <ProgressBar 
            progress={progressStats.percentage}
            height={12}
          />
          <View className="flex-row justify-between mt-2">
            <Text className="text-sm font-sans text-text-secondary">Beginner</Text>
            <Text className="text-sm font-sans text-text-secondary">Master</Text>
          </View>
        </SectionContainer>

        {/* --- Time Travel Portal --- */}
        <Card
          title="Time Travel Portal"
          subtitle="Jump to any era"
          description="Explore stories from different time periods and cultures."
          ctaLabel="Enter Portal"
          onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })}
        >
          <View className="items-center py-4">
            <TimeTravelPortal 
              onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })}
            />
          </View>
        </Card>

        {/* --- Daily Wisdom --- */}
        {dailyWisdom && (
          <SectionContainer 
            title="Today's Wisdom"
            subtitle="Ancient knowledge for modern life"
          >
            <WisdomQuote 
              quote={dailyWisdom.quote}
              author={dailyWisdom.author}
            />
          </SectionContainer>
        )}

        {/* --- Continue Journey --- */}
        {lastInProgressStory && (
          <SectionContainer 
            title="Continue Your Journey"
            subtitle="Pick up where you left off"
          >
            <StoryCard 
              story={lastInProgressStory}
              onPress={() => navigation.navigate('StoryReader', { storyId: lastInProgressStory.id })}
            />
          </SectionContainer>
        )}

        {/* --- Quick Actions --- */}
        <View className="mt-6 space-y-3">
          <PrimaryButton
            title="Discover New Stories"
            icon="compass"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })}
          />
          <PrimaryButton
            title="View Achievements"
            icon="award"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Gamify' })}
          />
        </View>

        {/* --- Gamification Preview --- */}
        <Card
          title="Level Up Your Knowledge"
          subtitle="Complete quests and earn rewards"
          description="Track your progress and unlock new content as you explore."
          ctaLabel="View Progress"
          onPress={() => navigation.navigate('MainTabs', { screen: 'Gamify' })}
        >
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <Feather name="star" size={20} className="text-primary" />
              <Text className="ml-2 text-text-secondary font-sans font-medium">Current Level: Explorer</Text>
            </View>
            <Feather name="chevron-right" size={20} className="text-primary" />
          </View>
        </Card>

      </View>
    </ScrollView>
  );
}
