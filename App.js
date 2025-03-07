import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store'; // Import the correctly configured store
import Login from './src/screen/Login';
import SignUp from './src/screen/signUp';
import OTPVerificationScreen from './src/screen/otpScreen';


const App = () => {
  return (
 <Provider store={store}>
     
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Login /> */}
<SignUp/> 
{/* <OTPVerificationScreen/> */}

      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
