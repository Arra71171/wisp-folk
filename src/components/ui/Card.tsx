import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewProps, ImageSourcePropType } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CardProps extends ViewProps {
  image?: ImageSourcePropType;
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  description,
  ctaLabel,
  onPress,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      className="bg-surface rounded-2xl p-4 border border-primary/10 shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform duration-200"
      onPress={onPress}
      disabled={!onPress}
      {...props}
    >
      {image && (
        <Image
          source={image}
          className="w-full h-32 rounded-xl mb-4"
          resizeMode="cover"
        />
      )}

      <View className="flex-1">
        <Text className="text-lg font-sans-bold text-text-primary">
          {title}
        </Text>

        {subtitle && (
          <Text className="text-sm font-sans-medium text-primary mt-1">
            {subtitle}
          </Text>
        )}

        {description && (
          <Text className="text-base font-sans text-text-secondary mt-3">
            {description}
          </Text>
        )}

        {children}

        {ctaLabel && onPress && (
          <View className="mt-4 flex-row items-center justify-end">
            <Text className="text-primary font-sans-semibold mr-2">
              {ctaLabel}
            </Text>
            <Feather name="arrow-right" size={16} className="text-primary" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
