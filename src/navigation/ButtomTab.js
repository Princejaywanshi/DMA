import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { home, homeiconselected, mainlogo, profiles, reels, search, searchiconselected } from "../Conatant/Imageconstant";
import Home from "../screen/Home";
import Search from "../screen/Search";
import Post from "../screen/Post";
import Reels from "../screen/Reels";
import Profile from "../screen/Profile";


const Tab = createBottomTabNavigator();

const ICONS = {
    Home : { default: home, selected: homeiconselected },
    Search : { default: search, selected: searchiconselected },
    Post : { default: mainlogo, selected: mainlogo },
    Reels : { default: reels, selected: reels },
    Profile : { default:profiles , selected: profiles },
}

const getTabBarIcon = (name, focused) => {
    const icon = focused ? ICONS[name].selected : ICONS[name].default;

    return (
        <View>
            <Image source={icon} style={styles.icon} />

        </View>
    )

}


const ButtomTab = () => {
    return (
        <Tab.Navigator screenOptions={({
            headerShown: false, tabBarStyle: {
                height: hp("7%"),
                paddingTop: 10,
                backgroundColor:"#000"

            }
        })}>
            <Tab.Screen name="Home" component={Home} options={({ route }) => ({ tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused), tabBarLabel: () => null })} />
            <Tab.Screen name="Search" component={Search} options={({ route }) => ({ tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused), tabBarLabel: () => null })} />
            <Tab.Screen name="Post" component={Post} options={({ route }) => ({ tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused), tabBarLabel: () => null })} />
            <Tab.Screen name="Reels" component={Reels} options={({ route }) => ({ tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused), tabBarLabel: () => null })} />
            <Tab.Screen name="Profile" component={Profile} options={({ route }) => ({ tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused), tabBarLabel: () => null })} />
            </Tab.Navigator>

    )
}

export default ButtomTab

const styles = StyleSheet.create({
    icon: {
        width: wp("7%"),
        height: wp("7%"),
        resizeMode: "contain",
        // tintColor:"white"
    
    }
})