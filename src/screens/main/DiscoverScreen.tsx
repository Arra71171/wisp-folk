import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { Quest } from '../../types/quest';

// Import our new UI components
import Card from '../../components/ui/Card';
import SectionContainer from '../../components/ui/SectionContainer';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Badge from '../../components/ui/Badge';

// Import existing components
import { QuestCard } from '../../components/heritage/QuestCard';
import { QuestCardSkeleton } from '../../components/heritage/QuestCardSkeleton';
import { FilterChip } from '../../components/ui/FilterChip';

const skeletonData = Array(6).fill(0);

type TabType = 'stories' | 'codex';

export function DiscoverScreen() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [eras, setEras] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState('All');
  const [activeTab, setActiveTab] = useState<TabType>('stories');

  useEffect(() => {
    const fetchQuests = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('quests').select('*');
      if (error) {
        console.error('Error fetching quests:', error);
      } else {
        setQuests(data as Quest[]);
        const uniqueEras = ['All', ...new Set(data.map(q => q.era))];
        setEras(uniqueEras);
      }
      setLoading(false);
    };

    fetchQuests();
  }, []);

  const filteredQuests = useMemo(() => {
    return quests.filter(quest => {
      const matchesEra = selectedEra === 'All' || quest.era === selectedEra;
      const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEra && matchesSearch;
    });
  }, [quests, searchQuery, selectedEra]);

  const codexCategories = [
    { id: '1', title: 'Ancient Civilizations', icon: 'map-pin', count: 12 },
    { id: '2', title: 'Mythology & Legends', icon: 'moon', count: 8 },
    { id: '3', title: 'Historical Figures', icon: 'users', count: 15 },
    { id: '4', title: 'Sacred Texts', icon: 'book', count: 6 },
    { id: '5', title: 'Cultural Traditions', icon: 'coffee', count: 10 },
    { id: '6', title: 'Archaeological Sites', icon: 'compass', count: 9 },
  ];

  const renderTabButton = (tab: TabType, label: string, icon: React.ComponentProps<typeof Feather>['name']) => (
    <TouchableOpacity
      className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-full ${
        activeTab === tab 
          ? 'bg-primary shadow-md shadow-primary/30' 
          : 'bg-surface'
      }`}
      onPress={() => setActiveTab(tab)}
    >
      <Feather name={icon} size={16} className={`mr-2 ${activeTab === tab ? 'text-background' : 'text-text-secondary'}`} />
      <Text className={`font-sans-medium ${activeTab === tab ? 'text-background' : 'text-text-secondary'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View className="px-4 pt-2 pb-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-3xl font-sans-bold text-text-primary">Discover</Text>
        <TouchableOpacity 
          className="p-3 rounded-full bg-surface"
          onPress={() => { /* Navigate to timeline */ }}
        >
          <Feather name="trello" size={20} className="text-primary" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row space-x-2 mb-4 bg-surface p-1 rounded-full">
        {renderTabButton('stories', 'Stories', 'book-open')}
        {renderTabButton('codex', 'Codex', 'archive')}
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-surface rounded-2xl p-3 mb-4">
        <Feather name="search" size={20} className="text-primary mr-2" />
        <TextInput
          placeholder="Search for content..."
          placeholderTextColor="#888"
          className="flex-1 text-text-primary font-sans"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Era Filters - Only show for Stories tab */}
      {activeTab === 'stories' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {eras.map(era => (
            <FilterChip
              key={era}
              label={era}
              isSelected={era === selectedEra}
              onPress={() => setSelectedEra(era)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );

  const renderStoriesContent = () => (
    <FlatList
      data={loading ? skeletonData : filteredQuests}
      keyExtractor={(item, index) => loading ? index.toString() : (item as Quest).id}
      numColumns={2}
      renderItem={({ item, index }) =>
        loading ? (
          <QuestCardSkeleton />
        ) : (
          <View style={{ flex: 1, margin: 8 }}>
            <QuestCard
              quest={item as Quest}
              onPress={() => navigation.navigate('QuestDetails', { questId: (item as Quest).id })}
              index={index}
            />
          </View>
        )
      }
      ListEmptyComponent={!loading ? renderEmptyState : null}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderCodexContent = () => (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <SectionContainer 
        title="Knowledge Library"
        subtitle="Explore ancient wisdom and historical knowledge"
      >
        <Text className="text-text-secondary font-sans mb-4">
          Dive deep into the lore, characters, and cultural knowledge from around the world.
        </Text>
      </SectionContainer>

      <View className="space-y-4">
        {codexCategories.map((category) => (
          <Card
            key={category.id}
            title={category.title}
            subtitle={`${category.count} entries`}
            ctaLabel="Explore"
            onPress={() => {
              // Navigate to category detail
              console.log('Navigate to category:', category.title);
            }}
          >
            <View className="flex-row items-center justify-between py-2">
              <Feather name={category.icon as any} size={24} className="text-primary" />
              <Feather name="chevron-right" size={20} className="text-primary" />
            </View>
          </Card>
        ))}
      </View>

      {/* Featured Entry */}
      <SectionContainer 
        title="Featured Entry"
        subtitle="Today's Highlight"
      >
        <Card
          title="The Oracle of Delphi"
          subtitle="Ancient Greek Prophecy"
          description="Discover the mystical temple where ancient Greeks sought divine guidance and prophecies that shaped history."
          ctaLabel="Read More"
          onPress={() => {
            // Navigate to featured entry
            console.log('Navigate to featured entry');
          }}
        />
      </SectionContainer>
    </ScrollView>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center mt-20 px-8">
      <Card
        title="No Content Found"
        subtitle="Try adjusting your search"
        description="We couldn't find any content matching your criteria. Try a different search term or filter."
      >
        <View className="items-center py-4">
          <Feather name="search" size={48} className="text-primary" />
        </View>
      </Card>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {renderHeader()}
      {activeTab === 'stories' ? renderStoriesContent() : renderCodexContent()}
    </SafeAreaView>
  );
}
