import React from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';
import useTheme from '../hooks/useTheme';

const ErrorText = ({ errorMessage }) => {
    const theme = useTheme();
    return <Text h5 style={{ ...styles.errorText, color: theme.$danger }} text={errorMessage} />;
};

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
});
