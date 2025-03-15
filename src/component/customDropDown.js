import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from './Text';
import DropDownDialog from './dropDownDialouge';

function CustomDropdown(props) {
  let {
    value,
    onChange,
    label,
    isRequired,
    titleStyle,
    options,
    multiSelect = false,
    disabled = false,
    isError = false,
    errorMessage = '',
  } = props;
  const [dialog, showdialog] = useState(false);
  return (
    <View
      style={[
        styles.inputContainer,
        {backgroundColor:"white"},
      ]}>
      <View style={styles.row}>
        <Text style={titleStyle} title={label} />
        {isRequired ? (
          <Text
            // style={[
            //   styles.required,
            //   {color: isError ? colors.errorColor : colors.red},
            // ]}
            text="*"
          />
        ) : null}
      </View>
      <View>
        <Pressable
          style={[
            styles.inputSelection,
            // {
            //   borderColor: isError
            //     ? colors.errorColor
            //     : colors.placeHolderColor2,
            // },
          ]}
          activeOpacity={0.5}
          onPress={() => (disabled ? null : showdialog(true))}>
          <Text style={styles.inputSelectionText} title={value} />
          <Icon
            name="expand-more"
            size={20}
            // color={isError ? colors.errorColor : colors.placeHolderColor2}
          />
        </Pressable>
        {errorMessage ? <ErrorText errorMessage={errorMessage} /> : null}

        {/* Hidden Components */}
        <DropDownDialog
          title={label}
          data={options}
          isVisible={dialog}
          onClose={() => showdialog(false)}
          onChange={onChange}
          multiSelect={multiSelect}
        />
      </View>
    </View>
  );
}

export default CustomDropdown;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  inputContainer: {padding: 5},
  rupeeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    // borderColor: colors.placeHolderColor2,
  },
  required: {
    // color: colors.red,
    // fontFamily: env.fontBold,
    // fontSize: 14,
    marginBottom: 5,
  },
  inputSelection: {
    borderBottomWidth: 1,
    // borderColor: colors.placeHolderColor2,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  inputSelectionText: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    // color: colors.textColor,
    // fontFamily: env.fontRegular,
  },
  errorText: {
    // fontFamily: env.fontLight,
    fontSize: 10,
    marginTop: 5,
    marginHorizontal: 10,
    // color: colors.errorColor,
  },
});
