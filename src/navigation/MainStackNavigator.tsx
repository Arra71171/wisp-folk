import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { StoryReaderScreen } from '../screens/main/StoryReaderScreen';
import { QuestDetailsScreen } from '../screens/main/QuestDetailsScreen';
import QuestGameplayScreen from '../screens/main/QuestGameplayScreen';
import { CodexScreen } from '../screens/main/CodexScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen 
        name="StoryReader" 
        component={StoryReaderScreen} 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="QuestDetails" 
        component={QuestDetailsScreen} 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="QuestGameplay" 
        component={QuestGameplayScreen} 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="Codex" 
        component={CodexScreen} 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}
