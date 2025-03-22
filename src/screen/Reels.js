import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Text from "../component/Text";

const data = [
    { text: "Attendance" },
    { text: "Batches" },
    { text: "Weekly Plan" },
    { text: "Equipment  " },
    { text: "Managing Finance" },
    { text: "Performance Update" },
    { text: "Marketing And Promotion" },
    { text: "Pat To Play/Rent Facility" },
    { text: "Organise Event" },

];
const Reels = () => {
    return (
        <View style={styles.Container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.ColRow}>
                        <Text h5 semiBold textAliments="center">{item.text}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Reels

const styles = StyleSheet.create({
    ColRow: {
        width: wp("92%"),
        height: hp("6%"),
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 12,
        marginHorizontal: wp("4%"),
        marginTop: 20,
        justifyContent: "center"
    },

    Container: {
        width: wp("100%"),
        height: hp("100%"),
        backgroundColor: "#000",
        marginTop: 40
    }
})