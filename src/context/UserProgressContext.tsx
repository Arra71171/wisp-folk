import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = '@wisp_user_progress';

interface UserProgressState {
  completedQuests: string[];
  unlockedCodexEntries: string[];
  playerLevel: number;
  playerXP: number;
}

interface UserProgressContextType extends UserProgressState {
  loading: boolean;
  completeQuest: (questId: string) => void;
  unlockCodexEntry: (entryId: string) => void;
  addXP: (amount: number) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

const defaultState: UserProgressState = {
  completedQuests: [],
  unlockedCodexEntries: [],
  playerLevel: 1,
  playerXP: 0,
};

interface UserProgressProviderProps {
  children: ReactNode;
  userId: string;
  username: string;
}

export const UserProgressProvider = ({ children, userId, username }: UserProgressProviderProps) => {
  const [progress, setProgress] = useState<UserProgressState>(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await AsyncStorage.getItem(`${STORAGE_KEY}_${userId}`);
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
        }
      } catch (e) {
        console.error('Failed to load user progress.', e);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [userId]);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(progress)).catch(e =>
        console.error('Failed to save user progress.', e)
      );
    }
  }, [progress, loading, userId]);

  const updateLeaderboard = async (xp: number) => {
    const { error } = await supabase
      .from('leaderboard')
      .upsert({ user_id: userId, username, xp }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  const completeQuest = (questId: string) => {
    setProgress(prev => ({ ...prev, completedQuests: [...prev.completedQuests, questId] }));
  };

  const unlockCodexEntry = (entryId: string) => {
    setProgress(prev => ({ ...prev, unlockedCodexEntries: [...prev.unlockedCodexEntries, entryId] }));
  };

  const addXP = (amount: number) => {
    setProgress(prev => {
      const newXP = prev.playerXP + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      updateLeaderboard(newXP); // Update leaderboard
      return { ...prev, playerXP: newXP, playerLevel: newLevel };
    });
  };

  return (
    <UserProgressContext.Provider value={{ ...progress, loading, completeQuest, unlockCodexEntry, addXP }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};
