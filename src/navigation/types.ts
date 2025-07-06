import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Quest } from '../types/quest';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Auth Stack
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

// Tab Navigator
export type TabParamList = {
  Home: undefined;
  Discover: undefined;
  Gamify: undefined;
  Profile: undefined;
};

// Main Stack (Authenticated App)
export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  StoryReader: { storyId: string };
  QuestDetails: { questId: string };
  QuestGameplay: { questId: string };
  Codex: undefined;
  Settings: undefined;
};

// Screen Prop Types
export type MainStackScreenProps<T extends keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, T>;
export type MainStackNavigationProp = NativeStackScreenProps<MainStackParamList>['navigation'];
export type StoryReaderScreenRouteProp = NativeStackScreenProps<MainStackParamList, 'StoryReader'>['route'];
