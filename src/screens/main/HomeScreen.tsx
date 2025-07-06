import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,

  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../navigation/types';
import { useAuthStore } from '../../stores/authStore';
import { useStories, useUserProgress } from '../../hooks/useHeritage';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

// Import UI components
import { Button } from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { StoryCard } from '../../components/heritage/StoryCard';
import { HomeScreenSkeleton } from '../../components/loading/HomeScreenSkeleton';
import { TimeTravelPortal } from '../../components/ui/TimeTravelPortal';
import { THEME } from '../../constants/theme';

export function HomeScreen() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { profile } = useAuthStore();

  const { data: stories, isLoading: storiesLoading, error: storiesError } = useStories();
  const { data: progress, isLoading: progressLoading, error: progressError } = useUserProgress();

  const isLoading = storiesLoading || progressLoading;

  const lastInProgressStory = useMemo(() => {
    if (!progress || !stories) return null;
    const sortedProgress = [...progress].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    const lastProgress = sortedProgress.find(p => p.status === 'in_progress');
    if (!lastProgress) return null;
    return stories.find(s => s.id === lastProgress.story_id);
  }, [progress, stories]);

  if (isLoading) {
    return <HomeScreenSkeleton />;
  }

  if (storiesError || progressError) {
    return (
      <View style={styles.errorContainer}>
        <Feather name="alert-triangle" size={48} color={THEME.COLORS.accent} />
        <Text style={styles.errorTitle}>Connection Error</Text>
        <Text style={styles.errorText}>We couldn't load your data. Please check your connection and try again.</Text>
        <Button title="Retry" onPress={() => { /* Implement retry logic */ }} variant="primary" />
      </View>
    );
  }

  return (
    <View style={[styles.flex1, { backgroundColor: THEME.COLORS.background }]}>
      <SafeAreaView style={styles.flex1}>
        <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerWelcome}>Welcome back,</Text>
              <Text style={styles.headerName}>{profile?.full_name || 'Explorer'}</Text>
            </View>
            <Avatar
              size={52}
              source={profile?.avatar_url ? { uri: profile.avatar_url } : undefined}
              initials={profile?.full_name?.[0] || 'E'}
            />
          </View>

          {/* Time Travel Portal - A fun, thematic element */}
          <View className="my-8">
            <TimeTravelPortal onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: THEME.SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.SPACING.l,
    paddingTop: THEME.SPACING.l,
    paddingBottom: THEME.SPACING.m,
  },
  headerWelcome: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: THEME.COLORS.textSecondary,
  },
  headerName: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 28,
    color: THEME.COLORS.textPrimary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.SPACING.xl,
    backgroundColor: THEME.COLORS.background,
  },
  errorTitle: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 24,
    color: THEME.COLORS.textPrimary,
    marginTop: THEME.SPACING.m,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: THEME.COLORS.textSecondary,
    textAlign: 'center',
    marginTop: THEME.SPACING.s,
    marginBottom: THEME.SPACING.l,
  },
});

