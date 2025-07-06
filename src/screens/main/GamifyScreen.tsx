import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../components/ui/ProgressBar';
import Avatar from '../../components/ui/Avatar';
import { THEME } from '../../constants/theme';

// --- DUMMY DATA (to be replaced with hooks) ---
const dailyQuests = [
  { id: '1', title: 'Complete one story', xp: 50, progress: 1, total: 1, icon: 'book-open' },
  { id: '2', title: 'Unlock a new wisdom', xp: 25, progress: 0, total: 1, icon: 'key' },
  { id: '3', title: 'Explore the Codex', xp: 15, progress: 1, total: 1, icon: 'archive' },
];

const achievements = [
  { id: '1', name: 'First Steps', icon: 'shield', unlocked: true },
  { id: '2', name: 'Lore Master', icon: 'book-open', unlocked: true },
  { id: '3', name: 'Explorer', icon: 'compass', unlocked: true },
  { id: '4', name: 'Time Traveler', icon: 'clock', unlocked: false },
  { id: '5', name: 'Sage', icon: 'award', unlocked: false },
  { id: '6', name: 'Historian', icon: 'map', unlocked: false },
];

const leaderboardData = [
  { id: '1', name: 'Aria', level: 15, avatar: null, rank: 1 },
  { id: '2', name: 'Kael', level: 14, avatar: null, rank: 2 },
  { id: '3', name: 'Lyra', level: 13, avatar: null, rank: 3 },
  { id: '4', name: 'Jaxon', level: 12, avatar: null, rank: 4 },
  { id: '5', name: 'Elara', level: 11, avatar: null, rank: 5 },
];

type TabType = 'progress' | 'leaderboard';

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const ProgressTab = () => (
  <ScrollView contentContainerStyle={styles.tabContentContainer}>
    <SectionHeader title="Daily Quests" />
    {dailyQuests.map(quest => (
      <View key={quest.id} style={styles.questItem}>
        <View style={styles.questIconContainer}>
          <Feather name={quest.icon as any} size={20} color={THEME.COLORS.primary} />
        </View>
        <View style={styles.questTextContainer}>
          <Text style={styles.questTitle}>{quest.title}</Text>
          <Text style={styles.questXp}>+{quest.xp} XP</Text>
        </View>
        {quest.progress === quest.total ? (
          <Feather name="check-circle" size={24} color={THEME.COLORS.accent} />
        ) : (
          <Text style={styles.questProgressText}>{`${quest.progress}/${quest.total}`}</Text>
        )}
      </View>
    ))}

    <View style={styles.sectionSpacer} />

    <SectionHeader title="Achievements" />
    <View style={styles.achievementsContainer}>
      {achievements.map(badge => (
        <View key={badge.id} style={styles.achievementItem}>
          <View style={[styles.achievementIconContainer, !badge.unlocked && styles.achievementIconContainerLocked]}>
            <Feather name={badge.icon as any} size={32} color={badge.unlocked ? THEME.COLORS.accent : THEME.COLORS.textSecondary} />
          </View>
          <Text style={[styles.achievementName, !badge.unlocked && styles.achievementNameLocked]}>{badge.name}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const LeaderboardTab = () => (
  <FlatList
    data={leaderboardData}
    contentContainerStyle={styles.tabContentContainer}
    keyExtractor={item => item.id}
    renderItem={({ item, index }) => (
      <View style={styles.leaderboardItem}>
        <Text style={styles.leaderboardRank}>{item.rank}</Text>
        <Avatar initials={item.name[0]} size={40} />
        <Text style={styles.leaderboardName}>{item.name}</Text>
        <View style={styles.leaderboardLevelContainer}>
          <Feather name="star" size={16} color={THEME.COLORS.warning} style={styles.leaderboardStarIcon} />
          <Text style={styles.leaderboardLevelText}>Level {item.level}</Text>
        </View>
      </View>
    )}
  />
);

const GamifyScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('progress');

  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      style={styles.tabButton}
    >
      {activeTab === tab && <View style={styles.tabButtonActiveIndicator} />}
      <Text style={[styles.tabButtonText, activeTab === tab ? styles.tabButtonTextActive : styles.tabButtonTextInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <LinearGradient
          colors={[THEME.COLORS.accent, THEME.COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.levelCard}
        >
          <View style={styles.levelCardRow}>
            <View>
              <Text style={styles.levelCardLevel}>Level 15</Text>
              <Text style={styles.levelCardTitle}>Cosmic Chronicler</Text>
            </View>
            <Text style={styles.levelCardRank}>#1</Text>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar progress={0.6} />
            <Text style={styles.progressLabel}>1200 / 2000 XP to Level 16</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabSwitcherContainer}>
        <View style={styles.tabSwitcher}>
          {renderTabButton('progress', 'Progress')}
          {renderTabButton('leaderboard', 'Leaderboard')}
        </View>
      </View>

      {activeTab === 'progress' ? <ProgressTab /> : <LeaderboardTab />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  // Header
  header: {
    paddingHorizontal: THEME.SPACING.l,
    paddingTop: THEME.SPACING.xl,
    paddingBottom: THEME.SPACING.m,
  },
  headerTitle: {
    fontFamily: THEME.FONTS.serifBold,
    fontSize: 34,
    color: THEME.COLORS.textPrimary,
    marginBottom: THEME.SPACING.m,
  },
  levelCard: {
    borderRadius: THEME.RADIUS.xl,
    padding: THEME.SPACING.l,
  },
  levelCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelCardLevel: {
    fontFamily: THEME.FONTS.sansBold,
    fontSize: 18,
    color: THEME.COLORS.textPrimary, // Changed from white
  },
  levelCardTitle: {
    color: THEME.COLORS.textPrimary, // Changed from white
    opacity: 0.8,
  },
  levelCardRank: {
    fontFamily: THEME.FONTS.sansBold,
    fontSize: 18,
    color: THEME.COLORS.textPrimary, // Changed from white
  },
  progressContainer: {
    marginTop: THEME.SPACING.m,
  },
  progressLabel: {
    color: THEME.COLORS.textPrimary, // Changed from white
    opacity: 0.8,
    fontSize: 12,
    textAlign: 'right',
    marginTop: THEME.SPACING.xs,
  },
  // Tab Switcher
  tabSwitcherContainer: {
    paddingHorizontal: THEME.SPACING.l,
    marginBottom: THEME.SPACING.s,
  },
  tabSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.full,
    padding: THEME.SPACING.xs,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.SPACING.s,
    borderRadius: THEME.RADIUS.full,
  },
  tabButtonActiveIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(244, 114, 182, 0.2)', // primary with 20% opacity
    borderRadius: THEME.RADIUS.full,
  },
  tabButtonText: {
    fontFamily: THEME.FONTS.sansBold,
  },
  tabButtonTextActive: {
    color: THEME.COLORS.primary,
  },
  tabButtonTextInactive: {
    color: THEME.COLORS.textSecondary,
  },
  // Tab Content
  tabContentContainer: {
    padding: THEME.SPACING.l,
  },
  sectionHeader: {
    fontFamily: THEME.FONTS.serifBold,
    fontSize: 22,
    color: THEME.COLORS.textPrimary,
    marginBottom: THEME.SPACING.m,
  },
  sectionSpacer: {
    height: THEME.SPACING.xl,
  },
  // Progress Tab
  questItem: {
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.lg,
    padding: THEME.SPACING.m,
    marginBottom: THEME.SPACING.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(244, 114, 182, 0.2)', // primary with 20% opacity
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.full,
    marginRight: THEME.SPACING.m,
  },
  questTextContainer: {
    flex: 1,
  },
  questTitle: {
    fontFamily: THEME.FONTS.sansBold,
    color: THEME.COLORS.textPrimary,
  },
  questXp: {
    fontSize: 12,
    color: THEME.COLORS.primary,
  },
  questProgressText: {
    fontFamily: THEME.FONTS.sansBold,
    color: THEME.COLORS.textSecondary,
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -THEME.SPACING.s,
  },
  achievementItem: {
    width: '33.33%',
    padding: THEME.SPACING.s,
    alignItems: 'center',
  },
  achievementIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.surface,
  },
  achievementIconContainerLocked: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: THEME.COLORS.textSecondary,
    opacity: 0.5,
  },
  achievementName: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: THEME.SPACING.xs,
    color: THEME.COLORS.textPrimary,
  },
  achievementNameLocked: {
    color: THEME.COLORS.textSecondary,
  },
  // Leaderboard Tab
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.surface,
    borderRadius: THEME.RADIUS.lg,
    padding: THEME.SPACING.s,
    marginBottom: THEME.SPACING.s,
  },
  leaderboardRank: {
    fontFamily: THEME.FONTS.sansBold,
    fontSize: 18,
    color: THEME.COLORS.textSecondary,
    width: 32,
  },
  leaderboardName: {
    flex: 1,
    marginLeft: THEME.SPACING.m,
    fontFamily: THEME.FONTS.sansBold,
    color: THEME.COLORS.textPrimary,
    fontSize: 16,
  },
  leaderboardLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardStarIcon: {
    marginRight: THEME.SPACING.xs,
  },
  leaderboardLevelText: {
    fontFamily: THEME.FONTS.sansBold,
    color: THEME.COLORS.textPrimary,
  },
});

export default GamifyScreen;
