import React from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Button as ButtonRNE } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
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
    ...rest
  } = props;

  const { theme } = useTheme();
  const height = size === 'small' ? 41 : 42;
  const textColor = '#ffff';

  return (
    <ButtonRNE
      {...rest}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: disabled ? ['#c41d1d', '#E847c5'] : ['#c41d1d', '#E847c5'], // when disabled
        start: { x: 0.05, y: 0 },
        end: { x: 1, y: 0 },
      }}
      buttonStyle={[styles.button, { height }, buttonStyle]}
      background={TouchableNativeFeedback.Ripple('rgba(50,49,52,0.79)', false)}
      titleStyle={[styles.title, { color: textColor }, size === 'small' && styles.titleSmall, titleStyle]}
      disabledStyle={{ opacity: 0.5 }} // Reduce opacity for disabled mode
      disabledTitleStyle={{ color: textColor, opacity: 0.6 }}
      loadingProps={{ color: textColor, ...loadingProps }}
    />
  );
};

PrimaryButton.defaultProps = {
  secondary: false,
  buttonStyle: {},
  titleStyle: {},
  size: 'normal',
  loadingProps: {},
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
});

export default PrimaryButton;
