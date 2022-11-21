import {observer} from "mobx-react";
import HomeViewModel from "../../viewmodels/HomeViewModel";
import TicketScreen from "./ticket/TicketScreen";
import NotificationScreen from "./NotificationScreen";
import UserScreen from "./profile/UserScreen";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Platform} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const RootScreen = (props) => {

    const HomeConfig = {
        tabBarShowLabel: false,
        headerShown: false
    }
    const Tab = createBottomTabNavigator();
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

export default observer(RootScreen)