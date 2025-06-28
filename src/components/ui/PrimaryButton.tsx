import React from 'react';
import { TouchableOpacity, Text, View, GestureResponderEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface PrimaryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: React.ComponentProps<typeof Feather>['name'];
  disabled?: boolean;
  accessibilityLabel?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  icon,
  disabled = false,
  accessibilityLabel,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center rounded-full px-6 py-4 bg-primary shadow-lg shadow-primary/30 active:scale-95 ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      activeOpacity={0.85}
    >
      {icon && (
        <View className="mr-2">
          <Feather name={icon} size={20} className="text-background" />
        </View>
      )}
      <Text className="text-background font-sans-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;