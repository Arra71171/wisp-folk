import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

interface TimeTravelPortalProps {
  onPress: () => void;
}

export function TimeTravelPortal({ onPress }: TimeTravelPortalProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="active:scale-95"
    >
      <View className="bg-surface rounded-3xl p-6 shadow-lg shadow-primary/20 overflow-hidden border border-primary/30">
        <View className="flex-row items-center">
          {/* Icon/Animation */}
          <View className="w-24 h-24 items-center justify-center mr-4">
            <LottieView
              source={require('../../../assets/animations/portal.json')}
              autoPlay
              loop
              style={{ width: 120, height: 120 }}
            />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text className="text-2xl font-sans-bold text-text-primary tracking-tight">
              Time Travel Hub
            </Text>
            <Text className="font-sans text-text-secondary mt-1">
              Tap here to discover a new story from the past.
            </Text>
          </View>

          {/* Arrow Icon */}
          <View className="absolute top-2 right-2 bg-primary/10 rounded-full p-1">
             <Feather name="chevron-right" size={20} className="text-primary" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
