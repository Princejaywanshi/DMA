import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../utils/dimensions';


const DELAY = 200;

const timingConfig = {
  duration: 400,
  easing: Easing.inOut(Easing.cubic),
};

const Slide = ({ children, index, DelePara, duration }) => {
  const offset = useSharedValue(SCREEN_WIDTH);

  useEffect(() => {
    offset.value = 0;
  }, []);

  const animateX = useAnimatedStyle(() => {
    const animDuration = index * 80 + (DelePara ? DelePara : DELAY);
    return {
      transform: [
        {
          translateX: withDelay(
            animDuration,
            withTiming(offset.value, timingConfig)
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[animateX, { flex: 1, flexGrow: 1 }]}>
      {children}
    </Animated.View>
  );
};

export default Slide;
