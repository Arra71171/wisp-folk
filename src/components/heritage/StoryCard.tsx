import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Database } from '../../services/supabase';

type Story = Database['public']['Tables']['folklore_stories']['Row'];

interface StoryCardProps {
  story: Story;
  onPress: () => void;
}

// Helper to create a placeholder image from the story title
const getPlaceholderUri = (title: string) => {
  const seed = title.replace(/\s/g, '');
  return `https://picsum.photos/seed/${seed}/400/200`;
};

export const StoryCard = React.memo(({ story, onPress }: StoryCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className="active:scale-95 transition-transform duration-200"
    >
      <ImageBackground
        source={{ uri: getPlaceholderUri(story.title) }} // Replace with actual story image if available
        className="h-48 rounded-2xl overflow-hidden justify-end"
        resizeMode="cover"
      >
        <View className="bg-gradient-to-t from-surface/90 via-surface/70 to-transparent p-4">
          <Text className="text-text-primary text-lg font-sans-bold tracking-tight">{story.title}</Text>
          <Text className="text-text-secondary text-sm font-sans mt-1" numberOfLines={2}>{story.summary}</Text>
          
          <View className="flex-row items-center mt-3 gap-x-3">
            {/* Category Badge */}
            <View className="bg-primary/10 border border-primary/30 rounded-full px-2 py-1 flex-row items-center">
              <Feather name="book-open" size={12} className="text-primary" />
              <Text className="text-primary text-xs font-sans-medium ml-1.5 capitalize">{story.category}</Text>
            </View>

            {/* Difficulty Badge */}
            <View className="bg-primary/10 border border-primary/30 rounded-full px-2 py-1 flex-row items-center">
              <Feather name="bar-chart-2" size={12} className="text-primary" />
              <Text className="text-primary text-xs font-sans-medium ml-1.5">Level {story.difficulty_level}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
});
