import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Custombackbtn from '../component/Custombackbtn';
import CustomProfile from '../component/CustomProfile';
import Custominput from '../component/Custominput';
import PrimaryButton from '../component/prButton';
import ButtonWithPushBack from '../component/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar, BottomSheet, ListItem} from 'react-native-elements';
import useTheme from '../hooks/useTheme';
import Icon from '../component/icon';
import SingleSelect from '../component/singleSelect';
import Text from '../component/Text';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {openCamera, openPhotos} from '../utils/imagePicker';
import AuthStorage from '../utils/authStorage';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../slices/userSlice';
import axios from 'axios';
import {personalInfo} from '../network/action/LoginAction';
import Api from '../network/Api';

const CreateProfile = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const route = useRoute();
  const {userId} = route.params || {};
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);

  // const firstNameRef = useRef('');
  // const lastNameRef = useRef('');
  // const locationRef = useRef('');
  // const aboutYouRef = useRef('');
  // const [selectedGender, setSelectedGender] = useState('');
  // const [profileImage, setProfileImage] = useState(null);
  // const [isVisible, setIsVisible] = useState(false);
  // const [data,setData]=useState();
  // console.log("data",data)

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [location, setLocation] = useState();
  const [bio, setBio] = useState();
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState();
  const [isVisible, setIsVisible] = useState();

  // Options for the bottom sheet
  const list = [
    {title: 'Take Photo', icon: 'camera', onPress: () => handleCameraOpen()},
    {
      title: 'Choose from Gallery',
      icon: 'view-gallery',
      onPress: () => handleGalleryOpen(),
    },
    {
      title: 'Cancel',
      icon: 'close',
      titleStyle: {color: theme.$danger},
      onPress: () => setIsVisible(false),
    },
  ];

  // Function to handle image picker action
  const handleImagePicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Take Photo', 'Choose from Gallery', 'Cancel'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            handleCameraOpen();
          } else if (buttonIndex === 1) {
            handleGalleryOpen();
          }
        },
      );
    } else {
      setIsVisible(true);
    }
  };

  const handleCameraOpen = async () => {
    try {
      const image = await openCamera({cropping: true});
      setProfilePic(image.uri);
      setIsVisible(false);
    } catch (error) {
      console.log('Camera Error:', error);
    }
  };

  // Function to open the Gallery
  const handleGalleryOpen = async () => {
    try {
      const image = await openPhotos({cropping: true});
      setProfilePic(image.uri);
      setIsVisible(false);
    } catch (error) {
      console.log('Gallery Error:', error);
    }
  };

  // const handleCreateProfile = async () => {
  //   setError('');

  //   if (!firstName || !lastName || !gender || !location || !bio || !profilePic) {
  //     setError('All fields are required');
  //     return;
  //   }

  //   try {
  //     const token = await AuthStorage.getAccessToken(); // Fetch access token
  //     const userIdFromState = userData?.id; // Get user ID from Redux state
  //           const formData = new FormData();
  //           formData.append('user', userId);
  //           formData.append('first_name', firstName.trim());
  //           formData.append('last_name', lastName.trim());
  //           formData.append('gender', gender);
  //           formData.append('location', location.trim());
  //           formData.append('bio', bio);
  //           formData.append('profile_pic', {
  //             uri: profilePic,
  //             name: 'profile.jpg',
  //             type: 'image/jpeg',
  //           });

  //     console.log('Sending FormData:', formData);
  //     console.log('User ID:', userId);
  //     console.log('Access Token:', token);

  //     const response = await personalInfo(formData, token); // Pass token to API

  //     console.log('Profile Response:', response.data);

  //     if (response.status===200) {
  //       console.log('Profile Created Successfully:', response);
  //       // dispatch(setUserData(response?.user)); // Save user data in Redux
  //       navigation.navigate('login');
  //     } else {
  //       setError(response?.message || 'Failed to create profile.');
  //     }
  //   } catch (error) {
  //     console.error('Profile Creation Error:', error.response?.data?.error || error.response?.data?.message || error.message);

  //     if (error.response) {
  //       setError(error.response?.data?.error || error.response?.data?.message || 'Something went wrong.');
  //     } else {
  //       setError('Network error. Please check your connection.');
  //     }
  //   }
  // };

  const handleCreateProfile = async () => {
    setError('');
    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !location ||
      !bio ||
      !profilePic
    ) {
      setError('All fields are required');
      return;
    }
    try {
      const formData = {};
      formData.user = userId;
      formData.first_name = firstName.trim();
      formData.last_name = lastName.trim();
      formData.gender = gender;
      formData.location = location.trim();
      formData.bio = bio;
      formData.profile_pic = {
        uri: profilePic,
        name: 'profile.jpg',
        type: 'image/jpeg',
      };
      // Get authentication token
      const accessToken = await AuthStorage.getAccessToken();

      const response = await Api.POSTFORM('core/personal-info/', formData, {
        Authorization: `Bearer ${accessToken}`,
      });

      // const response = await axios.post(
      //   'http://52.70.194.52/api/core/personal-info/',
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   }
      // );
    } catch (err) {
      if (err.response) {
        const {status, data} = err.response;
        if (status === 400 && data?.err === 'Personal Info already exists') {
          setError(
            'Profile already exists. Please update your profile instead.',
          );
        } else if (status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Something went wrong! Please try again.');
        }
      } else {
        setError('Network error. Please check your internet connection.');
      }
    }
  };

  // const handleCreateProfile = async () => {
  //   setError('');

  //   // Validate required fields
  //   if (!firstName || !lastName || !gender || !location || !bio || !profilePic) {
  //     setError('All fields are required');
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append('user', userId);
  //     formData.append('first_name', firstName.trim());
  //     formData.append('last_name', lastName.trim());
  //     formData.append('gender', gender);
  //     formData.append('location', location.trim());
  //     formData.append('bio', bio);
  //     formData.append('profile_pic', {
  //       uri: profilePic,
  //       name: 'profile.jpg',
  //       type: 'image/jpeg',
  //     });

  //     // Get authentication token
  //     const accessToken = await AuthStorage.getAccessToken();

  //     // Make API request
  //     const response = await axios.post(
  //       'http://52.70.194.52/api/core/personal-info/',
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     console.log('Profile created successfully:', response);

  //     if (response.status === 200 || response.status === 201) {
  //       Alert.alert('Success', 'Profile created successfully!', [
  //         { text: 'OK', onPress: () => navigation.navigate('login') },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.log('Profile Creation Error:', error);

  //     if (error.response) {
  //       const { status, data } = error.response;
  //       switch (status) {
  //         case 400:
  //           if (data?.error === 'Personal Info already exists') {
  //             setError('Profile already exists. Please update your profile instead.');
  //           } else {
  //             setError('Invalid data. Please check your inputs.');
  //           }
  //           break;
  //         case 401:
  //           setError('Session expired. Please log in again.');
  //           break;
  //         default:
  //           setError('Something went wrong! Please try again.');
  //       }
  //     } else {
  //       setError('Network error. Please check your internet connection.');
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.Container}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Custombackbtn onPress={() => navigation.goBack()} />

        <View style={styles.avatarWrapper}>
          <Avatar
            size={wp('25%')}
            rounded
            activeOpacity={0.7}
            overlayContainerStyle={{
              backgroundColor: theme.$surface,
              borderColor: theme.$secondaryText,
              borderWidth: 1,
            }}
            source={profilePic ? {uri: profilePic} : null} // Default avatar
          />
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.cameraIcon}>
            <Icon name="camera" size={wp('10%')} color={theme.$secondaryText} />
          </TouchableOpacity>
        </View>

        <View style={styles.ColRow}>
          <Custominput
            width="44%"
            title="First Name"
            value={firstName}
            onValueChange={setFirstName}
          />
          <Custominput
            width="44%"
            title="Last Name"
            value={lastName}
            onValueChange={setLastName}
          />
        </View>

        {/* <View style={{ marginTop: hp('2%') }}>
          <Text h5 semiBold>Gender</Text>
          <SingleSelect
            arrayData={[
              { key: 'M', value: 'Male' },
              { key: 'F', value: 'Female' },
              { key: 'O', value: 'Other' },
            ]}
            selected={setGender}
            selectedCb={(key, val) => setGender(val.value)}
            uniqueId="gender"
          />
        </View> */}

        <Custominput
          width="92%"
          title="Gender"
          marginTop={15}
          value={gender}
          onValueChange={setGender}
        />

        <Custominput
          width="92%"
          title="Location"
          marginTop={15}
          value={location}
          onValueChange={setLocation}
        />

        <Custominput
          height="13%"
          title="About You"
          marginTop={15}
          value={bio}
          onValueChange={setBio}
        />

        <ButtonWithPushBack customContainerStyle={{marginVertical: 50}}>
          <PrimaryButton title="Create Profile" onPress={handleCreateProfile} />
        </ButtonWithPushBack>

        <View style={{marginTop: 10}}>
          <BottomSheet
            isVisible={isVisible}
            containerStyle={{backgroundColor: theme.$surface}}>
            {list.map(l => (
              <ListItem
                bottomDivider
                key={`${l.title}-${l.icon}`}
                onPress={l.onPress}>
                <Icon name={l.icon} color={theme.$surface} />
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  Container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'black',
    paddingHorizontal: wp('4%'),
    paddingTop: '2%',
  },
  ColRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 1,
    left: '59%',
    transform: [{translateX: -wp('3%')}],
    borderRadius: wp('5%'),
    padding: wp('1.5%'),
  },
});
