import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';

interface QuestCompleteModalProps {
  isVisible: boolean;
  onClose: () => void;
  questTitle: string;
  xpAwarded: number;
}

const QuestCompleteModal: React.FC<QuestCompleteModalProps> = ({ isVisible, onClose, questTitle, xpAwarded }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.6}
      useNativeDriverForBackdrop
    >
      <Animatable.View animation="tada" iterationCount={1} className="bg-surface rounded-2xl p-6 items-center">
        <View className="bg-accent/20 p-4 rounded-full mb-4">
            <Feather name="award" size={40} className="text-accent" />
        </View>
        <Text className="text-2xl font-bold text-onSurface mb-2">Quest Complete!</Text>
        <Text className="text-lg text-onSurface/80 text-center mb-1">You've completed</Text>
        <Text className="text-lg font-bold text-accent text-center mb-4">"{questTitle}"</Text>
        <View className="bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Text className="text-accent font-bold text-lg">+ {xpAwarded} XP</Text>
        </View>
        <Pressable onPress={onClose} className="bg-accent w-full p-3 rounded-full items-center">
            <Text className="text-white font-bold text-base">Continue</Text>
        </Pressable>
      </Animatable.View>
    </Modal>
  );
};

export default QuestCompleteModal;
