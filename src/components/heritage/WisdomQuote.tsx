import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface WisdomQuoteProps {
  quote: string;
  author: string;
}

export const WisdomQuote = React.memo(({ quote, author }: WisdomQuoteProps) => {
  return (
    <View className="bg-surface border-l-4 border-primary/50 p-4 rounded-r-lg">
      <View className="flex-row">
        <View className="mr-3 pt-1">
          <Feather name="feather" size={20} className="text-primary" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-serif italic text-text-primary leading-snug">
            "{quote}"
          </Text>
          <Text className="text-right text-sm font-sans text-text-secondary mt-2">
            — {author}
          </Text>
        </View>
      </View>
    </View>
  );
});
