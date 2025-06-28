import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList, MainStackNavigationProp } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { supabase } from '../../lib/supabase';
import { Quest } from '../../types/quest';
import PrimaryButton from '../../components/ui/PrimaryButton';

type QuestDetailsScreenRouteProp = RouteProp<MainStackParamList, 'QuestDetails'>;

const OverviewTab = ({ quest }: { quest: Quest | null }) => (
  <Tabs.ScrollView contentContainerStyle={styles.tabContent}>
    <Text className="font-sans text-base leading-relaxed text-text-secondary">
      {quest?.description || 'Loading quest details...'}
    </Text>
  </Tabs.ScrollView>
);

const ChaptersTab = () => (
    <Tabs.ScrollView contentContainerStyle={styles.tabContent}>
      <Text className="font-sans text-base text-text-secondary">Chapter content will be displayed here.</Text>
    </Tabs.ScrollView>
);

const ArtifactsTab = () => (
  <Tabs.ScrollView contentContainerStyle={styles.tabContent}>
    <Text className="font-sans text-base text-text-secondary">
      Discovered artifacts and lore entries will be displayed here as you progress through the quest.
    </Text>
  </Tabs.ScrollView>
);

export const QuestDetailsScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { params } = useRoute<QuestDetailsScreenRouteProp>();
  const { questId } = params;

  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestDetails = async () => {
      if (!questId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('quests')
        .select('*')
        .eq('id', questId)
        .single();

      if (error) {
        console.error('Error fetching quest details:', error);
        setQuest(null);
      } else {
        setQuest(data as Quest);
      }
      setLoading(false);
    };

    fetchQuestDetails();
  }, [questId]);

  const renderHeader = () => {
    if (!quest) {
      return <View className="h-80 bg-surface justify-center items-center" />;
    }
    return (
      <ImageBackground
        source={{ uri: quest.image }}
        className="h-80 justify-end"
        resizeMode="cover"
      >
        <View className="p-6 bg-gradient-to-t from-background/90 via-background/50 to-transparent">
          <Text className="text-4xl font-sans-bold text-text-primary shadow-lg">{quest.title}</Text>
          <Text className="text-xl text-primary font-sans-medium shadow-md mt-1">{quest.era}</Text>
        </View>
      </ImageBackground>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="rgb(var(--color-primary))" />
        <Pressable onPress={() => navigation.goBack()} className="absolute top-14 left-4 z-10 bg-surface/80 rounded-full p-2">
            <Feather name="arrow-left" size={24} className="text-primary" />
        </Pressable>
      </View>
    );
  }

  if (!quest) {
    return (
      <View className="flex-1 justify-center items-center bg-background p-4">
        <Text className="text-text-secondary text-xl text-center font-sans">Could not load quest details. Please try again later.</Text>
        <Pressable onPress={() => navigation.goBack()} className="absolute top-14 left-4 z-10 bg-surface/80 rounded-full p-2">
            <Feather name="arrow-left" size={24} className="text-primary" />
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Tabs.Container
        renderHeader={renderHeader}
        headerHeight={320}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'rgb(var(--color-primary))', height: 3 }}
            style={{ backgroundColor: 'rgb(var(--color-background))', shadowOpacity: 0 }}
            labelStyle={{ fontFamily: 'Inter-SemiBold', textTransform: 'capitalize' }}
            activeColor='rgb(var(--color-primary))'
            inactiveColor='rgb(var(--color-text-secondary))'
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
      
      <Pressable onPress={() => navigation.goBack()} className="absolute top-14 left-4 z-10 bg-surface/70 rounded-full p-2">
        <Feather name="arrow-left" size={24} className="text-primary" />
      </Pressable>

      <View className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
         <PrimaryButton 
            title="Start Quest"
            onPress={() => navigation.navigate('QuestGameplay', { questId: quest.id })}
            icon="play"
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    padding: 24,
    backgroundColor: 'rgb(var(--color-background))',
  },
});
