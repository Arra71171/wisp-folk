import React from 'react';
import { View, ScrollView } from 'react-native';
import Skeleton from '../ui/Skeleton';

export const GamifyScreenSkeleton = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header Skeleton */}
      <View className="p-6">
        <Skeleton className="w-1/2 h-10 rounded-lg" />
        <Skeleton className="w-3/4 h-5 mt-2 rounded-md" />
      </View>

      {/* LevelProgressCard Skeleton */}
      <View className="mx-6">
        <Skeleton className="w-full h-36 rounded-2xl" />
      </View>

      {/* Today's Boosters Skeleton */}
      <View className="mt-8">
        <Skeleton className="w-1/3 h-6 mx-6 mb-4 rounded-md" />
        <View className="mx-6">
          <Skeleton className="w-full h-16 mb-2 rounded-lg" />
          <Skeleton className="w-full h-16 mb-2 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
        </View>
      </View>

      {/* Achievements Skeleton */}
      <View className="mt-8">
        <Skeleton className="w-1/2 h-6 mx-6 mb-4 rounded-md" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
          <Skeleton className="w-24 h-24 mr-4 rounded-full" />
          <Skeleton className="w-24 h-24 mr-4 rounded-full" />
          <Skeleton className="w-24 h-24 mr-4 rounded-full" />
          <Skeleton className="w-24 h-24 rounded-full" />
        </ScrollView>
      </View>

      {/* Leaderboard Skeleton */}
      <View className="mt-8">
        <Skeleton className="w-1/4 h-6 mx-6 mb-4 rounded-md" />
        <View className="mx-6">
          <Skeleton className="w-full h-40 rounded-2xl" />
        </View>
      </View>
    </ScrollView>
  );
};
