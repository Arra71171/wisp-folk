import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type Quest = { id: string; title: string; xp: number; icon: React.ComponentProps<typeof Feather>['name'] };

export const QuestItem: React.FC<{ quest: Quest }> = ({ quest }) => (
  <View className="flex-row items-center bg-surface/80 rounded-xl p-4 mb-3 mx-6 shadow-sm">
    <View className="w-12 h-12 bg-accent/20 rounded-lg items-center justify-center">
      <Feather name={quest.icon} size={24} className="text-accent" />
    </View>
    <View className="flex-1 ml-4">
      <Text className="text-onSurface font-semibold text-base">{quest.title}</Text>
      <Text className="text-accent font-bold">+{quest.xp} XP</Text>
    </View>
    <View className="w-6 h-6 border-2 border-primary/50 rounded-full" />
  </View>
);
