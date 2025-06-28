import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  // After the app is initialized and this screen is shown, wait a moment then proceed.
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 500); // Display splash for half a second

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-surface justify-center items-center">
      <Feather name="wind" size={64} className="text-accent" />
      <Text className="text-onSurface text-5xl font-bold mt-4">Wisp</Text>
      <Text className="text-onSurface/60 text-lg">Discover Your Heritage</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
