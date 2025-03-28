'use strict';

import { Linking, Platform } from 'react-native';
import { RESULTS } from 'react-native-permissions';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const isAndroidVersion21AndAbove = Number(Platform.Version) >= 21;

const goToSettings = () => {
    if (isIOS) {
        Linking.openURL('app-settings:');
    } else {
        Linking.openSettings();
    }
};

const getShadowProps = (offset = 2, radius = 8, opacity = 0.2) => ({
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: offset,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
});

const EPermissionTypes = {
    CAMERA: 'camera',
};

const boxINCommon = {
    shadowOffset: { width: 0, height: 0 }, // Center the shadow
    shadowOpacity: isIOS ? 0.04 : 0.4,
    shadowRadius: 6,
    elevation: 10, // For Android
};

const topShadowCommon = {
    shadowOffset: { width: 0, height: -20 }, // Top shadow
};

/**
 * Add other platform utils
 */

export {
    isIOS,
    isAndroid,
    isAndroidVersion21AndAbove,
    boxINCommon,
    topShadowCommon,
    goToSettings,
    getShadowProps,
    EPermissionTypes,
};
