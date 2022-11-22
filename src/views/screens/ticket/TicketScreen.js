import {observer} from "mobx-react";
import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";

const TicketScreen = () => {
    const data = {
        "id": "77487ef0-c3ed-40cb-97fa-7bf0836d35e2",
        "name": "Galaxy Cinema",
        "seats": [
            {
                "name": "A",
                "seats": 3
            },
            {
                "name": "B",
                "seats": 8
            },
            {
                "name": "C",
                "seats": 6
            },
            {
                "name": "D",
                "seats": 8
            },
            {
                "name": "E",
                "seats": 8
            },
            {
                "name": "F",
                "seats": 6
            },
            {
                "name": "G",
                "seats": 9
            },
            {
                "name": "H",
                "seats": 12
            },
            {
                "name": "I",
                "seats": 9
            },
            {
                "name": "K",
                "seats": 9
            },
            {
                "name": "M",
                "seats": 12
            },
            {
                "name": "L",
                "seats": 9
            }
        ]
    }


}
export default observer(TicketScreen)

const styles = StyleSheet.create({
    video: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
});
