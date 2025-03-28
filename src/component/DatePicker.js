import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from './icon';
import Text from './Text';
import useTheme from '../hooks/useTheme';

export default function CustomDatePicker({
  onChange,
  value,
  title,
  isError = false,
//   errorMessage = '',
}) {
  const [dialog, showDialog] = useState(false);
  const { theme } = useTheme(); // Extract theme

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={[
          styles.inputSelection,
          { borderColor: theme.$surface }, // Apply theme color
        ]}
        activeOpacity={0.5}
        onPress={() => showDialog(true)}>
        <Icon
          name="date-range"
          size={20}
          color={isError ? theme.$danger : theme.$placeholderColor2} // Use theme colors
        />
        <Text
          h5
          style={[styles.inputSelectionText, ]} // Apply text color from theme
          text={
            value
              ? new Date(value).getDate() +
                '/' +
                (new Date(value).getMonth() + 1) +
                '/' +
                new Date(value).getFullYear()
              : ''
          }
        />
      </TouchableOpacity>

      {/* Display Error Text if there's an error */}
       {isError && errorMessage ? <ErrorText errorMessage={errorMessage} /> : null} 

      {/* Date Picker Modal */}
      <DatePicker
        modal
        title={title}
        open={dialog}
        date={value ? new Date(value) : new Date()}
        onConfirm={date => {
          showDialog(false);
          onChange(date);
        }}
        onCancel={() => showDialog(false)}
        mode="date"
        androidVariant="iosClone"
        textColor={theme.$text} // Apply theme color
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputSelection: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  inputSelectionText: {
    flex: 1,
    marginStart: 10,
    fontSize: 14,
      // color: colors.textColor,
    //   fontFamily: env.fontRegular, // Replace with your font variable if needed
  },
});
