import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';

interface WisdomQuoteProps {
  quote: string;
  author: string;
}

export const WisdomQuote = React.memo(({ quote, author }: WisdomQuoteProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="feather" size={20} color={THEME.COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.quoteText}>“{quote}”</Text>
        <Text style={styles.authorText}>— {author}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.m,
    padding: THEME.SPACING.m,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: THEME.COLORS.primary,
    shadowColor: THEME.COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    marginRight: THEME.SPACING.m,
    paddingTop: THEME.SPACING.xs,
  },
  textContainer: {
    flex: 1,
  },
  quoteText: {
    fontFamily: 'CormorantGaramond-SemiBoldItalic',
    fontSize: 18,
    color: THEME.COLORS.textPrimary,
    lineHeight: 26,
  },
  authorText: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: THEME.COLORS.textSecondary,
    textAlign: 'right',
    marginTop: THEME.SPACING.s,
  },
});
