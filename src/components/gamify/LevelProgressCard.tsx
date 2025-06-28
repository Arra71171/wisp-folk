import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

interface Props {
  level?: number;
  progress?: number; // 0 - 1
}

// Simple circular progress indicator with dummy data
export default function LevelProgressCard({ level = 5, progress = 0.65 }: Props) {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <View className="items-center p-6 rounded-2xl bg-surface/90 shadow-md">
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Defs>
          <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#0cf" />
            <Stop offset="100%" stopColor="#f0f" />
          </SvgGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View className="absolute items-center justify-center">
        <Text className="text-3xl font-bold text-onSurface">{level}</Text>
        <Text className="text-sm text-onSurface/70">Level</Text>
      </View>
      <Text className="mt-4 text-onSurface/80">{Math.round(progress * 100)}% to next level</Text>
    </View>
  );
}
