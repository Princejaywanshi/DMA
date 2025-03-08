import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Custominput = ({ width, height, title,marginTop }) => {
    return (
        <View style={{marginTop}}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={[styles.colinput, { width: wp(width), height: hp(height) }]}
            />

        </View>
    )
}

export default Custominput


const styles = StyleSheet.create({

    title: {
        fontSize: 17,
        fontWeight: "300",
        color: "#ffffff",
        marginLeft: 5,
        marginBottom: 5
    },
    colinput: {
        width: wp("92%"),
        height: hp("7%"),
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        borderColor: "#ffffff",
        fontSize:16,
        color:"#ffffff",
        backgroundColor:"#4f4f4f"
    }

})