import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { THEME } from '../../constants/theme';

interface SectionContainerProps extends ViewProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subtitle,
  children,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: THEME.SPACING.l,
    borderLeftWidth: 3,
    borderLeftColor: THEME.COLORS.primary,
    paddingLeft: THEME.SPACING.m,
  },
  title: {
    fontFamily: THEME.FONTS.serifBold,
    fontSize: 28,
    color: THEME.COLORS.textPrimary,
    marginBottom: THEME.SPACING.xs,
  },
  subtitle: {
    fontFamily: THEME.FONTS.sans,
    fontSize: 16,
    color: THEME.COLORS.textSecondary,
    marginBottom: THEME.SPACING.m,
  },
  childrenContainer: {
    marginTop: THEME.SPACING.m,
  },
});

export default SectionContainer;