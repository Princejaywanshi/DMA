import React, { useEffect } from 'react';
import { StatusBar, Platform, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../hooks/useTheme';
import Text from './Text';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Header = ({ title, rightComponent, showBack = false, customBackEvent }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('white');
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(false);
    }
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '' }}>
      <StatusBar backgroundColor="#ffffff" barStyle="light-content" hidden={false} />
      <View style={[styles.headerContainer, {  }]}>
        {/* Back or Menu Button */}
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={customBackEvent ? customBackEvent : showBack ? navigation.goBack : navigation.toggleDrawer}
        >
          <Icon name={showBack ? 'keyboard-backspace' : 'sort'} size={28} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text h4 bold style={{}}>{title}</Text>
        </View>

        {/* Right Custom Component (Optional) */}
        {rightComponent || <View style={styles.touchableContainer} />}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop:30
   
  },
  touchableContainer: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: 50,
 
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
