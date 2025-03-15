import React, {
    memo,
    useCallback,
    useMemo,
    useRef,
    useState,
  } from 'react';
  import {
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions,
    Animated,
    View,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
import useTheme from '../hooks/useTheme';
import Icon from './icon';

  
  const SCREEN = Dimensions.get('screen');
  
  const ModalPopUp = ({
    visible = false,
    keyboardView = false,
    setModalVisible = () => {},
    maxRatio = 0.7,
    minRatio = 0,
    children,
    isBgClickClose = true,
    onlyDisableBack = false,
    isItLarge = false,
  }) => {
    const { theme } = useTheme();
    const opacityNumber = visible ? 0.7 : 0;
  
    const defaultState = useMemo(() => ({
      visible,
      opacity: new Animated.Value(opacityNumber),
      heightView: 0,
      maxHeight: maxRatio * SCREEN.height + 70,
      minHeight: minRatio * SCREEN.height,
    }), []);
  
    const [state, setState] = useState(defaultState);
    const { opacity } = state;
  
    const animation = (type = 'open', cb = () => {}) => {
      Animated.timing(state.opacity, {
        toValue: type === 'open' ? 0.7 : 0,
        duration: 350,
        useNativeDriver: false,
      }).start(cb);
    };
  
    const closeModel = () => {
      if (isBgClickClose && !onlyDisableBack) {
        setModalVisible(false);
      }
    };
  
    const memoizedCallback = useCallback((event) => {
      const { height: heightFull } = event.nativeEvent.layout;
      setState(prev => ({
        ...prev,
        maxHeight: heightFull * maxRatio,
        minHeight: heightFull * minRatio,
        heightView: Math.min(Math.max(prev.heightView, prev.minHeight), prev.maxHeight),
      }));
    }, []);
  
    const bottom = opacity.interpolate({
      inputRange: [0, 0.7],
      outputRange: [-state.heightView, 0],
    });
  
    const Content = useCallback(() => (
      <Animated.View style={styles.container} onLayout={memoizedCallback}>
        <Animated.View style={[styles.viewOpacity, { backgroundColor: theme.$disabled, opacity }]}> 
          <TouchableOpacity style={styles.touch} onPress={() => setModalVisible(false)}>
            {isBgClickClose && (
              <View style={{ position: 'absolute', left: '45%' }}>
                <Icon name="close-circle-outline" size={40} color={theme.$text} style={{ marginVertical: 20, opacity: 1 }} />
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.content, { bottom }]}> 
          <Animated.View style={[styles.viewChildren, { backgroundColor: theme.$background, minHeight: state.minHeight, ...(isItLarge && { height: state.maxHeight - 80 }) }]}> 
            {children}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    ), []);
  
    return (
      <Modal visible={visible} transparent onRequestClose={closeModel}>
        {keyboardView ? (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
            <Content />
          </KeyboardAvoidingView>
        ) : (
          <Content />
        )}
      </Modal>
    );
  };
  
  export default memo(ModalPopUp);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewOpacity: {
      flex: 1,
    },
    touch: {
      flex: 1,
    },
    content: {
      justifyContent: 'flex-end',
    //   position: 'absolute',
      left: 0,
      right: 0,
    },
    viewChildren: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 18,
    },
  });