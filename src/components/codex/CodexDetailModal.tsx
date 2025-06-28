import React from 'react';
import { View, Text, Modal, Pressable, ImageBackground, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

interface CodexEntry {
  id: string;
  title: string;
  category: 'Lore' | 'Characters' | 'Items';
  image: string;
  height: number;
}

interface CodexDetailModalProps {
  visible: boolean;
  onClose: () => void;
  entry: CodexEntry | null;
}

export const CodexDetailModal = ({ visible, onClose, entry }: CodexDetailModalProps) => {
  if (!entry) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <Animatable.View
          animation="zoomIn"
          duration={500}
          useNativeDriver
          className="bg-surface rounded-t-2xl h-5/6"
        >
          <ImageBackground
            source={{ uri: entry.image }}
            className="h-64 w-full rounded-t-2xl overflow-hidden justify-end"
          >
            <View className="p-6 bg-gradient-to-t from-black/80 to-transparent">
              <Text className="text-3xl font-bold text-white shadow-lg">{entry.title}</Text>
            </View>
          </ImageBackground>
          <ScrollView contentContainerStyle={{ padding: 24 }}>
            <Text className="text-lg font-semibold text-onSurface mb-2">Category: {entry.category}</Text>
            <Text className="text-base text-onSurface/80 leading-relaxed">
              This is a placeholder for a detailed description of {entry.title}. Here, we would include rich lore, historical context, or character backstories to immerse the player in the world of WISP.
            </Text>
          </ScrollView>
          <Pressable onPress={onClose} className="absolute top-5 right-5 bg-black/40 rounded-full p-2">
            <Feather name="x" size={24} color="white" />
          </Pressable>
        </Animatable.View>
      </View>
    </Modal>
  );
};
