import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { useUserProgress } from '../../context/UserProgressContext';

// Import our new UI components
import Card from '../../components/ui/Card';
import SectionContainer from '../../components/ui/SectionContainer';
import PrimaryButton from '../../components/ui/PrimaryButton';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';

// Import existing components
import { BadgeCard } from '../../components/profile/BadgeCard';
import LevelProgressCard from '../../components/gamify/LevelProgressCard';
import { Section } from '../../components/gamify/Section';
import { QuestItem, Quest } from '../../components/gamify/QuestItem';
import { GamifyScreenSkeleton } from '../../components/gamify/GamifyScreenSkeleton';

// --- DUMMY DATA ---
const dailyQuests: Quest[] = [
  { id: 'daily-quest-1', title: 'Complete a quest', xp: 25, icon: 'compass' },
  { id: 'daily-quest-2', title: 'Share wisdom with a friend', xp: 15, icon: 'share-2' },
  { id: 'daily-quest-3', title: 'Open the Codex', xp: 10, icon: 'book-open' },
];

type Badge = { id: string; name: string; icon: React.ComponentProps<typeof Feather>['name'] };
const badges: Badge[] = [
  { id: '1', name: 'First Quest', icon: 'shield' },
  { id: '2', name: 'Lore Master', icon: 'book-open' },
  { id: '3', name: 'Explorer', icon: 'compass' },
  { id: '4', name: 'Time Traveler', icon: 'clock' },
];

// Mock leaderboard data
const leaderboardData = [
  { id: '1', name: 'Alex Chen', level: 15, xp: 2450, avatar: null, rank: 1 },
  { id: '2', name: 'Maya Patel', level: 14, xp: 2300, avatar: null, rank: 2 },
  { id: '3', name: 'Jordan Smith', level: 13, xp: 2150, avatar: null, rank: 3 },
  { id: '4', name: 'Sam Wilson', level: 12, xp: 2000, avatar: null, rank: 4 },
  { id: '5', name: 'Taylor Brown', level: 11, xp: 1850, avatar: null, rank: 5 },
];

type TabType = 'progress' | 'leaderboard';

export const GamifyScreen = () => {
  const { completedQuests, loading } = useUserProgress();
  const [activeTab, setActiveTab] = useState<TabType>('progress');

  const availableDailyQuests = dailyQuests.filter(q => !completedQuests.includes(q.id));

  const renderTabButton = (tab: TabType, label: string, icon: string) => (
    <TouchableOpacity
      className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-full ${
        activeTab === tab 
          ? 'bg-amber-500 shadow-md' 
          : 'bg-white/80'
      }`}
      onPress={() => setActiveTab(tab)}
    >
      <Text className={`text-lg mr-2 ${activeTab === tab ? 'text-white' : 'text-amber-700'}`}>
        {icon}
      </Text>
      <Text className={`font-medium ${activeTab === tab ? 'text-white' : 'text-amber-700'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50">
        <GamifyScreenSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Animatable.View animation="fadeInDown" duration={500} useNativeDriver className="p-6">
          <Text className="text-4xl font-bold text-amber-900">Gamify</Text>
          <Text className="text-amber-700">Boost your progress and earn rewards.</Text>
        </Animatable.View>

        {/* Tab Navigation */}
        <Animatable.View animation="fadeInUp" duration={500} delay={100} useNativeDriver className="px-6 mb-4">
          <View className="flex-row space-x-2">
            {renderTabButton('progress', 'Progress', '📈')}
            {renderTabButton('leaderboard', 'Leaderboard', '🏆')}
          </View>
        </Animatable.View>

        {activeTab === 'progress' ? (
          <>
            <Animatable.View animation="fadeInUp" duration={500} delay={200} useNativeDriver>
              <LevelProgressCard />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={500} delay={300} useNativeDriver>
              <Section title="Today's Boosters">
                {availableDailyQuests.length > 0 ? (
                  availableDailyQuests.map(q => <QuestItem key={q.id} quest={q} />)
                ) : (
                  <Card
                    title="All Boosters Complete!"
                    subtitle="Great job today"
                    description="You've completed all boosters for today. Check back tomorrow for new challenges!"
                  >
                    <View className="items-center py-4">
                      <Feather name="check-circle" size={48} color="#10b981" />
                    </View>
                  </Card>
                )}
              </Section>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={500} delay={400} useNativeDriver>
              <Section title="Achievements">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                  {badges.map(badge => (
                    <View key={badge.id} className="mr-4">
                      <Badge
                        icon={<Feather name={badge.icon} size={20} color="white" />}
                        label={badge.name}
                        color="#f59e42"
                        size={50}
                      />
                    </View>
                  ))}
                </ScrollView>
              </Section>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={500} delay={500} useNativeDriver>
              <Section title="Weekly Goals">
                <Card
                  title="Complete 5 Stories"
                  subtitle="Weekly Challenge"
                  description="Read and complete 5 stories this week to earn bonus XP and unlock special rewards."
                >
                  <View className="py-4">
                    <ProgressBar 
                      progress={0.6} 
                      label="Progress: 3/5 stories"
                      color="#f59e42"
                      height={12}
                    />
                    <View className="flex-row justify-between mt-2">
                      <Text className="text-sm text-amber-700">3 completed</Text>
                      <Text className="text-sm text-amber-700">+100 XP reward</Text>
                    </View>
                  </View>
                </Card>
              </Section>
            </Animatable.View>
          </>
        ) : (
          <>
            <Animatable.View animation="fadeInUp" duration={500} delay={200} useNativeDriver>
              <SectionContainer 
                title="Global Leaderboard"
                subtitle="Top historians this week"
              >
                <Text className="text-amber-700 mb-4">
                  Compete with explorers from around the world and see who's the top historian.
                </Text>
              </SectionContainer>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={500} delay={300} useNativeDriver>
              <View className="px-6 space-y-3">
                {leaderboardData.map((player, index) => (
                  <Card
                    key={player.id}
                    title={player.name}
                    subtitle={`Level ${player.level} • ${player.xp} XP`}
                    onPress={() => {
                      // Navigate to player profile
                      console.log('View player profile:', player.name);
                    }}
                  >
                    <View className="flex-row items-center justify-between py-2">
                      <View className="flex-row items-center">
                        <View className="mr-3">
                          {player.rank <= 3 ? (
                            <Text className="text-2xl">
                              {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                            </Text>
                          ) : (
                            <Text className="text-lg font-bold text-amber-700">#{player.rank}</Text>
                          )}
                        </View>
                        <Avatar 
                          size={40}
                          initials={player.name.charAt(0)}
                          ringColor={player.rank <= 3 ? '#fbbf24' : '#f59e42'}
                        />
                      </View>
                      <Feather name="chevron-right" size={20} color="#f59e42" />
                    </View>
                  </Card>
                ))}
              </View>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={500} delay={400} useNativeDriver>
              <SectionContainer 
                title="Your Ranking"
                subtitle="How you compare"
              >
                <Card
                  title="You're doing great!"
                  subtitle="Keep exploring to climb the ranks"
                  description="Complete more stories and quests to earn XP and move up the leaderboard."
                >
                  <View className="flex-row items-center justify-between py-2">
                    <View className="flex-row items-center">
                      <Feather name="trending-up" size={20} color="#10b981" />
                      <Text className="ml-2 text-green-600 font-medium">Rank #12</Text>
                    </View>
                    <PrimaryButton
                      title="View Profile"
                      icon="user"
                      onPress={() => {
                        // Navigate to own profile
                        console.log('View own profile');
                      }}
                    />
                  </View>
                </Card>
              </SectionContainer>
            </Animatable.View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};
