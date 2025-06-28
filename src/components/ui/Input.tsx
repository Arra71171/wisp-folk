import React from 'react';
import { TextInput, TextInputProps, Text, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <View className="w-full mb-4">
      {label && <Text className="text-text-secondary font-sans mb-2">{label}</Text>}
      <TextInput
        ref={ref}
        className={`w-full p-4 bg-surface text-text-primary font-sans rounded-lg border ${error ? 'border-red-500' : 'border-surface'} focus:border-primary`}
        placeholderTextColor="#A0A0A0" // text-text-secondary
        {...props}
      />
      {error && <Text className="text-red-500 mt-1 font-sans">{error}</Text>}
    </View>
  );
});

export default Input;
