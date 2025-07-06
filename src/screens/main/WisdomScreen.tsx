import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useStories, useUserProgress } from '../../hooks/useHeritage';
import { WisdomQuote } from '../../components/heritage/WisdomQuote';
import Button from '../../components/ui/Button';
import { Feather } from '@expo/vector-icons';
import { WisdomScreenSkeleton } from '../../components/loading/WisdomScreenSkeleton';
import { THEME } from '../../constants/theme';

export function WisdomScreen() {
  const { data: stories, isLoading: storiesLoading, error: storiesError, refetch: refetchStories } = useStories();
  const { data: userProgress, isLoading: progressLoading, error: progressError, refetch: refetchProgress } = useUserProgress();

  const isLoading = storiesLoading || progressLoading;
  const error = storiesError || progressError;

  const unlockedWisdoms = React.useMemo(() => {
    if (!stories || !userProgress) return [];
    const unlockedStoryIds = new Set(userProgress.filter(p => p.wisdom_unlocked).map(p => p.story_id));
    return stories.filter(story => unlockedStoryIds.has(story.id));
  }, [stories, userProgress]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Your Collected Wisdom</Text>
      <Text style={styles.subtitle}>Lessons learned from your journeys.</Text>
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
      <SafeAreaView style={styles.safeAreaError}>
        <View style={styles.errorContainer}>
          <Feather name="alert-triangle" size={48} color={THEME.COLORS.error} />
          <Text style={styles.errorTitle}>Could Not Load Wisdom</Text>
          <Text style={styles.errorText}>
            There was an issue fetching your collected wisdom. Please try again later.
          </Text>
          <Button title="Retry" onPress={handleRetry} variant="destructive" style={styles.retryButton} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={unlockedWisdoms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.quoteItemContainer}>
            <WisdomQuote quote={item.wisdom_lesson} author={item.title} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="moon" size={48} color={THEME.COLORS.textSecondary} />
            <Text style={styles.emptyTitle}>Your Wisdom Journal is Empty</Text>
            <Text style={styles.emptyText}>
              Complete stories and unlock their wisdom. Your collection will appear here.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  safeAreaError: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: THEME.SPACING.m,
    paddingTop: THEME.SPACING.l,
    paddingBottom: THEME.SPACING.m,
  },
  title: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 32,
    color: THEME.COLORS.textPrimary,
  },
  subtitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: THEME.COLORS.textSecondary,
    marginTop: THEME.SPACING.xs,
  },
  listContentContainer: {
    paddingHorizontal: THEME.SPACING.m,
    paddingBottom: THEME.SPACING.l,
  },
  quoteItemContainer: {
    marginBottom: THEME.SPACING.m,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: THEME.SPACING.xl,
  },
  errorTitle: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 24,
    color: THEME.COLORS.error,
    marginTop: THEME.SPACING.m,
  },
  errorText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: THEME.COLORS.textSecondary,
    textAlign: 'center',
    marginTop: THEME.SPACING.s,
  },
  retryButton: {
    marginTop: THEME.SPACING.l,
    width: '100%',
    maxWidth: 300,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: THEME.SPACING.xxl * 2,
    paddingHorizontal: THEME.SPACING.xl,
  },
  emptyTitle: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 22,
    color: THEME.COLORS.textPrimary,
    marginTop: THEME.SPACING.m,
  },
  emptyText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: THEME.COLORS.textSecondary,
    textAlign: 'center',
    marginTop: THEME.SPACING.s,
  },
});

