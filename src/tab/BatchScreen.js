import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../component/header';
import ButtonWithPushBack from '../component/Button';
import PrimaryButton from '../component/prButton';
import Icon from '../component/icon';
import Custominput from '../component/Custominput';
import Slide from '../assets/slide';
import useTheme from '../hooks/useTheme';
import Text from '../component/Text';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import SingleSelect from '../component/singleSelect';
import AuthStorage from '../utils/authStorage';
import Card from '../component/card';

const BatchScreen = () => {
  const [step, setStep] = useState(0);
  const {theme} = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedWeeklyPlan, setSelectedWeeklyPlan] = useState('');
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const [batches, setBatches] = useState([]);

  const showStartTimePicker = () => setStartTimePickerVisibility(true);
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);

  const showEndTimePicker = () => {
    if (!startTime) {
      setErrorMessage('Please select Start Time first.');
      return;
    }
    setErrorMessage('');
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => setEndTimePickerVisibility(false);

  const handleConfirm = (date, type) => {
    const selectedTime = moment(date).format('hh:mm A');

    if (type === 'start') {
      setStartTime(selectedTime);
      setEndTime(null);
      setErrorMessage('');
      hideStartTimePicker();
    } else {
      if (
        moment(selectedTime, 'hh:mm A').isSameOrBefore(
          moment(startTime, 'hh:mm A'),
        )
      ) {
        setErrorMessage('End Time must be after Start Time.');
      } else {
        setEndTime(selectedTime);
        setErrorMessage('');
      }
      hideEndTimePicker();
    }
  };

  useEffect(() => {
    fetchWeeklyPlans();
  }, []);




  useEffect(() => {
    fetchBatches(); 
  }, []);

  const fetchBatches = async () => {
    try {
      const accessToken = await AuthStorage.getAccessToken();
      const response = await fetch('http://52.70.194.52/api/attendance/batches/', {
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();
      console.log("Fetched Batches:", data); // ✅ Debugging
      setBatches(data); // ✅ Store data in state
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };
  const fetchWeeklyPlans = async () => {
    try {
      const accessToken = await AuthStorage.getAccessToken();
      const response = await fetch(
        'http://52.70.194.52/api/attendance/weekly-plans/',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const result = await response.json();
      if (response.ok) {
        setWeeklyPlans(result); // Save the fetched plans in state
      } else {
        console.error('Error Fetching Plans:', result);
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  };
  const handleCreateBatch = async () => {
    if ([name, weeklyPlans, startTime, endTime, description].some(field => !field)) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
  
    try {
      const accessToken = await AuthStorage.getAccessToken();
      console.log('Access Token:', accessToken);
  
      const formattedStartTime = moment(startTime, 'hh:mm A').format('HH:mm:ss');
      const formattedEndTime = moment(endTime, 'hh:mm A').format('HH:mm:ss');
  
      console.log('Formatted Start Time:', formattedStartTime);
      console.log('Formatted End Time:', formattedEndTime);
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('weekly_plan', selectedWeeklyPlan); // Send only the ID
      formData.append('start_time', formattedStartTime);
      formData.append('end_time', formattedEndTime);
      formData.append('description', description);
  
      // console.log('FormData Entries:');
      // for (let [key, value] of formData.entries()) {
      //   console.log(${key}: ${value});
      // }
     console.log("for",formData)
     const response = await fetch('http://52.70.194.52/api/attendance/batches/', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
    
      },
      body:formData, 
    });
  
      const result = await response.json();
      console.log('API Response:', result);
  
      if (response.ok) {
        Alert.alert('Success', 'Batch created successfully!');
        setStep(0);
      } else {
        Alert.alert('Error', result.message || 'Failed to create batch. Please try again.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  return (
    <View style={styles.container}>
      {step === 0 && <Header showBack={true} title="Batch" />}
      {step === 0 && (
        <>
      
     <FlatList
     data={batches} 
     keyExtractor={(item) => item.id.toString()}
     renderItem={({ item }) => (
      <View style={{paddingHorizontal:10}}>
       <Card third style={styles.card}>
         <Text h4 bold>{item.name}</Text>
         <Text h5>{item.description}</Text>
       </Card>
       </View>
     )}
   />

   
        <ButtonWithPushBack customContainerStyle={styles.buttonContainer}>
          <PrimaryButton
            title="Add"
            icon={<Icon name="plus" type="feather" size={15} color="white" />}
            onPress={() => setStep(1)}
          />
      
        </ButtonWithPushBack>
        </>
      )}
      {step === 1 && (
        <Slide index={1}>
          <Header
            showBack={true}
            title="Add New Batches"
            customBackEvent={() => setStep(0)}
          />

          {/* 🔹 Wrap in KeyboardAvoidingView & ScrollView */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.inputContainer}>
                <Custominput
                  title="Batch Name"
                  value={name}
                  onValueChange={setName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Custominput
                  height="13%"
                  title="Description"
                  value={description}
                  onValueChange={setDescription}
                  multiline={true}
                  textAlignVertical="top"
                />
              </View>

              {/* Start Time Picker */}
              <View style={styles.inputContainer}>
                <Text h5 semiBold style={styles.label}>
                  Start Time
                </Text>
                <TouchableOpacity
                  onPress={showStartTimePicker}
                  style={styles.timePickerButton}>
                  <Text>{startTime ? startTime : 'Select Start Time'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isStartTimePickerVisible}
                  mode="time"
                  onConfirm={date => handleConfirm(date, 'start')}
                  onCancel={hideStartTimePicker}
                />
              </View>

              {/* End Time Picker */}
              <View style={styles.inputContainer}>
                <Text h5 semiBold style={styles.label}>
                  End Time
                </Text>
                <TouchableOpacity
                  onPress={showEndTimePicker}
                  style={styles.timePickerButton}>
                  <Text>{endTime ? endTime : 'Select End Time'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  onConfirm={date => handleConfirm(date, 'end')}
                  onCancel={hideEndTimePicker}
                />
              </View>

              {/* 🔹 Error Message */}
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              {/* Weekly Plan Selection */}
              <View style={{marginTop: 5}}>
                <Text h5 semiBold>
                  Select Weekly Plan
                </Text>
                <SingleSelect
                  arrayData={weeklyPlans.map(plan => ({
                    key: plan.id, // Ensure id is used as key
                    value: plan.name,
                  }))}
                  selected={selectedWeeklyPlan}
                  search={false}
                  selectedCb={value => {
                    const selectedPlan = weeklyPlans.find(
                      plan => plan.name === value,
                    );
                    setSelectedWeeklyPlan(selectedPlan ? selectedPlan.id : '');
                  }}
                />
              </View>
            </ScrollView>

            {/* 🔹 Button is inside KeyboardAvoidingView */}
            <ButtonWithPushBack customContainerStyle={styles.buttonContainers}>
              <PrimaryButton title="Create" onPress={handleCreateBatch} />
            </ButtonWithPushBack>
          </KeyboardAvoidingView>
        </Slide>
      )}
      
      
    </View>
  );
};

export default BatchScreen;

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
  buttonContainers: {
    marginVertical: 30,
    width: '50%',
    alignSelf: 'center',
    // justifyContent:"flex-end",
    // flex:1
  },
  inputContainer: {
    marginTop: hp('2%'),
  },
  timePickerButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#f2f3f4',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('1%'),
  },
  label: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});
