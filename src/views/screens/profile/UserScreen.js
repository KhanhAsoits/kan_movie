import {observer} from "mobx-react";
import CreateStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import ProfileScreen from "./ProfileScreen";
import ProfileDetailViewModel from "../../../viewmodels/ProfileDetailViewModel";
import ChangePassword from "./ChangePassword";
import TransactionHistory from "./TransactionHistory";

const UserScreen = () => {
    const Stack = CreateStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name={'profile'} options={{headerShown: false}} component={ProfileScreen}></Stack.Screen>
            <Stack.Screen name={'profile_detail'} options={{headerShown: false}}
                          component={ProfileDetailViewModel}></Stack.Screen>
            <Stack.Screen name={'change_password'} component={ChangePassword}
                          options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={'transaction_history'} component={TransactionHistory} options={{headerShown:false,title:'Transaction History'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default observer(UserScreen)