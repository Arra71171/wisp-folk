import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useStories, useUserProgress, useUpdateProgress } from '../../hooks/useHeritage';
import Button from '../../components/ui/Button';

// Helper to create a placeholder image from the story title
const getPlaceholderUri = (title: string) => {
  const seed = title.replace(/\s/g, '');
  return `https://picsum.photos/seed/${seed}/800/400`;
};

export function StoryReaderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { storyId } = route.params as { storyId: string };

  const { data: stories, isLoading: storiesLoading } = useStories();
  const { data: progress, isLoading: progressLoading } = useUserProgress();
  const { mutate: updateProgress, isPending: isUpdating } = useUpdateProgress();

  const story = React.useMemo(() => {
    return stories?.find((s) => s.id === storyId);
  }, [stories, storyId]);

  const userProgress = React.useMemo(() => {
    return progress?.find((p) => p.story_id === storyId);
  }, [progress, storyId]);

  const handleUnlockWisdom = () => {
    if (!story) return;
    updateProgress({
      storyId: story.id,
      newProgress: {
        status: 'completed',
        wisdom_unlocked: true,
        progress_percentage: 100,
      },
    });
  };

  if (storiesLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-amber-50">
        <ActivityIndicator size="large" color="#c27803" />
      </View>
    );
  }

  if (!story) {
    return (
      <View className="flex-1 items-center justify-center bg-red-50 p-4">
        <Feather name="alert-circle" size={48} color="#b91c1c" />
        <Text className="mt-4 text-xl font-bold text-red-800">Story Not Found</Text>
        <Text className="mt-2 text-center text-red-600">
          We couldn't find the story you were looking for. It might have been removed.
        </Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} className="mt-6" />
      </View>
    );
  }

  const isCompleted = userProgress?.status === 'completed';

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Image */}
      <ImageBackground 
        source={{ uri: getPlaceholderUri(story.title) }} 
        className="h-64 justify-end"
      >
        <View className="bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
          <Text className="text-3xl font-bold text-white tracking-tight">{story.title}</Text>
          <Text className="text-lg text-white/80 mt-1">from {story.origin_culture} heritage</Text>
        </View>
      </ImageBackground>

      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        className="absolute top-14 left-4 bg-black/50 p-2 rounded-full"
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* Story Content */}
      <View className="p-6">
        <Text className="text-lg text-stone-700 leading-relaxed font-serif">
          {story.content}
        </Text>

        {/* Wisdom Lesson Section */}
        <View className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <View className="flex-row items-center mb-3">
            <Feather name="award" size={24} color="#c27803" />
            <Text className="text-xl font-bold text-amber-900 ml-3">The Wisdom Within</Text>
          </View>
          <Text className="text-base text-amber-800 italic leading-snug">
            {story.wisdom_lesson}
          </Text>
        </View>

        {/* Action Button */}
        <View className="mt-8">
          <Button 
            title={isCompleted ? 'Wisdom Unlocked' : 'Unlock Wisdom'}
            onPress={handleUnlockWisdom}
            disabled={isCompleted || isUpdating}
            loading={isUpdating}
            variant={isCompleted ? 'secondary' : 'heritage'}
            icon={isCompleted ? <Feather name="check-circle" size={18} color="#4d7c0f" /> : null}
          />
        </View>
      </View>
    </ScrollView>
  );
}