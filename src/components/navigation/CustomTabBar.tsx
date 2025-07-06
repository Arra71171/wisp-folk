import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const iconMap: { [key: string]: React.ComponentProps<typeof Feather>['name'] } = {
  Home: 'home',
  Discover: 'book-open',
  Gamify: 'award',
  Profile: 'user',
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const totalTabs = state.routes.length;
  const tabWidth = width / totalTabs;

  const animatedStyle = useAnimatedStyle(() => {
    const leftPosition = tabWidth * state.index;
    return {
      transform: [{ translateX: withTiming(leftPosition, { duration: 250 }) }],
    };
  });

  return (
    <View className="bg-transparent items-center">
      <View className="flex-row bg-[#1C162D]/90 border border-primary/20 rounded-full h-16 w-[90%] items-center justify-center overflow-hidden mb-6">
        <Animated.View
          style={[{ width: tabWidth, height: '100%', position: 'absolute', top: 0, left: 0 }, animatedStyle]}>
          <View className="w-16 h-16 bg-primary/20 rounded-full self-center" />
        </Animated.View>

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          const iconName = iconMap[route.name] || 'circle';

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 items-center justify-center h-full"
            >
              <Feather name={iconName} size={22} color={isFocused ? '#E0DFFC' : '#A9A9A9'} />
              <Text style={{ color: isFocused ? '#E0DFFC' : '#A9A9A9' }} className="text-[10px] mt-1 font-sans-medium">
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
