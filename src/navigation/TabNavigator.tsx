import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import DiscoverScreen from '../screens/main/DiscoverScreen';
import GamifyScreen from '../screens/main/GamifyScreen';
// import { CodexScreen } from '../screens/main/CodexScreen'; // Now a section/tab in Discover
// import { LeaderboardScreen } from '../screens/main/LeaderboardScreen'; // Now a section/tab in Gamify
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

import { CustomTabBar } from '../components/navigation/CustomTabBar';

const TabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* Wisdom content should be integrated into HomeScreen */}
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      {/* Codex content should be a section/tab within DiscoverScreen */}
      <Tab.Screen name="Gamify" component={GamifyScreen} />
      {/* Leaderboard content should be a section/tab within GamifyScreen */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
