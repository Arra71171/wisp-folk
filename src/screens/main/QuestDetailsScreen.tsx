import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList, MainStackNavigationProp } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { supabase } from '../../lib/supabase';
import { Quest } from '../../types/quest';
import { Button } from '../../components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

type QuestDetailsScreenRouteProp = RouteProp<MainStackParamList, 'QuestDetails'>;

const OverviewTab = ({ quest }: { quest: Quest | null }) => (
  <Tabs.ScrollView contentContainerStyle={styles.tabContent}>
    <Text className="text-base leading-relaxed text-text-secondary">
      {quest?.description || 'Loading quest details...'}
    </Text>
  </Tabs.ScrollView>
);

const ChaptersTab = () => (
  <Tabs.ScrollView contentContainerStyle={styles.tabContent}>
    <Text className="text-base text-text-secondary">Chapter content will be displayed here.</Text>
  </Tabs.ScrollView>
);

const ArtifactsTab = () => (
  <Tabs.ScrollView contentContainerStyle={styles.tabContent}>
    <Text className="text-base text-text-secondary">
      Discovered artifacts and lore entries will be displayed here as you progress through the quest.
    </Text>
  </Tabs.ScrollView>
);

export function QuestDetailsScreen() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { params } = useRoute<QuestDetailsScreenRouteProp>();
  const { questId } = params;

  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestDetails = async () => {
      if (!questId) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('quests')
          .select('*')
          .eq('id', questId)
          .single();
        if (error) throw error;
        setQuest(data as Quest);
      } catch (error) {
        console.error('Error fetching quest details:', error);
        setQuest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestDetails();
  }, [questId]);

  const renderHeader = () => {
    if (loading || !quest) {
      return <View className="h-96 bg-surface" />;
    }
    return (
      <ImageBackground
        source={{ uri: quest.image }}
        className="h-96 justify-end"
      >
        <View className="p-6 bg-gradient-to-t from-background via-background/70 to-transparent">
          <Text className="text-4xl font-serif-bold text-text-primary shadow-lg">{quest.title}</Text>
          <Text className="text-xl text-primary font-bold shadow-md mt-1">{quest.era}</Text>
        </View>
      </ImageBackground>
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ActivityIndicator size="large" color="#f472b6" className="flex-1" />
        <Pressable onPress={() => navigation.goBack()} className="absolute top-14 left-4 z-10 bg-surface/80 rounded-full p-2">
          <Feather name="arrow-left" size={24} className="text-primary" />
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!quest) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-background p-4">
        <Text className="text-xl text-center text-text-secondary">Could not load quest details.</Text>
        <View className="mt-4 w-full">
          <Button title="Go Back" onPress={() => navigation.goBack()} variant="primary" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Tabs.Container
        renderHeader={renderHeader}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            inactiveColor="#9ca3af"
            activeColor="#f472b6"
            labelStyle={styles.tabLabel}
            style={styles.tabBar}
            indicatorStyle={styles.tabIndicator}
          />
        )}
      >
        <Tabs.Tab name="Overview">
          <OverviewTab quest={quest} />
        </Tabs.Tab>
        <Tabs.Tab name="Chapters">
          <ChaptersTab />
        </Tabs.Tab>
        <Tabs.Tab name="Artifacts">
          <ArtifactsTab />
        </Tabs.Tab>
      </Tabs.Container>

      <View className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 border-t border-surface">
        <Button
          title="Start Quest"
          onPress={() => navigation.navigate('QuestGameplay', { questId: quest.id })}
          icon="play"
          variant="primary"
        />
      </View>

      <Pressable onPress={() => navigation.goBack()} className="absolute top-14 left-4 z-10 bg-surface/80 rounded-full p-2">
        <Feather name="arrow-left" size={24} className="text-primary" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#13111C',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#393152',
  },
  tabLabel: {
    fontFamily: 'sans-bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  tabIndicator: {
    backgroundColor: '#f472b6',
    height: 3,
  },
  tabContent: {
    padding: 24,
    backgroundColor: '#13111C',
  },
});
