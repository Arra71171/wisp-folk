import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

type SettingsRowProps = {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
};

export const SettingsRow: React.FC<SettingsRowProps> = ({ icon, label, onPress, isDestructive = false }) => (
  <Pressable onPress={onPress} className="flex-row items-center p-4 border-b border-surface/50">
    <Feather name={icon} size={20} className={isDestructive ? 'text-red-500' : 'text-onSurface/80'} />
    <Text className={`flex-1 ml-4 text-lg ${isDestructive ? 'text-red-500' : 'text-onSurface'}`}>{label}</Text>
    {!isDestructive && <Feather name="chevron-right" size={20} className="text-onSurface/50" />}
  </Pressable>
);
