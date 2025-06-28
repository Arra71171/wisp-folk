import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ViewProps } from 'react-native';

interface ProgressBarProps extends ViewProps {
  progress: number; // 0 to 1
  label?: string;
  color?: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  color = '#61E7D1', // primary
  height = 12,
  style,
  ...props
}) => {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={style} {...props}>
      {label && (
        <Text className="mb-1 text-xs font-medium font-sans text-text-secondary">{label}</Text>
      )}
      <View
        className="w-full bg-surface rounded-full overflow-hidden"
        style={{ height }}
      >
        <Animated.View
          className="h-full rounded-full"
          style={{
            width: widthInterpolate,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;