import React, { useState } from 'react';
import { View, Alert, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import OTPTextView from '../component/otpInput';
import PrimaryButton from '../component/prButton';
import Text from '../component/Text';
import useTheme from '../hooks/useTheme';
import ActivityIndicator from '../assets/activityIndicator';
import { SCREEN_HEIGHT, TOP_SPACE_ANDROID } from '../utils/dimensions';
import ButtonWithPushBack from '../component/Button';
import { useNavigation } from '@react-navigation/native';

const CORRECT_OTP = '123456'; // Hardcoded OTP for validation

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState('');
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleOTPChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP');
      return;
    }

    setBtnLoadingState(true);

    setTimeout(() => {
      setBtnLoadingState(false);
      if (otp === CORRECT_OTP) {
        Alert.alert('Success', 'OTP Verified Successfully!');
      } else {
        Alert.alert('Error', 'Incorrect OTP. Please try again.');
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'android' && TOP_SPACE_ANDROID]}>
      <View style={styles.header}>
        <Text h3 semiBold>Check your email</Text>
      </View>

      <View style={styles.otpContainer}>
        <OTPTextView
          inputCount={6}
          handleTextChange={handleOTPChange}
          tintColor="#E847c5"
          offTintColor="#E847c5"
          autoFocus={true}
        />
      </View>
      <ButtonWithPushBack customContainerStyle={{marginVertical: 30}}>
      <PrimaryButton
  disabled={otp.length !== 6 || btnLoadingState}
  title="Verify email"
  onPress={()=>navigation.navigate("createProfile")}
  loading={btnLoadingState}
  loadingProps={<ActivityIndicator animating size="small" />}
  style={{ opacity: otp.length !== 6 || btnLoadingState ? 0.5 : 1 }} // Add opacity for visual feedback
/>
</ButtonWithPushBack>

      <View style={styles.resendContainer}>
        <Text h5 style={{ color: theme.$surface }}>
          Didn't receive an email?{' '}
          <TouchableOpacity onPress={() => console.log('Resend OTP')}>
            <Text h5 semiBold style={{ color: theme.$surface, top: 8 }}>Click to resend</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.backToLogin}>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
          <Text h4 bold textAliments="center">Back to log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  header: {
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  otpContainer: {
    height: SCREEN_HEIGHT * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  resendContainer: {
    alignItems: "center",
    top: 5,
  },
  backToLogin: {
    height: SCREEN_HEIGHT * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
});
