import {showMessage as showText} from 'react-native-flash-message';
import React, { ForwardedRef, useCallback, useImperativeHandle } from 'react'
import { Toast, toast, ToastPosition, ToastType, ValueOrFunction } from '@backpackapp-io/react-native-toast';
import {Theme} from '../../types';
import { TextStyle, ViewStyle } from 'react-native';
declare type Message = ValueOrFunction<Element, Toast>;
interface messageType {
  type: 'danger' | 'warning' | 'success';
  message: string;
  description?: string;
  theme: Theme;
  duration?: number;
}
type toastProps = {
  message?:string,
  type?: ToastType;
  position?:ToastPosition,
  icon?:JSX.Element | string | null,
  tostId?:string,
  duration?:number,
  isSwipeable?:boolean,
  styles?: {
      pressable?: ViewStyle;
      view?: ViewStyle;
      text?: TextStyle;
      indicator?: ViewStyle;
  };
  customToast?: (toast: Toast) => JSX.Element;
}

export const showMessage = (props: messageType): void => {
  const options = props;
  const {type, theme, duration, ...rest} = options;
  // const {theme} = useTheme();
  const backgroundColor =
    type === 'danger'
      ? theme.$danger
      : type === 'warning'
      ? theme.$background
      : type === 'success'
      ? theme.$accent
      : theme.$background;
  showText({
    backgroundColor,
    color: theme.$background,
    ...rest,
    type: type || 'default',
    duration: duration || 6000,
  });
};

export const showTost = (props: toastProps): void => {
  const options = props;
  const {message,icon, position = ToastPosition.BOTTOM, type, tostId, styles, customToast, isSwipeable=true, duration=4000} = options;
 const typeOption = {
  duration: duration,
  position: position,
  icon: icon,
  styles: styles,
  isSwipeable,
  id: tostId,
  customToast: customToast
}
  switch (type) {
    case 'success':
      toast.success(
        message || '',typeOption)
      break;
    case 'error':
      toast.error( message || '',typeOption)
      break;
    default:
      toast(message || '',typeOption)
      break;
  }  
 

};
export const hideTost = (tostId: toastProps['tostId']): void => {
    if (tostId) {
      toast.remove(tostId);
  } else {
      toast.dismiss();
  }

};
