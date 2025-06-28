import React from 'react';
import { View, ScrollView } from 'react-native';
import Skeleton from '../ui/Skeleton';

export const CodexScreenSkeleton = () => {
  return (
    <View className="flex-1 p-4">
      {/* Header Skeleton */}
      <View className="mb-4">
        <Skeleton className="w-1/2 h-8 rounded-lg" />
        <Skeleton className="w-3/4 h-5 mt-2 rounded-md" />
      </View>

      {/* Tabs Skeleton */}
      <View className="flex-row mb-4">
        <Skeleton className="w-1/4 h-10 mr-2 rounded-lg" />
        <Skeleton className="w-1/4 h-10 mr-2 rounded-lg" />
        <Skeleton className="w-1/4 h-10 mr-2 rounded-lg" />
        <Skeleton className="w-1/4 h-10 rounded-lg" />
      </View>

      {/* Masonry List Skeleton */}
      <View className="flex-1 flex-row">
        <View className="flex-1 mr-2">
          <Skeleton className="w-full h-48 mb-2 rounded-lg" />
          <Skeleton className="w-full h-64 mb-2 rounded-lg" />
        </View>
        <View className="flex-1 ml-2">
          <Skeleton className="w-full h-64 mb-2 rounded-lg" />
          <Skeleton className="w-full h-48 mb-2 rounded-lg" />
        </View>
      </View>
    </View>
  );
};
