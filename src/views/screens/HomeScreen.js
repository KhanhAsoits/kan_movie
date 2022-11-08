import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box} from "native-base/src/index";
import {SwitchTabViewModel} from "../../viewmodels/SwitchTabViewModel";
import {TabContentViewModel} from "../../viewmodels/TabContentViewModel";
import connectionStore from "../../models/ConnectionStore";
import {ErrorScreen} from "./ErrorScreen";
import {useFocusEffect} from "@react-navigation/native";
import {useCallback} from "react";
import homeStore from "../../models/HomeStore";
import {CustomHeader} from "../components/CustomHeader";

const HomeScreen = ({route, nav, links, active, handleSwitch}) => {
    // useFocusEffect(
    //     useCallback(() => {
    //         if (homeStore.showHeader === false) {
    //             homeStore.setHidden(true)
    //         }
    //     }, [])
    // )
    return (
        <NativeBaseProvider>
            <CustomHeader title={'Start Movie'}/>
            <Box flex={1}>
                <SwitchTabViewModel active={active} handleSwitch={handleSwitch} links={links}></SwitchTabViewModel>
                {connectionStore.connected ?
                    <TabContentViewModel active={active} items={links}></TabContentViewModel>
                    :
                    <ErrorScreen message={"You don't connect a network >.<"}/>
                }
                {/*    config stack screen*/}

            </Box>
        </NativeBaseProvider>
    )
}
export default observer(HomeScreen)