import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';

interface CardProps {
  image?: ImageSourcePropType;
  title: string;
  subtitle?: string;
  description?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ image, title, subtitle, description, onPress, children, style }) => {
  const CardContent = (
    <>
      {image && (
        <Image source={image} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.8}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.container, style]}>{CardContent}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(244, 114, 182, 0.1)', // primary/10
    shadowColor: 'rgba(244, 114, 182, 0.2)', // primary/20
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontFamily: 'CormorantGaramond-Bold',
    fontSize: 22,
    color: THEME.COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    color: THEME.COLORS.primary,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: THEME.COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default Card;
