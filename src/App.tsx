import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './navigation/AppNavigator';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useAuthStore } from './stores/authStore';
import { UserProgressProvider } from './context/UserProgressContext';
import { registerForPushNotificationsAsync } from './lib/notifications';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Lora_400Regular,
  Lora_500Medium,
  Lora_700Bold,
} from '@expo-google-fonts/lora';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export function App() {
  console.log('App component rendering...');
  const { initialized, initialize, user } = useAuthStore();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Lora_400Regular,
    Lora_500Medium,
    Lora_700Bold,
  });

  useEffect(() => {
    console.log('App: Calling initialize() from useEffect...');
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
    }

    console.log(`App state: initialized=${initialized}, fontsLoaded=${fontsLoaded}`);
    if (initialized && (fontsLoaded || fontError)) {
      console.log('App: Hiding splash screen...');
      SplashScreen.hideAsync();
      if (!fontError) {
        console.log('App: Registering for push notifications...');
        registerForPushNotificationsAsync();
      }
    }
  }, [initialized, fontsLoaded, fontError]);

  if (!initialized || (!fontsLoaded && !fontError)) {
    console.log(`App: Not ready yet. initialized=${initialized}, fontsLoaded=${fontsLoaded}, fontError=${!!fontError}. Splash screen visible.`);
    return null; // The splash screen is visible during this time
  }

  console.log('App: Initialized and fonts loaded! Rendering NavigationContainer.');
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {user ? (
          <UserProgressProvider userId={user.id} username={user.user_metadata?.username || 'New User'}>
            <NavigationContainer theme={theme}>
              <AppNavigator />
            </NavigationContainer>
          </UserProgressProvider>
        ) : (
          <NavigationContainer theme={theme}>
            <AppNavigator />
          </NavigationContainer>
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
