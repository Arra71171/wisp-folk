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
import { THEME } from '../../constants/theme';

interface SkeletonProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
}

const Skeleton = ({ style, children, width, height }: SkeletonProps) => {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [-1, 1],
      [-400, 400], // This value should be wider than the widest skeleton
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateX }],
    };
  });

  const containerStyle = StyleSheet.flatten([
    styles.container,
    { width, height },
    style,
  ]);

  return (
    <View style={containerStyle}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[
            'transparent',
            'rgba(244, 114, 182, 0.1)', // primary with low opacity
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.m,
    overflow: 'hidden',
  },
});

export default Skeleton;
