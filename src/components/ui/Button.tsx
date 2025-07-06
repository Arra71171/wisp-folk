import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  icon?: React.ComponentProps<typeof Feather>['name'];
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  icon,
  style,
  ...props
}) => {
  const variantStyle = variantStyles[variant];
  const containerStyle = [styles.baseContainer, variantStyle.container, style];
  const textStyle = [styles.baseText, variantStyle.text];

  if (props.disabled) {
    containerStyle.push(styles.disabled);
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={loading || props.disabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.activityIndicatorColor} />
      ) : (
        <>
          {icon && <Feather name={icon} size={20} color={variantStyle.text.color} style={styles.icon} />}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: THEME.RADIUS.full,
    shadowColor: THEME.COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  baseText: {
    fontFamily: THEME.FONTS.sansBold,
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    marginRight: THEME.SPACING.s,
  },
  disabled: {
    opacity: 0.5,
    elevation: 0,
    shadowOpacity: 0,
  },
});

const variantStyles = {
  primary: {
    container: {
      backgroundColor: THEME.COLORS.primary,
    },
    text: {
      color: THEME.COLORS.background,
    },
    activityIndicatorColor: THEME.COLORS.background,
  },
  secondary: {
    container: {
      backgroundColor: THEME.COLORS.surface,
      borderWidth: 1,
      borderColor: THEME.COLORS.primary,
    },
    text: {
      color: THEME.COLORS.textPrimary,
    },
    activityIndicatorColor: THEME.COLORS.textPrimary,
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: THEME.COLORS.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    text: {
      color: THEME.COLORS.primary,
    },
    activityIndicatorColor: THEME.COLORS.primary,
  },
  destructive: {
    container: {
      backgroundColor: THEME.COLORS.error,
      shadowColor: THEME.COLORS.error,
    },
    text: {
      color: THEME.COLORS.textPrimary,
    },
    activityIndicatorColor: THEME.COLORS.textPrimary,
  },
};

export { Button };
export default Button;
