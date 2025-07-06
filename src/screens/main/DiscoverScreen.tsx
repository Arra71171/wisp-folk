import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import { useStories } from '../../hooks/useHeritage';
import { QuestCard } from '../../components/heritage/QuestCard';


import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { THEME } from '../../constants/theme';

type TabType = 'stories' | 'codex';

const StoriesTabContent = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { data: quests, isLoading } = useStories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState('All');

  const eras = quests ? ['All', ...new Set(quests.map(q => q.era))] : ['All'];

  const filteredQuests = quests
    ? quests.filter(quest => {
        const matchesEra = selectedEra === 'All' || quest.era === selectedEra;
        const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesEra && matchesSearch;
      })
    : [];

  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.flexOne}>
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color={THEME.COLORS.textSecondary} />
          <TextInput
            placeholder="Search for a story..."
            placeholderTextColor={THEME.COLORS.textSecondary}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.chipScrollViewContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipContainer}>
          {eras.map((era, index) => (
            <TouchableOpacity
              key={`${era}-${index}`}
              onPress={() => setSelectedEra(era)}
              style={[styles.chip, era === selectedEra ? styles.chipSelected : styles.chipUnselected]}
            >
              <Text style={[styles.chipText, era === selectedEra ? styles.chipTextSelected : styles.chipTextUnselected]}>{era}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading && (
        <FlatList
          data={Array(3).fill(0)}
          renderItem={() => (
            <View style={styles.skeletonContainer}>
              <View style={{ aspectRatio: 1, backgroundColor: THEME.COLORS.surface, borderRadius: THEME.RADIUS.l, opacity: 0.5 }} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      )}

      {!isLoading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredQuests.length > 0 ? (
            filteredQuests.map((item, index) => (
              <View key={item.id} style={styles.questCardContainer}>
                <QuestCard quest={item} index={index} onPress={() => navigation.navigate('QuestDetails', { questId: item.id })} />
              </View>
            ))
          ) : (
            <View style={styles.emptyListContainer}>
              <Feather name="search" size={48} color={THEME.COLORS.textSecondary} style={styles.emptyListIcon} />
              <Text style={styles.emptyListTitle}>No Stories Found</Text>
              <Text style={styles.emptyListSubtitle}>Try adjusting your search or filters.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </Animatable.View>
  );
};

const CodexTabContent = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.codexContainer}>
      <Feather name="book-open" size={48} color={THEME.COLORS.primary} style={styles.codexIcon} />
      <Text style={styles.codexTitle}>The Codex Awaits</Text>
      <Text style={styles.codexSubtitle}>
        All discovered lore, characters, and artifacts are chronicled here.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Codex')} style={styles.codexButton}>
        <Feather name="arrow-right-circle" size={20} color={THEME.COLORS.primary} style={styles.codexButtonIcon} />
        <Text style={styles.codexButtonText}>Explore the Codex</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const DiscoverScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stories');
  const tabs = [
    { id: 'stories', label: 'Stories' },
    { id: 'codex', label: 'Codex' },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id as TabType)}
            style={[styles.tabButton, activeTab === tab.id && styles.tabButtonActive]}
          >
            <Text style={[styles.tabButtonText, activeTab === tab.id ? styles.tabButtonTextActive : styles.tabButtonTextInactive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'stories' ? <StoriesTabContent /> : <CodexTabContent />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  screen: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  header: {
    paddingHorizontal: THEME.SPACING.l,
    paddingTop: THEME.SPACING.m,
    paddingBottom: THEME.SPACING.m,
  },
  headerTitle: {
    fontFamily: THEME.FONTS.serifBold,
    fontSize: 34,
    color: THEME.COLORS.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: THEME.SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.border,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: THEME.SPACING.m,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: THEME.COLORS.primary,
  },
  tabButtonText: {
    fontFamily: THEME.FONTS.sansBold,
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: THEME.COLORS.primary,
  },
  tabButtonTextInactive: {
    color: THEME.COLORS.textSecondary,
  },
  // Stories Tab
  searchSection: {
    paddingHorizontal: THEME.SPACING.l,
    marginBottom: THEME.SPACING.m,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.full,
    paddingHorizontal: THEME.SPACING.m,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: THEME.COLORS.textPrimary,
    fontFamily: THEME.FONTS.sans,
    marginLeft: THEME.SPACING.s,
  },
  chipScrollViewContainer: {
    marginBottom: THEME.SPACING.m,
  },
  chipContainer: {
    paddingHorizontal: THEME.SPACING.l,
  },
  chip: {
    paddingVertical: THEME.SPACING.s,
    paddingHorizontal: THEME.SPACING.m,
    borderRadius: THEME.RADIUS.full,
    marginRight: THEME.SPACING.s,
  },
  chipSelected: {
    backgroundColor: THEME.COLORS.primary,
  },
  chipUnselected: {
    backgroundColor: THEME.COLORS.surface,
  },
  chipText: {
    fontFamily: THEME.FONTS.sans,
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontFamily: THEME.FONTS.sansBold,
  },
  chipTextUnselected: {
    color: THEME.COLORS.textPrimary,
  },
  skeletonContainer: {
    paddingHorizontal: THEME.SPACING.l,
    marginBottom: THEME.SPACING.m,
  },
  questCardContainer: {
    paddingHorizontal: THEME.SPACING.l,
    marginBottom: THEME.SPACING.m,
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyListIcon: {
    marginBottom: THEME.SPACING.m,
  },
  emptyListTitle: {
    fontSize: 18,
    fontFamily: THEME.FONTS.sansBold,
    color: THEME.COLORS.textPrimary,
  },
  emptyListSubtitle: {
    color: THEME.COLORS.textSecondary,
    marginTop: THEME.SPACING.xs,
  },
  // Codex Tab
  codexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: THEME.SPACING.l,
  },
  codexIcon: {
    marginBottom: THEME.SPACING.m,
  },
  codexTitle: {
    fontFamily: THEME.FONTS.serifBold,
    fontSize: 24,
    color: THEME.COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: THEME.SPACING.s,
  },
  codexSubtitle: {
    color: THEME.COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: THEME.SPACING.l,
    lineHeight: 22,
  },
  codexButton: {
    backgroundColor: 'rgba(244, 114, 182, 0.1)',
    borderRadius: THEME.RADIUS.full,
    paddingHorizontal: THEME.SPACING.l,
    paddingVertical: THEME.SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  codexButtonIcon: {
    marginRight: THEME.SPACING.s,
  },
  codexButtonText: {
    fontFamily: THEME.FONTS.sansBold,
    color: THEME.COLORS.primary,
  },
});

export default DiscoverScreen;
