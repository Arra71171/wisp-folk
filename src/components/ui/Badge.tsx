import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { THEME } from '../../constants/theme';

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'accent' | 'default';
  size?: number;
  style?: ViewStyle;
}

const createStyles = (size: number) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: size * 1.5, // Provide some space for the label
    },
    iconContainer: {
      width: size,
      height: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
      ...THEME.SHADOWS.light,
      marginBottom: THEME.SPACING.xs,
    },
    labelText: {
      fontFamily: THEME.FONTS.sans,
      fontSize: 12,
      color: THEME.COLORS.textSecondary,
      textAlign: 'center',
    },
  });

const variantStyles = {
  primary: {
    backgroundColor: THEME.COLORS.primary,
  },
  accent: {
    backgroundColor: THEME.COLORS.accent,
  },
  default: {
    backgroundColor: THEME.COLORS.surface,
  },
};

const Badge: React.FC<BadgeProps> = ({ icon, label, variant = 'default', size = 48, style }) => {
  const styles = React.useMemo(() => createStyles(size), [size]);
  const variantStyle = variantStyles[variant];

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: variantStyle.backgroundColor }]}>
        {icon}
      </View>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default Badge;