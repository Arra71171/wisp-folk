import React, { useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../../../assets/animations/splash-screen.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.replace('Onboarding')}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default SplashScreen;
