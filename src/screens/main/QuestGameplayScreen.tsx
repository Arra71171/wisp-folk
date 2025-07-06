import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList, MainStackNavigationProp } from '../../navigation/types';
import { useUserProgress } from '../../context/UserProgressContext';
import { Feather } from '@expo/vector-icons';
import QuestCompleteModal from '../../components/gamify/QuestCompleteModal';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import { supabase } from '../../lib/supabase';
import { Quest } from '../../types/quest';
import { Button } from '../../components/ui/Button';
import { THEME } from '../../constants/theme';

type QuestGameplayScreenRouteProp = RouteProp<MainStackParamList, 'QuestGameplay'>;

const QuestGameplayScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { params } = useRoute<QuestGameplayScreenRouteProp>();
  const { questId } = params;
  const { completeQuest, addXP } = useUserProgress();

  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchQuest = async () => {
      if (!questId) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('quests')
          .select('*, quiz_questions(*)')
          .eq('id', questId)
          .single();

        if (error) throw error;

        const formattedData = {
          ...data,
          quiz: data.quiz_questions.map((q: any) => ({
            ...q,
            correctAnswerIndex: q.correct_answer_index,
          })),
        };
        setQuest(formattedData as Quest);
      } catch (error) {
        console.error('Error fetching quest gameplay:', error);
        setQuest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuest();
  }, [questId]);

  const quiz = useMemo(() => quest?.quiz || [], [quest]);
  const currentQuestion = quiz[currentQuestionIndex];

  const handleAnswerPress = (index: number) => {
    if (selectedAnswerIndex !== null) return;
    setSelectedAnswerIndex(index);
  };

  const handleNextQuestion = () => {
    if (!quest) return;
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
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

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={THEME.COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!quest || !currentQuestion) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>Could not load quest. Please try again.</Text>
        <View style={styles.errorButtonContainer}>
          <Button title="Go Back" onPress={() => navigation.goBack()} variant="primary" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Feather name="x" size={24} color={THEME.COLORS.textSecondary} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>{quest.title}</Text>
        </View>
        <Progress.Bar
          progress={(currentQuestionIndex + 1) / quiz.length}
          width={null}
          color={THEME.COLORS.accent}
          unfilledColor={THEME.COLORS.surface}
          borderWidth={0}
          height={8}
          animated
        />
      </View>

      {/* Question Area */}
      <View style={styles.questionArea}>
        <Animatable.View animation="fadeInUp" duration={500} style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <View style={styles.answersContainer}>
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = selectedAnswerIndex === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswerIndex;
              const hasSelected = selectedAnswerIndex !== null;

              const getButtonStyle = () => {
                if (!hasSelected) return styles.answerButtonDefault;
                if (isCorrectAnswer) return styles.answerButtonCorrect;
                if (isSelected) return styles.answerButtonIncorrect;
                return styles.answerButtonDisabled;
              };

              const animation = isSelected && !isCorrectAnswer ? 'shake' : undefined;

              return (
                <Animatable.View key={index} animation={animation} duration={500}>
                  <Pressable
                    onPress={() => handleAnswerPress(index)}
                    style={[styles.answerButtonBase, getButtonStyle()]}
                  >
                    <Text style={styles.answerText}>{answer}</Text>
                    {hasSelected && isCorrectAnswer && (
                      <Animatable.View animation="bounceIn">
                        <Feather name="check-circle" size={24} color={THEME.COLORS.success} />
                      </Animatable.View>
                    )}
                    {isSelected && !isCorrectAnswer && (
                      <Animatable.View animation="bounceIn">
                        <Feather name="x-circle" size={24} color={THEME.COLORS.error} />
                      </Animatable.View>
                    )}
                  </Pressable>
                </Animatable.View>
              );
            })}
          </View>
        </Animatable.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {selectedAnswerIndex !== null && (
          <Animatable.View animation="fadeInUp">
            <Button
              title={currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'Finish Quest'}
              onPress={handleNextQuestion}
              icon="arrow-right"
              variant="primary"
            />
          </Animatable.View>
        )}
      </View>

      <QuestCompleteModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        questTitle={quest.title}
        xpAwarded={quest.xp}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
    paddingHorizontal: THEME.SPACING.l,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: THEME.SPACING.l,
  },
  errorText: {
    color: THEME.COLORS.textSecondary,
    fontSize: 18,
    textAlign: 'center',
  },
  errorButtonContainer: {
    marginTop: THEME.SPACING.m,
    width: '100%',
  },
  header: {
    marginBottom: THEME.SPACING.m,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.SPACING.s,
    minHeight: 40, // Ensure consistent height
  },
  closeButton: {
    padding: THEME.SPACING.xs,
    position: 'absolute',
    left: -THEME.SPACING.xs,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: THEME.FONTS.sansBold,
    fontSize: 16,
    color: THEME.COLORS.primary,
    paddingHorizontal: THEME.SPACING.xxl, // Ensure title doesn't overlap button
  },
  questionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    width: '100%',
  },
  questionText: {
    fontFamily: THEME.FONTS.serifBold,
    fontSize: 28,
    color: THEME.COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: THEME.SPACING.xxl,
  },
  answersContainer: {
    gap: THEME.SPACING.s,
  },
  answerButtonBase: {
    padding: THEME.SPACING.m,
    borderWidth: 2,
    borderRadius: THEME.RADIUS.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  answerButtonDefault: {
    backgroundColor: THEME.COLORS.surface,
    borderColor: 'transparent',
  },
  answerButtonCorrect: {
    backgroundColor: 'rgba(0, 191, 166, 0.1)', // success with 10% opacity
    borderColor: THEME.COLORS.success,
  },
  answerButtonIncorrect: {
    backgroundColor: 'rgba(207, 102, 121, 0.1)', // error with 10% opacity
    borderColor: THEME.COLORS.error,
  },
  answerButtonDisabled: {
    backgroundColor: THEME.COLORS.surface,
    borderColor: 'transparent',
    opacity: 0.5,
  },
  answerText: {
    color: THEME.COLORS.textPrimary,
    fontSize: 16,
    fontFamily: THEME.FONTS.sansBold,
    flex: 1,
  },
  footer: {
    height: 90,
    justifyContent: 'center',
  },
});

export default QuestGameplayScreen;
