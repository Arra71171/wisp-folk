import React, { useRef, useEffect } from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 bg-black/40 justify-end"
        activeOpacity={1}
        onPress={onClose}
        style={{ flex: 1 }}
      >
        <Animated.View
          className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 shadow-lg"
          style={[
            { transform: [{ translateY: slideAnim }] },
            styles.modalContainer,
          ]}
        >
          {title && (
            <Text className="text-lg font-bold mb-2 text-gray-900 dark:text-white text-center">
              {title}
            </Text>
          )}
          {children}
        </Animated.View>
      </TouchableOpacity>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    minHeight: 120,
    minWidth: '80%',
    alignSelf: 'center',
  },
});

export default Modal; 