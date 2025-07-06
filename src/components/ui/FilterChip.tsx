import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { THEME } from '../../constants/theme';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterChip = ({ label, isSelected, onPress }: FilterChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isSelected ? styles.containerSelected : styles.containerUnselected]}
    >
      <Text style={[styles.label, isSelected ? styles.labelSelected : styles.labelUnselected]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: THEME.SPACING.xs,
    paddingHorizontal: THEME.SPACING.m,
    borderRadius: THEME.RADIUS.full,
    marginRight: THEME.SPACING.s,
    borderWidth: 1,
  },
  containerSelected: {
    backgroundColor: THEME.COLORS.primary,
    borderColor: THEME.COLORS.primary,
    ...THEME.SHADOWS.light,
  },
  containerUnselected: {
    backgroundColor: THEME.COLORS.surface,
    borderColor: THEME.COLORS.border,
  },
  label: {
    fontFamily: THEME.FONTS.sansBold,
    fontSize: 14,
  },
  labelSelected: {
    color: THEME.COLORS.background,
  },
  labelUnselected: {
    color: THEME.COLORS.textSecondary,
  },
});

export default FilterChip;
