import React from 'react';
import { Pressable, Text } from 'react-native';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const FilterChip = ({ label, isSelected, onPress }: FilterChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 border active:scale-95 transition-all duration-200 ${
        isSelected
          ? 'bg-primary border-primary shadow-lg shadow-primary/30'
          : 'bg-surface border-primary/20'
      }`}
    >
      <Text
        className={`font-sans-medium ${
          isSelected ? 'text-background' : 'text-text-secondary'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};
