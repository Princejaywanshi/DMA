import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Avatar, CheckBox, Icon} from 'react-native-elements';
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
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { login } from '../network/action';
import AuthStorage from '../utils/authStorage';
import { useDispatch } from 'react-redux';
import { setUserData } from '../slices/userSlice';
import Text from '../component/Text';


export default function Login() {
  const {theme} = useTheme();
  const dispatch=useDispatch()
  // const [emailOrPhone, setEmailOrPhone] = useState('');
  // const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const [emailOrPhone, setEmailOrPhone] = useState(route.params?.email || '');
  const [password, setPassword] = useState(route.params?.password || '');

  console.log('Received in Login:', emailOrPhone, password);
  

  // const validateEmailOrPhone = text => {
  //   setEmailOrPhone(text);
  //   setError(''); // Jaise hi user type kare, error hata do
  // };

  const inputRef = useRef(null);

const validateEmailOrPhone = (text) => {
    setEmailOrPhone(text);
    setError(''); 

    // Focus input if there's an error
    if (!text) {
        inputRef.current?.focus();
    }
};
useEffect(() => {
  if (route.params?.email) {
    setEmailOrPhone(route.params.email);
  }
  if (route.params?.password) {
    setPassword(route.params.password);
  }
}, [route.params]); 

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

  

  // const handleLogin = () => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits allowed

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
  
 
  // const handleLogin = async () => {
  //   setError(''); // Reset error before making request
    
  //   if (!emailOrPhone || !password) {
  //     setError('Email/Phone and Password are required');
  //     return;
  //   }
  
  //   try {
  //     console.log('Sending login request with:', { username: emailOrPhone, password });
  
  //     const response = await axios.post('http://52.70.194.52/api/account/login/', {
  //       username: emailOrPhone,
  //       password: password,
  //     });
  
  //     console.log('Full Response:', response);
      
  //     if (response.status === 200) {
  //       console.log('Login Successful:', response.data);
  //       navigation.navigate('createProfile');
  //     } else {
  //       console.log('Login Failed:', response.data);
  //       setError(response.data.message || 'Invalid credentials.');
  //     }
  //   } catch (error) {
  //     console.log('Login Error:', error);
      
  //     if (error.response) {
  //       console.log('Error Response:', error.response);
  //       setError(error.response.data?.message || 'Invalid email/phone or password.');
  //     } else if (error.request) {
  //       console.log('No response received from server:', error.request);
  //       setError('Network error. Please check your connection.');
  //     } else {
  //       console.log('Error during request setup:', error.message);
  //       setError('Something went wrong. Please try again.');
  //     }
  //   }
  // };
  
  
  
  const handleLogin = async () => {
    setError('');
    
    if (!emailOrPhone || !password) {
      setError('Email/Phone and Password are required');
      return;
    }
  
    try {
      const response = await login({ username: emailOrPhone, password });
  
      console.log('Login Response:', response); // Debugging
  
      if (response?.user && response?.access) {
        console.log('Access Token:', response.access); // Log the access token
        console.log('Refresh Token:', response.refresh);
        AuthStorage.saveTokens(response?.access,response?.refresh)
        dispatch(setUserData(response?.user))
        navigation.navigate('createProfile');
      } else {
        setError(response?.data?.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error); // Debugging
      if (error.response) {
        setError(error.response.data?.message || 'Invalid email/phone or password.');
      } else {
        setError('Network error. Please check your connection.');
      }
    }
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
                ref={inputRef}
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
               ref={inputRef}
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
          {/* <Button title="Login" onPress={handleLogin} /> */}
          <ButtonWithPushBack customContainerStyle={{marginVertical:30}}>
            <PrimaryButton
            title="Login" 
            onPress={handleLogin} 
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
