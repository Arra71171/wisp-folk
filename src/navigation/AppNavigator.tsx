import React from 'react';
import { useAuthStore } from '../stores/authStore';
import AuthNavigator from './AuthNavigator';
import { MainStackNavigator } from './MainStackNavigator';
import { View, ActivityIndicator } from 'react-native';
import { UserProgressProvider } from '../context/UserProgressContext';

const AppNavigator = () => {
  const { session, loading, initialized } = useAuthStore();

  if (loading || !initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (session) {
    return (
      <UserProgressProvider userId={session.user.id} username={session.user.email || 'Anonymous'}>
        <MainStackNavigator />
      </UserProgressProvider>
    );
  }

  return <AuthNavigator />;
};

export default AppNavigator;
