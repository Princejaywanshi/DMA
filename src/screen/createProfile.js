import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Custombackbtn from "../component/Custombackbtn";
import CustomProfile from "../component/CustomProfile";
import Custominput from "../component/Custominput";
import PrimaryButton from "../component/prButton";
import ButtonWithPushBack from "../component/Button";
import { useNavigation } from "@react-navigation/native";


const createProfile = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.Container}>
            <Custombackbtn onPress={() => navigation.navigate("SignUp")} />
            <CustomProfile />
            <View style={styles.ColRow}>
                <Custominput width="44%" title="First Name" />
                <Custominput width="44%" title="Last Name" />
            </View>
            <Custominput width="92%" title="Gender" marginTop={15} />
            <Custominput width="92%" title="Location" marginTop={15} />
            <Custominput height="13%" title="About You" marginTop={15} />
            <ButtonWithPushBack customContainerStyle={{ marginVertical: 50, }}>
                <PrimaryButton title="Create Profile" />
            </ButtonWithPushBack>

        </View>
    )
}

export default createProfile

const styles = StyleSheet.create({
    Container: {
        width: wp("100%"),
        height: hp("100%"),
        backgroundColor: "black",
        paddingHorizontal: wp("4%"),
        paddingTop: ("2%")
    },
    ColRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: hp("3%")
    }
})