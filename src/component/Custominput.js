import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Text from "./Text";

const Custominput = ({ width, height, title, marginTop, onValueChange, multiline }) => {
    const inputRef = useRef(null);  

    return (
        <View style={{ marginTop }}>
            <Text h4 semiBold style={styles.title}>{title}</Text>
            <TextInput
                ref={inputRef}  
                style={[
                    styles.colinput, 
                    { 
                        width: wp(width), 
                        height: hp(height),
                        textAlignVertical: multiline ? "top" : "center", // ✅ Fix for multiline input
                    }
                ]}
                placeholderTextColor="#A9A9A9"
                onChangeText={(text) => {
                    if (onValueChange) {
                        onValueChange(text);
                    }
                }}
                multiline={multiline} // ✅ Allow multiline input
            />
        </View>
    );
};

export default Custominput;

const styles = StyleSheet.create({
    title: {
        marginLeft: 5,
        marginBottom: 5,
        color: "#ffffff",
    },
    colinput: {
        width: wp("100%"),
        height: hp("7%"),
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "#ffffff",
        color: "#ffffff",
        backgroundColor: "#4f4f4f",
    },
});
