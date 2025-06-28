🌟 Wisp - Heritage & Folklore Discovery App
"Travel through time to discover the wisdom of your ancestors"
I'll help you build Wisp, a cross-platform mobile app that combines time travel storytelling with ancestral wisdom discovery, using the latest Expo, Supabase, and modular component architecture.

📋 Stage 1: Project Setup and Authentication
🎯 Goals of Stage 1:

Initialize Expo project with latest SDK (51+)
Set up Supabase backend with authentication
Implement clean auth flow with email/password
Create modular project structure for scalability
Establish design system with time travel/heritage theming

🛠 Required Dependencies (Latest Versions):

{
  "name": "wisp-heritage-app",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "react": "18.3.1",
    "react-native": "0.74.5",
    
    // Navigation
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "react-native-screens": "~3.34.0",
    "react-native-safe-area-context": "4.10.5",
    
    // Supabase & Auth
    "@supabase/supabase-js": "^2.45.4",
    "react-native-url-polyfill": "^2.0.0",
    "@react-native-async-storage/async-storage": "1.23.1",
    
    // UI & Styling
    "nativewind": "^4.0.36",
    "react-native-reanimated": "~3.10.1",
    "react-native-gesture-handler": "~2.16.1",
    "react-native-svg": "15.2.0",
    "lottie-react-native": "6.7.0",
    
    // State Management & Utils
    "zustand": "^4.5.5",
    "@tanstack/react-query": "^5.56.2",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.8",
    
    // AI & External Services
    "openai": "^4.63.0",
    "expo-speech": "~12.0.2",
    "expo-av": "~14.0.7"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.3",
    "@types/react-native": "~0.73.0",
    "typescript": "~5.3.3",
    "tailwindcss": "^3.4.0"
  }
}

🏗 Project Structure & File Plan:

wisp-heritage-app/
├── 📱 App.tsx                     # Main app entry point
├── 📋 app.json                    # Expo configuration
├── 🎨 tailwind.config.js          # Tailwind CSS config
├── 📦 package.json               

# 🎯 Core Architecture
├── src/
│   ├── 🧭 navigation/
│   │   ├── AppNavigator.tsx       # Main navigation logic
│   │   ├── AuthNavigator.tsx      # Authentication flow
│   │   └── TabNavigator.tsx       # Bottom tab navigation
│   │
│   ├── 📱 screens/
│   │   ├── auth/
│   │   │   ├── SplashScreen.tsx   # Animated heritage-themed splash
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── main/
│   │   │   ├── HomeScreen.tsx     # Time travel hub
│   │   │   ├── DiscoverScreen.tsx # Folklore discovery
│   │   │   ├── WisdomScreen.tsx   # Ancestral wisdom
│   │   │   └── ProfileScreen.tsx  # User progress
│   │
│   ├── 🧱 components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── TimeTravelPortal.tsx
│   │   ├── auth/
│   │   │   ├── AuthForm.tsx
│   │   │   └── SocialAuthButton.tsx
│   │   └── heritage/
│   │       ├── StoryCard.tsx
│   │       ├── WisdomQuote.tsx
│   │       └── ProgressBadge.tsx
│   │
│   ├── 🏪 stores/                 # Zustand state management
│   │   ├── authStore.ts
│   │   ├── userStore.ts
│   │   └── heritageStore.ts
│   │
│   ├── 🔌 services/               # External service integrations
│   │   ├── supabase.ts           # Supabase client
│   │   ├── openai.ts             # AI services
│   │   └── analytics.ts          # Usage analytics
│   │
│   ├── 🎣 hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useHeritage.ts
│   │   └── useGamification.ts
│   │
│   ├── 🛠 utils/                  # Helper functions
│   │   ├── validation.ts         # Zod schemas
│   │   ├── constants.ts          # App constants
│   │   └── helpers.ts            # Utility functions
│   │
│   └── 🎨 assets/
│       ├── images/
│       ├── lottie/               # Animations
│       └── fonts/                # Custom fonts

# 🗃 Backend Structure (Supabase)
├── supabase/
│   ├── migrations/               # Database migrations
│   ├── functions/               # Edge functions
│   └── seed.sql                 # Initial data

🔧 Key Implementation - Supabase Setup:

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

// 🌟 Supabase Configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// 🔐 Create Supabase client with AsyncStorage for persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 📊 Database Types (will be auto-generated later)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          heritage_background: string | null;
          xp_points: number;
          current_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          heritage_background?: string | null;
          xp_points?: number;
          current_level?: number;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          heritage_background?: string | null;
          xp_points?: number;
          current_level?: number;
        };
      };
      folklore_stories: {
        Row: {
          id: string;
          title: string;
          content: string;
          culture: string;
          time_period: string;
          wisdom_lesson: string;
          difficulty_level: number;
          xp_reward: number;
          created_at: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          story_id: string;
          completed_at: string | null;
          wisdom_unlocked: boolean;
          notes: string | null;
        };
      };
    };
  };
}

🔐 Authentication Store with Zustand:

import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface AuthState {
  // 🔐 Auth State
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;

  // 📊 User Profile
  profile: {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    heritage_background: string | null;
    xp_points: number;
    current_level: number;
  } | null;

  // 🎯 Actions
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<AuthState['profile']>) => Promise<{ error?: string }>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 🏁 Initial State
  user: null,
  session: null,
  loading: true,
  initialized: false,
  profile: null,

  // 🔑 Sign In
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error: error.message };
      
      // Profile will be loaded automatically by auth listener
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // ✍️ Sign Up
  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) return { error: error.message };

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            xp_points: 0,
            current_level: 1,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  // 🚪 Sign Out
  signOut: async () => {
    await supabase.auth.signOut();
  },

  // 📝 Update Profile
  updateProfile: async (updates) => {
    try {
      const { user } = get();
      if (!user) return { error: 'No user logged in' };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) return { error: error.message };

      // Update local state
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
      }));

      return {};
    } catch (error) {
      return { error: 'Failed to update profile' };
    }
  },

  // 🚀 Initialize Auth State
  initialize: async () => {
    try {
      // Set up auth state change listener
      supabase.auth.onAuthStateChange(async (event, session) => {
        set({ session, user: session?.user ?? null, loading: false });

        if (session?.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          set({ profile });
        } else {
          set({ profile: null });
        }
      });

      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      
      set({ 
        session, 
        user: session?.user ?? null, 
        loading: false,
        initialized: true 
      });

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({ profile });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false, initialized: true });
    }
  },
}));

🎨 Heritage-Themed UI Components:

import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ActivityIndicator,
  ViewStyle,
  TextStyle 
} from 'react-native';
import { styled } from 'nativewind';

// 🎨 Styled Components
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'heritage' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

// 🌟 Heritage-themed Button Component
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className = '',
}) => {
  // 🎯 Variant Styles
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-amber-600 active:bg-amber-700';
      case 'secondary':
        return 'bg-stone-600 active:bg-stone-700';
      case 'heritage':
        return 'bg-gradient-to-r from-amber-600 to-orange-600 active:from-amber-700 active:to-orange-700';
      case 'ghost':
        return 'bg-transparent border-2 border-amber-600 active:bg-amber-50';
      default:
        return 'bg-amber-600 active:bg-amber-700';
    }
  };

  // 📏 Size Styles
  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 min-h-[40px]';
      case 'md':
        return 'px-6 py-3 min-h-[48px]';
      case 'lg':
        return 'px-8 py-4 min-h-[56px]';
      default:
        return 'px-6 py-3 min-h-[48px]';
    }
  };

  // 🔤 Text Styles
  const getTextStyles = (): string => {
    const baseStyles = 'font-semibold text-center';
    const colorStyles = variant === 'ghost' ? 'text-amber-600' : 'text-white';
    
    switch (size) {
      case 'sm':
        return `${baseStyles} ${colorStyles} text-sm`;
      case 'md':
        return `${baseStyles} ${colorStyles} text-base`;
      case 'lg':
        return `${baseStyles} ${colorStyles} text-lg`;
      default:
        return `${baseStyles} ${colorStyles} text-base`;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        rounded-xl
        flex-row
        items-center
        justify-center
        shadow-lg
        ${isDisabled ? 'opacity-50' : ''}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'ghost' ? '#d97706' : '#ffffff'} 
        />
      ) : (
        <StyledView className="flex-row items-center space-x-2">
          {icon && <StyledView>{icon}</StyledView>}
          <StyledText className={getTextStyles()}>
            {title}
          </StyledText>
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );
};

// 🎨 Heritage Input Component
interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  className = '',
}) => {
  return (
    <StyledView className={`mb-4 ${className}`}>
      <StyledText className="text-stone-700 font-medium mb-2 text-base">
        {label}
      </StyledText>
      
      <StyledView 
        className={`
          border-2 rounded-xl px-4 py-3 bg-stone-50
          ${error ? 'border-red-400' : 'border-stone-200 focus:border-amber-500'}
        `}
      >
        <input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          className="text-stone-800 text-base font-medium bg-transparent"
          placeholderTextColor="#a8a29e"
        />
      </StyledView>
      
      {error && (
        <StyledText className="text-red-500 text-sm mt-1 font-medium">
          {error}
        </StyledText>
      )}
    </StyledView>
  );
};

🔥 Main Navigation Setup:

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';

// 📱 Import Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import TabNavigator from './TabNavigator';

// 🏪 Import Store
import { useAuthStore } from '../stores/authStore';

// 🎨 Styled Components
const StyledView = styled(View);

const Stack = createNativeStackNavigator();

// 🧭 Main App Navigator
export default function AppNavigator() {
  const { user, loading, initialized, initialize } = useAuthStore();

  // 🚀 Initialize auth on app start
  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // 🔄 Show loading screen while initializing
  if (!initialized || loading) {
    return (
      <StyledView className="flex-1 items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100">
        <ActivityIndicator size="large" color="#d97706" />
      </StyledView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        {!user ? (
          // 🔐 Authentication Flow
          <>
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
            />
            <Stack.Screen 
              name="Signup" 
              component={SignupScreen} 
            />
          </>
        ) : (
          // 🏠 Main App Flow
          <Stack.Screen 
            name="MainApp" 
            component={TabNavigator}
            options={{ animation: 'fade' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 🎯 Navigation Types (for TypeScript)
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  MainApp: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList {}
  }
}

🎨 Heritage-Themed Splash Screen:

import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import LottieView from 'lottie-react-native';

// 🎨 Styled Components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledAnimatedView = styled(Animated.View);

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();
  
  // 🎭 Animation References
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // 🎬 Start animations
    Animated.sequence([
      // Logo appears
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // Text slides up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 🚀 Navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <StyledView className="flex-1 items-center justify-center bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* 🌟 Background Pattern */}
      <StyledView className="absolute inset-0 opacity-10">
        <StyledView className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDk3NzA2IiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] bg-repeat" />
      </StyledView>

      {/* 🎭 Main Content */}
      <StyledAnimatedView
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center"
      >
        {/* 🌸 Logo/Icon Area */}
        <StyledView className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full items-center justify-center shadow-2xl mb-6">
          {/* Replace with your heritage-themed icon or Lottie animation */}
          <StyledText className="text-white text-4xl font-bold">✨</StyledText>
        </StyledView>

        {/* 🏺 App Name */}
        <StyledText className="text-4xl font-bold text-amber-800 mb-2 tracking-wide">
          Wisp
        </StyledText>
        
        <StyledText className="text-lg text-amber-700 text-center font-medium">
          Discover Your Heritage
        </StyledText>
      </StyledAnimatedView>

      {/* 🔮 Tagline */}
      <StyledAnimatedView
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
        }}
        className="absolute bottom-20 px-8"
      >
        <StyledText className="text-center text-amber-600 text-base font-medium leading-6">
          "Travel through time to discover{'\n'}the wisdom of your ancestors"
        </StyledText>
      </StyledAnimatedView>

      {/* 🌊 Floating Elements */}
      <StyledAnimatedView
        style={{
          opacity: fadeAnim,
        }}
        className="absolute top-20 left-8"
      >
        <StyledText className="text-amber-300 text-2xl">🏺</StyledText>
      </StyledAnimatedView>
      
      <StyledAnimatedView
        style={{
          opacity: fadeAnim,
        }}
        className="absolute top-32 right-12"
      >
        <StyledText className="text-amber-300 text-xl">📜</StyledText>
      </StyledAnimatedView>
      
      <StyledAnimatedView
        style={{
          opacity: fadeAnim,
        }}
        className="absolute bottom-40 left-12"
      >
        <StyledText className="text-amber-300 text-lg">🕯️</StyledText>
      </StyledAnimatedView>
    </StyledView>
  );
}

🔐 Login Screen Implementation:

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 🧱 Import Components
import { Button, Input } from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';

// 🎨 Styled Components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);

// 📝 Form Validation Schema
const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const navigation = useNavigation();
  const { signIn } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // 📋 Form Management
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 🔐 Handle Login
  const onLogin = async (data: LoginFormData) => {
    setLoading(true);
    
    try {
      const result = await signIn(data.email, data.password);
      
      if (result.error) {
        Alert.alert('Login Failed', result.error);
      }
      // Navigation is handled automatically by AuthNavigator
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledKeyboardAvoidingView 
      className="flex-1 bg-gradient-to-b from-amber-50 to-orange-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StyledScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🎨 Header Section */}
        <StyledView className="pt-16 pb-8 px-6">
          <StyledView className="items-center mb-8">
            {/* 🏺 Heritage Icon */}
            <StyledView className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full items-center justify-center mb-4 shadow-lg">
              <StyledText className="text-white text-3xl">🏺</StyledText>
            </StyledView>
            
            <StyledText className="text-3xl font-bold text-amber-800 mb-2">
              Welcome Back
            </StyledText>
            
            <StyledText className="text-amber-600 text-center text-base">
              Continue your journey through{'\n'}ancestral wisdom
            </StyledText>
          </StyledView>
        </StyledView>

        {/* 📝 Login Form */}
        <StyledView className="flex-1 px-6">
          <StyledView className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100">
            
            {/* 📧 Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email Address"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  className="mb-4"
                />
              )}
            />

            {/* 🔒 Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your password"
                  secureTextEntry
                  error={errors.password?.message}
                  className="mb-6"
                />
              )}
            />

            {/* 🔐 Login Button */}
            <Button
              title="Continue Journey"
              onPress={handleSubmit(onLogin)}
              variant="heritage"
              loading={loading}
              className="mb-4"
            />

            {/* 🔗 Forgot Password */}
            <StyledTouchableOpacity className="items-center py-2">
              <StyledText className="text-amber-600 font-medium">
                Forgot your password?
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* 📱 Social Login Options */}
          <StyledView className="mt-6 bg-white rounded-2xl p-6 shadow-xl border border-amber-100">
            <StyledText className="text-center text-stone-600 font-medium mb-4">
              Or continue with
            </StyledText>
            
            <Button
              title="Continue with Google"
              onPress={() => {
                // TODO: Implement Google Sign-In
                Alert.alert('Coming Soon', 'Google Sign-In will be available soon!');
              }}
              variant="ghost"
              icon={<StyledText className="text-lg">🔍</StyledText>}
              className="mb-3"
            />
            
            <Button
              title="Continue with Apple"
              onPress={() => {
                // TODO: Implement Apple Sign-In
                Alert.alert('Coming Soon', 'Apple Sign-In will be available soon!');
              }}
              variant="secondary"
              icon={<StyledText className="text-lg">🍎</StyledText>}
            />
          </StyledView>
        </StyledView>

        {/* 📝 Sign Up Link */}
        <StyledView className="p-6 items-center">
          <StyledView className="flex-row items-center">
            <StyledText className="text-stone-600 text-base">
              New to Wisp? {' '}
            </StyledText>
            <StyledTouchableOpacity 
              onPress={() => navigation.navigate('Signup')}
            >
              <StyledText className="text-amber-600 font-semibold text-base">
                Start Your Journey
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}

🏁 Environment Configuration:

# 🔐 Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 🤖 OpenAI Configuration
EXPO_PUBLIC_OPENAI_API_KEY=sk-your-openai-key-here

# 📊 Analytics (Optional)
EXPO_PUBLIC_ANALYTICS_KEY=your-analytics-key

# 🎯 App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_URL=https://your-api.com

# 📱 App Store Configuration (for deployment)
EXPO_PUBLIC_IOS_BUNDLE_ID=com.yourcompany.wisp
EXPO_PUBLIC_ANDROID_PACKAGE=com.yourcompany.wisp

🎯 Supabase Database Schema:

-- 🏺 Wisp Heritage App - Database Schema
-- Migration: 001_initial_schema.sql

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- 👤 User Profiles Table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    heritage_background TEXT,
    preferred_language TEXT DEFAULT 'en',
    
    -- 🎮 Gamification
    xp_points INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    streak_days INTEGER DEFAULT 0,
    last_activity_date DATE DEFAULT CURRENT_DATE,
    
    -- 📊 Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 📚 Folklore Stories Table
CREATE TABLE folklore_stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    
    -- 🌍 Cultural Context
    culture TEXT NOT NULL,
    region TEXT,
    time_period TEXT,
    original_language TEXT,
    
    -- 🎓 Educational Content
    wisdom_lesson TEXT NOT NULL,
    moral_teachings TEXT[],
    historical_context TEXT,
    
    -- 🎮 Gamification
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5) DEFAULT 1,
    xp_reward INTEGER DEFAULT 10,
    estimated_read_time INTEGER, -- minutes
    
    -- 🏷️ Categorization
    tags TEXT[],
    category TEXT, -- 'myth', 'legend', 'fable', 'historical', 'wisdom'
    
    -- 📊 Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE
);

-- 📈 User Progress Table
CREATE TABLE user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    story_id UUID REFERENCES folklore_stories(id) ON DELETE CASCADE,
    
    -- 📊 Progress Status
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    
    -- 🎯 Completion Data
    completed_at TIMESTAMP WITH TIME ZONE,
    reading_time_minutes INTEGER,
    wisdom_unlocked BOOLEAN DEFAULT FALSE,
    
    -- 📝 User Generated Content
    personal_notes TEXT,
    reflection_notes TEXT,
    favorite_quotes TEXT[],
    
    -- 🏆 Achievements
    badges_earned TEXT[],
    xp_earned INTEGER DEFAULT 0,
    
    -- 📊 Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, story_id)
);

-- 🏆 Achievements/Badges Table
CREATE TABLE achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon TEXT, -- emoji or icon identifier
    category TEXT, -- 'reading', 'wisdom', 'cultural', 'streak', 'social'
    
    -- 🎯 Unlock Conditions
    unlock_condition JSONB, -- flexible conditions for unlocking
    xp_reward INTEGER DEFAULT 0,
    rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')) DEFAULT 'common',
    
    -- 📊 Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- 🏆 User Achievements Junction Table
CREATE TABLE user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, achievement_id)
);

-- 🌟 Daily Wisdom Quotes Table
CREATE TABLE wisdom_quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote TEXT NOT NULL,
    author TEXT,
    culture TEXT,
    story_id UUID REFERENCES folklore_stories(id) ON DELETE SET NULL,
    
    -- 📊 Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT FALSE
);

-- 📱 User Sessions/Analytics Table
CREATE TABLE user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    
    -- 📊 Activity Data
    stories_read INTEGER DEFAULT 0,
    xp_gained INTEGER DEFAULT 0,
    achievements_unlocked INTEGER DEFAULT 0,
    
    -- 📱 Device Info
    device_type TEXT,
    app_version TEXT
);

-- 🔒 Row Level Security Policies

-- Profiles: Users can only see and edit their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- User Progress: Users can only see their own progress
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- User Achievements: Users can only see their own achievements
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON user_achievements
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Sessions: Users can only see their own sessions
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" ON user_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for stories, achievements, and wisdom quotes
ALTER TABLE folklore_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published stories" ON folklore_stories
    FOR SELECT USING (is_published = true);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active achievements" ON achievements
    FOR SELECT USING (is_active = true);

ALTER TABLE wisdom_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view wisdom quotes" ON wisdom_quotes
    FOR SELECT USING (true);

-- 🔧 Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_folklore_stories_updated_at BEFORE UPDATE ON folklore_stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 📊 Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_story_id ON user_progress(story_id);
CREATE INDEX idx_folklore_stories_culture ON folklore_stories(culture);
CREATE INDEX idx_folklore_stories_category ON folklore_stories(category);
CREATE INDEX idx_folklore_stories_featured ON folklore_stories(is_featured);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);

🎯 Stage 1 Summary & Architecture Decisions
✅ What We've Accomplished:

🏗 Project Structure: Modular, scalable architecture with clear separation of concerns
🔐 Authentication: Complete Supabase auth setup with email/password + social login ready
🏪 State Management: Zustand store for clean, performant state management
🎨 UI System: Heritage-themed design system with reusable components
🧭 Navigation: React Navigation with auth flow and smooth transitions
🗃 Database: Comprehensive Supabase schema with RLS policies
🎭 Splash Screen: Beautiful, animated heritage-themed introduction

🧠 Key Architectural Decisions:

📱 Latest Expo SDK (51+): Future-proof development with latest features
🔐 Supabase over Firebase: Better PostgreSQL support, real-time capabilities, and Edge Functions
🏪 Zustand over Redux: Simpler state management, better TypeScript support
🎨 NativeWind: Tailwind CSS for React Native - faster styling, consistent design
📋 React Hook Form + Zod: Type-safe form validation with excellent performance
🧭 Stack + Tab Navigation: Standard pattern for auth flow + main app structure

---

## 📜 Stage 2: Core Experience & Content Integration

**🎯 Goals of Stage 2:**

*   **Build Main Screens:** Implement the functional UI for `HomeScreen`, `DiscoverScreen`, `WisdomScreen`, and `ProfileScreen`.
*   **Fetch & Display Content:** Connect to Supabase to fetch and display `folklore_stories` and `user_progress`.
*   **Implement Time Travel Hub:** Create the core interactive experience on the `HomeScreen`.
*   **Story Reading & Interaction:** Develop the story reading view with features for unlocking wisdom.
*   **Basic Gamification:** Implement XP points and level tracking based on user progress.
*   **Profile & Progress:** Allow users to view their collected wisdom, level, and heritage background on the `ProfileScreen`.

**🔧 Key Implementation - Heritage Store & React Query:**

*   **`heritageStore.ts` (Zustand):** To manage the state for currently active stories, user progress, and discovered wisdom.
*   **`useHeritage.ts` (React Query):** Custom hook to fetch data from the `folklore_stories` and `user_progress` tables with caching, loading, and error states.

```typescript
// 🏪 src/stores/heritageStore.ts
import { create } from 'zustand';
import { Database } from '../services/supabase';

type Story = Database['public']['Tables']['folklore_stories']['Row'];
type Progress = Database['public']['Tables']['user_progress']['Row'];

interface HeritageState {
  stories: Story[];
  progress: Progress[];
  isLoading: boolean;
  fetchStories: () => Promise<void>;
  updateProgress: (storyId: string) => Promise<void>;
}

// ... implementation details ...

// 🎣 src/hooks/useHeritage.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

export const useHeritage = () => {
  const queryClient = useQueryClient();

  // Fetch all stories
  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('folklore_stories').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });

  // ... other hooks for progress, etc. ...
};
```

**🧱 New Components for Stage 2:**

*   `src/components/heritage/StoryCard.tsx`: A card to display a summary of a folklore story on the `DiscoverScreen`.
*   `src/components/heritage/WisdomQuote.tsx`: A component to display an unlocked piece of ancestral wisdom.
*   `src/components/heritage/ProgressBadge.tsx`: A visual indicator of the user's level and XP.
*   `src/components/ui/TimeTravelPortal.tsx`: An animated, interactive element on the `HomeScreen` to start a new discovery session.
*   `src/screens/main/StoryReaderScreen.tsx`: A new screen to display the full content of a story.

**📊 Backend Updates for Stage 2:**

*   **Seed Data:** Populate the `folklore_stories` table with initial content using `supabase/seed.sql`.
*   **RLS Policies:** Implement Row-Level Security policies to ensure users can only access and modify their own `user_progress` and `profiles` data.

```sql
-- supabase/migrations/20250627_add_rls_policies.sql

-- Enable RLS for user_progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own progress
CREATE POLICY "Allow individual read access"
ON public.user_progress
FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Allow individual insert access"
ON public.user_progress
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Allow individual update access"
ON public.user_progress
FOR UPDATE USING (auth.uid() = user_id);
```

🚀 Stage 1 Setup Commands:
bash# 1. Create Expo project
npx create-expo-app wisp-heritage-app --template blank-typescript

# 2. Install dependencies
cd wisp-heritage-app
npm install [all dependencies from package.json]

# 3. Setup Supabase
npx supabase init
npx supabase start
npx supabase db reset

# 4. Configure environment
cp .env.example .env
# Add your Supabase URL and keys

# 5. Setup Tailwind
npx tailwindcss init
🔄 Next Stages Preview:

Stage 2: Home Screen + Heritage Discovery UI
Stage 3: Folklore Stories Integration + AI Services
Stage 4: Gamification Engine + XP System
Stage 5: User Profile + Progress Tracking

🎯 Ready to proceed to Stage 2?
This will focus on building the main app screens, heritage discovery interface, and connecting to the folklore stories. We'll also integrate the first AI services for personalized content recommendations.
Please create the stage 2 and rest of the required task
