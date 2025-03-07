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

  const handleSignUp = () => {
    if (!isButtonDisabled) {
      console.log('Sign-up successful!');
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {...(Platform.OS == 'android' && TOP_SPACE_ANDROID)},
      ]}>
             <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
      <View style={{height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH}}>
        <Avatar
          rounded
          size="large"
          source={{uri: 'https://example.com/avatar.png'}}
          containerStyle={styles.avatar}
        />
      </View>

      <View
        style={{
          height: SCREEN_HEIGHT * 0.15,
          width: SCREEN_WIDTH,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text h2 bold textAliments="center" style={styles.title}>
          Create account
        </Text>
        <Text style={styles.subtitle}>PROFILE</Text>
      </View>

      {/* Profile Selection */}
      <View style={styles.profileSelector}>
        <TouchableOpacity
          style={[
            styles.profileButton,
            selectedProfile === 'Personal' && styles.selectedButton,
          ]}
          onPress={() => setSelectedProfile('Personal')}>
          <Text h5 style={styles.profileText}>
            Personal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.profileButton,
            selectedProfile === 'Business' && styles.selectedButton,
          ]}
          onPress={() => setSelectedProfile('Business')}>
          <Text style={styles.profileText}>Business</Text>
        </TouchableOpacity>
      </View>

      <View style={{bottom: 30}}>
        {/* Username Input */}
        <TextInputEml
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          icon="user"
        />
        {errors.username && (
          <Text h5 style={{color: theme.$danger2, bottom: 10}}>
            {errors.username}
          </Text>
        )}

        {/* Email Input */}
        <TextInputEml
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          icon="envelope"
          keyboardType="email-address"
        />
        {errors.email && (
          <Text h5 style={{color: theme.$danger2, bottom: 10}}>
            {errors.email}
          </Text>
        )}

        {/* Mobile Input */}
        <TextInputEml
          label="Mobile"
          placeholder="Enter your mobile no"
          value={mobile}
          onChangeText={setMobile}
          icon="phone"
          keyboardType="phone-pad"
        />
        {errors.mobile && (
          <Text h5 style={{color: theme.$danger2, bottom: 10}}>
            {errors.mobile}
          </Text>
        )}

        {/* Password Input */}
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
          <Text h5 style={{color: theme.$danger2, bottom: 10}}>
            {errors.password}
          </Text>
        )}

        {/* ✅ Checkbox Below Password */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
          />
          <Text style={styles.checkboxText}>Minimum 8 digits characters</Text>
        </View>
      </View>

      {/* <ButtonWithPushBack 
            //     title="Sign Up" 
            //     onPress={handleSignUp} 
            //     customContainerStyle={isButtonDisabled ? { opacity: 0.5 } : {}}
            //     disabled={isButtonDisabled} 
            // /> */}
      <PrimaryButton
        disabled={isButtonDisabled}
        title="Sign Up"
        onPress={handleSignUp}
        loading={btnLoadingState}
        loadingProps={<ActivityIndicator animating size="small" />}
        style={isButtonDisabled ? {opacity: 0.5} : {}} // Add opacity for visual feedback
      />
      {/* </ButtonWithPushBack> */}

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <Text h5 style={{color: theme.$surface}}>
          Already have an Account?{' '}
          <TouchableOpacity onPress={() => console.log('Navigate to Login')}>
            <Text h5 style={{top: 8}}>
              Login
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 50,
  },
  profileButton: {
    borderWidth: 2,
    borderColor: '#E847C5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#383333',
    height: 40,
    width: '30%',
  },
  selectedButton: {
    backgroundColor: '#f00',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  errorText: {},
});
