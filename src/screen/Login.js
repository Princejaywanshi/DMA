import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Avatar, CheckBox, Icon} from 'react-native-elements';
import Text from '../component/Text';
import {inputMinHeight} from '../utils/theme';
import Button from '../component/Button';
import useTheme from '../hooks/useTheme';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TOP_SPACE_ANDROID,
} from '../utils/dimensions';
import TextInputEml from '../component/textInput';
import { color } from 'react-native-elements/dist/helpers';
import ButtonWithPushBack from '../component/Button';
import PrimaryButton from '../component/prButton';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const {theme} = useTheme();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const validateEmailOrPhone = text => {
    setEmailOrPhone(text);
    setError(''); // Jaise hi user type kare, error hata do
  };

  // const handleLogin = () => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const phoneRegex = /^[0-9]{10,}$/;

  //   if (!emailOrPhone) {
  //     setError('Please enter a valid email or phone number');
  //     return;
  //   }

  //   if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
  //     setError('Enter a valid email or phone number');
  //     return;
  //   }

  //   console.log('Email/Phone:', emailOrPhone);
  //   console.log('Password:', password);
  // };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits allowed

    if (!emailOrPhone) {
      setError('Please enter a valid email or phone number');
      return;
    }

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError('Enter a valid email or phone number');
      return;
    }

    console.log('Email/Phone:', emailOrPhone);
    console.log('Password:', password);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {...(Platform.OS == 'android' && TOP_SPACE_ANDROID)},
      ]}>
      <View style={{height: SCREEN_HEIGHT * 0.15}}>
        <View style={styles.header}>
          <Avatar
            rounded
            size="large"
            source={{uri: 'https://example.com/avatar.png'}}
            containerStyle={styles.avatar}
          />
          <Text h2 semiBold>
            Log in your account
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            {/* <Text h5 style={styles.inputLabel}>
              Email or Phone
            </Text>
            <TextInputEml
              style={styles.input}
              placeholder="Email or Phone"
              placeholderTextColor={theme.$primary}
              value={emailOrPhone}
              onChangeText={validateEmailOrPhone}
            /> */}
               <TextInputEml
                label="Email or Phone"
                placeholder="Email or Phone"
                value={emailOrPhone}
                onChangeText={validateEmailOrPhone}
                // icon="lock"
                // secureTextEntry={secureText}
                // rightIcon={secureText ? 'eye-slash' : 'eye'}
                // onRightIconPress={() => setSecureText(!secureText)}
              />
            {error ? (
              <Text h5 style={{color:theme.$danger}}>
                {error}
              </Text>
            ) : null}
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.passwordContainer}>

              <TextInputEml
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                // icon="lock"
                secureTextEntry={secureText}
                rightIcon={secureText ? 'eye-slash' : 'eye'}
                onRightIconPress={() => setSecureText(!secureText)}
              />
            </View>
          </View>
          <View style={[styles.rememberForgot, {width:"100%"}]}>
            <CheckBox
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              containerStyle={styles.checkbox}
            />
            <Text h5 style={[styles.rememberForgotText,{color:theme.$surface}]}>
              Remember for 30 days
            </Text>
            <TouchableOpacity>
              <Text h5 style={{color:theme.$lightText}}>
                Forgot password
              </Text>
            </TouchableOpacity>
          </View>
          <Button title="Login" onPress={handleLogin} />
          <ButtonWithPushBack customContainerStyle={{marginVertical:30}}>
            <PrimaryButton
            title="on" 
            onPress={()=>navigation.navigate("OTPVerificationScreen")} 
            />
          </ButtonWithPushBack>
        </View>
        <View style={styles.signupLink}>
          <Text h5 semiBold style={{color:theme.$surface}}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
            <Text h5 semiBold  style={{top:7}}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 14,

  },
  phoneContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    // alignItems: 'center',
    // marginTop:40
  },
  avatar: {
    marginBottom: 20,
    // borderWidth: 2,
    borderColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  rememberForgot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    right: 5,
  },
  rememberForgotText: {
    right: 25,
  },
  signupLink: {
    alignItems: 'center',
    // marginBottom: 50,
    justifyContent:"flex-end",
    flexGrow:1,
    // borderWidth:1,
    // borderColor:"white",
    height:SCREEN_HEIGHT*0.3
  },
});
