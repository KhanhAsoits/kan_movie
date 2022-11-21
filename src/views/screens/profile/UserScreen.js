import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Text} from "native-base/src/index";
import CreateStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import ProfileScreen from "./ProfileScreen";
import ProfileDetailScreen from "./ProfileDetailScreen";
import ProfileDetailViewModel from "../../../viewmodels/ProfileDetailViewModel";

const UserScreen = () => {
    const Stack = CreateStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name={'profile'} options={{headerShown: false}} component={ProfileScreen}></Stack.Screen>
            <Stack.Screen name={'profile_detail'} options={{headerShown: false}}
                          component={ProfileDetailViewModel}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default observer(UserScreen)