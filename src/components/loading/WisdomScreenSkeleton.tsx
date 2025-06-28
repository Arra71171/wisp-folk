import React from 'react';
import { View, ScrollView } from 'react-native';
import Skeleton from '../ui/Skeleton';

const QuoteCardSkeleton = () => (
  <View className="bg-white/70 p-5 rounded-2xl shadow-sm border border-amber-200/50 mb-6">
    <Skeleton width="80%" height={20} style={{ marginBottom: 12 }} />
    <Skeleton width="60%" height={16} />
  </View>
);

export const WisdomScreenSkeleton = () => {
  return (
    <ScrollView 
      className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50"
      contentContainerStyle={{ padding: 24, paddingTop: 80 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8 px-6">
        <Skeleton width={250} height={36} style={{ marginBottom: 8 }} />
        <Skeleton width={300} height={24} />
      </View>
      
      <View className="px-6">
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
      </View>
    </ScrollView>
  );
};
