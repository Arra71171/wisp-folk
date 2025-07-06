import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../../constants/theme';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.content}>
        <Text style={styles.placeholderText}>Settings will be available here soon.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  title: {
    fontSize: 34,
    fontFamily: THEME.FONTS.serifBold,
    color: THEME.COLORS.textPrimary,
    paddingHorizontal: THEME.SPACING.l,
    paddingTop: THEME.SPACING.m,
    paddingBottom: THEME.SPACING.m,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: THEME.COLORS.textSecondary,
    fontFamily: THEME.FONTS.sans,
  },
});

export default SettingsScreen;
