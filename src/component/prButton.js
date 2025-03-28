import React from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Button as ButtonRNE } from 'react-native-elements';
import { fonts, lineHeights, sizes } from '../config/fonts';
import useTheme from '../hooks/useTheme';

const PrimaryButton = (props) => {
  const {
    secondary,
    size,
    buttonStyle,
    titleStyle,
    loadingProps,
    customsBg,
    disabled,
    icon,
    ...rest
  } = props;

  const { theme } = useTheme();
  const height = size === 'small' ? 41 : 42;
  const textColor = '#ffffff';

  return (
    <ButtonRNE
      {...rest}
      buttonStyle={[
        styles.button,
        { height, backgroundColor: disabled ? '#696969' : customsBg || '#000000' },
        buttonStyle,
      ]}
      background={TouchableNativeFeedback.Ripple('rgba(50,49,52,0.79)', false)}
      titleStyle={[styles.title, { color: textColor }, size === 'small' && styles.titleSmall, titleStyle]}
      disabledStyle={{ opacity: 0.5 }} // Reduce opacity for disabled mode
      disabledTitleStyle={{ color: textColor, opacity: 0.6 }}
      loadingProps={{ color: textColor, ...loadingProps }}
      icon={icon} // Pass the icon prop
      iconContainerStyle={styles.iconContainer}
    />
  );
};

PrimaryButton.defaultProps = {
  secondary: false,
  buttonStyle: {},
  titleStyle: {},
  size: 'normal',
  loadingProps: {},
  icon: null, // Default to no icon
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: sizes.h4,
    lineHeight: lineHeights.h4,
  },
  titleSmall: {
    fontSize: sizes.h5,
    lineHeight: 17,
  },
  iconContainer: {
    marginRight: 8, // Space between icon and text
  },
});

export default PrimaryButton;
