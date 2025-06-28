import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProgressBadgeProps {
  name: string;
  description: string;
  unlocked: boolean;
  icon: React.ComponentProps<typeof Feather>['name'];
}

export function ProgressBadge({ name, description, unlocked, icon }: ProgressBadgeProps) {
  const containerClasses = unlocked
    ? 'bg-amber-100 border-amber-300'
    : 'bg-gray-100 border-gray-300';
  const iconContainerClasses = unlocked ? 'bg-amber-200' : 'bg-gray-200';
  const iconColor = unlocked ? '#c27803' : '#9ca3af';
  const textColor = unlocked ? 'text-amber-900' : 'text-gray-500';
  const descriptionColor = unlocked ? 'text-amber-700' : 'text-gray-400';

  return (
    <View className={`p-4 rounded-lg border ${containerClasses} items-center w-32`}>
      <View className={`w-16 h-16 rounded-full items-center justify-center ${iconContainerClasses}`}>
        <Feather name={icon} size={32} color={iconColor} />
      </View>
      <Text className={`mt-3 font-bold text-center ${textColor}`}>{name}</Text>
      {!unlocked && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg" />
      )}
    </View>
  );
}
