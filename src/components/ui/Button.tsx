import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'heritage';
  icon?: React.ReactNode;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({ title, loading = false, variant = 'primary', icon, testID, ...props }) => {
  const baseClasses = 'w-full py-4 rounded-lg flex-row justify-center items-center gap-x-2 font-sans';

  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary',
    secondary: 'bg-surface',
    destructive: 'bg-red-600',
    outline: 'bg-transparent border border-primary',
    heritage: 'bg-accent',
  };

  const textClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'text-background font-semibold',
    secondary: 'text-text-primary font-semibold',
    destructive: 'text-white font-semibold',
    outline: 'text-primary font-semibold',
    heritage: 'text-background font-semibold',
  };

  const activityIndicatorColor = {
    primary: '#0D0C1D',
    heritage: '#0D0C1D',
    secondary: '#F0F0F0',
    destructive: '#FFFFFF',
    outline: '#39E4E4',
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={loading}
      testID={testID}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={activityIndicatorColor[variant]} />
      ) : (
        <>
          {icon}
          <Text className={`text-center text-lg ${textClasses[variant]}`}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export { Button };
export default Button;
