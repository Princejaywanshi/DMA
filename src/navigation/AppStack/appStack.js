import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTab from "../bottomTab/BottomTab";
import EquipmentScreen from "../../tab/EquipmentScreen";
import weeklyPlan from "../../tab/weeklyPlan";
import BatchScreen from "../../tab/BatchScreen";

const Stack = createNativeStackNavigator();

const Appstack = () => {
    return (
        <Stack.Navigator screenOptions={({ headerShown: false })}>
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Equipt" component={EquipmentScreen} />
            <Stack.Screen name="weekly" component={weeklyPlan} />
            <Stack.Screen name="Batches" component={BatchScreen} />
            
        </Stack.Navigator>
    )
}

export default Appstack