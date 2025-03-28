import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import SignUp from "../../screen/signUp";
import Login from "../../screen/Login";
import OTPVerificationScreen from "../../screen/otpScreen";
import CreateProfile from "../../screen/createProfile";
import BussinessProfile from "../../screen/BussinessProfile";
import HomeScreen from "../../tab/HomeScreen";


const Stack = createNativeStackNavigator();


const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={({ headerShown: false })}>
                <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
             <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} /> 
              <Stack.Screen name="createProfile" component={CreateProfile} />
            <Stack.Screen name="BussinessProfile" component={BussinessProfile} /> 
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
          

        </Stack.Navigator>
    )
}

export default AuthStack