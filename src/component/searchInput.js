import React, { useCallback, useRef, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Card from './card';
import useTheme from '../hooks/useTheme';
import Icon from './icon'; // Import your Icon component
import { fonts, sizes } from '../config/fonts';

const Search = (props) => {
  const {
    containerStyle,
    inputContainerStyle,
    inputContentStyle,
    inputStyle,
    showLoading,
    loadingProps,
    value,
    onChangeText,
    autoFocus,
  } = props;

  const { theme: colors } = useTheme();
  const input = useRef(null);

  const onType = (text) => {
    onChangeText && onChangeText(text);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Card
        third
        style={[
          styles.inputContainer,
          inputContainerStyle,
          { borderColor: colors.$lightText, backgroundColor: 'grey' },
        ]}
      >
        {/* Search Icon */}
        <Icon name="search" type="material" size={22} color="white" style={styles.searchIcon} />

        <View style={[styles.inputContent, inputContentStyle]}>
          <TextInput
            testID="searchInput"
            placeholder="Search"
            placeholderTextColor={colors.$lightText} // Placeholder text color set to white
            ref={input}
            style={[
              styles.input,
              inputStyle,
              { color:colors.$lightText }, // Input text color set to white
            ]}
            onChangeText={onType}
            autoFocus={autoFocus || false}
            value={value}
          />
        </View>

        {/* Loading Indicator */}
        {showLoading ? loadingProps : null}

        {/* Clear Text Icon */}
        {value?.length > 0 && (
          <TouchableOpacity onPress={() => onType('')} style={styles.iconButton}>
            <Icon name="close-circle" type="material-community" size={22} color="white" />
          </TouchableOpacity>
        )}

        {/* Mic Icon for Voice Input */}
        <TouchableOpacity onPress={() => console.log('Voice Search Triggered')} style={styles.iconButton}>
          <Icon name="mic" type="material" size={22} color="white" />
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default Search;

Search.defaultProps = {
  value: '',
  showLoading: false,
  onChangeText: () => null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  inputContent: {
    flex: 1,
  },
  input: {
    height: 46,
    paddingHorizontal: 10,
    fontFamily: fonts.regular,
    fontSize: sizes.h4,
  },
  searchIcon: {
    marginRight: 10,
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
  },
});
