// Get View from react-native once for all mocks
const { View } = require('react-native');

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return { LinearGradient: View };
});

// Mock react-native-animatable
jest.mock('react-native-animatable', () => {
  const { View } = require('react-native');
  return {
    createAnimatableComponent: (component) => component,
    View,
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  const Animated = {
    View: View,
    Text: View,
    Image: View,
    ScrollView: View,
    FlatList: View,
  };
  const Easing = {
    inOut: (fn) => fn,
    ease: () => {},
  };
  return {
    __esModule: true,
    default: Animated,
    useSharedValue: () => ({ value: 0 }),
    useAnimatedStyle: () => ({}),
    withTiming: (value) => value,
    withSpring: (value) => value,
    withDelay: (delay, animation) => animation,
    withRepeat: (animation) => animation,
    Animated,
    Easing,
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Feather: View,
    Ionicons: View,
  };
});
