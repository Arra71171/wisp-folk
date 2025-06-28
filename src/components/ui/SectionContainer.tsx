import React from 'react';
import { View, Text, ViewProps } from 'react-native';

interface SectionContainerProps extends ViewProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subtitle,
  children,
  style,
  ...props
}) => {
  return (
    <View
      className="my-8 border-l-4 border-primary pl-4"
      style={style}
      {...props}
    >
      <Text className="text-2xl font-serif-bold text-text-primary">{title}</Text>
      {subtitle && (
        <Text className="text-base font-sans-medium text-primary/80 mt-1 mb-4">{subtitle}</Text>
      )}
      <View className={subtitle ? '' : 'mt-4'}>
        {children}
      </View>
    </View>
  );
};

export default SectionContainer;