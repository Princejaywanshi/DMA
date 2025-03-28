import React, { useCallback, useState, useRef } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from "../component/header";
import Search from "../component/searchInput";
import Icon from "../component/icon";
import ActivityIndicator from "../assets/activityIndicator";
import useTheme from "../hooks/useTheme";
import Text from "../component/Text";

const delay = 700;

const employeeData = [
    { id: "1", name: "John Doe", image: require("../assets/icon/profiles.png") },
    { id: "2", name: "Jane Smith", image: require("../assets/icon/profiles.png") },
    { id: "3", name: "Robert Johnson", image: require("../assets/icon/profiles.png") },
    { id: "4", name: "Emily Davis", image: require("../assets/icon/profiles.png") },
];


const SearchScreen = () => {
    const { theme } = useTheme();
    const timeout = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(employeeData);
    const [recentSearches, setRecentSearches] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const onChangeText = (val) => {
        clearTimeout(timeout.current);
        setSearchText(val);
        setShowLoading(true);
        
        timeout.current = setTimeout(() => {
            const filtered = employeeData.filter((emp) =>
                emp.name.toLowerCase().includes(val.toLowerCase())
            );
            setFilteredData(filtered);
            setShowLoading(false);
        }, delay);
    };

    const removeRecent = (id) => {
        setRecentSearches(recentSearches.filter(emp => emp.id !== id));
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
         <Image source={item.image} style={styles.profileImage} />
            <Text style={styles.employeeName}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeRecent(item.id)}>
                <Icon name="close" type="material" size={22} color="gray" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header showBack={true} />
            <View style={styles.searchWrapper}>
                <Search
                    containerStyle={styles.searchContainer}
                    placeholder="Search Employee"
                    value={searchText}
                    clearIcon={<Icon name="clear" type="material" size={16} />}
                    showLoading={showLoading}
                    searchIcon={{}}
                    loadingProps={<ActivityIndicator style={{ marginRight: 10 }} animating size="small" />}
                    inputContainerStyle={{ backgroundColor: "grey" }}
                    onChangeText={(val) => onChangeText(val)}
                    autoFocus={true}
                    cancelComponent={<Icon name="close-circle" color={theme.$lightText} type="material-community" />}
                    cancelButtonProps={<Icon name="close-circle" color={theme.$lightText} type="material-community" />}
                    showCancel={"focus"}
                    cancelButtonTitle={"clear"}
                />
            </View>
            <View style={styles.sectionHeader}>
                <Text h5 semiBold>Recent</Text>
                <Text h5 semiBold>See all</Text>
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp("100%"),
        backgroundColor: "black",
    },
    searchWrapper: {
        paddingHorizontal: wp("5%"),
    },
    searchContainer: {
        marginVertical: 5,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        marginTop: hp("1%"),
    },
    list: {
        marginTop: hp("2%"),
        paddingHorizontal: wp("5%"),
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp("1.5%"),
        // borderBottomWidth: 1,
        // borderBottomColor: "#ccc",
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    employeeName: {
        flex: 1,
        fontSize: 16,
        color: "white",
    },
});
