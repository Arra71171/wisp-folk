import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
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
import { THEME } from '../../constants/theme';

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Feather name="user-plus" size={48} color={THEME.COLORS.primary} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the Wisp community.</Text>
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

        <Button title="Create Account" onPress={handleSubmit(onSubmit)} loading={loading} style={styles.button} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.signinContainer}>
          <Text style={styles.signinText}>
            Already have an account?{' '}
            <Text style={styles.signinLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: THEME.SPACING.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: THEME.SPACING.xxl,
  },
  title: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 40,
    color: THEME.COLORS.textPrimary,
    marginTop: THEME.SPACING.m,
  },
  subtitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 18,
    color: THEME.COLORS.textSecondary,
    marginTop: THEME.SPACING.xs,
  },
  button: {
    marginTop: THEME.SPACING.l,
  },
  signinContainer: {
    marginTop: THEME.SPACING.xl,
    alignItems: 'center',
  },
  signinText: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: THEME.COLORS.textSecondary,
  },
  signinLink: {
    fontFamily: 'Sora-Bold',
    color: THEME.COLORS.primary,
  },
});

export default SignupScreen;
