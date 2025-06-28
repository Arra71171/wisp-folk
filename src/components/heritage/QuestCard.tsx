import React from 'react';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Quest } from '../../types/quest';

const AnimatablePressable = Animatable.createAnimatableComponent(Pressable);

interface QuestCardProps {
  quest: Quest;
  onPress: () => void;
  index: number;
}

export const QuestCard = ({ quest, onPress, index }: QuestCardProps) => {
  return (
    <AnimatablePressable
      animation="fadeInUp"
      duration={500}
      delay={index * 100}
      useNativeDriver
      onPress={onPress}
      className="w-full aspect-square bg-surface rounded-2xl overflow-hidden shadow-lg shadow-primary/20 border border-primary/20"
    >
      <ImageBackground
        source={{ uri: quest.image }}
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(17, 24, 39, 0.9)']}
          className="absolute inset-0"
        />
        <View className="p-3">
          <Text className="text-text-primary font-sans-bold" numberOfLines={2}>{quest.title}</Text>
          <Text className="text-primary font-sans text-xs mt-1">{quest.era}</Text>
        </View>
      </ImageBackground>
    </AnimatablePressable>
  );
};
