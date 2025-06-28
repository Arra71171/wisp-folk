import React from 'react';
import { View, ScrollView } from 'react-native';
import Skeleton from '../ui/Skeleton';

export const ProfileScreenSkeleton = () => {
  return (
    <ScrollView 
      className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6 space-y-8">
        {/* Header */}
        <View className="items-center">
          <Skeleton width={96} height={96} style={{ borderRadius: 48 }} />
          <Skeleton width={200} height={28} style={{ marginTop: 16 }} />
        </View>

        {/* Level & XP Card */}
        <View className="bg-white/70 p-5 rounded-2xl shadow-sm border border-amber-200/50">
          <View className="flex-row justify-between items-center mb-2">
            <Skeleton width={100} height={24} />
            <Skeleton width={80} height={20} />
          </View>
          <Skeleton width="100%" height={20} />
        </View>

        {/* Stats Card */}
        <View className="bg-white/70 p-5 rounded-2xl shadow-sm border border-amber-200/50">
          <Skeleton width={150} height={24} style={{ marginBottom: 16 }} />
          <View className="space-y-4">
            <Skeleton width="100%" height={24} />
            <Skeleton width="100%" height={24} />
            <Skeleton width="100%" height={24} />
          </View>
        </View>

        {/* Badges Card */}
        <View className="bg-white/70 p-5 rounded-2xl shadow-sm border border-amber-200/50">
          <Skeleton width={200} height={24} style={{ marginBottom: 16 }} />
          <View className="flex-row space-x-4">
            <Skeleton width={80} height={80} style={{ borderRadius: 16 }} />
            <Skeleton width={80} height={80} style={{ borderRadius: 16 }} />
            <Skeleton width={80} height={80} style={{ borderRadius: 16 }} />
          </View>
        </View>

      </View>
    </ScrollView>
  );
};
