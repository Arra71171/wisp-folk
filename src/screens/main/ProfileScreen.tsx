import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { useUserProgress } from '../../context/UserProgressContext';
import { Feather } from '@expo/vector-icons';

// Import our new UI components
import Card from '../../components/ui/Card';
import SectionContainer from '../../components/ui/SectionContainer';
import Avatar from '../../components/ui/Avatar';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import PrimaryButton from '../../components/ui/PrimaryButton';

// Import existing components
import { StatTile } from '../../components/profile/StatTile';
import { BadgeCard } from '../../components/profile/BadgeCard';
import { SettingsRow } from '../../components/profile/SettingsRow';
import { ProfileScreenSkeleton } from '../../components/profile/ProfileScreenSkeleton';

// Dummy data for now
const user = {
  name: 'Alex',
  email: 'alex.doe@example.com',
  avatar: 'https://picsum.photos/seed/user/200/200',
};

type Badge = {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof Feather>['name'];
};

const badges: Badge[] = [
  { id: '1', name: 'First Quest', icon: 'shield' },
  { id: '2', name: 'Lore Master', icon: 'book-open' },
  { id: '3', name: 'Explorer', icon: 'compass' },
  { id: '4', name: 'Time Traveler', icon: 'clock' },
];

const XP_PER_LEVEL = 100;

export function ProfileScreen() {
  const { signOut } = useAuthStore();
  const { playerLevel, playerXP, completedQuests, loading } = useUserProgress();

  const currentLevelXP = playerXP % XP_PER_LEVEL;
  const xpForNextLevel = XP_PER_LEVEL;
  const xpProgress = currentLevelXP / xpForNextLevel;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50">
        <ProfileScreenSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={500} useNativeDriver className="p-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-amber-900">{user.name}</Text>
              <Text className="text-amber-700">{user.email}</Text>
            </View>
            <TouchableOpacity className="p-2 rounded-full bg-white/80 shadow-sm">
              <Feather name="settings" size={20} color="#92400e" />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Avatar & Level */}
        <Animatable.View animation="fadeInUp" duration={500} delay={100} useNativeDriver className="items-center my-4">
          <Card
            title={`Level ${playerLevel}`}
            subtitle="Your current rank"
            description="Keep exploring to level up and unlock new content."
          >
            <View className="items-center py-4">
              <Avatar 
                size={80}
                source={{ uri: user.avatar }}
                ringColor="#f59e42"
              />
              <View className="mt-4 w-full">
                <ProgressBar 
                  progress={xpProgress}
                  label={`${currentLevelXP} / ${xpForNextLevel} XP`}
                  color="#f59e42"
                  height={12}
                />
                <Text className="text-center text-amber-700 mt-2 text-sm">
                  {xpForNextLevel - currentLevelXP} XP to next level
                </Text>
              </View>
            </View>
          </Card>
        </Animatable.View>

        {/* Stats */}
        <Animatable.View animation="fadeInUp" duration={500} delay={200} useNativeDriver className="mt-4">
          <SectionContainer 
            title="Your Stats"
            subtitle="Track your progress"
          >
            <View className="flex-row justify-between">
              <Card
                title={playerLevel.toString()}
                subtitle="Level"
                onPress={() => {}}
              >
                <View className="items-center py-2">
                  <Feather name="star" size={24} color="#f59e42" />
                </View>
              </Card>
              <Card
                title={playerXP.toString()}
                subtitle="Total XP"
                onPress={() => {}}
              >
                <View className="items-center py-2">
                  <Feather name="trending-up" size={24} color="#f59e42" />
                </View>
              </Card>
              <Card
                title={completedQuests.length.toString()}
                subtitle="Quests"
                onPress={() => {}}
              >
                <View className="items-center py-2">
                  <Feather name="compass" size={24} color="#f59e42" />
                </View>
              </Card>
            </View>
          </SectionContainer>
        </Animatable.View>

        {/* Badges */}
        <Animatable.View animation="fadeInUp" duration={500} delay={300} useNativeDriver className="mt-6">
          <SectionContainer 
            title="Achievements"
            subtitle="Your earned badges"
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
              {badges.map(badge => (
                <View key={badge.id} className="mr-4">
                  <Badge
                    icon={<Feather name={badge.icon} size={20} color="white" />}
                    label={badge.name}
                    color="#f59e42"
                    size={60}
                  />
                </View>
              ))}
            </ScrollView>
          </SectionContainer>
        </Animatable.View>

        {/* Recent Activity */}
        <Animatable.View animation="fadeInUp" duration={500} delay={400} useNativeDriver className="mt-6">
          <SectionContainer 
            title="Recent Activity"
            subtitle="Your latest achievements"
          >
            <Card
              title="Completed 'The Oracle's Prophecy'"
              subtitle="2 hours ago"
              description="You successfully completed this ancient Greek story and unlocked new wisdom."
            >
              <View className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Feather name="check-circle" size={20} color="#10b981" />
                  <Text className="ml-2 text-green-600 font-medium">+50 XP earned</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#f59e42" />
              </View>
            </Card>
          </SectionContainer>
        </Animatable.View>

        {/* Settings */}
        <Animatable.View animation="fadeInUp" duration={500} delay={500} useNativeDriver className="mt-6">
          <SectionContainer 
            title="Account Settings"
            subtitle="Manage your profile and preferences"
          >
            <View className="space-y-2">
              <Card
                title="Account"
                subtitle="Profile information"
                ctaLabel="Edit"
                onPress={() => {}}
              />
              <Card
                title="Notifications"
                subtitle="Manage alerts and updates"
                ctaLabel="Configure"
                onPress={() => {}}
              />
              <Card
                title="Privacy & Security"
                subtitle="Data and privacy settings"
                ctaLabel="Settings"
                onPress={() => {}}
              />
              <Card
                title="Help & Support"
                subtitle="Get help and contact support"
                ctaLabel="Contact"
                onPress={() => {}}
              />
            </View>
          </SectionContainer>
        </Animatable.View>

        {/* Sign Out */}
        <Animatable.View animation="fadeInUp" duration={500} delay={600} useNativeDriver className="mt-6 px-6">
          <PrimaryButton
            title="Sign Out"
            icon="log-out"
            onPress={signOut}
          />
        </Animatable.View>

      </ScrollView>
    </SafeAreaView>
  );
}
