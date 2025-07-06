import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../constants/theme';

interface ProgressBarProps extends ViewProps {
  progress: number; // 0 to 1
  label?: string;
  height?: number;
}

const createStyles = (height: number) =>
  StyleSheet.create({
    label: {
      fontFamily: THEME.FONTS.sans,
      fontSize: 12,
      color: THEME.COLORS.textSecondary,
      marginBottom: THEME.SPACING.xs,
    },
    track: {
      height,
      backgroundColor: THEME.COLORS.surface,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: height / 2,
    },
  });

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  height = 10,
  style,
  ...props
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false, // width animation is not supported by native driver
    }).start();
  }, [progress]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const styles = React.useMemo(() => createStyles(height), [height]);

  return (
    <View style={style} {...props}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.track}>
        <Animated.View style={{ width: widthInterpolated }}>
          <LinearGradient
            colors={[THEME.COLORS.primary, THEME.COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.fill}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default ProgressBar;