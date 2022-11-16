import React, {useEffect, useLayoutEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TicketScreen from "./src/views/screens/TicketScreen";
import NotificationScreen from "./src/views/screens/NotificationScreen";
import UserScreen from "./src/views/screens/UserScreen";
import HomeViewModel from "./src/viewmodels/HomeViewModel";
import {LogBox, Platform} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import {observer} from "mobx-react";
import UserStore from "./src/models/UserStore";
import RootScreen from "./src/views/screens/RootScreen";
import AuthProviderScreen from "./src/views/screens/AuthProviderScreen";

function App() {
    //app config
    LogBox.ignoreAllLogs(true)
    console.disableYellowBox = true;
    // home header config
    return (
        <>
            {
                UserStore.isLogin ?
                    <RootScreen/>
                    :
                    <AuthProviderScreen/>
            }
        </>
    )
}

export default observer(App)
