import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ComponentProps<typeof Feather>['name'];
  onIconPress?: () => void;
  isPassword?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, icon, onIconPress, isPassword, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const iconToRender = isPassword ? (isPasswordVisible ? 'eye-off' : 'eye') : icon;
    const handleIconPress = isPassword ? togglePasswordVisibility : onIconPress;

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            error ? styles.inputContainerError : null,
          ]}
        >
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={THEME.COLORS.textSecondary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={!isPasswordVisible}
            {...props}
          />
          {iconToRender && (
            <Pressable onPress={handleIconPress} style={styles.iconContainer}>
              <Feather name={iconToRender} size={20} color={THEME.COLORS.textSecondary} />
            </Pressable>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    color: THEME.COLORS.textSecondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: THEME.COLORS.surface,
  },
  inputContainerFocused: {
    borderColor: THEME.COLORS.primary,
  },
  inputContainerError: {
    borderColor: THEME.COLORS.error,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: THEME.COLORS.textPrimary,
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  errorText: {
    fontFamily: 'Sora-Regular',
    color: THEME.COLORS.error,
    marginTop: 6,
    fontSize: 12,
  },
});

export default Input;
