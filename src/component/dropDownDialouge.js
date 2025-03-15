import React from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
// import colors from '../../shared/constants/colors';
import Icon from './icon';
import Text from './Text';
import useTheme from '../hooks/useTheme';


const {height} = Dimensions.get('screen');

export default function DropDownDialog({
  title,
  isVisible,
  data,
  onChange,
  onClose,
  multiSelect,
}) {
    const {theme}=useTheme()
  const _change = item => {
    if (!multiSelect) {
      onClose();
    }
    if (onChange) {
      onChange(item);
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
             <Pressable
        style={[
          styles.menu,
          { backgroundColor: theme.backgroundSecondary }, // Apply theme color
        ]}
        onPress={() => _change(item)}
      >

          {multiSelect ? (
            <Icon
              name={item?.isSelected ? 'check-box' : 'check-box-outline-blank'}
              size={20}
            //   color={item?.isSelected ? colors.primary : colors.black}
              style={item?.isSelected ? styles.iconStyle1 : styles.iconStyle2}
            />
          ) : null}
          <Text
            style={styles.menuTitle}
            title={item?.name || item?.label || item}
          />
        </Pressable>
      </>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <SafeAreaView>
        <View style={styles.root}>
          <View style={styles.titleStyle}>
            <Text style={styles.title} title={title} />
            <Pressable onPress={onClose} style={styles.p5}>
              <Icon
                name="close"
                size={20}
                // color={colors.black}
                style={styles.opacityHalf}
              />
            </Pressable>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, i) => String()}
            renderItem={renderItem}
            contentContainerStyle={styles.p15}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          {multiSelect ? (
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText} titlr={'OK'} />
              {/* <Text style={styles.buttonText} allowFontScaling={false}>
                OK
              </Text> */}
            </Pressable>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    // backgroundColor: colors.white,
    borderRadius: 8,
    maxHeight: height * 0.8,
  },
  opacityHalf: {opacity: 0.5},
  p15: {padding: 15},
  p5: {padding: 5},
  menu: {
    padding: 15,
    // backgroundColor: colors.tabBackground,
    borderRadius: 8,
    marginBottom: 5,
    flexDirection: 'row',
  },
//   menuTitle: {
//     fontSize: 15,
//     color: colors.black,
//     fontFamily: env.fontRegular,
//   },
//   title: {
//     fontSize: 14,
//     color: colors.black,
//     opacity: 0.5,
//     // fontFamily: env.fontRegular,
//   },
  button: {
    padding: 10,
    // backgroundColor: colors.primary,
    borderRadius: 8,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
//   buttonText: {
//     fontSize: 13,
//     fontFamily: env.fontSemibold,
//     color: colors.white,
//   },
  titleStyle: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle1: {marginRight: 5},
  iconStyle2: {opacity: 0.5, marginRight: 5},
});
