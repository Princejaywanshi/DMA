import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import useTheme from '../hooks/useTheme';
import Icon from '../component/icon';
import ButtonWithPushBack from '../component/Button';
import PrimaryButton from '../component/prButton';
import Slide from '../assets/slide';
import Custominput from '../component/Custominput';
import Text from '../component/Text';
import {Avatar, BottomSheet, ListItem} from 'react-native-elements';
import {openCamera, openPhotos} from '../utils/imagePicker';
import Card from '../component/card';
import AuthStorage from '../utils/authStorage';
import ImageResizer from 'react-native-image-resizer';
import {useFocusEffect} from '@react-navigation/native';

const EquipmentScreen = () => {
  const {theme} = useTheme();
  const [step, setStep] = useState(0);
  const [profilePic, setProfilePic] = useState(null);

  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentCount, setEquipmentCount] = useState('');

  const [equipmentList, setEquipmentList] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [equipmentDetails, setEquipmentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchEquipmentList();
      // handleDeleteEquipment()  // API call to reload data
    }, []),
  );

  useEffect(() => {
    if (equipmentDetails) {
      setEquipmentName(equipmentDetails.name || '');
      setEquipmentDescription(equipmentDetails.description || '');
      setEquipmentCount(equipmentDetails.count?.toString() || '');
    }
  }, [equipmentDetails]);
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

  const handleImagePicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Take Photo', 'Choose from Gallery', 'Cancel'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) handleCameraOpen();
          else if (buttonIndex === 1) handleGalleryOpen();
        },
      );
    } else {
      setIsVisible(true);
    }
  };

  const handleCameraOpen = async () => {
    try {
      const image = await openCamera({cropping: true});

      if (image) {
        console.log('Original Image:', image); // Debugging

        // Resize the image properly
        const resizedImage = await ImageResizer.createResizedImage(
          image.uri,
          800, // Width
          800, // Height
          'JPEG', // Format
          80, // Quality
        );

        console.log('Resized Image:', resizedImage); // Debugging

        setProfilePic(resizedImage.uri); // Update state
        setIsVisible(false);
      }
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

  const handleCreateEquipment = async () => {
    if (!equipmentName || !equipmentDescription || !equipmentCount) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', equipmentName);
    formData.append('description', equipmentDescription);
    formData.append('no_of_equipment', equipmentCount);

    if (profilePic) {
      formData.append('image', {
        uri: profilePic,
        name: `equipment_image_${Date.now()}.jpg`,
        type: 'image/jpeg',
      });
    }

    try {
      const accessToken = await AuthStorage.getAccessToken();

      const response = await fetch('http://52.70.194.52/api/core/equipment/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        Alert.alert('Error', 'Unexpected response format. Please try again.');
        return;
      }

      if (response.ok) {
        Alert.alert('Success', 'Equipment added successfully');

        // **Step reset hone se pehle list refresh karna zaroori hai**
        await fetchEquipmentList(); // API se latest list fetch karo
        setStep(0);
      } else {
        // Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Network/Request Error:', error);
      Alert.alert('Error', 'Failed to add equipment. Please try again.');
    }
  };

  const fetchEquipmentList = async () => {
    try {
      const accessToken = await AuthStorage.getAccessToken();
      console.log('🚀 Access Token:', accessToken); // Replace with your actual token

      const response = await fetch('http://52.70.194.52/api/core/equipment/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEquipmentList(data);
      } else {
        Alert.alert('Error', 'Failed to fetch equipment.');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const handleViewPress = async id => {
    try {
      const accessToken = await AuthStorage.getAccessToken();
      setLoading(true);
      const response = await fetch(
        `http://52.70.194.52/api/core/equipment/${id}/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`, // Token dynamic pass karein
          },
        },
      );
      const data = await response.json();

      setEquipmentDetails(data); // API response ko state me store karein
      setStep(2); // Step ko update karein taake details screen dikhe
    } catch (error) {
      console.error('Error fetching equipment details:', error);
    } finally {
      setLoading(false);
    }
  };
  // const handleDeleteEquipment = async (equipmentId, event) => {
  //   if (event) event.persist(); // Prevent synthetic event pooling issue

  //   try {
  //     console.log(`Deleting Equipment ID: ${equipmentId}`);

  //     const token = await AuthStorage.getAccessToken(); // Fetch stored token
  //     console.log(`Access Token: ${token}`);

  //     const response = await fetch(`https://your-api.com/equipment/${equipmentId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error('Delete Error:', errorText);
  //       Alert.alert('Error', 'Failed to delete equipment.');
  //       return;
  //     }
  //          setStep(0)
  //     console.log(`Equipment ID ${equipmentId} deleted successfully.`);
  //     Alert.alert('Success', 'Equipment deleted successfully.');

  //     // Refresh list after deletion
  //     fetchEquipmentList();

  //   } catch (error) {
  //     console.error('Delete Request Failed:', error);
  //     Alert.alert('Error', 'An error occurred while deleting equipment.');
  //   }
  // };

  const handleDeleteEquipment = async () => {
    if (isDeleting) return; // Prevent multiple clicks
    setIsDeleting(true);

    try {
      if (!equipmentDetails?.id) {
        ToastAndroid.show('Invalid equipment ID.', ToastAndroid.SHORT);
        return;
      }

      console.log('🔄 Deleting Equipment ID:', equipmentDetails.id);

      const accessToken = await AuthStorage.getAccessToken();
      if (!accessToken) {
        ToastAndroid.show('Authentication failed.', ToastAndroid.SHORT);
        return;
      }

      const apiUrl = `http://52.70.194.52/api/core/equipment/${equipmentDetails.id}/`;
      console.log('🌍 API URL:', apiUrl);

      const deleteResponse = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const responseText = await deleteResponse.text();
      console.log('📩 API Response:', responseText);

      if (!deleteResponse.ok) {
        throw new Error(`❌ Failed to delete: ${responseText}`);
      }

      ToastAndroid.show(
        '✅ Equipment deleted successfully!',
        ToastAndroid.SHORT,
      );
      console.log('✅ Equipment deleted successfully!');
      setStep(0);
    } catch (error) {
      console.log('❌ Error deleting equipment:', error.message);
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
    } finally {
      setIsDeleting(false); // Re-enable button
    }
  };

  const handleUpdateEquipment = () => {

    setStep(3);
  };

  return (
    <View style={styles.container}>
      {step === 0 && <Header showBack={true} title="Equipment" />}

      {step === 0 && equipmentList.length > 0 ? (
        <View>
          {/* <Header showBack={true} title="Equipment" /> */}
          <FlatList
            data={equipmentList}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <Card third style={styles.card}>
                <Avatar
                  size={wp('20%')}
                  source={
                    item.image
                      ? {uri: item.image}
                      : require('../assets/icon/profiles.png')
                  }
                />
                <View style={{marginTop: hp('1%')}}>
                  <Text h4 semiBold textAliments="center">
                    {item.name}
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity
                    onPress={() => handleViewPress(item.id, setStep(2))}
                    style={styles.viewButton}>
                    <Text h5 style={{color:"white"}}>View</Text>
                  </TouchableOpacity>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>
                      {item.no_of_equipment}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
          />
        </View>
      ) : (
        step === 0 && (
          <Text style={{textAlign: 'center', marginTop: 20, color: 'white'}}>
            No equipment added yet.
          </Text>
        )
      )}

      {step === 0 && (
        <ButtonWithPushBack customContainerStyle={styles.buttonContainer}>
          <PrimaryButton
            title="Add"
            icon={<Icon name="plus" type="feather" size={15} color="white" />}
            onPress={() => setStep(1)}
          />
        </ButtonWithPushBack>
      )}

      {step === 1 && (
        <Slide index={1}>
          <Header
            showBack={true}
            title="Add New Equipment"
            customBackEvent={() =>
              setStep(step > 0 ? step - 1 : navigation.goBack())
            }
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.stepContainer}>
                <Text h4 semiBold>
                  Add Photo
                </Text>
                <View style={styles.avatarWrapper}>
                  <Avatar
                    size={wp('25%')}
                    rounded
                    overlayContainerStyle={{
                      backgroundColor: theme.$surface,
                      borderColor: theme.$secondaryText,
                      borderWidth: 1,
                    }}
                    source={profilePic ? {uri: profilePic} : null}
                  />
                  <TouchableOpacity
                    onPress={handleImagePicker}
                    style={styles.cameraIcon}>
                    <Icon
                      name="camera"
                      size={wp('10%')}
                      color={theme.$secondaryText}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Custominput
                    title="Equipment Name"
                    value={equipmentName}
                    onValueChange={setEquipmentName}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Custominput
                    title="Equipment Description"
                    value={equipmentDescription}
                    onValueChange={setEquipmentDescription}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Custominput
                    title="Count"
                    value={equipmentCount}
                    onValueChange={setEquipmentCount}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <BottomSheet
                isVisible={isVisible}
                containerStyle={{backgroundColor: theme.$surface}}>
                {list.map(({title, icon, onPress, titleStyle}) => (
                  <ListItem
                    key={`${title}-${icon}`}
                    bottomDivider
                    onPress={onPress}>
                    <Icon name={icon} color={theme.$onSurface || '#000'} />
                    <ListItem.Content>
                      <ListItem.Title style={titleStyle}>
                        {title}
                      </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
              </BottomSheet>
            </ScrollView>
          </KeyboardAvoidingView>
          <ButtonWithPushBack customContainerStyle={styles.buttonContainers}>
            {/* <PrimaryButton title="Update" onPress={""} /> */}
            <PrimaryButton title="create" onPress={handleCreateEquipment} />
          </ButtonWithPushBack>
        </Slide>
      )}
      {/* {step === 2 && ( */}
      {step === 2 && equipmentList && (
        <Slide index={2}>
          <Header
            showBack={true}
            title="Equipment"
            customBackEvent={() => setStep(0)} // Go back to list
          />
          <View
            style={{
              borderColor: '#000000',
              borderWidth: 1,
              height: '50%',
            }}>
            <Avatar
              size={wp('90%')}
              source={
                equipmentDetails?.image
                  ? {uri: equipmentDetails.image}
                  : undefined
              }
              containerStyle={{flex: 1, alignSelf: 'center'}}
              resizeMode="contain"
            />
          </View>

          <View style={{marginTop: hp('2%')}}>
            <Text h1 Bold textAliments="center">
              {equipmentDetails?.name}
            </Text>
          </View>

          <View style={{marginTop: hp('2%')}}>
            <Text h4 textAliments="center">
              {equipmentDetails?.description}
            </Text>
          </View>
          <View style={styles.buttonCont}>
            <PrimaryButton
              title="Edit"
              onPress={handleUpdateEquipment}
              buttonStyle={styles.updateButton}
            />
            <PrimaryButton
              title="Delete"
            
              onPress={handleDeleteEquipment}
              buttonStyle={styles.deleteButton}
              customsBg="grey"
            />
          </View>
        </Slide>
      )}
        {step === 3  && (
        <Slide index={3}>
      
          <Header
            showBack={true}
            title="Edit Equipment"
            customBackEvent={() =>
              setStep(step > 0 ? step - 1 : navigation.goBack())
            }
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.stepContainer}>
                <Text h4 semiBold>
                  Add Photo
                </Text>
                <View style={styles.avatarWrapper}>
                  <Avatar
                    size={wp('25%')}
                    rounded
                    overlayContainerStyle={{
                      backgroundColor: theme.$surface,
                      borderColor: theme.$secondaryText,
                      borderWidth: 1,
                    }}
                    source={profilePic ? {uri: profilePic} : null}
                  />
                  <TouchableOpacity
                    onPress={handleImagePicker}
                    style={styles.cameraIcon}>
                    <Icon
                      name="camera"
                      size={wp('10%')}
                      color={theme.$secondaryText}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Custominput
                    title="Equipment Name"
                    value={equipmentName}
                    onValueChange={setEquipmentName}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Custominput
                    title="Equipment Description"
                    value={equipmentDescription}
                    onValueChange={setEquipmentDescription}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Custominput
                    title="Count"
                    value={equipmentCount}
                    onValueChange={setEquipmentCount}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <BottomSheet
                isVisible={isVisible}
                containerStyle={{backgroundColor: theme.$surface}}>
                {list.map(({title, icon, onPress, titleStyle}) => (
                  <ListItem
                    key={`${title}-${icon}`}
                    bottomDivider
                    onPress={onPress}>
                    <Icon name={icon} color={theme.$onSurface || '#000'} />
                    <ListItem.Content>
                      <ListItem.Title style={titleStyle}>
                        {title}
                      </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
              </BottomSheet>
            </ScrollView>
          </KeyboardAvoidingView>
          <ButtonWithPushBack customContainerStyle={styles.buttonContainers}>
            {/* <PrimaryButton title="Update" onPress={""} /> */}
            <PrimaryButton title="Edit" onPress={""} />
          </ButtonWithPushBack>
        </Slide>
      )}
    </View>

    // </TouchableWithoutFeedback>
  );
};

export default EquipmentScreen;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#ffffff',
    padding: hp('2%'),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp('10%'),
    right: wp('7%'),
  },
  stepContainer: {
    marginTop: hp('3%'),
    paddingHorizontal: 5,
  },
  inputContainer: {
    marginTop: hp('3%'),
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('5%'),
  },
  buttonContainers: {
    marginVertical: 80,
    width: '50%',
    alignSelf: 'center', // Centers the button
  },
  card: {
    flex: 1,
    // backgroundColor: '#111', // Dark card background
    margin: 8,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white', // Border color
  },

  cardContent: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: hp('1%'),
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 10,
  },
  updateButton: {
    // backgroundColor: "#4CAF50", // Green color for update
    width: '80%',
  },
  deleteButton: {
    backgroundColor: 'grey', // Red color for delete
    width: '80%',
    left: 35,
  },
  circle: {
    position: 'absolute',
    top: '40%', // Align center vertically
    right: -40, // Move it outside the button
    width: 25,
    height: 25,
    borderRadius: 12.5, // Make it circular
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    // transform: [{ translateY: -12.5 }],
  },
  circleText: {
    color: '#fff',
    // fontWeight: 'bold',
  },
});
