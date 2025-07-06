import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { supabase } from '../../lib/supabase';
import { CodexScreenSkeleton } from '../../components/codex/CodexScreenSkeleton';
import Avatar from '../../components/ui/Avatar';

interface LeaderboardEntry {
  id: string;
  username: string;
  xp: number;
}

const LeaderboardRow = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
  const rank = index + 1;
  const isTopThree = rank <= 3;

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * 50}
    >
      <View
        className={`flex-row items-center p-3 rounded-lg mb-2 ${
          isTopThree ? 'bg-primary/20' : 'bg-surface'
        }`}>
        <Text className="text-lg font-bold text-text-secondary w-8">{rank}</Text>
        <Avatar initials={item.username[0]} size={40} />
        <View className="flex-1 mx-3">
          <Text className="text-base font-bold text-text-primary">{item.username}</Text>
        </View>
        <Text className="text-lg font-bold text-primary">{item.xp.toLocaleString()} XP</Text>
      </View>
    </Animatable.View>
  );
};

export function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles') // Assuming 'profiles' table holds user data
          .select('id, username, xp')
          .order('xp', { ascending: false })
          .limit(100);

        if (error) throw error;
        setLeaderboard(data as LeaderboardEntry[]);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
        <CodexScreenSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-4xl font-serif-bold text-text-primary">Hall of Fame</Text>
        <Text className="text-text-secondary">The most legendary adventurers.</Text>
      </View>

      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <LeaderboardRow item={item} index={index} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}
