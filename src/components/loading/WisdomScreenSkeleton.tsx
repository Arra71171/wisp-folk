import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Skeleton from '../ui/Skeleton';
import { THEME } from '../../constants/theme';

const QuoteCardSkeleton = () => (
  <View style={styles.quoteCardContainer}>
    <View style={styles.quoteCardContent}>
      <Skeleton width="80%" height={20} style={{ marginBottom: THEME.SPACING.m }} />
      <Skeleton width="60%" height={16} />
    </View>
  </View>
);

export const WisdomScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Skeleton width={250} height={36} style={{ marginBottom: THEME.SPACING.s }} />
          <Skeleton width={300} height={24} />
        </View>

        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: THEME.SPACING.m,
  },
  headerContainer: {
    marginBottom: THEME.SPACING.xl,
    paddingHorizontal: THEME.SPACING.m,
  },
  quoteCardContainer: {
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.m,
    padding: THEME.SPACING.m,
    borderLeftWidth: 4,
    borderLeftColor: THEME.COLORS.primary,
    marginBottom: THEME.SPACING.m,
    shadowColor: THEME.COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteCardContent: {
    flex: 1,
  },
});
