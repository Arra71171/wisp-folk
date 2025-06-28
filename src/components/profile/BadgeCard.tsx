import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

type BadgeCardProps = {
  icon: React.ComponentProps<typeof Feather>['name'];
  name: string;
};

export const BadgeCard: React.FC<BadgeCardProps> = ({ icon, name }) => (
  <View className="bg-surface/50 p-4 rounded-2xl items-center justify-center w-32 h-32 mr-4">
    <Feather name={icon} size={32} className="text-accent" />
    <Text className="text-onSurface font-semibold mt-2 text-center">{name}</Text>
  </View>
);
