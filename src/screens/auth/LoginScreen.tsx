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
import { LoginSchema } from '../../utils/validation';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { THEME } from '../../constants/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;
type FormData = z.infer<typeof LoginSchema>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await signIn(data.email, data.password);
    setLoading(false);

    if (error) {
      Alert.alert('Login Failed', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Feather name="wind" size={48} color={THEME.COLORS.primary} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey.</Text>
        </View>

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
              placeholder="Your password"
            />
          )}
        />

        <Button title="Sign In" onPress={handleSubmit(onSubmit)} loading={loading} style={styles.button} />

        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign Up</Text>
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
  signupContainer: {
    marginTop: THEME.SPACING.xl,
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: THEME.COLORS.textSecondary,
  },
  signupLink: {
    fontFamily: 'Sora-Bold',
    color: THEME.COLORS.primary,
  },
});

export default LoginScreen;
