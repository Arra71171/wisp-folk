import React from 'react';
import { View } from 'react-native';
import Skeleton from '../ui/Skeleton';

export const QuestCardSkeleton = () => {
  return (
    <View className="flex-1 m-2 p-2 bg-surface-100 rounded-lg">
      <Skeleton className="w-full h-32 rounded-lg" />
      <Skeleton className="w-3/4 h-5 mt-2 rounded-md" />
      <Skeleton className="w-1/2 h-4 mt-1 rounded-md" />
    </View>
  );
};
