import React, {useEffect} from "react";
import {LogBox, Platform} from "react-native";
import {observer} from "mobx-react";
import RootScreen from "./src/views/screens/RootScreen";
import AuthProviderScreen from "./src/views/screens/AuthProviderScreen";
import AuthStore from "./src/models/AuthStore";

function App() {
    //app config
    LogBox.ignoreAllLogs(true)
    useEffect(() => {
        console.log('login app: ', AuthStore.isLogin)
    }, [AuthStore.isLogin])
    return (
        <>
            {
                AuthStore.isLogin ?
                    <RootScreen/>
                    :
                    <AuthProviderScreen/>
            }
        </>
    )
}

export default observer(App)
