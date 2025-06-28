import React from 'react';
import { View, ScrollView } from 'react-native';
import Skeleton from '../ui/Skeleton';

export const HomeScreenSkeleton = () => {
  return (
    <ScrollView 
      className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6 pt-16">
        {/* Header */}
        <View className="mb-8">
          <Skeleton width={150} height={24} style={{ marginBottom: 8 }} />
          <Skeleton width={250} height={36} />
        </View>

        {/* Time Travel Portal */}
        <Skeleton width="100%" height={180} style={{ borderRadius: 24 }} />

        {/* Daily Wisdom */}
        <View className="mt-8">
          <Skeleton width={180} height={28} style={{ marginBottom: 16 }} />
          <Skeleton width="100%" height={100} />
        </View>

        {/* Continue Journey */}
        <View className="mt-8">
          <Skeleton width={220} height={28} style={{ marginBottom: 16 }} />
          <Skeleton width="100%" height={120} style={{ borderRadius: 16 }} />
        </View>

        {/* Discover More */}
        <Skeleton width="100%" height={80} style={{ marginTop: 32, borderRadius: 16 }} />
      </View>
    </ScrollView>
  );
};
