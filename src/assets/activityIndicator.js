import React from 'react';
import { StyleSheet, ActivityIndicator as ActivityIndicatorRN } from 'react-native';
import useTheme from '../hooks/useTheme';


const ActivityIndicator = (props) => {
  const { theme } = useTheme();
  return <ActivityIndicatorRN color={theme.$primary} {...props} style={props.style} />;
};

export default ActivityIndicator;

const styles = StyleSheet.create({});
