import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TicketScreen from "./src/views/screens/TicketScreen";
import NotificationScreen from "./src/views/screens/NotificationScreen";
import UserScreen from "./src/views/screens/UserScreen";
import {HeaderViewModel} from "./src/viewmodels/HeaderViewModel";
import HomeViewModel from "./src/viewmodels/HomeViewModel";
import {Platform} from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
    //app config
    const Tab = createBottomTabNavigator();
    // NavigationBar.setBackgroundColorAsync("white").then(r => console.log('change system bar'))

    // home header config
    const HomeConfig = {
        tabBarShowLabel: false, header: ({nav, route, options}) => {
            const title = "Start Movie";
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
        tabBarStyle: {height: Platform.OS === "android" ? 60 : 75},
        tabBarActiveTintColor: "#47CFFF",
        tabBarInactiveTintColor: 'gray',
    })

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={ScreenConfig}
            >
                <Tab.Screen name={'home'} options={HomeConfig}
                            component={HomeViewModel}/>
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


