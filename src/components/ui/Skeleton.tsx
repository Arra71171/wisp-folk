import React, { useEffect } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet, DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface SkeletonProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
}

const Skeleton = ({ className, style, children, width, height }: SkeletonProps) => {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [-1, 1],
      [-300, 300], // Adjust based on component width
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateX }],
    };
  });

  const containerStyle = StyleSheet.flatten([
    { width, height },
    style,
  ]);

  return (
    <View
      style={containerStyle}
      className={`bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden ${className}`}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[
            'transparent',
            'rgba(255, 255, 255, 0.1)',
            'transparent',
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

export default Skeleton;
