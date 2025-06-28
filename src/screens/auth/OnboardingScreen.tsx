import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/ui/Button';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  // Animation values
  const iconOpacity = useSharedValue(0);
  const iconTranslateY = useSharedValue(20);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  React.useEffect(() => {
    iconOpacity.value = withTiming(1, { duration: 700 });
    iconTranslateY.value = withSpring(0);

    titleOpacity.value = withDelay(200, withTiming(1, { duration: 700 }));
    titleTranslateY.value = withDelay(200, withSpring(0));

    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 700 }));
    subtitleTranslateY.value = withDelay(400, withSpring(0));

    buttonOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
    buttonScale.value = withDelay(800, withSpring(1));
  }, []);

  // Animated styles
  const iconAnimatedStyle = useAnimatedStyle(() => ({ opacity: iconOpacity.value, transform: [{ translateY: iconTranslateY.value }] }));
  const titleAnimatedStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value, transform: [{ translateY: titleTranslateY.value }] }));
  const subtitleAnimatedStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value, transform: [{ translateY: subtitleTranslateY.value }] }));
  const buttonAnimatedStyle = useAnimatedStyle(() => ({ opacity: buttonOpacity.value, transform: [{ scale: buttonScale.value }] }));

  return (
    <SafeAreaView className="flex-1 bg-background justify-between items-center p-8">
      <View /> 
      <View className="items-center">
        <Animated.View style={iconAnimatedStyle}>
          <Feather name="wind" size={64} className="text-primary mb-8" />
        </Animated.View>
        <Animated.View style={titleAnimatedStyle}>
          <Text className="text-text-primary text-4xl font-sans font-bold text-center mb-4" accessibilityRole="header">
            Welcome to Wisp
          </Text>
        </Animated.View>
        <Animated.View style={subtitleAnimatedStyle}>
          <Text className="text-text-secondary text-lg font-sans text-center">
            Uncover the stories of your ancestors and explore the rich tapestry of global folklore.
          </Text>
        </Animated.View>
      </View>
      
      <Animated.View style={[buttonAnimatedStyle, { width: '100%' }]}>
        <Button 
          title="Get Started"
          onPress={() => navigation.navigate('Login')}
          accessibilityLabel="Get started"
          accessibilityHint="Navigates to the login screen"
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
