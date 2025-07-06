import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { THEME } from '../../constants/theme';

interface TimeTravelPortalProps {
  onPress: () => void;
}

export function TimeTravelPortal({ onPress }: TimeTravelPortalProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../../../assets/animations/portal.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Time Travel Hub</Text>
            <Text style={styles.subtitle}>Tap here to discover a new story from the past.</Text>
          </View>

          <View style={styles.iconContainer}>
            <Feather name="chevron-right" size={20} color={THEME.COLORS.primary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.xl,
    padding: THEME.SPACING.l,
    borderWidth: 1,
    borderColor: 'rgba(244, 114, 182, 0.2)', // primary/20
    shadowColor: THEME.COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animationContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: THEME.SPACING.m,
  },
  animation: {
    width: 120,
    height: 120,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 24,
    color: THEME.COLORS.textPrimary,
  },
  subtitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: THEME.COLORS.textSecondary,
    marginTop: 4,
  },
  iconContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(244, 114, 182, 0.1)', // primary/10
    borderRadius: 999,
    padding: 4,
  },
});
