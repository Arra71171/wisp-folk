import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MasonryFlashList } from '@shopify/flash-list';
import * as Animatable from 'react-native-animatable';
import { CodexDetailModal } from '../../components/codex/CodexDetailModal';
import { Feather } from '@expo/vector-icons';
import { useUserProgress } from '../../hooks/useHeritage';
import { CodexScreenSkeleton } from '../../components/codex/CodexScreenSkeleton';
import { MainStackScreenProps } from '../../navigation/types';

interface CodexEntry {
  id: string;
  title: string;
  category: 'Lore' | 'Characters' | 'Items' | 'Places';
  image: string;
  height: number;
  description: string;
}

const DUMMY_CODEX_DATA: CodexEntry[] = [
    { id: '1', title: 'The Whispering Woods', category: 'Places', image: 'https://picsum.photos/seed/place1/400/600', height: 250, description: 'An ancient forest where the trees are said to whisper secrets of the past to those who listen.' },
    { id: '2', title: 'Elara, the Sun-Blessed', category: 'Characters', image: 'https://picsum.photos/seed/char1/400/400', height: 200, description: 'A powerful sorceress who draws her magic from the sun.' },
    { id: '3', title: 'Amulet of a Thousand Truths', category: 'Items', image: 'https://picsum.photos/seed/item1/400/500', height: 220, description: 'A mystical amulet that reveals the truth in all things.' },
    { id: '4', title: 'The Sundered Kingdom', category: 'Lore', image: 'https://picsum.photos/seed/lore1/400/700', height: 300, description: 'A once-great kingdom, now shattered into warring factions.' },
    { id: '5', title: 'Kael, the Shadow-Walker', category: 'Characters', image: 'https://picsum.photos/seed/char2/400/450', height: 210, description: 'A rogue who can move through shadows, unseen and unheard.' },
    { id: '6', title: 'The Starfall Prophecy', category: 'Lore', image: 'https://picsum.photos/seed/lore2/400/550', height: 280, description: 'A prophecy that foretells the coming of a new age.' },
    { id: '7', title: 'Blade of the Serpent', category: 'Items', image: 'https://picsum.photos/seed/item2/400/300', height: 180, description: 'A legendary blade said to be forged from the fang of a great serpent.' },
    { id: '8', title: 'City of Glass', category: 'Places', image: 'https://picsum.photos/seed/place2/400/650', height: 270, description: 'A magnificent city built entirely of glass, shimmering in the sunlight.' },
];

const Tab = createMaterialTopTabNavigator();

const CodexEntryCard = ({ item, onPress, index }: { item: CodexEntry; onPress: () => void; index: number }) => (
  <Animatable.View animation="zoomIn" duration={500} delay={index * 100}>
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={[styles.cardImage, { height: item.height }]}>
        <View style={styles.cardOverlay}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  </Animatable.View>
);

const EmptyCodex = () => (
  <View style={styles.emptyContainer}>
    <Feather name="book-open" size={48} style={styles.emptyIcon} />
    <Text style={styles.emptyTitle}>The Archives are Empty</Text>
    <Text style={styles.emptySubtitle}>
      Explore stories and complete quests to unlock new entries in your Codex.
    </Text>
  </View>
);

const CodexList = ({ category, onEntryPress }: { category: 'All' | 'Lore' | 'Characters' | 'Items' | 'Places'; onEntryPress: (entry: CodexEntry) => void }) => {
  const { data: progress, isLoading } = useUserProgress();
  const unlockedCodexEntries = useMemo(() => {
    if (!progress) return [];
    return progress.flatMap(p => p.unlocked_codex_entries || []);
  }, [progress]);

  const filteredData = useMemo(() => {
    // For now, show all data so the screen is not empty
    const data = DUMMY_CODEX_DATA;
    if (category === 'All') return data;
    return data.filter(entry => entry.category === category);
  }, [category]);

  if (isLoading) return null;

  if (filteredData.length === 0) {
    return <EmptyCodex />;
  }

  return (
    <View style={styles.listContainer}>
      <MasonryFlashList
        data={filteredData}
        numColumns={2}
        renderItem={({ item, index }) => <CodexEntryCard item={item} onPress={() => onEntryPress(item)} index={index} />}
        keyExtractor={item => item.id}
        estimatedItemSize={200}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

export function CodexScreen({ navigation }: MainStackScreenProps<'Codex'>) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null);
  const { isLoading } = useUserProgress();

  const handleEntryPress = (entry: CodexEntry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.flexOne} edges={['top']}>
        <CodexScreenSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flexOne} edges={['top']}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Feather name="arrow-left" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>The Codex</Text>
        </View>

      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: '#f472b6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen name="All">
          {() => <CodexList category="All" onEntryPress={handleEntryPress} />}
        </Tab.Screen>
        <Tab.Screen name="Lore">
          {() => <CodexList category="Lore" onEntryPress={handleEntryPress} />}
        </Tab.Screen>
        <Tab.Screen name="Characters">
          {() => <CodexList category="Characters" onEntryPress={handleEntryPress} />}
        </Tab.Screen>
        <Tab.Screen name="Items">
          {() => <CodexList category="Items" onEntryPress={handleEntryPress} />}
        </Tab.Screen>
        <Tab.Screen name="Places">
          {() => <CodexList category="Places" onEntryPress={handleEntryPress} />}
        </Tab.Screen>
      </Tab.Navigator>
      <CodexDetailModal visible={isModalVisible} onClose={handleCloseModal} entry={selectedEntry} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexOne: { flex: 1, backgroundColor: '#13111C' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { padding: 8 },
  backIcon: { color: '#FFFFFF' },
  headerTitle: { fontSize: 24, fontFamily: 'serif-bold', color: '#FFFFFF', marginLeft: 16 },
  tabLabel: { textTransform: 'none', fontSize: 16, fontFamily: 'sans-bold' },
  tabItem: { width: 'auto', paddingHorizontal: 16 },
  tabBar: { backgroundColor: '#13111C' },
  tabIndicator: { backgroundColor: '#f472b6', height: 3 },
  cardContainer: { margin: 6, borderRadius: 16, overflow: 'hidden', backgroundColor: '#1C162D', borderWidth: 1, borderColor: 'rgba(244, 114, 182, 0.2)' },
  cardImage: { width: '100%', justifyContent: 'flex-end' },
  cardOverlay: { padding: 12, backgroundColor: 'rgba(0,0,0,0.6)' },
  cardTitle: { color: 'white', fontFamily: 'sans-bold', fontSize: 16, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: '#13111C' },
  emptyIcon: { color: '#f472b6', marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontFamily: 'serif-bold', color: '#FFFFFF', textAlign: 'center' },
  emptySubtitle: { color: '#A1A1AA', textAlign: 'center', marginTop: 8, fontSize: 16 },
  listContainer: { flex: 1, backgroundColor: '#13111C' },
  listContentContainer: { padding: 6 },
});
