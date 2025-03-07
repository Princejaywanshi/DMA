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
 const getShadowProps = (
    offset: number = 2,
    radius: number = 8,
    opacity: number = 0.2,
  ) => ({
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: offset,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  });  

  export type TUsePermissionsReturnType = {
    isError?: boolean;
    type: (typeof RESULTS)[keyof typeof RESULTS];
    errorMessage?: string;
  };
  
   interface ICameraScannerProps {
    setIsCameraShown: (value: boolean) => void;
    onReadCode: (value: string) => void;
  }
   enum EPermissionTypes {
    CAMERA = 'camera',
  }


const boxINCommon = {
  shadowOffset: {width: 0, height: 0}, // Center the shadow
  shadowOpacity:  isIOS ? 0.04 : 0.4,
  shadowRadius: 6,
  elevation: 10, // For Android
};
const topShadowCommon = {
  shadowOffset: {width: 0, height: -20}, // Top shadow
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
    EPermissionTypes
};