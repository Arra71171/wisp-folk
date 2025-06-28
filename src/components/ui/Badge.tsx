import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
  size?: number;
}

const Badge: React.FC<BadgeProps> = ({
  icon,
  label,
  color = '#f59e42', // amber-500
  size = 40,
}) => {
  return (
    <View className="items-center">
      <View
        className="justify-center items-center shadow-md"
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }}
      >
        {icon}
      </View>
      <Text className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-200 text-center">
        {label}
      </Text>
    </View>
  );
};

export default Badge; 