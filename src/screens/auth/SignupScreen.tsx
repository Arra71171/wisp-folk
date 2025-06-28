import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Feather } from '@expo/vector-icons';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../stores/authStore';
import { SignupSchema } from '../../utils/validation';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
type FormData = z.infer<typeof SignupSchema>;

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { signUp } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  });

    const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await signUp(data.email, data.password, data.fullName);
    setLoading(false);

    if (error) {
      Alert.alert('Sign Up Failed', error);
    } else {
      Alert.alert('Success!', 'Please check your email to verify your account and sign in.');
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="items-center mb-10">
          <Feather name="user-plus" size={48} className="text-primary" />
          <Text className="text-text-primary text-4xl font-sans font-bold mt-4">Create Account</Text>
          <Text className="text-text-secondary font-sans text-lg">Join the Wisp community.</Text>
        </View>

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Full Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.fullName?.message}
              placeholder="Your full name"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="you@example.com"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              secureTextEntry
              placeholder="Create a strong password"
            />
          )}
        />

        <Button title="Create Account" onPress={handleSubmit(onSubmit)} loading={loading} style={{ marginTop: 20 }} />

        <TouchableOpacity onPress={() => navigation.navigate('Login')} className="mt-6 items-center">
          <Text className="text-center text-text-secondary font-sans">
            Already have an account?{' '}
            <Text className="text-primary font-sans font-semibold">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
