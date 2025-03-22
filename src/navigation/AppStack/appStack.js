import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ButtomTab from "../ButtomTab";
const Stack = createNativeStackNavigator();

const Appstack = () => {
    return (
        <Stack.Navigator screenOptions={({ headerShown: false })}>
            <Stack.Screen name="ButtomTab" component={ButtomTab} />
        </Stack.Navigator>
    )
}

export default Appstack