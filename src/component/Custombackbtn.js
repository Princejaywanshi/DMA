import React from "react";
import { Image, StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Custombackbtn = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.Colwrap} onPress={onPress}>
            <Image source={require('../assets/icon/backbtn.png')} style={styles.Colicon} />
        </TouchableOpacity>
    )
}

export default Custombackbtn

const styles = StyleSheet.create({
    Colicon: {

        width: wp("6%"),
        height: wp("6%"),
        resizeMode: "contain"
    },
    Colwrap: {
        width: wp("9%"),
        height: wp("9%"),
        backgroundColor: "#E847C5",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("7%"),
        borderRadius: 50
    }

})