import React, {useEffect} from "react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Button, Center, Text, useColorMode, useColorModeValue} from "native-base/src/index";
import {TouchableOpacity} from "react-native";
import HomeScreen from "./src/views/screens/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {g_style} from "./src/core/style";
import TicketScreen from "./src/views/screens/TicketScreen";
import NotificationScreen from "./src/views/screens/NotificationScreen";
import UserScreen from "./src/views/screens/UserScreen";
import * as NavigationBar from 'expo-navigation-bar'
import {CustomHeader} from "./src/views/components/CustomHeader";
import {HeaderViewModel} from "./src/viewmodels/HeaderViewModel";

export default function App() {
    //app config
    const Tab = createBottomTabNavigator();
    // NavigationBar.setBackgroundColorAsync("white").then(r => console.log('change system bar'))

    // home header config
    const HomeConfig = {
        tabBarShowLabel: false, header: ({nav, route, options}) => {
            const title = "Home";
            return (
                <HeaderViewModel title={title} route={route} nav={nav}></HeaderViewModel>
            )
        }
    }
    //screen config
    const ScreenConfig = ({route}) => ({

        //config tab bar icon

        tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
                case "home":
                    iconName = focused ? "film" : "film-outline"
                    break;
                case "event-ticket":
                    iconName = focused ? "wallet" : "wallet-outline"
                    break;
                case "notification":
                    iconName = focused ? "notifications" : "notifications-outline"
                    break;
                case "user":
                    iconName = focused ? "person" : "person-outline"
                    break;
            }
            return <Ionicons name={iconName} size={22.5} color={color}/>;
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {height: 50},
        tabBarActiveTintColor: "#47CFFF",
        tabBarInactiveTintColor: 'gray',
    })


    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={ScreenConfig}
            >
                <Tab.Screen name={'home'} options={HomeConfig}
                            component={HomeScreen}/>
                <Tab.Screen name={'event-ticket'} options={{headerShown: false, tabBarShowLabel: false}}
                            component={TicketScreen}/>
                <Tab.Screen name={'notification'} options={{headerShown: false, tabBarShowLabel: false}}
                            component={NotificationScreen}/>
                <Tab.Screen name={'user'} options={{headerShown: false, tabBarShowLabel: false}}
                            component={UserScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}


