import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList, MainStackNavigationProp } from '../../navigation/types';
import { useUserProgress } from '../../context/UserProgressContext';
import { Feather } from '@expo/vector-icons';
import QuestCompleteModal from '../../components/gamify/QuestCompleteModal';
import * as Progress from 'react-native-progress';
import { supabase } from '../../lib/supabase';
import { Quest } from '../../types/quest';
import PrimaryButton from '../../components/ui/PrimaryButton';

type QuestGameplayScreenRouteProp = RouteProp<MainStackParamList, 'QuestGameplay'>;

export const QuestGameplayScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { params } = useRoute<QuestGameplayScreenRouteProp>();
  const { questId } = params;
  const { completeQuest, addXP } = useUserProgress();

  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchQuest = async () => {
      if (!questId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('quests')
        .select('*, quiz_questions(*)')
        .eq('id', questId)
        .single();

      if (error) {
        console.error('Error fetching quest gameplay:', error);
        setQuest(null);
      } else {
        const formattedData = {
          ...data,
          quiz: data.quiz_questions.map((q: any) => ({
            ...q,
            correctAnswerIndex: q.correct_answer_index,
          })),
        };
        setQuest(formattedData as Quest);
      }
      setLoading(false);
    };

    fetchQuest();
  }, [questId]);

  const quiz = useMemo(() => quest?.quiz || [], [quest]);
  const currentQuestion = quiz[currentQuestionIndex];

  const handleAnswerPress = (index: number) => {
    if (selectedAnswerIndex !== null) return;

    setSelectedAnswerIndex(index);
    const correct = index === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
  };

  const handleNextQuestion = () => {
    if (!quest) return;
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setIsCorrect(null);
    } else {
      completeQuest(quest.id);
      addXP(quest.xp);
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const getButtonClass = (index: number) => {
    if (selectedAnswerIndex === null) return 'bg-surface border-primary/20';
    if (index === currentQuestion.correctAnswerIndex) return 'bg-success border-success';
    if (index === selectedAnswerIndex) return 'bg-error border-error';
    return 'bg-surface border-primary/20 opacity-60';
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="rgb(var(--color-primary))" />
      </SafeAreaView>
    );
  }

  if (!quest || !currentQuestion) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center p-8">
        <Text className="text-text-primary text-2xl font-serif-bold text-center">{quest?.title || 'Quest'}</Text>
        <Text className="text-text-secondary text-lg text-center mt-4 font-sans">This quest is not available or has no quiz. You've discovered its story!</Text>
        <View className="mt-8 w-full">
          <PrimaryButton title="Return to Details" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Pressable onPress={() => navigation.goBack()} className="absolute top-14 left-4 z-10 bg-surface/70 rounded-full p-2">
        <Feather name="x" size={24} className="text-primary" />
      </Pressable>

      <View className="px-6 pt-24">
        <Text className="text-primary font-sans-semibold">Question {currentQuestionIndex + 1} of {quiz.length}</Text>
        <Progress.Bar 
          progress={(currentQuestionIndex + 1) / quiz.length}
          width={null} 
          color={'rgb(var(--color-primary))'}
          unfilledColor="rgb(var(--color-surface))"
          borderWidth={0}
          className="mt-2 h-2 rounded-full"
        />
        <Text className="text-text-primary text-3xl font-serif-bold mt-6 leading-tight">{currentQuestion.question}</Text>
      </View>

      <View className="px-6 mt-8 space-y-4">
        {currentQuestion.options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => handleAnswerPress(index)}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 ${getButtonClass(index)}`}
            disabled={selectedAnswerIndex !== null}
          >
            <Text className={`text-lg font-sans-medium ${selectedAnswerIndex !== null ? 'text-white' : 'text-text-primary'}`}>{option}</Text>
          </Pressable>
        ))}
      </View>

      {selectedAnswerIndex !== null && (
        <View className="absolute bottom-0 left-0 right-0 bg-surface p-6 border-t-2 border-primary/20">
          <Text className={`text-2xl font-sans-bold ${isCorrect ? 'text-success' : 'text-error'}`}>{isCorrect ? 'Correct!' : 'Not quite!'}</Text>
          <Text className="text-text-secondary mt-2 font-sans text-base">{currentQuestion.explanation}</Text>
          <View className="mt-6">
            <PrimaryButton 
              title="Next"
              onPress={handleNextQuestion}
            />
          </View>
        </View>
      )}

      <QuestCompleteModal 
        isVisible={isModalVisible}
        onClose={handleModalClose}
        questTitle={quest.title}
        xpAwarded={quest.xp}
      />
    </SafeAreaView>
  );
};
