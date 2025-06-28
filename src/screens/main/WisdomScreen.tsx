import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useStories, useUserProgress } from '../../hooks/useHeritage';
import { WisdomQuote } from '../../components/heritage/WisdomQuote';
import Button from '../../components/ui/Button';
import { Feather } from '@expo/vector-icons';
import { WisdomScreenSkeleton } from '../../components/loading/WisdomScreenSkeleton';

export function WisdomScreen() {
  const { data: stories, isLoading: storiesLoading, error: storiesError, refetch: refetchStories } = useStories();
  const { data: userProgress, isLoading: progressLoading, error: progressError, refetch: refetchProgress } = useUserProgress();

  const isLoading = storiesLoading || progressLoading;
  const error = storiesError || progressError;

  const unlockedWisdoms = React.useMemo(() => {
    if (!stories || !userProgress) return [];
    
    const unlockedStoryIds = userProgress
      .filter(p => p.wisdom_unlocked)
      .map(p => p.story_id);
      
    return stories.filter(story => unlockedStoryIds.includes(story.id));
  }, [stories, userProgress]);

  const renderHeader = () => (
    <View className="px-6 pt-16 pb-6">
      <Text className="text-3xl font-bold text-amber-900 tracking-tight">Your Collected Wisdom</Text>
      <Text className="text-lg text-amber-700 mt-1">Lessons learned from your journeys.</Text>
    </View>
  );

  if (isLoading) {
    return <WisdomScreenSkeleton />;
  }

  if (error) {
    const handleRetry = () => {
      if (storiesError) refetchStories();
      if (progressError) refetchProgress();
    };

    return (
      <View className="flex-1 items-center justify-center bg-red-50 p-8">
        <Feather name="alert-triangle" size={48} color="#b91c1c" />
        <Text className="mt-4 text-xl font-bold text-red-800">Could Not Load Wisdom</Text>
        <Text className="mt-2 text-center text-red-600">
          There was an issue fetching your collected wisdom. Please try again later.
        </Text>
        <View className="mt-6 w-full max-w-xs">
          <Button title="Retry" onPress={handleRetry} variant="destructive" />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50">
      <FlatList
        data={unlockedWisdoms}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View className={`px-6 ${index === unlockedWisdoms.length - 1 ? 'mb-6' : 'mb-4'}`}>
            <View className="bg-white/70 p-5 rounded-2xl shadow-sm border border-amber-200/50">
              <WisdomQuote 
                quote={item.wisdom_lesson}
                author={item.title}
              />
            </View>
          </View>
        )}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-16 px-6">
            <Feather name="moon" size={48} color="#92400e" />
            <Text className="mt-4 text-xl font-bold text-amber-900">Your Wisdom Journal is Empty</Text>
            <Text className="text-amber-700 mt-2 text-center">
              Complete stories and unlock their wisdom. Your collection will appear here.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

