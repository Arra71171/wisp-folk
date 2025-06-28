import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Skeleton from '../ui/Skeleton';

const StoryCardSkeleton = () => (
  <View className="px-6 mb-6">
    <Skeleton width="100%" height={120} style={{ borderRadius: 16 }} />
  </View>
);

export const DiscoverScreenSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50">
      <View className="px-6 pt-16 pb-6">
        {/* Header */}
        <Skeleton width={300} height={36} style={{ marginBottom: 8 }} />
        <Skeleton width={250} height={24} style={{ marginBottom: 24 }} />
        {/* Search Bar */}
        <Skeleton width="100%" height={50} style={{ borderRadius: 12 }} />
      </View>

      {/* Story List */}
      <StoryCardSkeleton />
      <StoryCardSkeleton />
      <StoryCardSkeleton />
      <StoryCardSkeleton />
    </SafeAreaView>
  );
};
