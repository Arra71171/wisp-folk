import React from 'react';
import { View, Image, Text, ImageSourcePropType } from 'react-native';

interface AvatarProps {
  source?: ImageSourcePropType;
  size?: number;
  ringColor?: string;
  initials?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 48,
  ringColor = '#61E7D1', // primary
  initials,
}) => {
  const borderWidth = 3;
  return (
    <View
      className="items-center justify-center"
      style={{
        width: size + borderWidth * 2,
        height: size + borderWidth * 2,
        borderRadius: (size + borderWidth * 2) / 2,
        borderWidth,
        borderColor: ringColor,
        backgroundColor: '#1C162D', // surface
      }}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <View
          className="bg-surface items-center justify-center"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        >
          <Text className="text-lg font-bold font-sans text-text-primary">
            {initials || '?'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;