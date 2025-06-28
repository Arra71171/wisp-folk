import React from 'react';
import { View, Text } from 'react-native';

export const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View className="mt-8">
    <Text className="text-2xl font-bold text-onSurface px-6 mb-4">{title}</Text>
    {children}
  </View>
);
