import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useStories, useUserProgress, useUpdateProgress } from '../../hooks/useHeritage';
import { StoryReaderScreenRouteProp } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Button } from '../../components/ui/Button';

const getPlaceholderUri = (title: string) => {
  const seed = title.replace(/\s/g, '');
  return `https://picsum.photos/seed/${seed}/800/600`;
};

export function StoryReaderScreen() {
  const navigation = useNavigation();
  const route = useRoute<StoryReaderScreenRouteProp>();
  const { storyId } = route.params;

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

  if (storiesLoading || progressLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#f472b6" />
      </SafeAreaView>
    );
  }

  if (!story) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center p-6">
        <Feather name="alert-circle" size={48} className="text-red-500" />
        <Text className="mt-4 text-2xl font-serif-bold text-text-primary text-center">Story Not Found</Text>
        <Text className="mt-2 text-center text-text-secondary">
          We couldn't find the story you were looking for. It might have been removed or is lost in time.
        </Text>
        <View className="mt-6 w-full">
            <Button title="Go Back" onPress={() => navigation.goBack()} variant="primary" />
        </View>
      </SafeAreaView>
    );
  }

  const isCompleted = userProgress?.status === 'completed';

  return (
    <View className="flex-1 bg-background">
      <ScrollView>
        <ImageBackground
          source={{ uri: getPlaceholderUri(story.title) }}
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(28, 22, 45, 0.8)', '#1C162D']}
            style={styles.gradient}
          />
          <Animatable.View animation="fadeInUp" duration={800} style={styles.headerContent}>
            <Text className="text-3xl font-serif-bold text-white text-center tracking-tight">{story.title}</Text>
            <Text className="text-lg text-white/80 mt-2 text-center">from {story.origin_culture} heritage</Text>
          </Animatable.View>
        </ImageBackground>

        <View className="p-6 -mt-8 bg-background rounded-t-3xl">
          <Text style={styles.storyContent}>
            {story.content}
          </Text>

          {/* Wisdom Lesson Section */}
          <Animatable.View animation="fadeInUp" duration={800} delay={300} className="mt-8">
            <View className="bg-surface p-6 rounded-2xl border border-primary/20 items-center">
              <Feather name={isCompleted ? "check-circle" : "unlock"} size={32} className="text-primary mb-3" />
              <Text className="text-2xl font-serif-bold text-text-primary text-center mb-2">
                {isCompleted ? 'Wisdom Unlocked' : 'Unlock the Hidden Wisdom'}
              </Text>
              <Text className="text-text-secondary text-center mb-6">
                {isCompleted
                  ? `The lesson from "${story.wisdom_title}" has been added to your collection.`
                  : 'Complete this story to reveal its profound lesson and earn XP.'}
              </Text>
              {!isCompleted && (
                <Button
                  title={isUpdating ? 'Unlocking...' : 'Unlock Wisdom'}
                  onPress={handleUnlockWisdom}
                  disabled={isUpdating}
                  loading={isUpdating}
                  variant="primary"
                />
              )}
            </View>
          </Animatable.View>
        </View>
      </ScrollView>

      {/* Back Button */}
      <SafeAreaView edges={['top']} style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 350,
    justifyContent: 'flex-end',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    padding: 24,
    paddingBottom: 48,
  },
  storyContent: {
    fontSize: 17,
    lineHeight: 28,
    color: '#D1D5DB', // text-gray-300
    fontFamily: 'Inter_400Regular',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 999,
  },
});