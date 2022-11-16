import React from 'react'
import {observer} from "mobx-react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import WelcomeScreen from "./WelcomeScreen";
import {AuthScreen} from "./auth/AuthScreen";

const AuthProviderScreen = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'welcome_screen'} options={{
                    headerShown: false
                }}
                              component={WelcomeScreen}/>
                <Stack.Screen name={'auth_screen'} options={{headerShown: false}}
                              component={AuthScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default observer(AuthProviderScreen)
