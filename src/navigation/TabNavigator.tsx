import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { DiscoverScreen } from '../screens/main/DiscoverScreen';
import { GamifyScreen } from '../screens/main/GamifyScreen';
// import { CodexScreen } from '../screens/main/CodexScreen'; // Now a section/tab in Discover
// import { LeaderboardScreen } from '../screens/main/LeaderboardScreen'; // Now a section/tab in Gamify
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Feather>['name'];

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Discover') {
            iconName = 'compass';
          } else if (route.name === 'Gamify') {
            iconName = 'zap';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else {
            iconName = 'circle';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgb(var(--color-accent))',
        tabBarInactiveTintColor: 'rgb(var(--color-on-surface))',
        tabBarStyle: {
          backgroundColor: 'rgb(var(--color-surface))',
          borderTopColor: 'rgb(var(--color-primary))',
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
      })}
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
