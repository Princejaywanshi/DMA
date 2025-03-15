import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store'; // Import the correctly configured store
import Login from './src/screen/Login';
import SignUp from './src/screen/signUp';
import OTPVerificationScreen from './src/screen/otpScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack/authStack';
import SettingsProvider from './src/utils/settingProvider';


const App = () => {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <SettingsProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AuthStack/>
        </SafeAreaView>
        </SettingsProvider>
      </NavigationContainer>

    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
