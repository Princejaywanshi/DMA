import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';
// utils
import { isAndroid, isAndroidVersion21AndAbove } from '../utils';
// hooks
import useTheme from '../hooks/useTheme';

const hitSlop = { top: 10, left: 10, right: 10, bottom: 10 };

const Button = (props) => {
    const { theme } = useTheme();
    const { withoutFeedback = false, children, style, withHitSlop = false, ...rest } = props;

    const touchableWithoutFeedback = () => (
        <TouchableWithoutFeedback
            testID="touchableWithoutFeedback"
            {...(withHitSlop && { hitSlop })}
            {...rest}>
            <View style={style}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );

    const touchableNativeFeedback = () => (
        <TouchableNativeFeedback
            testID='touchableWithFeedback'
            useForeground={true}
            {...(withHitSlop && { hitSlop })}
            background={
                isAndroidVersion21AndAbove ?
                    TouchableNativeFeedback.Ripple(theme.$rippleColor, true) :
                    TouchableNativeFeedback.SelectableBackground()
            }
            {...rest}
        >
            <View style={[style, { overflow: 'hidden' }]}>
                {children}
            </View>
        </TouchableNativeFeedback>
    );

    const touchableOpacity = () => (
        <TouchableOpacity testID="touchableOpacity" style={style} {...(withHitSlop && { hitSlop })} {...rest}>
            {children}
        </TouchableOpacity>
    );

    if (withoutFeedback) {
        return touchableWithoutFeedback();
    } else if (isAndroid) {
        return touchableNativeFeedback();
    } else {
        return touchableOpacity();
    }
};

export default Button;
