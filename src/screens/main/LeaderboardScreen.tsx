import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { supabase } from '../../lib/supabase';

interface LeaderboardEntry {
  id: string;
  username: string;
  xp: number;
}

export const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('xp', { ascending: false });

      if (error) {
        console.error('Error fetching leaderboard:', error);
      } else {
        setLeaderboard(data as LeaderboardEntry[]);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface-dark justify-center items-center">
        <ActivityIndicator size="large" color="#4ade80" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface-dark">
      <View className="p-4">
        <Text className="text-white text-3xl font-bold mb-4">Leaderboard</Text>
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              duration={500}
              delay={index * 100}
              useNativeDriver
              className="flex-row items-center bg-white/10 p-4 rounded-lg mb-2"
            >
              <Text className="text-white text-lg font-bold w-10">{index + 1}</Text>
              <Text className="text-white text-lg flex-1">{item.username}</Text>
              <Text className="text-accent-green-400 text-lg font-bold">{item.xp} XP</Text>
            </Animatable.View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
