import React from 'react';
import { View, Image, Text, ImageSourcePropType, StyleSheet } from 'react-native';
import { THEME } from '../../constants/theme';

interface AvatarProps {
  source?: ImageSourcePropType;
  size?: number;
  initials?: string;
}

const createStyles = (size: number) => StyleSheet.create({
  ring: {
    width: size + 6, // 3px border on each side
    height: size + 6,
    borderRadius: (size + 6) / 2,
    borderWidth: 2.5,
    borderColor: THEME.COLORS.primary,
    backgroundColor: THEME.COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  image: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  initialsContainer: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: THEME.COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontFamily: THEME.FONTS.sansBold,
    fontSize: size * 0.4,
    color: THEME.COLORS.primary,
  },
});

const Avatar: React.FC<AvatarProps> = ({ source, size = 48, initials }) => {
  const styles = React.useMemo(() => createStyles(size), [size]);

  return (
    <View style={styles.ring}>
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>{initials?.substring(0, 2).toUpperCase() || '?'}</Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;