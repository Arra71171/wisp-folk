import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/ui/Button';
import { THEME } from '../../constants/theme';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

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

  const iconAnimatedStyle = useAnimatedStyle(() => ({ opacity: iconOpacity.value, transform: [{ translateY: iconTranslateY.value }] }));
  const titleAnimatedStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value, transform: [{ translateY: titleTranslateY.value }] }));
  const subtitleAnimatedStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value, transform: [{ translateY: subtitleTranslateY.value }] }));
  const buttonAnimatedStyle = useAnimatedStyle(() => ({ opacity: buttonOpacity.value, transform: [{ scale: buttonScale.value }] }));

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/animations/onboarding-1.json')}
        autoPlay
        loop
        style={styles.lottieBackground}
      />
      <SafeAreaView style={styles.safeArea}>
        <View />
        <View style={styles.contentContainer}>
          <Animated.View style={iconAnimatedStyle}>
            <Feather name="wind" size={64} color={THEME.COLORS.primary} style={styles.icon} />
          </Animated.View>
          <Animated.View style={titleAnimatedStyle}>
            <Text style={styles.title} accessibilityRole="header">
              Welcome to Wisp
            </Text>
          </Animated.View>
          <Animated.View style={subtitleAnimatedStyle}>
            <Text style={styles.subtitle}>
              Uncover the stories of your ancestors and explore the rich tapestry of global folklore.
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={[buttonAnimatedStyle, styles.buttonContainer]}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Login')}
            accessibilityLabel="Get started"
            accessibilityHint="Navigates to the login screen"
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: THEME.SPACING.xl,
  },
  contentContainer: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: THEME.SPACING.xl,
  },
  title: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 48,
    color: THEME.COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: THEME.SPACING.m,
  },
  subtitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 18,
    color: THEME.COLORS.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default OnboardingScreen;
