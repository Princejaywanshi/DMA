import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomProfile = () => {
    return (
        <View style={styles.ColRow}>
            <View style={styles.ColWrap}>
                <Image source={require('../assets/icon/profile.png')} style={styles.Colprofileicon} />

                <TouchableOpacity style={styles.ColcameraRow}>
                    <Image source={require('../assets/icon/camera.png')} style={styles.Colcameraicon} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CustomProfile

const styles = StyleSheet.create({
    ColRow: {
        width: "100%",
        alignItems: "center",
        marginTop: hp("4%")
    },
    ColWrap: {
        width: wp("25%"),
        height: wp("25%"),
        backgroundColor: "#4F4F4F",
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    ColcameraRow: {
        position: "absolute",
        right: -5,
        bottom: -2
    },
    Colcameraicon: {
        width: wp("9%"),
        height: wp("9%"),
        resizeMode: "contain"
    },
    Colprofileicon: {
        width: wp("10%"),
        height: wp("10%"),
        resizeMode: "contain"
    }

})