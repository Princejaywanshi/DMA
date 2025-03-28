import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Text from '../component/Text';
import TextInputEml from '../component/textInput';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TOP_SPACE_ANDROID,
} from '../utils/dimensions';
import {Avatar} from 'react-native-elements';
import Checkbox from '../component/checkbox';
import useTheme from '../hooks/useTheme';
import ButtonWithPushBack from '../component/Button';
import {color} from 'react-native-elements/dist/helpers';
import PrimaryButton from '../component/prButton';
import ActivityIndicator from '../assets/activityIndicator';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Slide from '../assets/slide';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const SignUp = () => {
  const {theme} = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState('Personal');
  const [isChecked, setIsChecked] = useState(true);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const userData = useSelector(state => state.user.userData);
  // console.log("userData",userData)

  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;

    // Check if fields are empty first
    if (!username.trim()) {
      // newErrors.username = "Username is required.";
      isValid = false;
    } else if (!username.match(/^[A-Za-z\s]+$/)) {
      newErrors.username = 'Name should contain only letters.';
      isValid = false;
    }

    if (!email.trim()) {
      // newErrors.email = "Email is required.";
      isValid = false;
    } else if (
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      newErrors.email = 'Enter a valid email address.';
      isValid = false;
    }

    if (!mobile.trim()) {
      // newErrors.mobile = "Mobile number is required.";
      isValid = false;
    } else if (!mobile.match(/^\d{10}$/)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits.';
      isValid = false;
    }

    if (!password.trim()) {
      // newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    setIsButtonDisabled(!isValid);
  };

  // Validate inputs on any change
  useEffect(() => {
    validateInputs();
  }, [username, email, mobile, password]);

  const handleSignUp = async () => {
    if (isButtonDisabled) return;

    setBtnLoadingState(true); // Show loading indicator

    try {
      const response = await axios.post(
        'http://52.70.194.52/api/account/register/',
        {
          user_type: selectedProfile, // 'personal' or 'business'
          username: username,
          email: email,
          mobile_number: mobile,
          password: password,
        },
      );

      alert('Account created successfully!');

      // ✅ Navigate only after successful signup & send all required

      navigation.navigate('OTPVerificationScreen', {
        user_type: selectedProfile,
        email: email,
        mobile_number: mobile,
        username: username,
        password: password,
      });
    } catch (error) {
      alert(
        error.response?.data?.error || 'Registration failed. Please try again.',
      );
    } finally {
      setBtnLoadingState(false); // Hide loading indicator
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {...(Platform.OS == 'android' && TOP_SPACE_ANDROID)},
      ]}>
      {step === 0 && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: SCREEN_HEIGHT * 0.4,
            flex: 1,
          }}>
          <Avatar
            size={wp('20%')}
            rounded
            overlayContainerStyle={{
              backgroundColor: 'black',
              borderColor: theme.$secondaryText,
              borderWidth: 1,
            }}
            icon={{
              name: 'user',
              type: 'font-awesome',
              color: 'white',
              size: 60,
            }}
          />
          <Text h5 textAliments="center" style={{color: theme.$surgace}}>
            Please select your profile type
          </Text>
          <View style={styles.profileSelector}>
            <TouchableOpacity
              style={[
                styles.profileButton,
                selectedProfile === 'Personal' && styles.selectedButton,
              ]}
              onPress={() => {
                setSelectedProfile('Personal');
                setStep(1);
              }}>
              <Text h5 style={styles.profileText}>
                Personal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileButton,
                selectedProfile === 'Business' && styles.selectedButton,
              ]}
              onPress={() => {
                setSelectedProfile('Business');
                setStep(1);
              }}>
              <Text h5 style={styles.profileText}>
                Business
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 1 && (
        <Slide index={1}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' :"padding"}
            style={{flex: 1}}
            >
            <View
              style={[
                // styles.container,
                {...(Platform.OS == 'android' && TOP_SPACE_ANDROID)},
              ]}>
              <Text
                h2
                semiBold
                textAliments="center"
                style={{color: theme.$surface}}>
                Create account
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: 16,
                flex: 1,
                marginBottom: 30,
              }}>
              <TextInputEml
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                icon="user"
              />
              {errors.username && (
                <Text h5 style={styles.errorText}>
                  {errors.username}
                </Text>
              )}

              <TextInputEml
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                icon="envelope"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text h5 style={styles.errorText}>
                  {errors.email}
                </Text>
              )}

              <TextInputEml
                label="Mobile"
                placeholder="Enter your mobile no"
                value={mobile}
                onChangeText={setMobile}
                icon="phone"
                keyboardType="phone-pad"
              />
              {errors.mobile && (
                <Text h5 style={styles.errorText}>
                  {errors.mobile}
                </Text>
              )}

              <TextInputEml
                label="Password"
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                icon="lock"
                secureTextEntry={secureText}
                rightIcon={secureText ? 'eye-slash' : 'eye'}
                onRightIconPress={() => setSecureText(!secureText)}
              />
              {errors.password && (
                <Text h5 style={styles.errorText}>
                  {errors.password}
                </Text>
              )}

              <View style={styles.checkboxContainer}>
                <Checkbox
                  checked={isChecked}
                  onPress={() => setIsChecked(!isChecked)}
                />
                <Text style={{color: theme.$surface}}>
                  Minimum 5 characters required
                </Text>
              </View>
            </View>
            <ButtonWithPushBack
              customContainerStyle={{marginBottom: 40, paddingHorizontal: 16}}>
              <PrimaryButton
                disabled={isButtonDisabled}
                title="Sign Up"
                onPress={handleSignUp}
                loading={btnLoadingState}
                loadingProps={<ActivityIndicator />}
                style={isButtonDisabled ? {opacity: 0.5} : {}}
              />
            </ButtonWithPushBack>
            <View style={styles.footer}>
              <Text h5 textAliments="center">
                Already have an Account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text h5 textAliments="center" style={styles.loginText}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Slide>
      )}
    </SafeAreaView>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
    bottom: 50,
  },
  profileSelector: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  profileButton: {
    width: '100%',
    borderWidth: 2,
    // borderColor: '#E847C5',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
  },
  checkboxText: {
    color: 'grey',
    marginLeft: 10,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    bottom: 10,
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 30,
  },
});
