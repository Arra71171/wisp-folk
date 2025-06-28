import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

type StatTileProps = {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  value: string | number;
};

export const StatTile: React.FC<StatTileProps> = ({ icon, label, value }) => (
  <View className="bg-surface/50 p-4 rounded-2xl items-center justify-center w-32 h-32 mr-4">
    <Feather name={icon} size={24} className="text-accent" />
    <Text className="text-onSurface text-2xl font-bold mt-1">{value}</Text>
    <Text className="text-onSurface/60 text-sm">{label}</Text>
  </View>
);
