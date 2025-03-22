import React from 'react';
import { AppState, SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store'; // Import the correctly configured store
import Login from './src/screen/Login';
import SignUp from './src/screen/signUp';
import OTPVerificationScreen from './src/screen/otpScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack/authStack';
import Appstack from './src/navigation/AppStack/Appstack';

const App = () => {
  return (

    <Provider store={store}>
      <NavigationContainer>


        <SafeAreaView style={{ flex: 1 }}>
          {/* <Login /> */}
          {/* <SignUp /> */}
          {/* <OTPVerificationScreen/> */}
          {/* <AuthStack/> */}
          <Appstack />
        </SafeAreaView>
      </NavigationContainer>

    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
