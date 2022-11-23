import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ActivityIndicator, StyleSheet, TouchableOpacity} from "react-native";

const TicketScreen = () => {

}
export default observer(TicketScreen)
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bottomBar: {
        padding: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    result: {
        marginTop: 24,
    },
})