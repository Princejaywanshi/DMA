import React from 'react';
import { Icon as IconIN } from 'react-native-elements';
import useTheme from '../hooks/useTheme';

const Icon = ({
  name,
  size = 24,
  color,
  onPress,
  type = 'material-community',
  isRotateRTL = false,
  iconStyle,
  containerStyle,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <IconIN
      name={name}
      size={size}
      color={color || theme.$text}
      onPress={onPress}
      type={type}
      style={style}
      containerStyle={containerStyle}
    />
  );
};

export default Icon;
