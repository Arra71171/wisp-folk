import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../../stores/authStore';
import Avatar from '../../components/ui/Avatar';
import ProgressBar from '../../components/ui/ProgressBar';

// Dummy data - replace with hooks
const user = {
  name: 'Aria',
  level: 15,
  title: 'Cosmic Chronicler',
  xp: 1200,
  xpToNextLevel: 2000,
  stats: {
    stories: 42,
    wisdoms: 118,
    rank: 1,
  },
};

const achievements = [
  { id: '1', name: 'First Steps', icon: 'shield', unlocked: true },
  { id: '2', name: 'Lore Master', icon: 'book-open', unlocked: true },
  { id: '3', name: 'Explorer', icon: 'compass', unlocked: true },
  { id: '4', name: 'Time Traveler', icon: 'clock', unlocked: false },
  { id: '5', name: 'Sage', icon: 'award', unlocked: false },
  { id: '6', name: 'Historian', icon: 'map', unlocked: false },
];

const StatCard = ({ icon, label, value, onPress }: { icon: any; label: string; value: string | number; onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} className="bg-surface rounded-xl flex-1 items-center justify-center p-4">
    <Feather name={icon} size={24} className="text-primary mb-2" />
    <Text className="font-bold text-lg text-text-primary">{value}</Text>
    <Text className="text-xs text-text-secondary">{label}</Text>
  </TouchableOpacity>
);

const SettingsRow = ({ icon, text, onPress, isDestructive = false }: { icon: any; text: string; onPress?: () => void; isDestructive?: boolean }) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center bg-surface p-4 rounded-lg mb-3">
    <Feather name={icon} size={20} className={isDestructive ? 'text-red-500' : 'text-primary'} />
    <Text className={`flex-1 ml-4 ${isDestructive ? 'text-red-500' : 'text-text-primary'}`}>{text}</Text>
    {!isDestructive && <Feather name="chevron-right" size={20} className="text-text-secondary" />}
  </TouchableOpacity>
);

export function ProfileScreen() {
  const { signOut } = useAuthStore();
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <ScrollView contentContainerClassName="p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-4xl font-serif-bold text-text-primary">Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} className="w-10 h-10 bg-surface rounded-full items-center justify-center">
            <Feather name="settings" size={20} className="text-text-secondary" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="bg-surface rounded-2xl p-5 items-center mb-8">
          <Avatar initials="A" size={80} />
          <Text className="text-2xl font-bold text-text-primary mt-4">{user.name}</Text>
          <Text className="text-sm text-primary font-bold">{user.title}</Text>
          <View className="w-full mt-4">
            <Text className="text-xs text-text-secondary mb-1">Level {user.level}</Text>
            <ProgressBar progress={user.xp / user.xpToNextLevel} />
            <Text className="text-xs text-text-secondary text-right mt-1">{user.xp} / {user.xpToNextLevel} XP</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row space-x-4 mb-8">
          <StatCard icon="book-open" label="Stories Read" value={user.stats.stories} onPress={() => console.log('Stories Read pressed')} />
          <StatCard icon="key" label="Wisdoms Unlocked" value={user.stats.wisdoms} onPress={() => console.log('Wisdoms Unlocked pressed')} />
          <StatCard icon="bar-chart-2" label="Global Rank" value={`#${user.stats.rank}`} onPress={() => console.log('Global Rank pressed')} />
        </View>
        {/* Achievements */}
        <View className="mb-8">
          <Text className="text-2xl font-serif-bold text-text-primary mb-4">Achievements</Text>
          <View className="flex-row flex-wrap -mx-2">
            {achievements.map(badge => (
              <View key={badge.id} className="w-1/3 p-2 items-center">
                <View className={`w-20 h-20 rounded-full items-center justify-center ${badge.unlocked ? 'bg-surface' : 'bg-surface/50 border-2 border-dashed border-text-secondary'}`}>
                  <Feather name={badge.icon as any} size={32} className={`${badge.unlocked ? 'text-accent' : 'text-text-secondary'}`} />
                </View>
                <Text className={`text-center text-xs mt-2 ${badge.unlocked ? 'text-text-primary' : 'text-text-secondary'}`}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View>
          <Text className="text-2xl font-serif-bold text-text-primary mb-4">Settings</Text>
          <SettingsRow icon="bell" text="Notifications & Sounds" />
          <SettingsRow icon="user" text="Account Information" />
          <SettingsRow icon="shield" text="Privacy & Security" />
          <SettingsRow icon="help-circle" text="Help & Support" />
          <View className="h-4" />
          <SettingsRow icon="log-out" text="Sign Out" onPress={signOut} isDestructive />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
