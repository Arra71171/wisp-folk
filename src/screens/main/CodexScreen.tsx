import React, { useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MasonryFlashList } from '@shopify/flash-list';
import { useUserProgress } from '../../context/UserProgressContext';
import { CodexScreenSkeleton } from '../../components/codex/CodexScreenSkeleton';
import { CodexDetailModal } from '../../components/codex/CodexDetailModal';

interface CodexEntry {
  id: string;
  title: string;
  category: 'Lore' | 'Characters' | 'Items';
  image: string;
  height: number;
}

const Tab = createMaterialTopTabNavigator();

const DUMMY_CODEX_DATA: CodexEntry[] = [
  { id: '1', title: 'The Whispering Woods', category: 'Lore', image: 'https://picsum.photos/seed/1/400/600', height: 250 },
  { id: '2', title: 'Elara, the Sun-Blessed', category: 'Characters', image: 'https://picsum.photos/seed/2/400/400', height: 200 },
  { id: '3', title: 'Amulet of a Thousand Truths', category: 'Items', image: 'https://picsum.photos/seed/3/400/500', height: 220 },
  { id: '4', title: 'The Sundered Kingdom', category: 'Lore', image: 'https://picsum.photos/seed/4/400/700', height: 300 },
  { id: '5', title: 'Kael, the Shadow-Walker', category: 'Characters', image: 'https://picsum.photos/seed/5/400/450', height: 210 },
  { id: '6', title: 'The Starfall Prophecy', category: 'Lore', image: 'https://picsum.photos/seed/6/400/550', height: 280 },
  { id: '7', title: 'Blade of the Serpent', category: 'Items', image: 'https://picsum.photos/seed/7/400/300', height: 180 },
];

const CodexEntryCard = ({ item, onPress, index }: { item: CodexEntry; onPress: () => void; index: number }) => (
  <Animatable.View
    animation="zoomIn"
    duration={500}
    delay={index * 100}
    useNativeDriver
  >
    <Pressable className="m-1.5 rounded-xl overflow-hidden" onPress={onPress}>
      <ImageBackground source={{ uri: item.image }} style={{ height: item.height }} className="w-full justify-end">
        <View className="p-3 bg-gradient-to-t from-black/70 to-transparent">
          <Text className="text-white font-bold text-base shadow-lg">{item.title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  </Animatable.View>
);

const CodexList = ({ data, onEntryPress }: { data: CodexEntry[]; onEntryPress: (entry: CodexEntry) => void }) => {
  if (data.length === 0) {
    return (
      <View className="flex-1 bg-surface items-center justify-center p-8">
        <Text className="text-onSurface/60 text-center">No entries unlocked in this category yet. Complete quests to discover more!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <MasonryFlashList
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => <CodexEntryCard item={item} onPress={() => onEntryPress(item)} index={index} />}
        keyExtractor={item => item.id}
        estimatedItemSize={200}
        contentContainerStyle={{ padding: 6 }}
      />
    </View>
  );
};

export const CodexScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null);
  const { unlockedCodexEntries, loading } = useUserProgress();

  const unlockedCodexData = DUMMY_CODEX_DATA.filter(entry => unlockedCodexEntries.includes(entry.id));

  const handleEntryPress = (entry: CodexEntry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <CodexScreenSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="p-6">
        <Text className="text-3xl font-bold text-onSurface">Codex</Text>
        <Text className="text-onSurface/60">Your collection of discovered knowledge</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'rgb(var(--color-surface))' },
          tabBarLabelStyle: { color: 'rgb(var(--color-on-surface))', fontWeight: '600' },
          tabBarIndicatorStyle: { backgroundColor: 'rgb(var(--color-accent))', height: 3 },
          tabBarActiveTintColor: 'rgb(var(--color-accent))',
          tabBarInactiveTintColor: 'rgb(var(--color-on-surface-variant))',
        }}
      >
        <Tab.Screen name="All">{() => <CodexList data={unlockedCodexData} onEntryPress={handleEntryPress} />}</Tab.Screen>
        <Tab.Screen name="Lore">{() => <CodexList data={unlockedCodexData.filter(e => e.category === 'Lore')} onEntryPress={handleEntryPress} />}</Tab.Screen>
        <Tab.Screen name="Characters">{() => <CodexList data={unlockedCodexData.filter(e => e.category === 'Characters')} onEntryPress={handleEntryPress} />}</Tab.Screen>
        <Tab.Screen name="Items">{() => <CodexList data={unlockedCodexData.filter(e => e.category === 'Items')} onEntryPress={handleEntryPress} />}</Tab.Screen>
      </Tab.Navigator>
      <CodexDetailModal visible={isModalVisible} onClose={handleCloseModal} entry={selectedEntry} />
    </SafeAreaView>
  );
};
