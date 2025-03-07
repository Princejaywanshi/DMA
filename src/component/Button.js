import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const springConfig = {
  damping: 8,
  mass: 0.5,
  stiffness: 120,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.5,
};

const ButtonWithPushBack = ({ children, onPress, customContainerStyle }) => {
  const scale = useSharedValue(1);

  const pressIn = () => {
    scale.value = 0.9;
  };

  const pressOut = () => {
    scale.value = 1;
  };

  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, springConfig),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}>
      <Animated.View style={[customContainerStyle, scaleAnim]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonWithPushBack;
