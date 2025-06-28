import React from 'react';
import { View, ScrollView } from 'react-native';
import Skeleton from '../ui/Skeleton';

export const ProfileScreenSkeleton = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header Skeleton */}
      <View className="p-6 flex-row items-center">
        <View className="flex-1">
          <Skeleton className="w-3/4 h-8 rounded-md" />
          <Skeleton className="w-1/2 h-5 mt-2 rounded-md" />
        </View>
        <Skeleton className="w-12 h-12 rounded-full" />
      </View>

      {/* Avatar Skeleton */}
      <View className="items-center my-4">
        <Skeleton className="w-32 h-32 rounded-full" />
      </View>

      {/* Stats Skeleton */}
      <View className="mt-4">
        <Skeleton className="w-1/4 h-6 mx-6 mb-4 rounded-md" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
          <Skeleton className="w-24 h-24 mr-4 rounded-lg" />
          <Skeleton className="w-24 h-24 mr-4 rounded-lg" />
          <Skeleton className="w-24 h-24 rounded-lg" />
        </ScrollView>
      </View>

      {/* Badges Skeleton */}
      <View className="mt-8">
        <Skeleton className="w-1/3 h-6 mx-6 mb-4 rounded-md" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
          <Skeleton className="w-20 h-20 mr-4 rounded-full" />
          <Skeleton className="w-20 h-20 mr-4 rounded-full" />
          <Skeleton className="w-20 h-20 mr-4 rounded-full" />
          <Skeleton className="w-20 h-20 rounded-full" />
        </ScrollView>
      </View>

      {/* Settings Skeleton */}
      <View className="mt-8 border-t border-surface/50 mx-6 pt-4">
        <Skeleton className="w-full h-12 mb-2 rounded-lg" />
        <Skeleton className="w-full h-12 mb-2 rounded-lg" />
        <Skeleton className="w-full h-12 mb-2 rounded-lg" />
        <Skeleton className="w-full h-12 rounded-lg" />
      </View>
    </ScrollView>
  );
};
